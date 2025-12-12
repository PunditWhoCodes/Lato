import { NextRequest, NextResponse } from "next/server"

const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || "https://api.latotravelapp.com"
const BEARER_TOKEN = process.env.API_BEARER_TOKEN
const FETCH_TIMEOUT = 15000 // 15 seconds timeout
const MAX_RETRIES = 2

/**
 * Fetch with timeout and retry logic
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = MAX_RETRIES
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)

    // Check if it's a timeout or network error
    const isTimeout = error instanceof Error && (
      error.name === 'AbortError' ||
      error.message.includes('timeout') ||
      error.message.includes('TIMEOUT')
    )
    const isNetworkError = error instanceof Error && (
      error.message.includes('fetch failed') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('ENOTFOUND')
    )

    // Retry on timeout or network errors
    if ((isTimeout || isNetworkError) && retries > 0) {
      console.log(`Retrying fetch... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Wait 1 second before retry
      return fetchWithRetry(url, options, retries - 1)
    }

    throw error
  }
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { id } = await context.params

    // Validate ID exists
    if (!id || id === 'undefined' || id.trim() === '') {
      return NextResponse.json(
        { error: "Trip ID is required and must be valid" },
        { status: 400 }
      )
    }

    if (!UUID_REGEX.test(id)) {
      console.warn(`Invalid UUID format received: ${id}`)
      return NextResponse.json(
        {
          error: "Invalid trip ID format. Expected UUID format.",
          message: "The tour ID must be a valid UUID. This tour may not be available.",
          receivedId: id
        },
        { status: 400 }
      )
    }

    // Check if bearer token is configured
    if (!BEARER_TOKEN) {
      console.error("API_BEARER_TOKEN is not configured")
      return NextResponse.json(
        { error: "Server configuration error: API credentials not set" },
        { status: 500 }
      )
    }

    // Construct the external API URL
    const externalUrl = `${EXTERNAL_API_URL}/api/v1/usertrips/${id}`

    console.log(`Fetching trip from: ${externalUrl}`)

    // Make request to external API with timeout and retry
    const response = await fetchWithRetry(externalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      cache: 'no-store', // Disable cache for dynamic data
    })

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error(`External API error: ${response.status}`, errorData)

      return NextResponse.json(
        {
          error: errorData?.message || `External API error: ${response.status}`,
          status: response.status,
        },
        { status: response.status }
      )
    }

    // Parse and return the response
    const data = await response.json()

    // Debug: Log the response structure
    console.log("API Response received for trip:", id)
    console.log("Response keys:", Object.keys(data))
    console.log("Has 'id' property:", 'id' in data)
    console.log("Has 'data' property:", 'data' in data)

    // Validate that we got data
    if (!data || typeof data !== 'object') {
      console.error("Invalid data received from external API")
      return NextResponse.json(
        { error: "Invalid data received from external API" },
        { status: 500 }
      )
    }

    // Check if the data has the expected structure
    if (!data.id && !data.data) {
      console.error("Data structure is missing both 'id' and 'data' properties")
      console.log("Full response:", JSON.stringify(data, null, 2))
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
      },
    })
  } catch (error) {
    console.error("Trip API Error:", error)

    // Determine error type for better user feedback
    let errorMessage = "Failed to fetch trip"
    let statusCode = 500

    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.message.includes('timeout') || error.message.includes('TIMEOUT')) {
        errorMessage = "Request timed out. The server took too long to respond."
        statusCode = 504 // Gateway Timeout
      } else if (error.message.includes('fetch failed') || error.message.includes('ECONNREFUSED')) {
        errorMessage = "Unable to connect to the travel API. Please try again later."
        statusCode = 503 // Service Unavailable
      } else if (error.message.includes('ENOTFOUND')) {
        errorMessage = "API server not found. Please check your connection."
        statusCode = 503
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        message: error instanceof Error ? error.message : "Unknown error",
        code: error instanceof Error ? (error as any).code : undefined,
      },
      { status: statusCode }
    )
  }
}
