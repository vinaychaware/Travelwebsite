import Link from "next/link"
import { Trip } from "@prisma/client"
import { format } from "date-fns"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TripCardProps {
    trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
    return (
        <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
            <div className="aspect-video w-full overflow-hidden bg-muted">
                {trip.images[0] ? (
                    <img
                        src={trip.images[0]}
                        alt={trip.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-muted-foreground">
                        No Image
                    </div>
                )}
            </div>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                    <Badge variant="outline">${Number(trip.price)}</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2.5 text-sm text-muted-foreground">
                <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span className="line-clamp-1">{trip.destination}</span>
                </div>
                <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                        {format(new Date(trip.startDate), "MMM d, yyyy")}
                    </span>
                </div>
                <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{trip.duration} days</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/trips/${trip.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
