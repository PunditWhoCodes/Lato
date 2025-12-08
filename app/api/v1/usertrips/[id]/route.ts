import { NextRequest, NextResponse } from "next/server"

const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || "https://api.latotravelapp.com"
const BEARER_TOKEN = process.env.API_BEARER_TOKEN

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { id } = await context.params

    // Validate ID
    if (!id || id === 'undefined' || id.trim() === '') {
      return NextResponse.json(
        { error: "Trip ID is required and must be valid" },
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

    // Make request to external API
    const response = await fetch(externalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
      // Add caching (optional, adjust based on your needs)
      next: { revalidate: 600 }, // Cache for 10 minutes
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

    return NextResponse.json(
      {
        error: "Failed to fetch trip",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
