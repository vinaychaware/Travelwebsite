import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-background pt-16 md:pt-20 lg:pt-24">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-20" />
      </div>

      <div className="container relative z-10 flex flex-col items-center gap-6 text-center">
        <div className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-sm font-medium backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          Explore the world with us
        </div>
        
        <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
          Discover Your Next <span className="text-primary">Adventure</span>
        </h1>
        
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Unforgettable journeys to the most beautiful destinations on Earth. Curated specifically for modern explorers.
        </p>

        {/* Search Widget Mockup */}
        <div className="mt-8 flex w-full max-w-3xl flex-col items-center gap-4 rounded-xl border bg-background/80 p-4 shadow-xl backdrop-blur-md sm:flex-row sm:p-6 lg:mt-12">
          <div className="flex w-full flex-col gap-2 text-left">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Destination</label>
            <input 
              type="text" 
              placeholder="Where to?" 
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="h-px w-full bg-border sm:h-12 sm:w-px" />
          <div className="flex w-full flex-col gap-2 text-left">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Date</label>
            <input 
              type="date" 
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="h-px w-full bg-border sm:h-12 sm:w-px" />
          <Button size="lg" className="w-full sm:w-auto h-auto py-3 px-8 text-base shadow-lg hover:shadow-primary/25 transition-all">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>

        <div className="mt-8 flex gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-slate-200">
                <img 
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="User" 
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start justify-center">
             <div className="flex text-yellow-500">
               {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
             </div>
             <p className="text-xs text-muted-foreground">Trusted by 10,000+ travelers</p>
          </div>
        </div>
      </div>
    </section>
  )
}
