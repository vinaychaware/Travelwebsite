'use server'

import { signIn, auth } from '@/auth'
import { AuthError } from 'next-auth'
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}

export async function createTrip(formData: FormData) {
    const title = formData.get("title") as string
    const destination = formData.get("destination") as string
    const price = Number(formData.get("price"))
    const duration = Number(formData.get("duration"))
    const startDate = new Date(formData.get("startDate") as string)
    const endDate = new Date(formData.get("endDate") as string)
    const imageUrl = formData.get("imageUrl") as string

    // Simple slug generation
    const slug = title.toLowerCase().replace(/ /g, "-") + "-" + Date.now().toString().slice(-4)

    try {
        await prisma.trip.create({
            data: {
                title,
                slug,
                destination,
                price,
                duration,
                startDate,
                endDate,
                images: imageUrl ? [imageUrl] : [],
                itinerary: {}, // Empty JSON for now
            },
        })
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to create trip.")
    }

    revalidatePath("/admin/trips")
    redirect("/admin/trips")
}

export async function updateTrip(id: string, formData: FormData) {
    const title = formData.get("title") as string
    const destination = formData.get("destination") as string
    const price = Number(formData.get("price"))
    const duration = Number(formData.get("duration"))
    const startDate = new Date(formData.get("startDate") as string)
    const endDate = new Date(formData.get("endDate") as string)
    const imageUrl = formData.get("imageUrl") as string

    try {
        await prisma.trip.update({
            where: { id },
            data: {
                title,
                destination,
                price,
                duration,
                startDate,
                endDate,
                images: imageUrl ? [imageUrl] : [],
            },
        })
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to update trip.")
    }

    revalidatePath("/admin/trips")
    redirect("/admin/trips")
}

export async function createBooking(tripId: string) {
    const session = await auth()
    if (!session?.user?.email) {
        throw new Error("You must be signed in to book a trip.")
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    })

    if (!user) {
        throw new Error("User not found.")
    }

    const trip = await prisma.trip.findUnique({
        where: { id: tripId },
    })

    if (!trip) {
        throw new Error("Trip not found.")
    }

    try {
        await prisma.booking.create({
            data: {
                userId: user.id,
                tripId: trip.id,
                totalPrice: trip.price,
                status: 'CONFIRMED', // Auto-confirm for now as we don't have payment gateway
            },
        })
    } catch (error) {
        console.error("Database Error:", error)
        throw new Error("Failed to create booking.")
    }

    revalidatePath("/bookings")
    redirect("/bookings")
}
