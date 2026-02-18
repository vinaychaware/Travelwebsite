import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Star } from "lucide-react"

const destinations = [
    {
        id: 1,
        name: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
        price: 899,
        rating: 4.8,
        reviews: 124,
        description: "Tropical paradise with lush jungles and pristine beaches."
    },
    {
        id: 2,
        name: "Swiss Alps",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop",
        price: 1299,
        rating: 4.9,
        reviews: 89,
        description: "Experience the breathtaking peaks and cozy mountain villages."
    },
    {
        id: 3,
        name: "Kyoto, Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2073&auto=format&fit=crop",
        price: 1599,
        rating: 4.7,
        reviews: 215,
        description: "Discover ancient temples and traditional Japanese culture."
    }
]

export function FeaturedDestinations() {
    return (
        <section className="container py-16 md:py-24">
            <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div className="flex flex-col gap-2">
                    <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
                        Featured Destinations
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Hand-picked selections for your next vacation.
                    </p>
                </div>
                <Button variant="outline" asChild className="group">
                    <Link href="/trips">
                        View all destinations
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((destination) => (
                    <div key={destination.id} className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
                        <div className="aspect-[4/3] overflow-hidden">
                            <img
                                src={destination.image}
                                alt={destination.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    Popular
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium">
                                    <Star className="h-4 w-4 fill-primary text-primary" />
                                    {destination.rating} <span className="text-muted-foreground">({destination.reviews})</span>
                                </div>
                            </div>
                            <h3 className="mb-2 text-xl font-bold">{destination.name}</h3>
                            <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                                {destination.description}
                            </p>
                            <div className="flex items-center justify-between border-t pt-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground">Starting from</span>
                                    <span className="font-bold text-primary">${destination.price}</span>
                                </div>
                                <Button size="sm" asChild>
                                    <Link href={`/trips/${destination.id}`}>View Details</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
