import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function TripsPage() {
    const trips = await prisma.trip.findMany({
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Trips</h1>
                <Button asChild>
                    <Link href="/admin/trips/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Trip
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trips.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No trips found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            trips.map((trip) => (
                                <TableRow key={trip.id}>
                                    <TableCell className="font-medium">{trip.title}</TableCell>
                                    <TableCell>{trip.destination}</TableCell>
                                    <TableCell>${Number(trip.price).toFixed(2)}</TableCell>
                                    <TableCell>{trip.duration} days</TableCell>
                                    <TableCell>
                                        {new Date(trip.startDate).toLocaleDateString()} -{" "}
                                        {new Date(trip.endDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/trips/${trip.id}/edit`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination placeholder */}
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* Pagination will be implemented here */}
            </div>
        </div>
    )
}
