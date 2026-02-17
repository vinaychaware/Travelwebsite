import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { MapPin, Calendar, Clock, DollarSign, CheckCircle2 } from "lucide-react"

import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export const dynamic = 'force-dynamic'

interface TripDetailsPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function TripDetailsPage({ params }: TripDetailsPageProps) {
    const { id } = await params
    const trip = await prisma.trip.findUnique({
        where: { id },
    })

    if (!trip) {
        notFound()
    }

    // Parse itinerary if it exists and is not null
    const itinerary = trip.itinerary as Record<string, any> | null

    return (
        <div className="container py-8 md:py-12">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="col-span-2 space-y-8">
                    <div>
                        <h1 className="font-heading text-3xl font-bold md:text-5xl">{trip.title}</h1>
                        <div className="mt-2 flex items-center text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>{trip.destination}</span>
                        </div>
                    </div>

                    {/* Image Gallery (Placeholder for now, using first image) */}
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                        {trip.images && trip.images.length > 0 ? (
                            <img
                                src={trip.images[0]}
                                alt={trip.title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                No Image Available
                            </div>
                        )}
                    </div>

                    {/* Overview */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Overview</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Experience the magic of {trip.destination} in this {trip.duration}-day adventure.
                            {/* Fallback description since we don't have a description field yet, 
                  might want to add one later or derive from title/destination. */}
                            Join us for an unforgettable journey filled with exploration, culture, and relaxation.
                        </p>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="rounded-lg border p-4 text-center">
                                <Clock className="mx-auto mb-2 h-5 w-5 text-primary" />
                                <div className="text-sm font-medium">Duration</div>
                                <div className="text-muted-foreground">{trip.duration} Days</div>
                            </div>
                            <div className="rounded-lg border p-4 text-center">
                                <Calendar className="mx-auto mb-2 h-5 w-5 text-primary" />
                                <div className="text-sm font-medium">Start Date</div>
                                <div className="text-muted-foreground">{format(new Date(trip.startDate), "MMM d")}</div>
                            </div>
                            <div className="rounded-lg border p-4 text-center">
                                <Calendar className="mx-auto mb-2 h-5 w-5 text-primary" />
                                <div className="text-sm font-medium">End Date</div>
                                <div className="text-muted-foreground">{format(new Date(trip.endDate), "MMM d")}</div>
                            </div>
                            <div className="rounded-lg border p-4 text-center">
                                <DollarSign className="mx-auto mb-2 h-5 w-5 text-primary" />
                                <div className="text-sm font-medium">Price</div>
                                <div className="text-muted-foreground">${Number(trip.price)}</div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Itinerary */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Itinerary</h2>
                        {itinerary && Array.isArray(itinerary.days) ? (
                            <Accordion type="single" collapsible className="w-full">
                                {itinerary.days.map((day: any, index: number) => (
                                    <AccordionItem key={index} value={`day-${index}`}>
                                        <AccordionTrigger>Day {day.day}: {day.title}</AccordionTrigger>
                                        <AccordionContent>
                                            {day.activities && Array.isArray(day.activities) ? (
                                                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                                                    {day.activities.map((activity: string, i: number) => (
                                                        <li key={i}>{activity}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-muted-foreground">{day.description || "No details provided."}</p>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <p className="text-muted-foreground">Detailed itinerary coming soon.</p>
                        )}
                    </div>
                </div>

                {/* Sidebar / Booking CTA */}
                <div className="col-span-1">
                    <div className="sticky top-20 rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="mb-4 text-xl font-bold">Book This Trip</h3>
                        <div className="mb-6 space-y-4">
                            <div className="flex items-end justify-between">
                                <span className="text-muted-foreground">Price per person</span>
                                <span className="text-2xl font-bold text-primary">${Number(trip.price)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Dates</span>
                                <span>{format(new Date(trip.startDate), "MMM d")} - {format(new Date(trip.endDate), "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Duration</span>
                                <span>{trip.duration} days</span>
                            </div>
                        </div>

                        <Button className="w-full" size="lg" asChild>
                            <Link href={`/trips/${trip.id}/book`}>
                                Book Now
                            </Link>
                        </Button>
                        <p className="mt-4 text-center text-xs text-muted-foreground">
                            Free cancellation up to 7 days before departure.
                        </p>

                        <Separator className="my-6" />

                        <div className="space-y-3">
                            <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                <span>Instant Confirmation</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                <span>Professional Guide</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                <span>Transportation Included</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
