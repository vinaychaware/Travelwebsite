export function Testimonials() {
    return (
        <section className="container py-16 md:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12">
                <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                    What Travelers Say
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    Stories from people who have explored the world with us.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                    {
                        name: "Sarah Jenkins",
                        role: "Adventure Traveler",
                        content: "The trip to Bali was absolutely magical. Everything was organized perfectly, from the hotels to the tours.",
                        avatar: "https://i.pravatar.cc/100?img=1"
                    },
                    {
                        name: "Michael Chen",
                        role: "Business & Leisure",
                        content: "I've used TravelGo for 5 trips now and they never disappoint. The customer service is outstanding.",
                        avatar: "https://i.pravatar.cc/100?img=11"
                    },
                    {
                        name: "Emma Watson",
                        role: "Family Vacation",
                        content: "Booking a family vacation can be stressful, but TravelGo made it easy. We had a wonderful time in Kyoto!",
                        avatar: "https://i.pravatar.cc/100?img=5"
                    }
                ].map((testimonial, i) => (
                    <div key={i} className="flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm">
                        <div className="mb-4 text-primary">
                            {"★★★★★".split("").map((star, i) => <span key={i} className="text-xl">★</span>)}
                        </div>
                        <p className="text-muted-foreground italic mb-6">"{testimonial.content}"</p>
                        <div className="flex items-center gap-4 mt-auto">
                            <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                            />
                            <div>
                                <p className="font-bold text-sm">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
