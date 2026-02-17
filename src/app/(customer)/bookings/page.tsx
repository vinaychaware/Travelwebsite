import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { format } from "date-fns"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function BookingsPage() {
    const session = await auth()
    if (!session?.user?.email) {
        redirect("/login")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            bookings: {
                include: {
                    trip: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="container py-8 md:py-12">
            <div className="mb-8 space-y-4">
                <h1 className="font-heading text-3xl md:text-5xl">My Bookings</h1>
                <p className="text-muted-foreground text-lg">
                    Manage your upcoming and past trips.
                </p>
            </div>

            <div className="space-y-6">
                {user.bookings.length > 0 ? (
                    user.bookings.map((booking) => (
                        <Card key={booking.id}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>{booking.trip.title}</CardTitle>
                                    <Badge variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'}>
                                        {booking.status}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    booked on {format(booking.createdAt, "MMMM d, yyyy")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Dates</div>
                                        <div>
                                            {format(booking.trip.startDate, "MMM d")} - {format(booking.trip.endDate, "MMM d, yyyy")}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Destination</div>
                                        <div>{booking.trip.destination}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Total Price</div>
                                        <div>${Number(booking.totalPrice)}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground">Booking ID</div>
                                        <div className="text-xs font-mono text-muted-foreground mt-1">{booking.id}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="rounded-md border border-dashed p-8 text-center text-muted-foreground">
                        <p>You haven't booked any trips yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
