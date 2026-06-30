import { PROPOSAL, CONTACT } from '@/app/lib/site';
import { STATS } from '@/app/data/proposal';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div id="hero" className="spotlight relative min-h-screen">
        {/* backdrop */}
        <div className="gridlines absolute inset-0 opacity-70" />
        <div className="blob -left-32 top-20 h-96 w-96 bg-ember-700" />
        <div className="blob right-0 top-1/3 h-80 w-80 bg-ember-600/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/10 via-charcoal-900/30 to-charcoal-900" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-20 pt-36 sm:px-6">
          <p className="eyebrow text-ember-sheen">Large Project Workforce Solutions</p>

          <h1 className="display mt-6 max-w-4xl text-5xl font-bold leading-[0.95] text-steel-50 sm:text-7xl">
            Zero cost. Full service.{' '}
            <span className="text-ember-500">Zero burden.</span>
          </h1>

          <div className="hero-line mt-7" />

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-steel-300">{PROPOSAL.thesis}</p>

          {/* capability strip */}
          <div className="mt-12 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {STATS.map((s) => (
              <div key={s.label} className="panel reticle rounded-lg px-4 py-4 text-center">
                <div className="display text-2xl font-bold text-ember-500">{s.value}</div>
                <div className="kicker mt-1 text-steel-400">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a href="#footprint" className="btn-ember rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide">
              Explore the site plan
            </a>
            <a href="#engage" className="btn-ghost rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide">
              Request a layout
            </a>
            <a href={`tel:${CONTACT.phoneHref}`} className="kicker ml-1 text-steel-400 ulink">
              {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="kicker text-steel-500 blink">Scroll</span>
        </div>
      </div>
    </section>
  );
}
