import { FileX, DollarSign, Users, Bell } from "lucide-react"

const problems = [
  {
    icon: FileX,
    problem: "Manual Case Management",
    solution: "Centralized Case Hub",
    description: "All your cases organized in one intelligent dashboard with smart automation",
    color: "from-blue-600 to-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: DollarSign,
    problem: "Billing Chaos",
    solution: "Automatic Time Tracking",
    description: "Integrated invoicing with smart time capture and expense management",
    color: "from-purple-600 to-purple-700",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Users,
    problem: "Poor Team Visibility",
    solution: "Real-time Collaboration",
    description: "Keep your entire team synchronized with live updates and task management",
    color: "from-teal-600 to-teal-700",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    icon: Bell,
    problem: "Scattered Client Updates",
    solution: "Automated Notifications",
    description: "Keep clients informed with automatic case updates and secure messaging",
    color: "from-slate-600 to-slate-700",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
]

export function ProblemSolution() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-purple-400/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 mb-4">
            <span>Problems We Solve</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 lg:text-6xl text-balance">
            Stop managing cases the old way
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            CaseStream eliminates the chaos of manual case management with intelligent automation
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {problems.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-slate-300"
            >
              {/* Icon */}
              <div className={`inline-flex rounded-2xl ${item.iconBg} p-4 mb-6 shadow-sm`}>
                <item.icon className={`h-8 w-8 ${item.iconColor}`} />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-400 line-through mb-2">{item.problem}</p>
                  <h3 className="text-xl font-bold text-slate-900">{item.solution}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              {/* Hover gradient effect */}
              <div
                className={`absolute inset-0 rounded-3xl bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity -z-10`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
