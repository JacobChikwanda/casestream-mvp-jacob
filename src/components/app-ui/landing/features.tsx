import { Folder, Clock, FileText, Receipt, MessageSquare, Shield, Zap, BarChart } from "lucide-react"

const features = [
  {
    icon: Folder,
    title: "Centralized Case Hub",
    description:
      "Manage all your cases in one intelligent, searchable dashboard with custom workflows and smart filters.",
    color: "from-blue-600 to-blue-700",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Clock,
    title: "Smart Time Tracking",
    description: "Automatic time capture with AI-powered suggestions for billable hours and activity logging.",
    color: "from-purple-600 to-purple-700",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Secure cloud storage with version control, e-signatures, and instant search across all documents.",
    color: "from-teal-600 to-teal-700",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    icon: Receipt,
    title: "Integrated Invoicing",
    description: "Generate professional invoices directly from tracked time and expenses with automated reminders.",
    color: "from-emerald-600 to-emerald-700",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: MessageSquare,
    title: "Team Collaboration",
    description: "Real-time updates, task assignments, internal notes, and seamless communication for your team.",
    color: "from-orange-600 to-orange-700",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: Shield,
    title: "Client Portal",
    description: "Secure portal for clients to view case progress, access documents, and communicate with your team.",
    color: "from-indigo-600 to-indigo-700",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Automate repetitive tasks, set up custom triggers, and streamline your entire legal process.",
    color: "from-yellow-600 to-yellow-700",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: BarChart,
    title: "Analytics & Reporting",
    description: "Comprehensive insights into your firm's performance, billable hours, and case outcomes.",
    color: "from-pink-600 to-pink-700",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
]

export function Features() {
  return (
    <section className="py-24 lg:py-32 from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-400/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-400/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700 mb-4">
            <span>Powerful Features</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 lg:text-6xl text-balance">
            Everything you need to run your firm
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
            Comprehensive tools designed specifically for modern law practices
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-3xl bg-white p-8 shadow-sm border-2 border-slate-200 transition-all hover:shadow-2xl hover:-translate-y-2 hover:border-slate-300"
            >
              {/* Icon */}
              <div
                className={`inline-flex rounded-2xl ${feature.iconBg} p-4 mb-6 shadow-sm group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>

              {/* Hover gradient */}
              <div
                className={`absolute inset-0 rounded-3xl ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity -z-10`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
