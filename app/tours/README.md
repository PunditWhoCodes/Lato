# Tours API Integration

This directory contains the complete API integration for the Lato Travel App tours feature.

## Directory Structure

```
app/tours/
├── api/                          # API layer
│   ├── index.ts                  # Central exports
│   ├── trips.api.ts              # API service functions
│   ├── trips.queries.ts          # TanStack Query hooks
│   ├── trips.mappers.ts          # Data transformation
│   └── trips.types.ts            # TypeScript types
├── hooks/                        # Custom React hooks
│   └── useToursData.ts          # Convenience hook
└── components/                   # UI components
    └── tours-api-example.tsx    # Example usage
```

## Getting Started

### 1. Environment Setup

Copy `.env.local.example` to `.env.local` and add your bearer token:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.latotravelapp.com
NEXT_PUBLIC_BEARER_TOKEN=your_actual_token_here
```

### 2. Basic Usage

#### Using the convenience hook (Recommended):

```tsx
"use client"

import { useToursData } from "./hooks/useToursData"

export function MyToursComponent() {
  const { tours, isLoading, isError, error } = useToursData({
    page: 1,
    itemsPerPage: 10,
    countries: "US",
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error?.message}</div>

  return (
    <div>
      {tours.map(tour => (
        <div key={tour.id}>{tour.title}</div>
      ))}
    </div>
  )
}
```

#### Using TanStack Query hooks directly:

```tsx
"use client"

import { useMarketplaceTrips, mapMarketplaceResponseToTours } from "./api"

export function MyComponent() {
  const { data, isLoading } = useMarketplaceTrips({
    page: 1,
    step: 10,
    sample: true,
  })

  const tours = data ? mapMarketplaceResponseToTours(data) : []

  return <div>{/* Render tours */}</div>
}
```

## API Functions

### Core API Calls

Located in `api/trips.api.ts`:

- `fetchMarketplaceTrips(params)` - Fetch all marketplace trips
- `fetchTripById(id)` - Fetch single trip by ID
- `tripsApi.getByCountry(countryCode)` - Get trips by country
- `tripsApi.getPaginated(page, itemsPerPage)` - Get paginated trips

### Query Hooks

Located in `api/trips.queries.ts`:

- `useMarketplaceTrips(params, options)` - Fetch and cache marketplace trips
- `useTripById(id, options)` - Fetch and cache single trip
- `useInfiniteMarketplaceTrips(params, options)` - Infinite scroll support
- `useTripsByCountry(countryCode, params, options)` - Filter by country

### Data Mappers

Located in `api/trips.mappers.ts`:

- `mapMarketplaceResponseToTours(response)` - Transform API response to Tour[]
- `mapUserTripToTour(userTrip)` - Transform single trip
- `mapUserTripToTourDetail(userTrip)` - Transform to detailed tour
- `transformAndFilterTrips(response, filters)` - Transform with filters

## Advanced Examples

### Infinite Scrolling

```tsx
import { useInfiniteMarketplaceTrips, mapUserTripsToTours } from "./api"

export function InfiniteScrollTours() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMarketplaceTrips({ step: 20 })

  const allTours = data?.pages.flatMap(page =>
    mapUserTripsToTours(page.data)
  ) || []

  return (
    <div>
      {allTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  )
}
```

### Filtering and Sorting

```tsx
import { useMarketplaceTrips, transformAndFilterTrips } from "./api"

export function FilteredTours() {
  const { data } = useMarketplaceTrips()

  const filteredTours = data
    ? transformAndFilterTrips(data, {
        minPrice: 1000,
        maxPrice: 5000,
        travelStyles: ["Adventure", "Luxury"],
        destinations: ["US", "FR"],
      })
    : []

  return <div>{/* Render filtered tours */}</div>
}
```

### Prefetching for Performance

```tsx
import { usePrefetchTrip } from "./api"
import Link from "next/link"

export function TourLink({ tourId }: { tourId: string }) {
  const { prefetchTrip } = usePrefetchTrip()

  return (
    <Link
      href={`/tours/${tourId}`}
      onMouseEnter={() => prefetchTrip(tourId)}
    >
      View Tour
    </Link>
  )
}
```

## API Response Structure

The API returns data in the following structure:

```typescript
{
  data: [
    {
      id: "uuid",
      trip: {
        titles: [{ content: "Tour Title" }],
        nrOfDays: 21,
        country: { iso: "US", name: "United States" }
      },
      user: {
        name: "Company Name",
        verified: true
      },
      price: 3380,
      // ... more fields
    }
  ],
  count: 85
}
```

These are automatically transformed to match the application's `Tour` interface.

## Best Practices

1. **Always use the provided hooks** instead of calling API functions directly
2. **Use the mapper functions** to ensure consistent data structure
3. **Leverage TanStack Query's caching** - data is cached for 5-10 minutes
4. **Handle loading and error states** in your components
5. **Use the convenience hook** (`useToursData`) for simple use cases
6. **Prefetch data** on hover/focus for better UX
7. **Keep bearer token secure** - never commit `.env.local` to git

## Query Keys

Query keys are managed centrally in `tripsQueryKeys`:

```typescript
tripsQueryKeys.all                          // ["trips"]
tripsQueryKeys.marketplace()                // ["trips", "marketplace"]
tripsQueryKeys.marketplaceWithParams(params)// ["trips", "marketplace", params]
tripsQueryKeys.detail(id)                   // ["trips", "detail", id]
tripsQueryKeys.byCountry(code)              // ["trips", "country", code]
```

Use these for cache invalidation:

```typescript
import { useQueryClient } from "@tanstack/react-query"
import { tripsQueryKeys } from "./api"

const queryClient = useQueryClient()

// Invalidate all trips queries
queryClient.invalidateQueries({ queryKey: tripsQueryKeys.all })

// Invalidate specific trip
queryClient.invalidateQueries({ queryKey: tripsQueryKeys.detail("123") })
```

## Testing

Example test setup:

```typescript
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClientProvider } from "@tanstack/react-query"
import { useMarketplaceTrips } from "./api"

test("fetches trips", async () => {
  const { result } = renderHook(() => useMarketplaceTrips(), {
    wrapper: QueryClientProvider,
  })

  await waitFor(() => expect(result.current.isSuccess).toBe(true))
  expect(result.current.data?.data).toBeDefined()
})
```

## Troubleshooting

### Issue: "Unauthorized" error

**Solution**: Check that your bearer token is correctly set in `.env.local`

### Issue: Data not updating

**Solution**: Check cache settings or manually invalidate queries

### Issue: TypeScript errors

**Solution**: Ensure all types are imported from `./api/trips.types`

## Support

For issues or questions:
1. Check the example components in `components/tours-api-example.tsx`
2. Review the TanStack Query documentation
3. Check the API endpoint configuration in `config/apiRoutes.ts`
