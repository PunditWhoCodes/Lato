import { Navigation } from "@/components/navigation"
import { companies } from "@/lib/data"
import { locations, specialties } from "./data/inex"
import { CompaniesClient } from "./components/companies-client"

/**
 * Companies Listing Page (Server Component with SSR)
 *
 * This page is server-rendered for SEO benefits.
 * Interactive features (search, filters, sorting) are handled by CompaniesClient.
 */
export default async function CompaniesPage() {
  // Fetch data on the server (currently mock data, ready for API integration)
  const companiesData = companies

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <CompaniesClient companies={companiesData} locations={locations} specialties={specialties} />
    </div>
  )
}

export const metadata = {
  title: "Tour Companies | Lato Marketplace",
  description: "Connect with verified local experts and professional tour operators worldwide. Experience authentic adventures with trusted guides.",
}
