import Features from "./Features";
import Hero from "./Hero";
import InfoSection from "./InfoSection";


export default function HomePage() {
  return (
    <>
    {/* Navbar */}
    <div className="h-16 w-full"/>
    <main>
        <Hero />
        <Features />
        <InfoSection />
    </main>

    {/* Footer */}
    <div className="h-40 w-full"/>
    </>
  )
}


