import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { updateBookingStatus } from "@/lib/actions"

export default async function AdminBookingsPage() {
    const bookings = await prisma.booking.findMany({
        include: {
            user: true,
            trip: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Booking Management
            </h1>

            <div className="rounded-md border bg-white shadow-sm dark:bg-boxdark">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Booking ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Trip</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-mono text-xs">{booking.id.slice(-6)}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{booking.user.name || "N/A"}</span>
                                            <span className="text-xs text-muted-foreground">{booking.user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{booking.trip.title}</TableCell>
                                    <TableCell>{format(booking.createdAt, "MMM d, yyyy")}</TableCell>
                                    <TableCell>${Number(booking.totalPrice)}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            booking.status === 'CONFIRMED' ? 'default' :
                                                booking.status === 'PENDING' ? 'outline' : 'destructive'
                                        }>
                                            {booking.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <form action={updateBookingStatus.bind(null, booking.id, 'CANCELLED')}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                disabled={booking.status === 'CANCELLED'}
                                            >
                                                Cancel
                                            </Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No bookings found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
