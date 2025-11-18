import { NextRequest, NextResponse } from "next/server"

const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || "https://api.latotravelapp.com"
const BEARER_TOKEN = process.env.API_BEARER_TOKEN

export async function GET(request: NextRequest) {
  try {
    // Check if bearer token is configured
    if (!BEARER_TOKEN) {
      console.error("API_BEARER_TOKEN is not configured")
      return NextResponse.json(
        { error: "Server configuration error: API credentials not set" },
        { status: 500 }
      )
    }

    // Extract query parameters from the request
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get("page") || "1"
    const step = searchParams.get("step") || "10"
    const sample = searchParams.get("sample") || "true"
    const countries = searchParams.get("countries")

    // Build query string for external API
    const queryParams = new URLSearchParams({
      page,
      step,
      sample,
    })

    if (countries) {
      queryParams.append("countries", countries)
    }

    // Construct the external API URL
    const externalUrl = `${EXTERNAL_API_URL}/api/v1/trips/marketplace?${queryParams.toString()}`

    console.log(`Fetching marketplace trips from: ${externalUrl}`)

    // Make request to external API
    const response = await fetch(externalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      // Add caching (optional, adjust based on your needs)
      next: { revalidate: 300 }, // Cache for 5 minutes
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

    // Validate that we got data
    if (!data || typeof data !== 'object') {
      console.error("Invalid data received from external API")
      return NextResponse.json(
        { error: "Invalid data received from external API" },
        { status: 500 }
      )
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (error) {
    console.error("Marketplace API Error:", error)

    return NextResponse.json(
      {
        error: "Failed to fetch marketplace trips",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
