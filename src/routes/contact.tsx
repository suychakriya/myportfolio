import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "suy.chakryya@gmail.com",
    href: "mailto:suy.chakryya@gmail.com",
  },
  { icon: Phone, label: "Phone", value: "+81 070 9195 4356", href: "tel:+817091954356" },
  { icon: MapPin, label: "Location", value: "Tokyo, Japan", href: "#" },
];

export function ContactPage() {
  return (
    <section className="relative px-6 lg:px-10 py-24 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-sun-radial opacity-20 blur-3xl animate-pulse-sun" />
      </div>

      <div className="relative mx-auto max-w-6xl w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Contact"
            title={
              <>
                Let's talk about something <span className="text-gradient-sun">worth building</span>
                .
              </>
            }
            description="I'm based in Tokyo and open to frontend roles, freelance projects, or just a coffee-shaped Slack thread. I usually reply within a day."
          />

          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            href="mailto:suy.chakryya@gmail.com"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-medium hover:opacity-90 transition-opacity shadow-deep"
          >
            <Mail size={18} />
            suy.chakryya@gmail.com
          </motion.a>
        </div>

        <div className="lg:col-span-5 space-y-3">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 hover:border-sun/60 hover:-translate-y-0.5 transition-all"
            >
              <span className="h-12 w-12 rounded-xl bg-secondary grid place-items-center group-hover:bg-sun group-hover:text-navy-deep transition-colors">
                <c.icon size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                  {c.label}
                </div>
                <div className="mt-0.5 font-medium truncate">{c.value}</div>
              </div>
            </motion.a>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-primary text-primary-foreground p-6 mt-6 relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-sun-radial opacity-30 blur-2xl" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-sun font-semibold">
                Currently
              </div>
              <p className="mt-2 leading-relaxed">
                Software Engineer at <strong>Equmenopolis</strong> in Tokyo. Open to conversations
                about new roles, contracts, and collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
