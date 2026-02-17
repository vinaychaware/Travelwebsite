import { TripForm } from "@/components/admin/trip-form"

export default function NewTripPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Create New Trip</h1>
            <TripForm />
        </div>
    )
}
