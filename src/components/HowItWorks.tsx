import { Search, CalendarCheck2, Trophy } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Find",
    description:
      "Browse hundreds of premium facilities near you by sport, date, or time.",
  },
  {
    icon: CalendarCheck2,
    title: "Book",
    description:
      "Choose your slot and pay securely with instant confirmation.",
  },
  {
    icon: Trophy,
    title: "Play",
    description:
      "Show your digital booking pass at the venue and start playing!",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-[#031B2E] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-white text-4xl md:text-5xl font-semibold">
            How It Works
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[1px] bg-emerald-400/20" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon Circle */}
                <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full border border-emerald-400 bg-[#08233A] shadow-[0_0_25px_rgba(74,222,128,0.15)]">
                  <Icon className="w-9 h-9 text-emerald-400" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="mt-8 text-2xl font-semibold text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 max-w-sm text-gray-400 leading-relaxed text-base">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
