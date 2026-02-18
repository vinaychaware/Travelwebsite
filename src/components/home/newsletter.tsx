import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export function Newsletter() {
    return (
        <section className="container py-12 md:py-24">
            <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 shadow-2xl md:px-12 md:py-20">
                {/* Abstract background pattern */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl"></div>

                <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
                    <h2 className="font-heading text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
                        Get 10% Off Your First Trip
                    </h2>
                    <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">
                        Subscribe to our newsletter and receive exclusive offers, travel inspiration, and tips directly to your inbox.
                    </p>

                    <div className="mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row">
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="h-12 w-full min-w-0 bg-primary-foreground/10 px-4 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/20 focus-visible:ring-primary-foreground/50"
                        />
                        <Button size="lg" className="h-12 w-full bg-white text-primary hover:bg-white/90 sm:w-auto">
                            Subscribe
                            <Send className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    <p className="mt-4 text-xs text-primary-foreground/60">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    )
}
