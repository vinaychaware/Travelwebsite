"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createTrip } from "@/lib/actions"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    destination: z.string().min(2, {
        message: "Destination must be at least 2 characters.",
    }),
    price: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Price must be a number.",
    }),
    duration: z.string().refine((val) => !isNaN(Number(val)), {
        message: "Duration must be a number.",
    }),
    startDate: z.string(),
    endDate: z.string(),
    description: z.string().optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
})

interface TripFormProps {
    defaultValues?: Partial<z.infer<typeof formSchema>>
    id?: string
}

export function TripForm({ defaultValues: initialValues, id }: TripFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            title: "",
            destination: "",
            price: "",
            duration: "",
            startDate: "",
            endDate: "",
            description: "",
            imageUrl: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("title", values.title)
            formData.append("destination", values.destination)
            formData.append("price", values.price)
            formData.append("duration", values.duration)
            formData.append("startDate", values.startDate)
            formData.append("endDate", values.endDate)
            formData.append("imageUrl", values.imageUrl || "")
            // Handle description/itinerary later

            if (id) {
                // Update logic (add updateTrip to actions)
                // await updateTrip(id, formData)
            } else {
                await createTrip(formData)
            }

            router.push("/admin/trips")
            router.refresh()
        } catch (error) {
            console.error("Failed to save trip", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Amazing Bali Trip" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination</FormLabel>
                                <FormControl>
                                    <Input placeholder="Bali, Indonesia" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="1200" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration (Days)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="7" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter a direct link to an image.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Trip"}
                </Button>
            </form>
        </Form>
    )
}
