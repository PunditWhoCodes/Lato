'use client'

import { useStore, useAuth, useUI, useSearch } from './index'

export function AuthExample() {
  const { user, setUser, isAuthenticated } = useAuth()

  const handleLogin = () => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    })
  }

  const handleLogout = () => {
    useStore.getState().clearUser()
  }

  return (
    <div>
      {isAuthenticated() ? (
        <>
          <p>Welcome, {user?.name}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  )
}
export function DirectAccessExample() {
  const user = useStore((state) => state.user)

  const theme = useStore((state) => state.theme)

  const sidebarOpen = useStore((state) => state.sidebarOpen)
  const searchQuery = useStore((state) => state.searchQuery)

  return (
    <div>
      <p>User: {user?.name}</p>
      <p>Theme: {theme}</p>
      <p>Sidebar: {sidebarOpen ? 'Open' : 'Closed'}</p>
      <p>Search: {searchQuery}</p>
    </div>
  )
}

export function UIControlsExample() {
  const { sidebarOpen, toggleSidebar, theme, setTheme } = useUI()

  return (
    <div>
      <button onClick={toggleSidebar}>
        {sidebarOpen ? 'Close' : 'Open'} Sidebar
      </button>

      <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </div>
  )
}

export function SearchExample() {
  const { searchQuery, setSearchQuery, filters, setFilters, clearFilters } = useSearch()

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handlePriceFilter = () => {
    setFilters({
      ...filters,
      priceRange: { min: 0, max: 1000 },
    })
  }

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search tours..."
      />

      <button onClick={handlePriceFilter}>Filter by Price</button>
      <button onClick={clearFilters}>Clear Filters</button>

      <pre>{JSON.stringify(filters, null, 2)}</pre>
    </div>
  )
}


export function getCurrentUser() {
  return useStore.getState().user
}

export function updateTheme(theme: 'light' | 'dark' | 'system') {
  useStore.setState({ theme })
}

export function subscribeToAuth() {
  const unsubscribe = useStore.subscribe((state) => {
    console.log('User changed:', state.user)
  })

  return unsubscribe
}

export function FormExample() {
  const { setSearchQuery, setFilters } = useSearch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    setSearchQuery(formData.get('search') as string)
    setFilters({
      destination: formData.get('destination') as string,
      rating: Number(formData.get('rating')),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="search" placeholder="Search..." />
      <input name="destination" placeholder="Destination..." />
      <input name="rating" type="number" min="1" max="5" />
      <button type="submit">Search</button>
    </form>
  )
}

export function ConditionalExample() {
  const isAuthenticated = useStore((state) => state.isAuthenticated())
  const hasSearchQuery = useStore((state) => state.searchQuery.length > 0)

  return (
    <div>
      {isAuthenticated && <div>Protected Content</div>}
      {hasSearchQuery && <div>Showing search results</div>}
    </div>
  )
}

interface TourCardProps {
  tourId: number
  title: string
}

function TourCard({ tourId, title }: TourCardProps) {
  const isAuthenticated = useStore((state) => state.isAuthenticated())

  return (
    <div>
      <h3>{title}</h3>
      {isAuthenticated && <button>Book Now</button>}
    </div>
  )
}

export function TourListExample() {
  const tours = [
    { id: 1, title: 'Paris Tour' },
    { id: 2, title: 'Rome Tour' },
    { id: 3, title: 'Tokyo Tour' },
  ]

  return (
    <div>
      {tours.map((tour) => (
        <TourCard key={tour.id} tourId={tour.id} title={tour.title} />
      ))}
    </div>
  )
}

export function AsyncExample() {
  const { setUser } = useAuth()

  const loginWithAPI = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      const user = await response.json()
      setUser(user)
    } catch (error) {
      console.error('Login failed:', error)
      setUser(null)
    }
  }

  return (
    <button onClick={() => loginWithAPI('test@example.com', 'password')}>
      Login with API
    </button>
  )
}

import { useQuery } from '@tanstack/react-query'

export function CombinedExample() {
  const { searchQuery } = useSearch()
  const isAuthenticated = useStore((state) => state.isAuthenticated())

  const { data: tours, isLoading } = useQuery({
    queryKey: ['tours', searchQuery],
    queryFn: () => fetch(`/api/tours?q=${searchQuery}`).then((r) => r.json()),
    enabled: isAuthenticated,
  })

  if (!isAuthenticated) {
    return <div>Please login to view tours</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Tours for: {searchQuery}</h2>
      {/* Render tours */}
    </div>
  )
}

