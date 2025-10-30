import { Rocket, Users } from "lucide-react"

const steps = [
  {
    icon: Rocket,
    title: "Launch",
    subtitle: "Now Available",
    description: "Core case management features including case tracking, document management, and time tracking",
    color: "from-blue-600 to-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "Onboarding",
    subtitle: "Getting Started",
    description: "Comprehensive onboarding process to help you set up your firm and start managing cases immediately",
    color: "from-purple-600 to-purple-700",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
]

export function Roadmap() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-blue-400/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-purple-400/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700 mb-4">
            <Rocket className="h-4 w-4" />
            <span>Product Roadmap</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 lg:text-6xl text-balance">Start managing cases today</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            Everything you need to get started with modern case management
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-1 bg-linear-to-r from-slate-300 to-slate-200 z-0" />
                )}

                <div className="relative rounded-3xl bg-white p-8 shadow-lg border-2 border-slate-200 text-center transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-slate-300">
                  <div className={`inline-flex rounded-2xl ${step.iconBg} p-5 mb-6 shadow-sm`}>
                    <step.icon className={`h-10 w-10 ${step.iconColor}`} />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
                      <p className="text-sm font-semibold text-slate-500 mt-2 uppercase tracking-wide">
                        {step.subtitle}
                      </p>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  </div>

                  <div
                    className={`absolute inset-0 rounded-3xl bg-linear-to-br ${step.color} opacity-0 hover:opacity-5 transition-opacity -z-10`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
