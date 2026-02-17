import { TripForm } from "@/components/admin/trip-form"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function EditTripPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params
    const { id } = params
    const trip = await prisma.trip.findUnique({
        where: { id },
    })

    if (!trip) {
        notFound()
    }

    // Transform trip data to match form expectations
    const defaultValues = {
        title: trip.title,
        destination: trip.destination,
        price: trip.price.toString(),
        duration: trip.duration.toString(),
        startDate: trip.startDate.toISOString().split("T")[0],
        endDate: trip.endDate.toISOString().split("T")[0],
        imageUrl: trip.images[0] || "",
        description: "", // Add if schema has it
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Edit Trip</h1>
            {/* Pass defaultValues to TripForm (need to update TripForm to accept them) */}
            <TripForm defaultValues={defaultValues} id={trip.id} />
        </div>
    )
}
