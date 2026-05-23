import { useEffect } from "react"

import {
  ArrowRight,
  BedDouble,
  Camera,
  CalendarCheck,
  ClipboardCheck,
  KeyRound,
  PackageCheck,
  Search,
  TimerReset,
  WashingMachine,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const quoteUrl = "https://shynlicleaningservice.com/quote"
export const homeTitle = "ShynliAirbnbCleaning.com | Airbnb Turnover Cleaning"
export const homeDescription = "Guest-ready Airbnb turnover cleaning with linens, restocking notes, photo handoff, and host-first availability checks."
export const homeCanonical = "https://shynliairbnbcleaning.com"

const airbnbSiteProof = [
  ["Fast turnover windows", "Tell us checkout and check-in times so we can confirm whether the reset is realistic."],
  ["Photos after the clean", "See the beds, bathrooms, kitchen, and supplies before the next guest arrives."],
  ["Linens and restock notes", "Beds, towels, paper goods, soaps, and owner-closet instructions stay visible."],
]

const airbnbSiteImages = {
  hero: "/airbnb-turnover/bedroom-towels.jpg",
  secondary: "/airbnb-turnover/housekeeper-towels.jpg",
  window: "/airbnb-turnover/clean-bedroom.jpg",
  proof: "/airbnb-turnover/bathroom-towels.jpg",
}

const airbnbSitePillars = [
  {
    icon: TimerReset,
    eyebrow: "Timing",
    title: "Can you handle a same-day turnover?",
    copy: "Share checkout, check-in, parking, and access details first. We confirm the real window before you count on the clean.",
  },
  {
    icon: WashingMachine,
    eyebrow: "Linens",
    title: "Will the beds look ready for guests?",
    copy: "We plan for prepared linens, towel placement, used sets, and the details guests notice the moment they open the bedroom door.",
  },
  {
    icon: PackageCheck,
    eyebrow: "Restocking",
    title: "Are the essentials still stocked?",
    copy: "Tell us what guests should find: paper goods, soaps, coffee, trash bags, dishwasher tabs, and any locked supply closet rules.",
  },
  {
    icon: Camera,
    eyebrow: "Proof",
    title: "How do I know the place is ready?",
    copy: "Ask for photos, notes on visible issues, and a ready-status update so you are not guessing from across town.",
  },
]

const airbnbSiteTimeline = [
  ["Guests leave", "We work from the arrival window, access notes, linen plan, and anything the last stay may have changed."],
  ["The home resets", "Kitchen, bathrooms, floors, beds, trash, supplies, and guest-facing details are handled in one visit."],
  ["You get confirmation", "Photos, supply notes, visible issues, and ready status help you avoid a blind check-in."],
]

const airbnbSiteScope = [
  ["Turnover clean", "Kitchen reset, bathroom sanitizing, floors, surfaces, trash, and the details guests see first."],
  ["Guest setup", "Beds made, towels staged, toiletries checked, and paper goods restocked when you provide them."],
  ["Host notes", "Low supplies, left items, stains, access issues, or maintenance concerns are called out after the visit."],
  ["Deeper upkeep", "Rotating detail tasks help the listing stay fresh instead of slowly drifting below your review standard."],
]

const airbnbSiteReportItems = [
  [Camera, "Room photos", "Kitchen, bathrooms, bedrooms, supplies, and staged arrival moments you can review quickly."],
  [ClipboardCheck, "What needs attention", "Damage, stains, left items, low inventory, access trouble, or maintenance needs."],
  [BedDouble, "Bed and towel status", "Beds made, towels placed, used sets separated, and linen notes kept clear."],
  [CalendarCheck, "Ready for check-in", "A simple status update so you know whether the listing is ready for the next guest."],
] as const

const hostReasons = [
  ["Protect reviews", "Guests remember bathrooms, beds, floors, and whether the space feels like the photos."],
  ["Reduce check-in stress", "A clear turnover plan keeps you from chasing cleaners while the next guest is on the way."],
  ["Handle the small things", "Paper goods, towels, trash, soaps, coffee, and staging details are easy to miss without a list."],
  ["See proof remotely", "Photos and notes help you manage the property even when you cannot walk it yourself."],
  ["Plan repeat visits", "Recurring turnover notes make each clean faster, clearer, and less dependent on memory."],
  ["Know the limits", "Laundry, restocking, same-day timing, and photo reports should be confirmed before the first booking."],
  ["Book with confidence", "A short quote flow captures the details that decide whether the visit can be done well."],
  ["Keep guests comfortable", "The goal is simple: a clean, stocked, calm space that feels ready when the door opens."],
]

const serviceAreaGroups = [
  {
    label: "A-D",
    cities: ["Addison", "Aurora", "Bartlett", "Batavia", "Bolingbrook", "Bristol", "Burr Ridge", "Carol Stream", "Clarendon Hills", "Darien", "Downers Grove"],
  },
  {
    label: "E-L",
    cities: ["Elmhurst", "Geneva", "Glen Ellyn", "Hinsdale", "Homer Glen", "Itasca", "Lemont", "Lisle", "Lockport", "Lombard"],
  },
  {
    label: "M-S",
    cities: ["Montgomery", "Naperville", "North Aurora", "Oak Brook", "Oswego", "Plainfield", "Romeoville", "St. Charles", "Streamwood", "Sugar Grove"],
  },
  {
    label: "V-Y",
    cities: ["Villa Park", "Warrenville", "Wayne", "West Chicago", "Westmont", "Wheaton", "Willowbrook", "Winfield", "Wood Dale", "Woodridge", "Yorkville"],
  },
]

const serviceAreaCities = serviceAreaGroups.flatMap((group) =>
  group.cities.map((city) => ({
    city,
    slug: citySlugFor(city),
  })),
)

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HouseCleaningService"],
      "@id": "https://shynliairbnbcleaning.com/#business",
      name: "ShynliAirbnbCleaning.com",
      url: "https://shynliairbnbcleaning.com",
      telephone: "+1-630-812-7077",
      email: "info@shynli.com",
      priceRange: "$$",
      areaServed: serviceAreaCities.map((city) => ({ "@type": "City", name: `${city.city}, IL` })),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Naperville",
        addressRegion: "IL",
        postalCode: "60566",
        addressCountry: "US",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "SHYNLI LLC",
        url: "https://shynli.com/",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://shynliairbnbcleaning.com/#website",
      name: "ShynliAirbnbCleaning.com",
      url: "https://shynliairbnbcleaning.com",
      publisher: { "@id": "https://shynliairbnbcleaning.com/#business" },
    },
    {
      "@type": "Service",
      "@id": "https://shynliairbnbcleaning.com/#service",
      name: "Airbnb Turnover Cleaning",
      description: homeDescription,
      provider: { "@id": "https://shynliairbnbcleaning.com/#business" },
      serviceType: "Airbnb turnover cleaning",
      areaServed: serviceAreaCities.map((city) => ({ "@type": "City", name: `${city.city}, IL` })),
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          description: "Custom quote based on listing size, condition, timing, access, linens, restocking, and photo handoff.",
        },
        url: quoteUrl,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://shynliairbnbcleaning.com" }],
    },
  ],
}

