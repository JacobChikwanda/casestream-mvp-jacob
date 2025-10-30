import {
  EarlyAccess,
  Features,
  FinalCTA,
  Footer,
  Hero,
  ProblemSolution,
  Roadmap,
  Header
} from "@/components/app-ui/landing"

const Landing = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSolution />
      <Features />
      <EarlyAccess />
      <Roadmap />
      <FinalCTA />
      <Footer />
    </main>
  )
}
export default Landing