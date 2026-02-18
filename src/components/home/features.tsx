import { Shield, Globe, Clock, CreditCard } from "lucide-react"

const features = [
    {
        name: "Best Price Guarantee",
        description: "We ensure you get the best rates for every destination.",
        icon: CreditCard,
    },
    {
        name: "World Class Support",
        description: "24/7 support to help you with any issues during your trip.",
        icon: Clock,
    },
    {
        name: "Handpicked Locations",
        description: "Every destination is verified by our travel experts.",
        icon: Globe,
    },
    {
        name: "Secure Booking",
        description: "Your payments and data are always 100% secure.",
        icon: Shield,
    },
]

export function Features() {
    return (
        <section className="container py-16 md:py-24 bg-slate-50 dark:bg-muted/50 rounded-3xl my-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                    Why Choose TravelGo?
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    We make your travel experience seamless, safe, and unforgettable.
                </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4 md:max-w-[64rem] md:grid-cols-2 lg:gap-8 mt-12">
                {features.map((feature) => (
                    <div key={feature.name} className="relative overflow-hidden rounded-lg bg-background p-8 text-center shadow transition-all hover:shadow-lg hover:-translate-y-1">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                            <feature.icon className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg">{feature.name}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