function citySlugFor(city: string) {
  return city.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-")
}

function routeHref(pathname: string) {
  return pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`
}

function ShynliBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-9 items-center rounded-full border border-[#dddddd] bg-white px-4 text-xs font-black text-[#222222] shadow-[0_6px_18px_rgba(0,0,0,0.05)]">
      {children}
    </span>
  )
}

function useHomeMeta() {
  useEffect(() => {
    document.title = homeTitle

    const existing = document.querySelector('meta[name="description"]')
    if (existing) {
      existing.setAttribute("content", homeDescription)
    } else {
      const meta = document.createElement("meta")
      meta.name = "description"
      meta.content = homeDescription
      document.head.append(meta)
    }

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      canonical.href = homeCanonical
    } else {
      const link = document.createElement("link")
      link.rel = "canonical"
      link.href = homeCanonical
      document.head.append(link)
    }

    const scriptId = "structured-data-home"
    const existingSchema = document.getElementById(scriptId) as HTMLScriptElement | null

    const script = existingSchema ?? document.createElement("script")
    script.id = scriptId
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(homeStructuredData)
    if (!existingSchema) document.head.append(script)
  }, [])
}

function HomeApp() {
  useHomeMeta()

  return (
    <main data-home-page="true" className="min-h-screen overflow-hidden bg-white text-[#222222]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dddddd] bg-white/94 px-4 backdrop-blur-xl md:px-8">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between">
          <a href="/" className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7043f] text-white">
              <KeyRound className="size-5" />
            </span>
            <span className="leading-none">
              <span className="block text-lg font-black">ShynliAirbnbCleaning.com</span>
              <span className="mt-1 block text-xs font-black text-[#d7043f]">Airbnb turnover cleaning</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 rounded-full border border-[#dddddd] bg-white p-1 text-sm font-black text-[#717171] shadow-[0_3px_16px_rgba(0,0,0,0.08)] md:flex" aria-label="Main navigation">
            {[
              ["Turnover", "#turnover"],
              ["Scope", "#scope"],
              ["Proof", "#proof"],
              ["Quote", quoteUrl],
            ].map(([label, href]) => (
              <a key={label} href={href} className="flex min-h-10 items-center rounded-full px-4 transition-colors hover:bg-[#f7f7f7] hover:text-[#222222]">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild className="h-11 rounded-full bg-[#d7043f] px-5 font-black text-white shadow-none hover:bg-[#b51645]">
            <a href={quoteUrl}>Check window</a>
          </Button>
        </div>
      </header>

      <section className="bg-white px-4 pb-12 pt-28 md:px-8 md:pb-18 md:pt-32">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap gap-2">
              <ShynliBadge>For Airbnb and VRBO hosts</ShynliBadge>
              <ShynliBadge>Guest-ready turnover support</ShynliBadge>
            </div>
            <h1 className="max-w-4xl text-[clamp(3.4rem,7.4vw,8.1rem)] font-black leading-[0.84] tracking-normal">
              Shynli Airbnb Cleaning
            </h1>
            <p className="mt-6 max-w-3xl text-[clamp(1.7rem,3.4vw,4rem)] font-black leading-[0.94]">
              Airbnb turnovers before the next guest arrives.
            </p>
            <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-[#717171]">
              Cleaning, linens, restocking, staging, and photo-confirmed handoff for hosts who cannot afford a missed check-in.
            </p>
            <div className="mt-8 grid max-w-3xl overflow-hidden rounded-[32px] border border-[#dddddd] bg-white shadow-[0_6px_24px_rgba(0,0,0,0.14)] md:grid-cols-[1fr_0.86fr_0.78fr_auto] md:rounded-full">
              {[
                ["Where", "Listing ZIP"],
                ["When", "Next turnover"],
                ["Need", "Clean + linens"],
              ].map(([label, value]) => (
                <a key={label} href={quoteUrl} className="min-h-16 border-b border-[#eeeeee] px-6 py-3 transition-colors hover:bg-[#f7f7f7] md:border-b-0 md:border-r">
                  <span className="block text-xs font-black">{label}</span>
                  <span className="mt-1 block text-sm font-bold text-[#717171]">{value}</span>
                </a>
              ))}
              <a href={quoteUrl} className="grid min-h-16 place-items-center px-3" aria-label="Check availability">
                <span className="grid size-12 place-items-center rounded-full bg-[#d7043f] text-white">
                  <Search className="size-5" />
                </span>
                <span className="sr-only">Check availability</span>
              </a>
            </div>
          </div>

          <div className="grid gap-2 md:grid-cols-[1.06fr_0.94fr]">
            <div className="relative min-h-[520px] overflow-hidden rounded-[28px] bg-[#f7f7f7]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${airbnbSiteImages.hero})` }} aria-hidden="true" />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/92 px-4 py-2 text-sm font-black shadow-[0_6px_24px_rgba(0,0,0,0.16)]">
                Guest-ready bedroom
              </div>
            </div>
            <div className="grid gap-2">
              <div className="relative min-h-[255px] overflow-hidden rounded-[28px] bg-[#f7f7f7]">
                <div className="absolute inset-0 bg-cover bg-[50%_44%]" style={{ backgroundImage: `url(${airbnbSiteImages.secondary})` }} aria-hidden="true" />
              </div>
              <div className="rounded-[28px] border border-[#dddddd] bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
                <p className="text-sm font-black text-[#d7043f]">What hosts ask first</p>
                <div className="mt-4 grid gap-3">
                  {airbnbSiteProof.map(([title, copy]) => (
                    <div key={title} className="border-t border-[#eeeeee] pt-3 first:border-t-0 first:pt-0">
                      <p className="text-lg font-black">{title}</p>
                      <p className="mt-1 text-xs font-bold leading-5 text-[#717171]">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="turnover" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="mb-4 text-sm font-black text-[#d7043f]">For back-to-back bookings</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
              The clean is only done when the next guest can walk in.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#717171]">
              Short-term rentals need more than a normal house clean. Timing, linens, supplies, staging, and proof all affect your next review.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {airbnbSitePillars.map(({ icon: Icon, eyebrow, title, copy }) => (
              <div key={title} className="min-h-72 rounded-[24px] border border-[#dddddd] bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
                <Icon className="size-7 text-[#d7043f]" />
                <p className="mt-8 text-xs font-black text-[#717171]">{eyebrow}</p>
                <h3 className="mt-3 text-3xl font-black leading-[1.02]">{title}</h3>
                <p className="mt-4 text-sm font-bold leading-6 text-[#717171]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.86fr] lg:items-center">
          <div className="relative min-h-[620px] overflow-hidden rounded-[28px] bg-[#222222] text-white">
            <div className="absolute inset-0 bg-cover bg-[50%_58%] opacity-72" style={{ backgroundImage: `url(${airbnbSiteImages.window})` }} aria-hidden="true" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,34,34,0.05)_0%,rgba(34,34,34,0.38)_46%,rgba(34,34,34,0.92)_100%)]" />
            <div className="relative z-10 flex min-h-[620px] flex-col justify-end p-6 md:p-9">
              <p className="text-sm font-black text-[#ffb3c1]">The turnover window</p>
              <h2 className="mt-4 max-w-2xl text-5xl font-black leading-[0.92] md:text-7xl">
                Checkout at 11. Check-in at 3.
              </h2>
              <p className="mt-5 max-w-xl text-lg font-bold leading-8 text-white">
                When the window is tight, every detail needs to be known before the cleaner arrives.
              </p>
            </div>
          </div>
          <div className="grid gap-8">
            {airbnbSiteTimeline.map(([title, copy], index) => (
              <div key={title} className="grid grid-cols-[56px_1fr] gap-5 border-t border-[#dddddd] pt-7 first:border-t-0 first:pt-0">
                <span className="text-3xl font-black text-[#d7043f]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-3xl font-black">{title}</h3>
                  <p className="mt-3 text-base font-bold leading-7 text-[#717171]">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="scope" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[0.76fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black text-[#d7043f]">What can be included</p>
              <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
                Cleaning, setup, and notes in one turnover.
              </h2>
            </div>
            <p className="text-lg font-bold leading-8 text-[#717171]">
              Choose what the property needs before the visit, then confirm what Shynli can support for the route, timing, and listing.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {airbnbSiteScope.map(([title, copy]) => (
              <div key={title} className="rounded-[24px] border border-[#dddddd] bg-white p-6 shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
                <h3 className="text-3xl font-black leading-tight">{title}</h3>
                <p className="mt-5 text-sm font-bold leading-6 text-[#717171]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="proof" className="bg-[#222222] px-4 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="mb-4 text-sm font-black text-[#ffb3c1]">After the cleaner leaves</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
              Know what happened without driving over.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-white">
              A quick handoff helps you catch low supplies, visible issues, and readiness questions before they turn into guest messages.
            </p>
            <div className="relative mt-8 min-h-72 overflow-hidden rounded-[28px] bg-white/8">
              <div className="absolute inset-0 bg-cover bg-center opacity-82" style={{ backgroundImage: `url(${airbnbSiteImages.proof})` }} aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(34,34,34,0.86),rgba(34,34,34,0))] p-5 pt-20">
                <p className="text-sm font-black text-white">Bathroom and towel check</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {airbnbSiteReportItems.map(([Icon, title, copy]) => (
              <div key={String(title)} className="min-h-56 rounded-[24px] border border-white/12 bg-white/7 p-6">
                <Icon className="size-7 text-[#ffb3c1]" />
                <h3 className="mt-7 text-2xl font-black">{String(title)}</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-white">{String(copy)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.74fr_1fr]">
          <div>
            <p className="mb-4 text-sm font-black text-[#d7043f]">Why hosts book</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
              Fewer surprises between guests.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {hostReasons.map(([name, move]) => (
              <div key={name} className="rounded-[24px] border border-[#dddddd] bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.05)]">
                <p className="text-sm font-black text-[#d7043f]">{name}</p>
                <p className="mt-3 text-xl font-black leading-tight">{move}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="areas" className="border-y border-[#dddddd] bg-white px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-[0.76fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-sm font-black text-[#d7043f]">Service areas</p>
              <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
                Airbnb turnover help across the Shynli service map.
              </h2>
            </div>
            <p className="text-lg font-bold leading-8 text-[#717171]">
              Start with your listing ZIP. We confirm whether the timing, route, and turnover scope work before you rely on the booking.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {serviceAreaGroups.map((group) => (
              <div key={group.label} className="rounded-[24px] border border-[#dddddd] bg-[#f7f7f7] p-5">
                <p className="text-sm font-black text-[#d7043f]">{group.label}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.cities.map((city) => (
                    <a
                      key={city}
                      href={routeHref(`/service-areas/${citySlugFor(city)}`)}
                      className="inline-flex min-h-9 items-center rounded-full border border-[#dddddd] bg-white px-3 text-sm font-black text-[#222222] transition-colors hover:border-[#d7043f] hover:text-[#d7043f]"
                    >
                      {city}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="bg-[#f7f7f7] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-black text-[#d7043f]">Check availability</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
              Start with the details that decide the clean.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#717171]">
              Send the ZIP, turnover date, guest times, and what you need handled. Shynli can confirm the route and scope before you rely on the booking.
            </p>
          </div>
          <Card className="rounded-[28px] border-[#dddddd] bg-white shadow-[0_12px_48px_rgba(0,0,0,0.10)]">
            <CardContent className="p-5 md:p-6">
              <form action={quoteUrl} method="get" className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-black">
                    Listing ZIP
                    <Input name="zip" inputMode="numeric" placeholder="60540" className="h-12 rounded-full border-[#dddddd] bg-white font-bold" />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
                    Next turnover date
                    <Input
                      name="turnover_date"
                      type="text"
                      inputMode="numeric"
                      placeholder="05/13/2026"
                      pattern="(0[1-9]|1[0-2])/(0[1-9]|[12][0-9]|3[01])/[0-9]{4}"
                      title="Use MM/DD/YYYY, for example 05/13/2026"
                      className="h-12 rounded-full border-[#dddddd] bg-white font-bold"
                    />
                  </label>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-black">
                    Checkout time
                    <Input
                      name="checkout_time"
                      type="text"
                      inputMode="text"
                      placeholder="8:00 PM"
                      pattern="(0?[1-9]|1[0-2]):[0-5][0-9] ?(AM|PM|am|pm)"
                      title="Use 12-hour time with AM or PM, for example 8:00 PM"
                      className="h-12 rounded-full border-[#dddddd] bg-white font-bold"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-black">
                    Check-in time
                    <Input
                      name="checkin_time"
                      type="text"
                      inputMode="text"
                      placeholder="4:00 PM"
                      pattern="(0?[1-9]|1[0-2]):[0-5][0-9] ?(AM|PM|am|pm)"
                      title="Use 12-hour time with AM or PM, for example 4:00 PM"
                      className="h-12 rounded-full border-[#dddddd] bg-white font-bold"
                    />
                  </label>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {["Cleaning", "Linens", "Restock"].map((item) => (
                    <button key={item} type="button" className="min-h-12 rounded-full border border-[#dddddd] bg-white px-3 text-sm font-black transition-colors first:border-[#d7043f] first:bg-[#d7043f] first:text-white hover:border-[#d7043f]">
                      {item}
                    </button>
                  ))}
                </div>
                <Button type="submit" className="h-13 rounded-full bg-[#d7043f] text-base font-black text-white shadow-none hover:bg-[#b51645]">
                  Check host availability
                  <ArrowRight />
                </Button>
                <p className="text-sm font-bold leading-6 text-[#717171]">
                  Final availability depends on location, timing, property size, linen needs, restocking, access, and whether the turnover window is realistic.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-[#dddddd] bg-[#f7f7f7] px-4 py-12 text-[#222222] md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1.7fr]">
            <div>
              <a href="/" className="flex min-h-11 items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-[#d7043f] text-white">
                  <KeyRound className="size-5" />
                </span>
                <span className="leading-none">
                  <span className="block text-xl font-black">ShynliAirbnbCleaning.com</span>
                  <span className="mt-1 block text-sm font-black text-[#717171]">Turnovers for short-term rental hosts</span>
                </span>
              </a>
              <p className="mt-6 max-w-md text-base font-bold leading-7 text-[#717171]">
                Guest-ready cleaning, linens, restocking notes, and photo handoff for hosts who need the next check-in to feel calm.
              </p>
              <Button asChild className="mt-6 h-12 rounded-full bg-[#d7043f] px-6 font-black text-white shadow-none hover:bg-[#b51645]">
                <a href={quoteUrl}>
                  Check availability
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-black">Turnover help</h3>
                <div className="mt-4 grid gap-3 text-sm font-bold text-[#717171]">
                  <a href="#turnover" className="hover:text-[#222222]">Same-day windows</a>
                  <a href="#scope" className="hover:text-[#222222]">Cleaning scope</a>
                  <a href="#proof" className="hover:text-[#222222]">Photo handoff</a>
                  <a href={quoteUrl} className="hover:text-[#222222]">Availability check</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black">Hosts ask</h3>
                <div className="mt-4 grid gap-3 text-sm font-bold text-[#717171]">
                  <a href="#turnover" className="hover:text-[#222222]">Can you make check-in?</a>
                  <a href="#scope" className="hover:text-[#222222]">Are linens included?</a>
                  <a href="#scope" className="hover:text-[#222222]">Can you restock supplies?</a>
                  <a href="#proof" className="hover:text-[#222222]">Will I get photos?</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black">Shynli</h3>
                <div className="mt-4 grid gap-3 text-sm font-bold text-[#717171]">
                  <a href="https://shynli.com/" className="hover:text-[#222222]">Main Shynli site</a>
                  <a href="#scope" className="hover:text-[#222222]">Airbnb cleaning</a>
                  <a href="#turnover" className="hover:text-[#222222]">Short-term rentals</a>
                  <a href="/service-areas/" className="hover:text-[#222222]">Service areas</a>
                  <a href={quoteUrl} className="hover:text-[#222222]">Contact</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-[#dddddd] pt-6 text-sm font-bold text-[#717171] md:flex-row md:items-center md:justify-between">
            <p>© 2026 ShynliAirbnbCleaning.com. A Shynli service concept.</p>
            <div className="flex flex-wrap gap-4">
              <a href="/privacy-policy/" className="hover:text-[#222222]">Privacy</a>
              <a href="/terms-of-service/" className="hover:text-[#222222]">Terms</a>
              <a href="/cancellation-policy/" className="hover:text-[#222222]">Cancellation</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default HomeApp
