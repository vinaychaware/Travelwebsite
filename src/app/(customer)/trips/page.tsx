import { prisma } from "@/lib/prisma"
import { TripCard } from "@/components/features/trip-card"

export const dynamic = 'force-dynamic'

export default async function TripsPage() {
    const trips = await prisma.trip.findMany({
        orderBy: { startDate: 'asc' },
        where: {
            startDate: {
                gte: new Date() // Only show future trips
            }
        }
    })

    return (
        <div className="container py-8 md:py-12">
            <div className="mb-8 space-y-4">
                <h1 className="font-heading text-3xl md:text-5xl">Explore Trips</h1>
                <p className="text-muted-foreground text-lg">
                    Find your next adventure from our curated selection of trips.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {trips.length > 0 ? (
                    trips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                        <p>No upcoming trips found. Please check back later!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
