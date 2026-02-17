import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-14rem)]">
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Explore the World with TravelGo
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Discover curated trips, book your next adventure, and create unforgettable memories.
                        Join thousands of happy travelers today.
                    </p>
                    <div className="space-x-4">
                        <Button size="lg" asChild>
                            <Link href="/trips">Browse Trips</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Trips Section Placeholder */}
            <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                        Featured Destinations
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Hand-picked selections for your next vacation.
                    </p>
                </div>
                <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    {/* Trip Cards will go here */}
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6 bg-white shadow-sm border">
                        <h3 className="font-bold">Bali, Indonesia</h3>
                        <p className="text-sm text-gray-500">Starting at $899</p>
                    </div>
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6 bg-white shadow-sm border">
                        <h3 className="font-bold">Swiss Alps</h3>
                        <p className="text-sm text-gray-500">Starting at $1299</p>
                    </div>
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6 bg-white shadow-sm border">
                        <h3 className="font-bold">Kyoto, Japan</h3>
                        <p className="text-sm text-gray-500">Starting at $1599</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
