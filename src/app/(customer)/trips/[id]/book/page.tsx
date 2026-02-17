import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createBooking } from "@/lib/actions"

interface BookingPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function BookingPage({ params }: BookingPageProps) {
    const session = await auth()
    if (!session?.user) {
        redirect("/api/auth/signin?callbackUrl=/trips")
    }

    const { id } = await params
    const trip = await prisma.trip.findUnique({
        where: { id },
    })

    if (!trip) {
        notFound()
    }

    const createBookingWithTripId = createBooking.bind(null, trip.id)

    return (
        <div className="container flex min-h-[calc(100vh-14rem)] items-center justify-center py-10">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Confirm Your Booking</CardTitle>
                    <CardDescription>Review your trip details before proceeding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-md border p-4">
                        <h3 className="font-semibold text-lg">{trip.title}</h3>
                        <p className="text-sm text-muted-foreground">{trip.destination}</p>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Start Date</span>
                            <span>{format(new Date(trip.startDate), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">End Date</span>
                            <span>{format(new Date(trip.endDate), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Duration</span>
                            <span>{trip.duration} days</span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-medium text-lg">
                        <span>Total Content</span>
                        <span>${Number(trip.price)}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <form action={createBookingWithTripId} className="w-full">
                        <Button className="w-full" size="lg" type="submit">
                            Confirm Booking
                        </Button>
                    </form>
                    <p className="text-center text-xs text-muted-foreground">
                        By clicking confirm, you agree to our Terms of Service.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
