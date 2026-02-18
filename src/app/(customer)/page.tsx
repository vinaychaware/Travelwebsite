import { Hero } from "@/components/home/hero"
import { FeaturedDestinations } from "@/components/home/featured-destinations"
import { Features } from "@/components/home/features"
import { Testimonials } from "@/components/home/testimonials"
import { Newsletter } from "@/components/home/newsletter"

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <Features />
            <FeaturedDestinations />
            <Testimonials />
            <Newsletter />
        </div>
    )
}
