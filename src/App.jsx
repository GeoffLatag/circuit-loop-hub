import Catalog from "./components/Catalog";

const features = [
  {
    number: "01",
    title: "Inspect",
    description:
      "Components are visually inspected and evaluated before being considered for resale.",
  },
  {
    number: "02",
    title: "Test & Document",
    description:
      "Functional test results, component condition, and known limitations are recorded.",
  },
  {
    number: "03",
    title: "Browse & Inquire",
    description:
      "Customers explore available units and contact Circuit Loop Hub to inquire about purchasing.",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-[#070D1B] text-white">

      {/* NAVIGATION */}
      <header className="relative z-20 border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

  {/* LOGO */}
  <a href="#home" className="flex items-center gap-3">

    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
      <span className="text-lg font-black">CL</span>
    </div>

    <div>
      <h1 className="text-lg font-bold tracking-tight">
        Circuit Loop <span className="text-blue-400">Hub</span>
      </h1>

      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
        Electronics Reimagined
      </p>
    </div>

  </a>


  {/* NAVIGATION LINKS */}
  <div className="hidden items-center gap-10 text-sm font-medium text-slate-300 md:flex">

    <a
      href="#home"
      className="transition hover:text-blue-400"
    >
      Home
    </a>

    <a
      href="#how-it-works"
      className="transition hover:text-blue-400"
    >
      How It Works
    </a>

    <a
      href="#catalog"
      className="transition hover:text-blue-400"
    >
      Catalog
    </a>

  </div>


  {/* CONTACT BUTTON */}
  <a
    href="https://m.me/61595870237583"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-5 py-3 text-sm font-semibold text-blue-300 transition hover:border-blue-400 hover:bg-blue-500/20"
  >
    Contact Us ↗
  </a>

</nav>
      </header>


      {/* HERO SECTION */}
      <main id="home">

        <section className="relative overflow-hidden">

          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />

          <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">

            {/* HERO TEXT */}
            <div>

              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">

                <span className="h-2 w-2 rounded-full bg-blue-400" />

                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-300">
                  Giving Electronics a Second Life
                </span>

              </div>

              <h2 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">

                Better Value.

                <br />

                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Smarter Builds.
                </span>

              </h2>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400">
                Discover affordable pre-owned electronic components
                with documented testing results, transparent
                condition information, and individual digital
                component passports.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <a
                  href="#catalog"
                  className="rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  Explore Components →
                </a>

                <a
                  href="#how-it-works"
                  className="rounded-xl border border-white/15 px-7 py-4 text-sm font-semibold text-slate-200 transition hover:border-blue-400/50 hover:bg-white/5"
                >
                  How It Works
                </a>

              </div>

              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-8 text-sm text-slate-400">

                <span>✓ Component-Level Records</span>

                <span>✓ Transparent Testing</span>

                <span>✓ Circular Electronics</span>

              </div>

            </div>


            {/* PRODUCT PASSPORT PREVIEW */}
            <div className="relative mx-auto w-full max-w-[460px]">

              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-blue-600/20 to-cyan-400/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-[#101B30] shadow-2xl">

                {/* CARD HEADER */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                      Component Passport
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Individual Unit Record
                    </p>
                  </div>

                  <div className="rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-400">
                    QA Preview
                  </div>

                </div>


                {/* ELECTRONICS ILLUSTRATION */}
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-[#112C50] via-[#10213D] to-[#081426]">

                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />

                  <svg
                    viewBox="0 0 240 180"
                    className="relative h-48 w-64 drop-shadow-2xl"
                    aria-hidden="true"
                  >

                    <rect
                      x="45"
                      y="20"
                      width="150"
                      height="140"
                      rx="15"
                      fill="#123E55"
                      stroke="#38BDF8"
                      strokeWidth="3"
                    />

                    <rect
                      x="85"
                      y="50"
                      width="70"
                      height="65"
                      rx="7"
                      fill="#07111F"
                      stroke="#60A5FA"
                      strokeWidth="2"
                    />

                    <text
                      x="120"
                      y="85"
                      textAnchor="middle"
                      fill="#93C5FD"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      MCU
                    </text>

                    {Array.from({ length: 6 }).map((_, i) => (
                      <g key={i}>

                        <rect
                          x="35"
                          y={35 + i * 20}
                          width="10"
                          height="8"
                          rx="2"
                          fill="#94A3B8"
                        />

                        <rect
                          x="195"
                          y={35 + i * 20}
                          width="10"
                          height="8"
                          rx="2"
                          fill="#94A3B8"
                        />

                      </g>
                    ))}

                    <circle cx="65" cy="40" r="5" fill="#22C55E" />
                    <circle cx="175" cy="140" r="5" fill="#38BDF8" />

                    <path
                      d="M65 80H85 M155 80H175 M120 115V140"
                      stroke="#38BDF8"
                      strokeWidth="3"
                      fill="none"
                    />

                  </svg>

                </div>


                {/* PRODUCT INFORMATION */}
                <div className="p-6">

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Microcontroller
                      </p>

                      <h3 className="mt-2 text-xl font-bold">
                        Arduino Uno R3
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">
                        Unit ID: CLH-ARD-001
                      </p>
                    </div>

                    <div className="text-right">
  <p className="text-lg font-bold text-blue-400">
    Grade B
  </p>

  <p className="mt-1 text-xs text-slate-500">
    Sample Unit
  </p>
</div>

                  </div>

                  <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">

                    <span className="text-xs text-slate-400">
                      Digital Documentation
                    </span>

                    <span className="text-xs font-semibold text-blue-400">
                      Documentation Preview
                    </span>

                  </div>

                  <p className="mt-4 text-center text-xs text-slate-500">
                    Interface preview · Sample inventory
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="bg-white px-6 py-24 text-slate-900"
        >

          <div className="mx-auto max-w-7xl">

            <div className="max-w-2xl">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Our Process
              </p>

              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Every component has a story.
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-500">
                Circuit Loop Hub focuses on making pre-owned
                electronics more transparent and accessible
                through individual inspection and documentation.
              </p>

            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">

              {features.map((feature) => (

                <div
                  key={feature.number}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:border-blue-200 hover:shadow-lg"
                >

                  <div className="text-sm font-bold text-blue-600">
                    {feature.number}
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-500">
                    {feature.description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>


      {/* INTERACTIVE PRODUCT CATALOG */}
      <Catalog />

      </main>


      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#070D1B] px-6 py-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">

          <div>
            <p className="font-bold">
              Circuit Loop <span className="text-blue-400">Hub</span>
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Giving Electronics a Second Life.
            </p>
          </div>

          <p className="text-xs text-slate-500">
            Built for students. Driven by sustainability.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default App;