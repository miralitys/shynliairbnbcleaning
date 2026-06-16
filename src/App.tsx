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
import { hostProblemGuideHub, hostProblemGuides, type HostProblemGuide } from "@/host-problem-guides"
import { airbnbSiteImages, ResponsiveSiteImage } from "@/site-images"

const quoteUrl = "https://shynlicleaningservice.com/quote"

const airbnbSiteProof = [
  ["Fast turnover windows", "Tell us checkout and check-in times so we can confirm whether the reset is realistic."],
  ["Photos after the clean", "See the beds, bathrooms, kitchen, and supplies before the next guest arrives."],
  ["Linens and restock notes", "Beds, towels, paper goods, soaps, and owner-closet instructions stay visible."],
]

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
    slug: city.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-"),
    group: group.label,
  })),
)

const legalPages = {
  "/privacy-policy": {
    title: "Privacy Policy",
    updated: "Adapted from Shynli Cleaning policy, last reviewed February 16, 2026",
    intro: "This policy explains how ShynliAirbnbCleaning.com and SHYNLI LLC may collect, use, protect, and share information when you request a quote, book cleaning services, communicate with us, or use this website.",
    sections: [
      {
        title: "Information we collect",
        items: [
          "Contact details such as name, phone, email, service address, and billing details when needed.",
          "Turnover details such as listing ZIP, property type, rooms, bathrooms, checkout/check-in timing, linen needs, restocking notes, access instructions, parking, building rules, and special requests.",
          "Communications sent by form, phone, SMS, or email.",
          "Website usage data such as device type, pages visited, clicks, referring URLs, cookies, analytics, and advertising measurement data when enabled.",
          "Service notes, access issues, quality-control photos, and completion notes when used to perform or review service.",
        ],
      },
      {
        title: "How we use information",
        items: [
          "To provide quotes, schedule service, coordinate access, perform cleaning, and communicate about bookings.",
          "To process payments, manage invoices, prevent fraud, and handle deposits or cancellation fees when applicable.",
          "To support quality control, dispute review, training, operational improvement, and customer support.",
          "To maintain records of communication preferences, consent, opt-outs, and legal compliance.",
        ],
      },
      {
        title: "Photos, cookies, and vendors",
        items: [
          "Before/after or completion photos may be used for quality control, dispute review, and service confirmation. Marketing use requires separate permission.",
          "Cookies and similar tools may be used for website function, analytics, advertising measurement, and performance improvement.",
          "Service providers may include scheduling/CRM tools, payment processors, SMS/email providers, hosting, analytics, and advertising partners.",
        ],
      },
      {
        title: "Your choices",
        items: [
          "You can contact us to request access, correction, deletion, or marketing opt-out where applicable.",
          "You can manage cookies through browser settings and available cookie controls.",
          "Marketing SMS can be opted out by replying STOP where SMS marketing is used. Service messages may still be sent for active bookings.",
        ],
      },
      {
        title: "Contact",
        items: [
          "Email: info@shynli.com",
          "Phone: +1(630)812-7077",
          "Mailing address: P.O. Box 2492, Naperville IL 60566",
        ],
      },
    ],
  },
  "/terms-of-service": {
    title: "Terms of Service",
    updated: "Adapted from Shynli Cleaning terms, last reviewed February 16, 2026",
    intro: "These terms summarize the rules that apply when you request a quote, approve an estimate, schedule service, pay an invoice, or use cleaning services provided by SHYNLI LLC through ShynliAirbnbCleaning.com.",
    sections: [
      {
        title: "Service scope",
        items: [
          "Cleaning is provided only according to the confirmed service level, checklist, estimate, invoice, or written booking details.",
          "Short-term rental turnover work such as linens, restocking, dishwashing, exterior areas, guest setup, or photo handoff is included only when listed in the confirmed scope.",
          "Extra work may require approval, additional time, and additional charges.",
          "We do not provide restoration, hazardous cleanup, pest treatment, mold remediation, biohazard cleanup, heavy hauling, or specialty remediation unless expressly agreed in writing.",
        ],
      },
      {
        title: "Host responsibilities",
        items: [
          "Provide accurate property details, condition, rooms, bathrooms, access instructions, parking, building rules, checkout/check-in window, and special requests.",
          "Make sure the property is available, vacant, safe, and accessible during the scheduled window.",
          "Secure pets, valuables, fragile items, and personal belongings before service.",
          "Disclose cameras or recording devices, and do not use undisclosed audio recording during service.",
        ],
      },
      {
        title: "Access, timing, and limits",
        items: [
          "Arrival times are service windows and can be affected by traffic, weather, building access, previous jobs, or property conditions.",
          "If access is not available, instructions are wrong, guests have not checked out, or the team cannot enter, the appointment may be treated as no-show.",
          "Results depend on property condition, materials, wear, and prior maintenance. Perfect restoration or removal of old stains/odors is not guaranteed.",
          "Liability for delays, guest refunds, lost rental income, or business interruption may be limited to the maximum extent allowed by law.",
        ],
      },
      {
        title: "Quality, photos, and claims",
        items: [
          "If something is missed, contact us promptly with photos and a description. Re-clean, spot correction, credit, or discount may be offered depending on the situation.",
          "Before/after photos may be used for quality control and dispute review, with reasonable effort to avoid sensitive items.",
          "Damage or missing-item claims should be reported promptly and supported with reasonable detail.",
          "Pre-existing damage, normal wear and tear, fragile items left unsecured, and actions of guests or third parties may be excluded.",
        ],
      },
      {
        title: "Payments, cancellations, and disputes",
        items: [
          "Payment is due according to the invoice, booking confirmation, or approved estimate.",
          "A valid payment method may be required to reserve a time slot and may be charged for applicable cancellation or no-show fees.",
          "Unpaid balances may suspend future service and may be pursued through lawful collection.",
          "Disputes may be subject to notice, informal resolution, arbitration, class-action waiver, and Illinois law as described in the full Shynli terms.",
        ],
      },
      {
        title: "Contact",
        items: [
          "Email: info@shynli.com",
          "Phone: +1(630)812-7077",
          "Legal notices: P.O. Box 2492, Naperville IL 60566",
        ],
      },
    ],
  },
  "/cancellation-policy": {
    title: "Cancellation Policy",
    updated: "Adapted from Shynli Cleaning policy, last reviewed February 13, 2026",
    intro: "This policy applies to cleaning bookings with SHYNLI LLC through ShynliAirbnbCleaning.com. All timing is based on America/Chicago Central Time.",
    sections: [
      {
        title: "How to cancel or reschedule",
        items: [
          "Reply to your confirmation or reminder SMS.",
          "Email info@shynli.com.",
          "Call or text +1(630)812-7077.",
          "Requests are effective when received. Processing may be delayed outside normal operating hours.",
        ],
      },
      {
        title: "Cancellation or reschedule fees",
        items: [
          "More than 48 hours before appointment: $0.",
          "24-48 hours before appointment: $50 flat fee.",
          "12-24 hours before appointment: 50% of booked price.",
          "Less than 12 hours before appointment, same-day cancellation, or same-day reschedule: 100% of booked price.",
        ],
      },
      {
        title: "No-show or no-access",
        items: [
          "A booking may be charged 100% if the team arrives but cannot enter because of locked doors, wrong codes, missing keys, building/security denial, blocked access, guests not checked out, or no vacant window.",
          "If entry cannot be obtained within 15 minutes due to access issues, the appointment may be treated as no-show.",
          "If you ask the team to wait beyond 15 minutes and we can stay, waiting time may be billed at $45/hour, prorated.",
        ],
      },
      {
        title: "Rebooking, refunds, and delays",
        items: [
          "If we successfully rebook the cancelled/rescheduled time slot, cancellation fees may be reduced by recovered labor revenue, excluding non-refundable dispatch or processing costs.",
          "Refunds due from deposits or prepayments are usually returned to the original payment method, subject to bank and processor timelines.",
          "If we arrive more than 60 minutes late for reasons within our reasonable control and cannot complete the booked scope, we may reschedule at no charge or issue a proportional credit.",
        ],
      },
      {
        title: "Safety or unsuitable conditions",
        items: [
          "If service is refused or terminated due to unsafe conditions, prohibited conditions, access problems, or conduct issues, amounts related to reserved labor time, dispatch, travel, costs incurred, or work performed may be retained or invoiced where allowed by law.",
        ],
      },
    ],
  },
} satisfies Record<string, { title: string; updated: string; intro: string; sections: { title: string; items: string[] }[] }>

function ShynliBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-9 items-center rounded-full border border-[#dddddd] bg-white px-4 text-xs font-black text-[#222222] shadow-[0_6px_18px_rgba(0,0,0,0.05)]">
      {children}
    </span>
  )
}

function LegalPage({ page, pathname }: { page: (typeof legalPages)[keyof typeof legalPages]; pathname: string }) {
  useEffect(() => {
    document.title = `${page.title} | ShynliAirbnbCleaning.com`
    const legalDescription = `${page.title} for ShynliAirbnbCleaning.com, covering host quote requests, booking rules, service expectations, and customer choices.`

    const existing = document.querySelector('meta[name="description"]')
    if (existing) {
      existing.setAttribute("content", legalDescription)
    } else {
      const meta = document.createElement("meta")
      meta.name = "description"
      meta.content = legalDescription
      document.head.append(meta)
    }

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const canonicalHref = canonicalFor(pathname)
    if (canonical) {
      canonical.href = canonicalHref
    } else {
      const link = document.createElement("link")
      link.rel = "canonical"
      link.href = canonicalHref
      document.head.append(link)
    }
  }, [page.title, pathname])
  useStructuredData(`legal-${page.title}`, [
    businessSchema(),
    breadcrumbSchema([
      ["Home", "https://shynliairbnbcleaning.com"],
      [page.title, canonicalFor(pathname)],
    ]),
  ])

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <header className="border-b border-[#dddddd] px-4 py-5 md:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <a href="/" className="flex min-h-11 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7043f] text-white">
              <KeyRound className="size-5" />
            </span>
            <span className="font-black">ShynliAirbnbCleaning.com</span>
          </a>
          <a href="/" className="inline-flex min-h-11 items-center text-sm font-black text-[#717171] hover:text-[#222222]">
            Back to home
          </a>
        </div>
      </header>

      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-black text-[#d7043f]">{page.updated}</p>
          <h1 className="mt-4 text-5xl font-black leading-[0.96] md:text-7xl">{page.title}</h1>
          <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#717171]">{page.intro}</p>

          <div className="mt-10 grid gap-5">
            {page.sections.map((section) => (
              <Card key={section.title} className="rounded-[24px] border-[#dddddd] shadow-none">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-black">{section.title}</h2>
                  <ul className="mt-5 grid gap-3 text-base font-bold leading-7 text-[#717171]">
                    {section.items.map((item) => (
                      <li key={item} className="grid grid-cols-[10px_1fr] gap-3">
                        <span className="mt-3 size-1.5 rounded-full bg-[#d7043f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-[24px] bg-[#f7f7f7] p-5 text-sm font-bold leading-6 text-[#717171]">
            This page is a practical website version of the Shynli legal layer. If there is a conflict between this summary and a signed estimate, invoice, written addendum, or the controlling Shynli legal terms, the controlling document governs to the extent allowed by law.
          </div>
        </div>
      </section>
      <SeoFooter />
    </main>
  )
}

type SeoPageData = {
  path: string
  title: string
  description: string
  eyebrow: string
  headline: string
  intro: string
  promises: string[]
  sections: [string, string][]
}

const coreSeoHubPages: SeoPageData[] = [
  {
    path: "/airbnb-cleaning",
    title: "Airbnb Cleaning",
    description: "Airbnb cleaning for hosts who need a guest-ready home, clear timing, linen notes, restocking checks, and photo confirmation before check-in.",
    eyebrow: "Airbnb cleaning",
    headline: "Airbnb cleaning that helps protect the next review.",
    intro: "Guests notice bathrooms, beds, floors, and whether the home feels like the photos. Shynli helps hosts reset the listing between stays with a clear scope, realistic arrival window, and proof after the clean.",
    promises: ["Guest-facing rooms reset before arrival", "Linen and towel details kept visible", "Photo handoff available after the visit"],
    sections: [
      ["What is included?", "Kitchen, bathrooms, floors, surfaces, trash, beds, towels, and guest-facing details are handled according to the confirmed turnover scope."],
      ["How does timing work?", "Send checkout, check-in, access, parking, and listing size. We confirm whether the turnover window is realistic before you rely on it."],
      ["What makes it host-friendly?", "You get clearer communication around low supplies, left items, stains, access issues, and whether the property is ready for the next guest."],
    ],
  },
  {
    path: "/short-term-rental-cleaning",
    title: "Short-Term Rental Cleaning",
    description: "Short-term rental cleaning for hosts who need reliable turnovers, restocking visibility, guest-ready beds, and ready-status updates.",
    eyebrow: "Short-term rental cleaning",
    headline: "Short-term rental cleaning built around guest arrivals.",
    intro: "A regular house clean and a rental turnover are not the same job. Your cleaner needs to understand arrival windows, guest expectations, supply checks, access notes, and the little details that shape reviews.",
    promises: ["Turnover-first checklist", "Supply and issue notes", "Repeatable plan for recurring stays"],
    sections: [
      ["Why hosts use it", "A repeatable rental clean keeps the home from drifting below your listing photos as bookings stack up."],
      ["What we check", "Bathrooms, bedrooms, kitchen, floors, trash, towels, toiletries, visible damage, low inventory, and anything guests will notice first."],
      ["Best fit", "Homes, condos, townhomes, guest suites, and furnished rentals where the next guest arrival matters more than a loose cleaning window."],
    ],
  },
  {
    path: "/vacation-rental-cleaning",
    title: "Vacation Rental Cleaning",
    description: "Vacation rental cleaning with guest setup, turnover timing, restocking notes, and photo-ready details for hosts around the Shynli service map.",
    eyebrow: "Vacation rental cleaning",
    headline: "Vacation rental cleaning that makes the stay feel expected.",
    intro: "Vacation guests arrive with fresh eyes. Shynli focuses on the parts of the home that shape first impressions: clean bathrooms, calm bedrooms, a reset kitchen, staged towels, and supplies that do not feel forgotten.",
    promises: ["Arrival-ready rooms", "Cleaner guest setup", "Notes when something needs attention"],
    sections: [
      ["Guest-first reset", "The clean is planned around what a guest sees when they walk in, not just what looks finished from a distance."],
      ["Between-stay care", "We can help watch for low supplies, left items, stains, odors, and maintenance concerns before they become review problems."],
      ["Owner visibility", "Photo confirmation and simple notes help you manage the property even when you are not nearby."],
    ],
  },
  {
    path: "/airbnb-turnover-cleaning",
    title: "Airbnb Turnover Cleaning",
    description: "Airbnb turnover cleaning for same-day and recurring guest resets with beds, bathrooms, kitchen, trash, restocking notes, and photo handoff.",
    eyebrow: "Airbnb turnover cleaning",
    headline: "Turnovers planned around the clock, not wishful thinking.",
    intro: "A same-day turnover only works when the route, access, property size, linen plan, and guest timing all fit. Shynli starts by checking the real window, then resets the home for arrival.",
    promises: ["Checkout-to-check-in planning", "Beds, towels, trash, kitchen, and bathrooms", "Ready-status confirmation"],
    sections: [
      ["Same-day reality check", "Before a tight booking, we look at checkout, check-in, access, parking, laundry expectations, and the size of the property."],
      ["What happens during the visit", "The team works through guest-facing priorities first so the listing feels ready when the next door code is used."],
      ["After the clean", "Ask for photos and notes so you can see the condition, catch problems quickly, and avoid blind check-ins."],
    ],
  },
  {
    path: "/vrbo-cleaning",
    title: "VRBO Cleaning",
    description: "VRBO cleaning for furnished rentals and host-managed stays, with turnover checklists, restocking notes, and photo confirmation.",
    eyebrow: "VRBO cleaning",
    headline: "VRBO cleaning for homes guests expect to feel complete.",
    intro: "Whether the booking comes through VRBO, Airbnb, or another platform, the promise is the same: the next guest should find a clean, stocked, calm home that matches the listing.",
    promises: ["Platform-neutral turnover support", "Guest-ready cleaning scope", "Issue notes after service"],
    sections: [
      ["For host-managed homes", "Shynli can follow your house notes, owner-closet instructions, supply plan, and check-in priorities."],
      ["For recurring rentals", "A stable turnover rhythm helps protect reviews, reduce emergency texts, and keep the home from slowly falling behind."],
      ["For remote owners", "Photos and notes make it easier to spot what needs attention without driving to the property."],
    ],
  },
  {
    path: "/airbnb-cleaning-cost",
    title: "Airbnb Cleaning Cost",
    description: "Airbnb cleaning cost factors explained for hosts, including size, condition, timing, linens, restocking, photos, and same-day turnover pressure.",
    eyebrow: "Pricing clarity",
    headline: "What affects Airbnb cleaning cost?",
    intro: "The right price depends on the work, not just the bedroom count. Same-day timing, property condition, linens, restocking, parking, access, and photo handoff can all change the real labor needed.",
    promises: ["Clear quote factors", "No mystery around timing", "Scope matched to guest expectations"],
    sections: [
      ["Main cost drivers", "Size, bathrooms, kitchen condition, floors, trash, linens, restocking, stains, guest mess, access difficulty, and how tight the turnover window is."],
      ["Why cheap turnovers can get expensive", "A rushed or under-scoped clean can lead to re-cleans, refunds, review damage, and host stress right before check-in."],
      ["How to get a better quote", "Send the listing ZIP, photos when available, room count, checkout/check-in times, laundry expectations, and what guests should find stocked."],
    ],
  },
  {
    path: "/airbnb-cleaning-checklist",
    title: "Airbnb Cleaning Checklist",
    description: "Airbnb cleaning checklist for hosts covering bathrooms, kitchen, bedrooms, linens, supplies, photos, and guest-ready turnover notes.",
    eyebrow: "Host checklist",
    headline: "A practical Airbnb cleaning checklist for better turnovers.",
    intro: "The best checklist is not long for the sake of being long. It should protect the guest experience: clean bathrooms, reset beds, clear kitchen, stocked basics, no trash, and a final look at what could hurt the next review.",
    promises: ["Bathrooms and kitchen first", "Beds and towels guest-ready", "Supplies and issues visible"],
    sections: [
      ["Before the clean", "Confirm access, parking, checkout time, check-in time, linen location, supplies, trash rules, and anything the last guest reported."],
      ["During the turnover", "Reset bathrooms, kitchen, bedrooms, floors, surfaces, trash, towels, paper goods, soaps, coffee, and visible guest-facing details."],
      ["Before check-in", "Review photos, low-supply notes, stains, left items, damage, odors, and ready status before the next guest arrives."],
    ],
  },
  {
    path: "/airbnb-cleaning-for-hosts",
    title: "Airbnb Cleaning for Hosts",
    description: "Airbnb cleaning for hosts who want fewer check-in surprises, better turnover notes, recurring cleaning support, and guest-ready homes.",
    eyebrow: "For hosts",
    headline: "Cleaning support for hosts who cannot babysit every turnover.",
    intro: "Hosting gets easier when cleaning is not a mystery between checkout and check-in. Shynli helps turn the turnover into a repeatable system with scope, timing, supplies, and confirmation.",
    promises: ["Less last-minute guessing", "Cleaner handoff after each visit", "Recurring notes for repeat properties"],
    sections: [
      ["For local hosts", "Spend less time checking basics and more time improving the listing, guest communication, and booking quality."],
      ["For remote hosts", "Use photos and notes to see what changed after each stay without being physically present."],
      ["For growing portfolios", "A consistent turnover process keeps each property easier to manage as bookings increase."],
    ],
  },
  {
    path: "/photo-handoff-cleaning",
    title: "Photo Handoff Cleaning",
    description: "Photo handoff cleaning for Airbnb hosts who want room photos, supply notes, issue alerts, and ready-status confirmation after turnovers.",
    eyebrow: "Photo handoff",
    headline: "See the turnover before the next guest does.",
    intro: "A photo handoff helps hosts catch missed details, low supplies, stains, damage, and guest setup questions before check-in. It is especially helpful when you are managing the listing remotely.",
    promises: ["Room photos on request", "Supply and issue notes", "Ready-status update"],
    sections: [
      ["What photos can cover", "Bedrooms, bathrooms, kitchen, towels, staged supplies, trash areas, entry condition, and any visible concern."],
      ["Why it matters", "Photos reduce the gap between 'the clean is done' and 'the listing is ready for a real guest'."],
      ["When to request it", "Use photo handoff for remote management, same-day turnovers, new cleaners, high-value stays, and properties with frequent back-to-back bookings."],
    ],
  },
  {
    path: "/linen-and-restocking-service",
    title: "Linen and Restocking Service",
    description: "Linen and restocking support for Airbnb turnovers, including beds, towels, paper goods, toiletries, coffee, and host supply notes.",
    eyebrow: "Linens and restock",
    headline: "Beds, towels, and supplies should not be the weak point.",
    intro: "Guests often judge a rental by the details they touch first: sheets, towels, soap, paper goods, coffee, and whether the home feels prepared. Shynli can include linen and restocking notes in the confirmed scope.",
    promises: ["Beds made for arrival", "Towels staged clearly", "Low supplies called out"],
    sections: [
      ["Linen planning", "Confirm where clean linens are stored, where used sets go, how beds should be made, and what towel setup guests expect."],
      ["Restocking notes", "Paper goods, soaps, trash bags, dishwasher tabs, coffee, and other guest basics can be checked when supplies are available."],
      ["Host control", "You decide the house standard. We help make it repeatable instead of relying on memory each turnover."],
    ],
  },
  {
    path: "/faq",
    title: "Airbnb Cleaning FAQ",
    description: "Answers to common Airbnb cleaning questions about timing, same-day turnovers, linens, restocking, photo handoff, service areas, and quotes.",
    eyebrow: "FAQ",
    headline: "Questions hosts usually ask before the first clean.",
    intro: "Before you trust anyone with a guest arrival, you need clear answers: timing, scope, linens, supplies, access, photos, and what happens when the property is not ready.",
    promises: ["Clear expectations", "Host-first answers", "Quote-ready details"],
    sections: [
      ["Can you do same-day turnovers?", "Often, but only when the route, access, property size, linen plan, and checkout/check-in window make sense."],
      ["Do you handle linens and restocking?", "Yes when it is included in the confirmed scope and supplies are available at the property."],
      ["How do I get a quote?", "Send the listing ZIP, bedrooms, bathrooms, turnover date, guest times, linen needs, access notes, and any photos or house instructions."],
    ],
  },
] 

const hostIntentPages: SeoPageData[] = [
  {
    path: "/cleaning-for-property-managers",
    title: "Airbnb Cleaning for Property Managers",
    description: "Airbnb cleaning for property managers who need repeatable turnovers, photo notes, supply visibility, and cleaner handoffs across multiple rentals.",
    eyebrow: "Property managers",
    headline: "Turnover cleaning that helps property managers stay ahead.",
    intro: "When you manage more than one rental, cleaning has to be predictable. Shynli helps property managers standardize guest-ready resets, photo notes, supply checks, and issue reporting across repeated bookings.",
    promises: ["Repeatable turnover scope", "Cleaner notes after each visit", "Useful for multi-listing operations"],
    sections: [
      ["What managers need", "Clear expectations, cleaner arrival windows, supply visibility, and fewer surprise messages right before check-in."],
      ["How handoff works", "Send house notes, access details, linen expectations, and restocking rules so the turnover is easier to repeat."],
      ["Best fit", "Small portfolios, co-hosted homes, and host-managed rentals that need more structure than a one-off house clean."],
    ],
  },
  {
    path: "/airbnb-cleaning-for-cohosts",
    title: "Airbnb Cleaning for Co-Hosts",
    description: "Airbnb cleaning for co-hosts who coordinate turnovers, guest readiness, cleaner notes, access, linens, restocking, and photo confirmation.",
    eyebrow: "For co-hosts",
    headline: "Cleaning support that keeps co-hosting ahead of guest problems.",
    intro: "Co-hosts are often the person who gets the guest message when something feels off. Shynli helps make the cleaning handoff clearer before the next arrival.",
    promises: ["Cleaner scope for co-hosts", "Guest-ready setup", "Photo and supply notes"],
    sections: [
      ["What co-hosts can send", "Listing ZIP, room count, guest times, access details, supply standards, linen plan, and the issues guests mention most often."],
      ["What the clean protects", "Bathrooms, beds, towels, kitchen, trash, floors, and first-impression details that show up quickly in reviews."],
      ["Why it helps", "A clear turnover process reduces check-in stress and makes it easier to manage a listing when the owner is not nearby."],
    ],
  },
  {
    path: "/airbnb-cleaning-for-remote-hosts",
    title: "Airbnb Cleaning for Remote Hosts",
    description: "Airbnb cleaning for remote hosts who need photo handoff, supply notes, ready-status updates, and reliable turnover communication.",
    eyebrow: "Remote hosts",
    headline: "Know the listing is ready without driving there.",
    intro: "Remote hosting depends on trust and visibility. Shynli can help you see the important parts of the turnover: rooms, beds, bathrooms, supplies, visible damage, and ready status.",
    promises: ["Remote-ready photo notes", "Supply visibility", "Guest arrival confidence"],
    sections: [
      ["What you can review", "Photos can show rooms, towels, bathrooms, kitchen, entry areas, supplies, and any visible concern before the next guest arrives."],
      ["What to define first", "House standard, restocking list, owner closet rules, laundry expectations, and what should be reported after each clean."],
      ["Best use case", "Listings where the host cannot personally inspect between stays but still needs to protect reviews."],
    ],
  },
  {
    path: "/airbnb-cleaning-for-new-hosts",
    title: "Airbnb Cleaning for New Hosts",
    description: "Airbnb cleaning for new hosts who need a practical turnover plan, cleaner checklist, supply setup, and first-booking confidence.",
    eyebrow: "New hosts",
    headline: "Start with a turnover plan before the first review is at risk.",
    intro: "New hosts usually learn fast that cleaning is not just cleaning. It is timing, access, linens, supplies, photos, guest expectations, and what happens when a stay leaves more work than expected.",
    promises: ["First-turnover planning", "Guest-ready basics", "Clear quote details"],
    sections: [
      ["What to prepare", "Access instructions, parking, trash rules, supplies, extra linens, owner closet notes, and the standard guests should see."],
      ["What to ask", "Can the clean fit the guest window, what is included, what is extra, and how will you know the home is ready?"],
      ["What to avoid", "Do not wait until the first back-to-back booking to discover the cleaner does not handle towels, restocking, or photo notes."],
    ],
  },
  {
    path: "/airbnb-cleaning-before-check-in",
    title: "Airbnb Cleaning Before Check-In",
    description: "Airbnb cleaning before check-in with guest-facing reset, beds, bathrooms, kitchen, supplies, timing, and ready-status confirmation.",
    eyebrow: "Before check-in",
    headline: "The last clean before check-in is the one guests judge.",
    intro: "The hours before arrival are where reviews are protected or lost. Shynli focuses on the visible details guests notice when they walk in.",
    promises: ["Arrival-focused reset", "Guest-facing details", "Ready-status update"],
    sections: [
      ["What matters most", "Bathrooms, beds, towels, kitchen, floors, trash, entry condition, odors, and whether supplies feel prepared."],
      ["What can go wrong", "Late checkout, wrong access code, missing linens, low supplies, unexpected mess, or not enough time between guests."],
      ["How to prepare", "Send the exact guest window and any last-stay notes so the cleaner can prioritize what affects arrival first."],
    ],
  },
  {
    path: "/airbnb-cleaning-after-checkout",
    title: "Airbnb Cleaning After Checkout",
    description: "Airbnb cleaning after checkout for hosts who need trash removal, guest reset, issue notes, linen handling, and next-stay preparation.",
    eyebrow: "After checkout",
    headline: "After checkout, the next guest clock starts.",
    intro: "A checkout clean should do more than remove the last stay. It should reset the property, reveal what needs attention, and prepare the listing for the next arrival.",
    promises: ["Checkout-to-next-stay reset", "Left-item and issue notes", "Trash and guest-facing areas"],
    sections: [
      ["First priorities", "Trash, kitchen, bathrooms, beds, towels, floors, visible mess, and anything that blocks the next guest setup."],
      ["Useful notes", "Left items, stains, damage, low inventory, odor concerns, access issues, and maintenance items should be surfaced quickly."],
      ["When to book", "As soon as checkout and next check-in are known, especially if laundry, restocking, or photos are part of the scope."],
    ],
  },
  {
    path: "/same-day-airbnb-turnover",
    title: "Same-Day Airbnb Turnover",
    description: "Same-day Airbnb turnover guidance for hosts, including timing, access, property size, linens, supplies, and when a tight window is realistic.",
    eyebrow: "Same-day turnovers",
    headline: "Same-day turnovers need a real timing check.",
    intro: "Back-to-back bookings can work, but only when the route, property size, access, laundry plan, checkout time, and check-in time leave enough room to clean well.",
    promises: ["Timing checked first", "Realistic scope", "No blind promises"],
    sections: [
      ["What decides it", "Distance, parking, access, bedrooms, bathrooms, laundry volume, guest mess, supplies, and how firm the check-in time is."],
      ["What to send", "Checkout time, check-in time, ZIP, property photos, linen plan, and any warning from the last guest."],
      ["When to be careful", "If guests leave late, laundry is heavy, supplies are missing, or the property needs deeper work, the window may not be safe."],
    ],
  },
  {
    path: "/airbnb-deep-cleaning",
    title: "Airbnb Deep Cleaning",
    description: "Airbnb deep cleaning for hosts who need periodic detail work beyond regular turnovers, including kitchens, bathrooms, baseboards, and buildup.",
    eyebrow: "Deeper upkeep",
    headline: "Turnovers keep guests moving. Deep cleaning keeps the listing fresh.",
    intro: "Even strong turnovers can miss buildup over time. Periodic deeper cleaning helps a rental feel closer to the photos guests booked.",
    promises: ["Detail work planning", "Better listing freshness", "Useful between busy seasons"],
    sections: [
      ["When to schedule", "Before peak season, after a long booking run, before new photos, after odor complaints, or when reviews mention cleanliness details."],
      ["What to discuss", "Kitchen buildup, bathroom detail, dust, baseboards, inside appliances, floors, fixtures, and what cannot fit in a normal turnover."],
      ["How it supports reviews", "Guests may not name every detail, but they feel when a rental has slowly drifted below its photos."],
    ],
  },
  {
    path: "/airbnb-cleaning-vs-regular-cleaning",
    title: "Airbnb Cleaning vs Regular Cleaning",
    description: "Airbnb cleaning vs regular cleaning explained for hosts comparing turnover timing, guest setup, linens, supplies, photos, and review risk.",
    eyebrow: "Compare",
    headline: "Airbnb cleaning is not just a regular house clean.",
    intro: "A regular clean can make a home nicer. An Airbnb turnover has to make the home ready for strangers who are about to review it.",
    promises: ["Turnover differences", "Guest setup explained", "Better scope decisions"],
    sections: [
      ["Main difference", "Airbnb cleaning is tied to checkout, check-in, guest supplies, beds, towels, access, and proof that the next stay can begin."],
      ["Why it matters", "A missed towel, low toilet paper, dirty fridge shelf, or late finish can become a guest complaint quickly."],
      ["What to request", "A turnover scope, not a vague house clean: guest-facing reset, supply check, linen plan, and issue notes."],
    ],
  },
  {
    path: "/airbnb-cleaning-vs-deep-cleaning",
    title: "Airbnb Cleaning vs Deep Cleaning",
    description: "Airbnb cleaning vs deep cleaning explained for hosts deciding between guest turnover service and periodic deeper property upkeep.",
    eyebrow: "Compare",
    headline: "Turnover cleaning and deep cleaning solve different host problems.",
    intro: "A turnover is about the next guest arriving. A deep clean is about the condition of the property over time. Most rentals need both at different moments.",
    promises: ["Clear scope choice", "Better timing decisions", "Cleaner expectations"],
    sections: [
      ["Turnover cleaning", "Best for checkout-to-check-in resets: bathrooms, beds, kitchen, trash, floors, towels, and visible guest setup."],
      ["Deep cleaning", "Best for buildup, detail work, odors, appliances, baseboards, fixtures, and refresh work that does not fit a tight window."],
      ["How to choose", "If the next guest is arriving soon, choose turnover. If reviews mention condition drift, schedule deeper upkeep."],
    ],
  },
  {
    path: "/airbnb-laundry-service",
    title: "Airbnb Laundry Service",
    description: "Airbnb laundry service considerations for hosts, including towels, sheets, washer/dryer access, timing, extra sets, and turnover windows.",
    eyebrow: "Laundry planning",
    headline: "Laundry can make or break the turnover window.",
    intro: "Laundry is often the hidden time problem in Airbnb cleaning. Sheets and towels only work inside a tight turnover if the plan is clear before the cleaner arrives.",
    promises: ["Laundry timing clarity", "Linen expectations", "Better back-to-back planning"],
    sections: [
      ["What affects timing", "Washer/dryer access, number of beds, towel volume, machine speed, stains, extra sets, and whether laundry is done on-site."],
      ["What hosts should prepare", "Enough clean backup linens, a place for used sets, clear bed setup instructions, and towel counts for the next guest."],
      ["What to confirm", "Whether laundry is included, what happens if time runs out, and how used or stained items should be handled."],
    ],
  },
  {
    path: "/airbnb-linen-service",
    title: "Airbnb Linen Service",
    description: "Airbnb linen service planning for hosts, including beds, towels, clean sets, used sets, storage, stains, and guest-ready presentation.",
    eyebrow: "Linen setup",
    headline: "Clean linens are part of the guest experience.",
    intro: "Guests judge sheets and towels immediately. A good linen plan makes beds and bathrooms feel prepared instead of improvised.",
    promises: ["Beds staged for arrival", "Towels placed clearly", "Used sets separated"],
    sections: [
      ["What to define", "Where clean linens are stored, where used linens go, how beds should be made, and how many towels each guest should see."],
      ["What causes problems", "Not enough spare sets, locked closets, stains, unclear bed sizes, or assuming laundry fits every same-day turnover."],
      ["How Shynli can help", "Include linen handling in the confirmed scope so the cleaner is working from the same house standard each time."],
    ],
  },
  {
    path: "/airbnb-restocking-service",
    title: "Airbnb Restocking Service",
    description: "Airbnb restocking service for hosts who need paper goods, soaps, coffee, trash bags, dishwasher tabs, and guest essentials checked.",
    eyebrow: "Restocking",
    headline: "Guests should not discover the basics are missing.",
    intro: "Restocking is one of the easiest ways to prevent avoidable complaints. The key is deciding what guests should always find and where supplies are kept.",
    promises: ["Supply checks", "Low-stock notes", "Guest essentials protected"],
    sections: [
      ["What can be checked", "Toilet paper, paper towels, hand soap, trash bags, dishwasher tabs, coffee, toiletries, and any house-specific guest basics."],
      ["What hosts should provide", "A clear restocking list, supply location, minimum counts, owner closet rules, and what to report when items are low."],
      ["Why it matters", "A clean home can still feel unprepared if guests arrive to missing basics."],
    ],
  },
  {
    path: "/airbnb-cleaning-with-photo-report",
    title: "Airbnb Cleaning With Photo Report",
    description: "Airbnb cleaning with photo report for hosts who want room photos, supply visibility, issue notes, and ready-status confirmation.",
    eyebrow: "Photo report",
    headline: "A photo report makes the clean easier to trust.",
    intro: "For hosts who are not on-site, photos can turn a vague 'done' into a clearer handoff. You can see rooms, supplies, beds, bathrooms, and visible issues before check-in.",
    promises: ["Room-level visibility", "Issue notes", "Ready-status support"],
    sections: [
      ["What to request", "Photos of bedrooms, bathrooms, kitchen, towels, supplies, entry areas, and anything that looks different after the stay."],
      ["When it helps most", "Remote hosting, new cleaners, high-value stays, same-day turnovers, or homes with frequent guest turnover."],
      ["What photos cannot solve", "They do not replace realistic timing, enough supplies, or a clear scope, but they make the handoff much more visible."],
    ],
  },
  {
    path: "/airbnb-cleaning-supply-check",
    title: "Airbnb Cleaning Supply Check",
    description: "Airbnb cleaning supply check for hosts who want low-stock notes, guest essentials checked, and restocking clarity between bookings.",
    eyebrow: "Supply check",
    headline: "Low supplies are easier to fix before the guest asks.",
    intro: "A supply check helps hosts catch missing basics between bookings: paper goods, soaps, coffee, trash bags, towels, and house-specific guest items.",
    promises: ["Low-stock visibility", "Guest essentials reviewed", "Restocking list clarity"],
    sections: [
      ["What to include", "Toilet paper, paper towels, soaps, dishwasher tabs, trash bags, coffee, toiletries, towels, and any special items promised in the listing."],
      ["What to send", "The minimum count for each item, where supplies are stored, and what should be reported instead of replaced."],
      ["Why it sells the stay", "Guests rarely praise a stocked home, but they remember when basics are missing."],
    ],
  },
  {
    path: "/airbnb-cleaning-damage-report",
    title: "Airbnb Cleaning Damage Report",
    description: "Airbnb cleaning damage report guidance for hosts who need visible issue notes, stains, left items, access problems, and photo documentation.",
    eyebrow: "Issue notes",
    headline: "Spot problems before the next guest inherits them.",
    intro: "Cleaners are often the first people to see what happened after checkout. A simple issue report can help hosts catch stains, left items, damage, odors, or access problems quickly.",
    promises: ["Visible issues surfaced", "Photo notes on request", "Fewer surprise check-ins"],
    sections: [
      ["What can be reported", "Stains, broken items, left belongings, low supplies, unusual odors, access trouble, trash issues, and maintenance concerns."],
      ["Why timing matters", "The sooner a host sees the issue, the easier it is to decide whether to message the guest, fix the problem, or adjust the next arrival."],
      ["What to define", "Which issues always require photos, who receives notes, and what counts as urgent before check-in."],
    ],
  },
  {
    path: "/airbnb-cleaning-for-superhosts",
    title: "Airbnb Cleaning for Superhosts",
    description: "Airbnb cleaning for Superhosts who need consistent guest-ready turnovers, review protection, supply checks, and cleaner handoff notes.",
    eyebrow: "Review protection",
    headline: "Superhost-level cleaning is really consistency.",
    intro: "Great hosts protect small details because guests notice them. Shynli helps make the turnover standard repeatable: bathrooms, beds, towels, kitchen, supplies, and ready confirmation.",
    promises: ["Consistent turnover standard", "Review-sensitive details", "Photo notes available"],
    sections: [
      ["What matters to guests", "Clean bathrooms, fresh-looking beds, stocked basics, no trash, no obvious dust, and a space that feels like the photos."],
      ["What matters to hosts", "Knowing when the home is ready, what supplies are low, and whether anything needs attention before the next arrival."],
      ["How to maintain it", "Use recurring house notes, clear supply standards, and periodic deeper cleaning to prevent slow quality drift."],
    ],
  },
  {
    path: "/airbnb-cleaning-for-multi-unit-hosts",
    title: "Airbnb Cleaning for Multi-Unit Hosts",
    description: "Airbnb cleaning for multi-unit hosts who need repeatable turnovers, cleaner notes, supply standards, and scalable guest-ready routines.",
    eyebrow: "Multi-unit hosts",
    headline: "More units need a cleaner system, not more guessing.",
    intro: "When one host manages multiple units, the cleaning process has to be clear enough to repeat. Shynli helps standardize the things guests notice and the notes hosts need after each stay.",
    promises: ["Repeatable unit standards", "Cleaner handoff notes", "Better portfolio visibility"],
    sections: [
      ["What to standardize", "Bed setup, towel counts, supply minimums, access instructions, trash rules, photo expectations, and issue reporting."],
      ["What can vary", "Unit size, layout, laundry access, parking, guest mess, building rules, and how tight the turnover window is."],
      ["How to start", "Begin with one clear house standard and improve it after the first few turnovers instead of improvising for every unit."],
    ],
  },
  {
    path: "/how-much-does-airbnb-cleaning-cost",
    title: "How Much Does Airbnb Cleaning Cost?",
    description: "How much Airbnb cleaning costs depends on property size, condition, timing, linens, supplies, photos, access, and turnover urgency.",
    eyebrow: "Cost question",
    headline: "Airbnb cleaning cost depends on what the guest needs to walk into.",
    intro: "A useful quote looks beyond bedroom count. It considers condition, timing, linens, supplies, access, and whether the clean has to fit between two guest stays.",
    promises: ["Quote factors explained", "Better scope planning", "No vague pricing promise"],
    sections: [
      ["What affects cost", "Bedrooms, bathrooms, kitchen condition, floors, trash, linens, restocking, photos, access, parking, and urgency."],
      ["What to send", "ZIP, photos, room count, checkout/check-in times, linen needs, restocking list, and any notes from the last stay."],
      ["Why exact quotes vary", "Two listings with the same bedroom count can require very different labor if one has tight timing, laundry, or heavy guest mess."],
    ],
  },
  {
    path: "/how-long-does-airbnb-cleaning-take",
    title: "How Long Does Airbnb Cleaning Take?",
    description: "How long Airbnb cleaning takes depends on property size, condition, checkout time, check-in time, laundry, supplies, and guest mess.",
    eyebrow: "Timing question",
    headline: "The clean takes as long as the turnover actually needs.",
    intro: "Airbnb cleaning time is shaped by more than square footage. Laundry, guest mess, access, parking, supplies, and how close check-in is can change the real window.",
    promises: ["Timing factors explained", "Same-day reality check", "Better booking planning"],
    sections: [
      ["What affects time", "Bedrooms, bathrooms, kitchen use, laundry, floors, trash, restocking, stains, access, and whether photos are requested."],
      ["Why same-day is different", "A normal clean can move slower. A same-day turnover has to prioritize guest-facing readiness before the next arrival."],
      ["What hosts should share", "Checkout time, check-in time, property size, access notes, linen expectations, and anything unusual from the previous stay."],
    ],
  },
  {
    path: "/what-is-included-in-airbnb-cleaning",
    title: "What Is Included in Airbnb Cleaning?",
    description: "What is included in Airbnb cleaning: bathrooms, bedrooms, beds, towels, kitchen, floors, trash, guest supplies, issue notes, and ready status.",
    eyebrow: "Scope question",
    headline: "Airbnb cleaning should match what guests actually inspect.",
    intro: "A strong turnover scope covers the areas that shape the stay: bathrooms, beds, towels, kitchen, floors, trash, supplies, and visible issues after checkout.",
    promises: ["Clear included scope", "Guest-facing priorities", "Quote-ready expectations"],
    sections: [
      ["Usually included", "Bathrooms, bedrooms, kitchen reset, surfaces, floors, trash, beds, towels, and basic guest-facing setup when confirmed."],
      ["Confirm separately", "Laundry, restocking, exterior spaces, dishes, grills, inside appliances, deep cleaning, and photo handoff should be defined before booking."],
      ["Why scope matters", "A cleaner cannot protect the guest experience if the host assumes tasks that were never included."],
    ],
  },
  {
    path: "/do-airbnb-cleaners-change-linens",
    title: "Do Airbnb Cleaners Change Linens?",
    description: "Do Airbnb cleaners change linens? It depends on the confirmed scope, clean sets, used linen plan, laundry timing, and host instructions.",
    eyebrow: "Linen question",
    headline: "Linen changes work best when the plan is clear before arrival.",
    intro: "Many Airbnb cleaners can handle beds and towels, but the details matter: clean sets, used sets, laundry timing, storage, stains, and exact guest setup.",
    promises: ["Linen expectations clarified", "Bed setup planning", "Laundry timing awareness"],
    sections: [
      ["What to confirm", "Whether beds are changed, where clean linens are stored, where used linens go, and what towel setup guests should see."],
      ["What can block it", "Missing clean sets, locked supply closets, too much laundry, unclear bed sizes, or a same-day window that is too tight."],
      ["Best host move", "Keep backup sets ready and write a simple linen standard for every bedroom and bathroom."],
    ],
  },
  {
    path: "/do-airbnb-cleaners-restock-supplies",
    title: "Do Airbnb Cleaners Restock Supplies?",
    description: "Do Airbnb cleaners restock supplies? It depends on confirmed scope, available inventory, owner closet access, and the host restocking list.",
    eyebrow: "Restocking question",
    headline: "Restocking works when supplies and standards are visible.",
    intro: "A cleaner can only restock what is available and defined. Hosts should decide the minimum guest standard before the first turnover.",
    promises: ["Restocking scope clarity", "Low-supply notes", "Guest basics protected"],
    sections: [
      ["What can be restocked", "Paper goods, soap, trash bags, dishwasher tabs, coffee, toiletries, and other guest basics when supplies are available."],
      ["What to provide", "A restocking list, supply location, minimum counts, and instructions for locked closets or owner-only items."],
      ["Why it matters", "Guests may forgive many small things, but missing basics make the home feel unprepared."],
    ],
  },
  {
    path: "/how-to-prepare-for-airbnb-cleaner",
    title: "How to Prepare for an Airbnb Cleaner",
    description: "How to prepare for an Airbnb cleaner: send access, guest times, house notes, linen plan, restocking list, parking, and checkout details.",
    eyebrow: "Host prep",
    headline: "A better turnover starts before the cleaner arrives.",
    intro: "The cleaner can do better work when the host sends the details that decide the visit: access, timing, supplies, linens, parking, trash rules, and what guests expect.",
    promises: ["Cleaner-ready details", "Fewer delays", "Better quote accuracy"],
    sections: [
      ["Send before booking", "ZIP, bedrooms, bathrooms, checkout/check-in times, access, parking, laundry expectations, supply list, and property photos if available."],
      ["Prepare at the property", "Clean backup linens, stocked supplies, clear owner closet rules, trash instructions, and any house notes the cleaner should follow."],
      ["After the first clean", "Save what worked into recurring notes so each future turnover is easier and less dependent on memory."],
    ],
  },
  {
    path: "/airbnb-turnover-checklist",
    title: "Airbnb Turnover Checklist",
    description: "Airbnb turnover checklist for hosts covering checkout timing, beds, bathrooms, kitchen reset, supplies, linens, photos, and ready status.",
    eyebrow: "Turnover checklist",
    headline: "A turnover checklist should protect the next check-in.",
    intro: "The useful checklist is the one that helps the next guest walk into a clean, stocked, ready home without the host chasing details at the last minute.",
    promises: ["Guest-ready priorities", "Cleaner handoff clarity", "Fewer missed details"],
    sections: [
      ["Before checkout", "Confirm checkout time, next check-in, access, parking, house notes, supplies, linen plan, and any guest-reported issue."],
      ["During the reset", "Bathrooms, beds, towels, kitchen, trash, floors, surfaces, and guest-facing supplies should be worked in a clear order."],
      ["Before arrival", "Review photos or notes for low inventory, stains, damage, left items, odors, and whether the home is ready for check-in."],
    ],
  },
  {
    path: "/short-term-rental-turnover-checklist",
    title: "Short-Term Rental Turnover Checklist",
    description: "Short-term rental turnover checklist for hosts who need repeatable guest resets, supply checks, linen notes, and ready-status handoff.",
    eyebrow: "Short-term rental checklist",
    headline: "Make every rental turnover easier to repeat.",
    intro: "A short-term rental checklist should turn each stay into a clear handoff: what changed, what was cleaned, what is low, and what the next guest will see.",
    promises: ["Repeatable host standard", "Supply and linen clarity", "Useful for recurring stays"],
    sections: [
      ["Guest-facing rooms", "Bedrooms, bathrooms, kitchen, entry areas, towels, floors, and trash should be reset around arrival comfort."],
      ["Host notes", "Low supplies, stains, damage, left items, odors, and maintenance concerns should be surfaced before the next booking."],
      ["Recurring setup", "Save access, trash, supply, linen, and photo expectations so each future visit starts from the same standard."],
    ],
  },
  {
    path: "/vacation-rental-turnover-checklist",
    title: "Vacation Rental Turnover Checklist",
    description: "Vacation rental turnover checklist for hosts covering guest arrival setup, bathrooms, beds, kitchen, supplies, notes, and photo handoff.",
    eyebrow: "Vacation rental checklist",
    headline: "Vacation rental turnovers should feel prepared, not rushed.",
    intro: "Vacation guests expect the home to feel complete. The checklist should focus on clean rooms, stocked basics, visible comfort, and anything that might break the first impression.",
    promises: ["Arrival-ready setup", "Guest comfort details", "Issue notes before check-in"],
    sections: [
      ["First impression", "Entry, scent, floors, bathrooms, bedrooms, towels, and kitchen details should feel calm and ready."],
      ["Stay basics", "Paper goods, soaps, trash bags, coffee, towels, and promised amenities should be checked when supplies are available."],
      ["After the stay", "Left items, stains, damage, low stock, and maintenance issues should be noted before the next guest inherits them."],
    ],
  },
  {
    path: "/airbnb-host-cleaning-guide",
    title: "Airbnb Host Cleaning Guide",
    description: "Airbnb host cleaning guide covering turnover scope, cleaner handoff, supplies, linens, timing, photo reports, and review protection.",
    eyebrow: "Host guide",
    headline: "A host cleaning guide turns the clean into a system.",
    intro: "The best hosts do not leave cleaning to memory. They define the house standard, the supply standard, the linen plan, and what must be reported after every stay.",
    promises: ["House standard clarity", "Better cleaner handoff", "Review-sensitive priorities"],
    sections: [
      ["Define the standard", "Write what guests should see in bathrooms, bedrooms, kitchen, entry, towels, supplies, and staging details."],
      ["Set the handoff", "Give access, parking, laundry, restocking, trash, photo, and issue-reporting instructions before the first visit."],
      ["Improve after each stay", "Use cleaner notes and guest feedback to tighten the checklist without overcomplicating the turnover."],
    ],
  },
  {
    path: "/airbnb-cleaning-service-near-me",
    title: "Airbnb Cleaning Service Near Me",
    description: "Airbnb cleaning service near me guidance for hosts comparing local turnover cleaners, service areas, timing, linens, restocking, and photos.",
    eyebrow: "Local search",
    headline: "Looking nearby is only step one. The turnover still has to fit.",
    intro: "A nearby cleaner is helpful, but distance alone does not make a turnover work. Hosts also need timing, access, scope, supplies, linens, and confirmation after the clean.",
    promises: ["Local coverage check", "Turnover scope clarity", "Quote-ready next step"],
    sections: [
      ["What to ask first", "Can the cleaner reach the listing, fit checkout-to-check-in timing, and follow your house standard?"],
      ["What to compare", "Included tasks, linens, restocking, photo handoff, issue notes, recurring availability, and what happens if guests leave late."],
      ["How Shynli checks fit", "Start with ZIP, property details, guest times, access, laundry expectations, and supply needs before relying on the booking."],
    ],
  },
  {
    path: "/short-term-rental-cleaning-service-near-me",
    title: "Short-Term Rental Cleaning Service Near Me",
    description: "Short-term rental cleaning service near me for hosts who need local turnover help, guest-ready scope, supplies, linens, and photo notes.",
    eyebrow: "Local STR cleaning",
    headline: "Find a short-term rental cleaner who understands guest arrivals.",
    intro: "Short-term rental cleaning is different from routine home cleaning because every visit is tied to a guest experience, a timeline, and a review.",
    promises: ["Local route check", "Rental-first priorities", "Guest-ready handoff"],
    sections: [
      ["Local fit", "The listing ZIP, parking, building access, and route timing all affect whether the clean can happen safely."],
      ["Turnover fit", "Bathrooms, beds, towels, kitchen, trash, floors, supplies, and issue notes matter more than vague cleaning promises."],
      ["Host fit", "A cleaner should understand your linen setup, supply standards, photos, and what must be reported after checkout."],
    ],
  },
  {
    path: "/vacation-rental-cleaning-service-near-me",
    title: "Vacation Rental Cleaning Service Near Me",
    description: "Vacation rental cleaning service near me for hosts comparing local guest-ready cleaning, supplies, linens, photo handoff, and turnover timing.",
    eyebrow: "Local vacation rental cleaning",
    headline: "A vacation rental cleaner should protect the stay, not just the surfaces.",
    intro: "Vacation rental guests arrive expecting the home to match the listing. Local cleaning support should reset comfort, supplies, and first impressions before the next stay.",
    promises: ["Guest comfort focus", "Local service-area check", "Supply and issue notes"],
    sections: [
      ["What guests notice", "Bathrooms, beds, towels, kitchen, floors, entry condition, odors, and whether basics feel stocked."],
      ["What hosts need", "Clear arrival timing, access, restocking expectations, linen notes, and a way to see visible issues after checkout."],
      ["What to send", "ZIP, room count, guest times, access details, photos, supply list, and the house standard for your rental."],
    ],
  },
  {
    path: "/airbnb-cleaning-company",
    title: "Airbnb Cleaning Company",
    description: "Airbnb cleaning company for hosts who need turnover cleaning, guest-ready rooms, linens, restocking notes, photo handoff, and reliability.",
    eyebrow: "Cleaning company",
    headline: "Choose an Airbnb cleaning company around the handoff, not only the clean.",
    intro: "The right cleaning company helps hosts manage the gap between checkout and check-in: what was cleaned, what is low, what needs attention, and whether the home is ready.",
    promises: ["Turnover-aware process", "Host notes after service", "Guest-ready scope"],
    sections: [
      ["What to look for", "Turnover timing, linen expectations, restocking rules, photo handoff, access handling, and recurring property notes."],
      ["What to avoid", "Vague scope, no communication after service, no plan for supplies, and no clear answer for same-day windows."],
      ["How to start", "Send property details and guest timing first so availability and scope are confirmed before you count on the clean."],
    ],
  },
  {
    path: "/vacation-rental-cleaning-company",
    title: "Vacation Rental Cleaning Company",
    description: "Vacation rental cleaning company for hosts who need guest-ready resets, supply visibility, linen setup, and cleaner handoff notes.",
    eyebrow: "Vacation rental company",
    headline: "Vacation rental cleaning should keep the property guest-ready over time.",
    intro: "A vacation rental cleaning company should help protect first impressions while also catching the small problems that build up across stays.",
    promises: ["Guest-ready resets", "Ongoing property notes", "Supply and linen clarity"],
    sections: [
      ["Turnover work", "Bathrooms, beds, towels, kitchen, trash, floors, and guest-facing areas reset before arrival."],
      ["Upkeep signals", "Stains, low inventory, left items, damage, odors, and maintenance concerns should be surfaced quickly."],
      ["Host confidence", "Photo notes and recurring instructions make it easier to manage the property without inspecting every stay yourself."],
    ],
  },
  {
    path: "/airbnb-cleaning-pricing-guide",
    title: "Airbnb Cleaning Pricing Guide",
    description: "Airbnb cleaning pricing guide for hosts comparing cost factors such as property size, timing, linens, restocking, photos, and condition.",
    eyebrow: "Pricing guide",
    headline: "Airbnb cleaning pricing should follow the real turnover work.",
    intro: "A useful price reflects the property, the timing, and the guest standard. Two listings with the same bedroom count can need very different work.",
    promises: ["Cost factors explained", "Better quote requests", "No blind pricing promise"],
    sections: [
      ["Property factors", "Bedrooms, bathrooms, kitchen condition, floors, trash, stains, odors, and how guests left the home."],
      ["Operational factors", "Checkout time, check-in time, access, parking, laundry, restocking, photos, and route availability."],
      ["How to get clarity", "Send ZIP, photos, room count, guest times, and exact add-ons before comparing prices."],
    ],
  },
  {
    path: "/airbnb-cleaning-fee-guide",
    title: "Airbnb Cleaning Fee Guide",
    description: "Airbnb cleaning fee guide for hosts thinking about guest fees, turnover cost, review risk, scope, linens, supplies, and pricing clarity.",
    eyebrow: "Cleaning fee guide",
    headline: "Your cleaning fee should match the guest-ready standard.",
    intro: "Hosts often think about the cleaning fee from the booking page, but the real question is whether the fee supports the level of work guests expect.",
    promises: ["Fee planning clarity", "Guest expectation fit", "Turnover scope awareness"],
    sections: [
      ["What the fee covers", "The actual labor needed to reset bathrooms, beds, kitchen, trash, floors, towels, supplies, and guest-facing details."],
      ["What changes the fee", "Laundry, restocking, photos, property condition, tight timing, access issues, and deeper detail work."],
      ["What to avoid", "Setting a fee too low and then expecting a cleaner to perform a full guest-ready turnover under time pressure."],
    ],
  },
  {
    path: "/airbnb-cleaning-reviews-guide",
    title: "Airbnb Cleaning Reviews Guide",
    description: "Airbnb cleaning reviews guide for hosts focused on guest cleanliness feedback, review protection, turnover details, supplies, and photos.",
    eyebrow: "Review guide",
    headline: "Cleanliness reviews are built from small guest moments.",
    intro: "Guests may not mention every clean surface, but they notice bathrooms, beds, towels, kitchen details, odors, floors, and missing supplies quickly.",
    promises: ["Review-sensitive checklist", "Guest complaint prevention", "Cleaner feedback loop"],
    sections: [
      ["What guests notice", "Bathrooms, beds, towels, kitchen, floors, smells, trash, dust, stains, and whether the home feels like the photos."],
      ["What hosts can control", "A clear checklist, enough supplies, backup linens, photo handoff, and issue notes after every stay."],
      ["What improves over time", "Track repeated complaints and add those details into the house standard before they hurt more bookings."],
    ],
  },
  {
    path: "/airbnb-cleaning-photos-guide",
    title: "Airbnb Cleaning Photos Guide",
    description: "Airbnb cleaning photos guide for hosts who want photo handoff, room proof, supply visibility, issue notes, and ready-status checks.",
    eyebrow: "Photo guide",
    headline: "Photos help hosts see the clean before guests do.",
    intro: "A photo handoff is not about micromanaging. It is about seeing the condition of the listing when you cannot inspect it yourself, especially when checkout, cleaning, and the next check-in all happen inside one tight window.",
    promises: ["Room proof", "Supply visibility", "Issue documentation"],
    sections: [
      ["What to photograph", "Bedrooms, bathrooms, kitchen, towels, supplies, entry areas, trash areas, and visible damage or stains."],
      ["When it matters most", "Remote hosting, same-day turnovers, new listings, new cleaners, and high-value bookings."],
      ["How to use photos", "Review them for readiness, supply issues, damage, missed details, linen setup, towel placement, and patterns that should change the checklist."],
    ],
  },
  {
    path: "/airbnb-cleaning-supplies-guide",
    title: "Airbnb Cleaning Supplies Guide",
    description: "Airbnb cleaning supplies guide for hosts covering guest essentials, restocking lists, owner closets, low-stock notes, and turnover prep.",
    eyebrow: "Supplies guide",
    headline: "Supplies should be easy to find before guests need them.",
    intro: "A clean rental can still feel unfinished if the basics are missing. Hosts should define what is stocked, where it lives, and when low inventory is reported.",
    promises: ["Restocking clarity", "Low-supply prevention", "Guest essentials list"],
    sections: [
      ["Guest essentials", "Toilet paper, paper towels, soaps, trash bags, dishwasher tabs, coffee, towels, and any promised amenities."],
      ["Cleaner instructions", "Where supplies are stored, what minimum count is expected, what is locked, and what should be reported instead of replaced."],
      ["Better turnovers", "A clear supply plan reduces last-minute texts and keeps guest basics from becoming review problems."],
    ],
  },
  {
    path: "/airbnb-cleaning-maintenance-notes",
    title: "Airbnb Cleaning Maintenance Notes",
    description: "Airbnb cleaning maintenance notes for hosts who want visible issue reporting, damage notes, stains, odors, access problems, and low supplies.",
    eyebrow: "Maintenance notes",
    headline: "Cleaner notes can catch problems between guest stays.",
    intro: "Cleaners often see issues before the host does. A simple notes process can surface maintenance concerns before the next guest walks in.",
    promises: ["Visible issue reporting", "Faster host response", "Better guest protection"],
    sections: [
      ["What to note", "Broken items, stains, odors, leaks, missing supplies, left belongings, access trouble, trash issues, and anything unusual after checkout."],
      ["Why it helps", "The host can decide whether to fix, message, document, or adjust the next arrival before it becomes a guest complaint."],
      ["How to define it", "Tell the cleaner which issues require photos, who receives the notes, and what counts as urgent before check-in."],
    ],
  },
  {
    path: "/airbnb-cleaning-between-guests",
    title: "Airbnb Cleaning Between Guests",
    description: "Airbnb cleaning between guests for hosts who need checkout-to-check-in resets, guest-ready details, supplies, linens, and photo notes.",
    eyebrow: "Between guests",
    headline: "Between guests, the clean has to reset trust quickly.",
    intro: "The next guest does not care how busy the last stay was. They care whether the home feels clean, stocked, and ready when they open the door.",
    promises: ["Checkout-to-check-in focus", "Guest-ready reset", "Host visibility"],
    sections: [
      ["What changes between guests", "Trash, towels, beds, kitchen use, bathroom condition, floors, supplies, odors, and left items all need a fresh look."],
      ["What makes it work", "Clear timing, access, supplies, clean linens, realistic scope, and notes after the visit."],
      ["What protects reviews", "Bathrooms and beds first, then kitchen, floors, supplies, trash, visible issues, and final ready-status confidence."],
    ],
  },
]

const seoHubPages: SeoPageData[] = [...coreSeoHubPages, ...hostIntentPages]

const seoGuideGroups = [
  {
    label: "Host guides",
    pages: hostProblemGuides,
  },
  {
    label: "Core cleaning pages",
    pages: coreSeoHubPages.slice(0, 11),
  },
  {
    label: "Host situations",
    pages: hostIntentPages.slice(0, 18),
  },
  {
    label: "Pricing, scope, and timing",
    pages: hostIntentPages.slice(18, 29),
  },
  {
    label: "Checklists and local intent",
    pages: hostIntentPages.slice(29),
  },
]

const cityServicePages = [
  {
    slug: "airbnb-cleaning",
    label: "Airbnb cleaning",
    title: "Airbnb Cleaning",
    description: "Airbnb cleaning in {city}, IL for hosts who need turnover cleaning, linen setup, restocking notes, photo handoff, and ready-status confirmation.",
    eyebrow: "Airbnb cleaning in {city}",
    headline: "A cleaner turnover for your next {city} guest.",
    intro: "Shynli helps {city} hosts with the parts of an Airbnb turnover that matter most before check-in: bathrooms, beds, kitchen, floors, trash, towels, supplies, visible issues, and ready-status confirmation.",
    promises: ["Guest-ready reset", "Linen and supply notes", "Photo handoff available"],
    steps: [
      ["Before arrival", "Confirm checkout, check-in, access, parking, and whether the home can be reset in time."],
      ["During the clean", "Reset the guest-facing rooms with bathrooms, kitchen, beds, floors, trash, and supplies in focus."],
      ["After the visit", "Get notes on low inventory, stains, left items, access trouble, or anything that could affect the stay."],
      ["Next booking", "Use recurring notes so the next turnover gets easier instead of starting from scratch."],
    ],
    faqs: [
      ["Can you bring supplies?", "Restocking depends on what you want provided and what is available at the property. Share the house standard before the first clean."],
      ["Can you handle laundry?", "Laundry timing depends on washer/dryer access, number of beds, towel volume, and how tight the turnover window is."],
      ["Can you send photos?", "Photo handoff can be requested so you can review rooms, beds, bathrooms, supplies, and visible issues before the guest arrives."],
      ["How do I book?", "Use the quote form with the {city} listing ZIP, guest times, property details, access notes, and turnover scope."],
    ],
  },
  {
    slug: "short-term-rental-cleaning",
    label: "Short-term rental cleaning",
    title: "Short-Term Rental Cleaning",
    description: "Short-term rental cleaning in {city}, IL for hosts who need guest-ready turnover cleaning, supply checks, linens, issue notes, and repeatable handoff.",
    eyebrow: "Short-term rental cleaning in {city}",
    headline: "Short-term rental cleaning in {city} built around guest arrivals.",
    intro: "A short-term rental clean in {city} has to do more than tidy the home. It should reset the property for the next guest, protect the review, and give the host useful notes after checkout.",
    promises: ["Rental-first checklist", "Guest arrival priorities", "Repeatable host notes"],
    steps: [
      ["Turnover window", "Start with checkout, check-in, route, access, and property size so the visit is planned around the guest clock."],
      ["Guest setup", "Bathrooms, bedrooms, kitchen, floors, trash, towels, and visible details are prioritized around arrival comfort."],
      ["Supply visibility", "Paper goods, soaps, coffee, towels, and owner-closet rules can be checked when they are included in the scope."],
      ["Host handoff", "Low supplies, stains, left items, damage, or maintenance concerns can be surfaced before they become guest complaints."],
    ],
    faqs: [
      ["Is this different from regular cleaning?", "Yes. Short-term rental cleaning is tied to guest timing, review risk, supplies, linens, access, and ready-status handoff."],
      ["Can it be recurring?", "Yes, recurring notes help the cleaner understand the property standard and reduce repeated explanation."],
      ["What should I send?", "Send the {city} ZIP, room count, guest times, photos if available, access instructions, and supply expectations."],
      ["Can you help with back-to-back bookings?", "Often, but the window has to be realistic for the route, property size, laundry, and condition."],
    ],
  },
  {
    slug: "vacation-rental-cleaning",
    label: "Vacation rental cleaning",
    title: "Vacation Rental Cleaning",
    description: "Vacation rental cleaning in {city}, IL with guest-ready rooms, bathroom and kitchen reset, supply notes, linens, and photo handoff options.",
    eyebrow: "Vacation rental cleaning in {city}",
    headline: "Vacation rental cleaning in {city} that helps the stay feel prepared.",
    intro: "Vacation guests arrive expecting the home to feel complete. Shynli helps {city} hosts reset the rooms, supplies, towels, kitchen, and first-impression details before the next stay.",
    promises: ["Arrival-ready rooms", "Vacation guest setup", "Issue notes after checkout"],
    steps: [
      ["First impression", "Entry areas, odors, floors, bathrooms, bedrooms, towels, and kitchen details are cleaned with guest arrival in mind."],
      ["Stay basics", "Supplies and house standards can be checked so guests are not messaging about missing essentials."],
      ["Between-stay care", "Visible issues, low inventory, stains, and left items can be noted before the next guest enters."],
      ["Seasonal upkeep", "Periodic deeper work can help the listing stay closer to the photos during busy booking periods."],
    ],
    faqs: [
      ["What properties fit?", "Homes, townhomes, condos, guest suites, and furnished rentals where guest arrival condition matters."],
      ["Can you follow house notes?", "Yes. Send the house standard, supply list, linen setup, trash rules, and access instructions."],
      ["Do you take photos?", "Photo handoff can be requested for room condition, supplies, beds, bathrooms, and visible issues."],
      ["What affects the quote?", "Size, condition, bathrooms, laundry, supplies, access, parking, and turnover timing."],
    ],
  },
  {
    slug: "airbnb-turnover-cleaning",
    label: "Airbnb turnover cleaning",
    title: "Airbnb Turnover Cleaning",
    description: "Airbnb turnover cleaning in {city}, IL for checkout-to-check-in resets, bathrooms, beds, kitchen, trash, linens, supplies, and ready status.",
    eyebrow: "Airbnb turnover cleaning in {city}",
    headline: "Airbnb turnover cleaning in {city} for the next check-in.",
    intro: "A turnover is about timing and confidence. Shynli helps {city} hosts move from checkout to check-in with a cleaner reset, clearer notes, and fewer last-minute surprises.",
    promises: ["Checkout-to-check-in reset", "Ready-status focus", "Host notes after service"],
    steps: [
      ["Window check", "We start with checkout, check-in, access, parking, laundry, and property size so the clean is realistic."],
      ["Reset priorities", "Bathrooms, beds, kitchen, trash, floors, towels, and supplies are handled around what the next guest will see."],
      ["Problem spotting", "Left items, stains, damage, low supplies, and access issues can be reported quickly."],
      ["Repeatable turnover", "House notes and recurring expectations help each visit become more predictable."],
    ],
    faqs: [
      ["Can you do same-day turnover?", "Often, but only when the {city} route, property size, guest times, access, and laundry plan fit."],
      ["What if guests leave late?", "Tell us immediately. Late checkout can change what is realistic before the next arrival."],
      ["What should be included?", "Bathrooms, bedrooms, kitchen, floors, trash, beds, towels, supplies, and photo notes when requested."],
      ["How do I request availability?", "Send the ZIP, checkout time, check-in time, property details, access instructions, and linen/restocking needs."],
    ],
  },
  {
    slug: "airbnb-cleaning-cost",
    label: "Airbnb cleaning cost",
    title: "Airbnb Cleaning Cost",
    description: "Airbnb cleaning cost in {city}, IL depends on property size, guest timing, condition, linens, restocking, photo handoff, access, and turnover scope.",
    eyebrow: "Airbnb cleaning cost in {city}",
    headline: "Airbnb cleaning cost in {city} should match the real turnover.",
    intro: "The right cleaning quote in {city} depends on more than bedroom count. Timing, access, guest mess, linens, supplies, photos, and how ready the home must be before check-in all affect the work.",
    promises: ["Quote factors explained", "No blind pricing promise", "Scope matched to guest arrival"],
    steps: [
      ["Property details", "Bedrooms, bathrooms, kitchen use, floors, trash, stains, odors, and current condition all affect the real labor."],
      ["Turnover timing", "Checkout time, check-in time, route, access, parking, and same-day pressure can change what is realistic."],
      ["Add-on scope", "Laundry, linen setup, restocking, dishes, deep detail tasks, and photo handoff should be confirmed before pricing."],
      ["Better quote", "Send the {city} ZIP, photos, room count, guest times, access notes, and supply expectations before comparing cost."],
    ],
    faqs: [
      ["Can you quote by bedroom count?", "Bedroom count helps, but bathrooms, condition, timing, linens, supplies, and access usually decide the final quote."],
      ["Why can two similar listings cost different amounts?", "One may need laundry, restocking, more bathrooms, tighter timing, or extra work after a rough checkout."],
      ["Does photo handoff affect cost?", "It can if photos and notes add time to the handoff. Confirm it before the visit."],
      ["How do I get a {city} quote?", "Send the listing ZIP, guest times, property size, access, photos, linens, and restocking needs."],
    ],
  },
  {
    slug: "airbnb-cleaning-checklist",
    label: "Airbnb cleaning checklist",
    title: "Airbnb Cleaning Checklist",
    description: "Airbnb cleaning checklist in {city}, IL for hosts covering bathrooms, beds, kitchen, towels, supplies, photos, access, and ready status.",
    eyebrow: "Airbnb cleaning checklist in {city}",
    headline: "An Airbnb cleaning checklist in {city} should protect the next review.",
    intro: "A good checklist helps {city} hosts make the turnover repeatable: what gets cleaned, what gets checked, what gets reported, and what the next guest should feel when they arrive.",
    promises: ["Guest-facing priorities", "Cleaner handoff clarity", "Review-sensitive details"],
    steps: [
      ["Before the clean", "Confirm checkout, check-in, access, parking, trash rules, clean linens, supplies, and any notes from the last guest."],
      ["During the turnover", "Reset bathrooms, beds, towels, kitchen, floors, surfaces, trash, entry, and the details guests notice first."],
      ["Supply and linen check", "Review paper goods, soaps, coffee, trash bags, towels, used linens, clean sets, and owner-closet rules."],
      ["After the visit", "Ask for notes or photos on low supplies, stains, damage, left items, odors, and whether the home is ready."],
    ],
    faqs: [
      ["Should every {city} listing use the same checklist?", "Use the same structure, but adjust it for layout, supplies, laundry access, building rules, and guest expectations."],
      ["What is most important before check-in?", "Bathrooms, beds, towels, kitchen, trash, floors, supplies, odors, and visible issues."],
      ["Can the checklist include restocking?", "Yes, when supplies are available and the restocking list is included in the confirmed scope."],
      ["Can photos be part of the checklist?", "Yes. Photo handoff can help hosts review rooms, beds, bathrooms, supplies, and visible concerns before arrival."],
    ],
  },
] as const

type SeoHubPageData = (typeof seoHubPages)[number]
type ServiceAreaCity = (typeof serviceAreaCities)[number]
type CityServicePageData = (typeof cityServicePages)[number]

function fillCityTemplate(value: string, city: ServiceAreaCity) {
  return value.replaceAll("{city}", city.city)
}

function routeHref(pathname: string) {
  return pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`
}

function getRelatedSeoHubPages(page: SeoHubPageData, limit = 8) {
  const pageIndex = seoHubPages.findIndex((item) => item.path === page.path)
  if (pageIndex < 0) return seoHubPages.filter((item) => item.path !== page.path).slice(0, limit)

  return Array.from({ length: seoHubPages.length - 1 }, (_, index) => seoHubPages[(pageIndex + index + 1) % seoHubPages.length]).slice(0, limit)
}

function canonicalFor(pathname: string) {
  const cleanPath = pathname === "/" ? "" : routeHref(pathname)
  return `https://shynliairbnbcleaning.com${cleanPath}`
}

function usePageMeta(title: string, description: string, pathname = window.location.pathname, keywords?: string, titleIsExact = false) {
  useEffect(() => {
    document.title = titleIsExact ? title : `${title} | ShynliAirbnbCleaning.com`

    const existing = document.querySelector('meta[name="description"]')
    if (existing) {
      existing.setAttribute("content", description)
    } else {
      const meta = document.createElement("meta")
      meta.name = "description"
      meta.content = description
      document.head.append(meta)
    }

    if (keywords) {
      const existingKeywords = document.querySelector('meta[name="keywords"]')
      if (existingKeywords) {
        existingKeywords.setAttribute("content", keywords)
      } else {
        const meta = document.createElement("meta")
        meta.name = "keywords"
        meta.content = keywords
        document.head.append(meta)
      }
    }

    const canonicalHref = canonicalFor(pathname)
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      canonical.href = canonicalHref
    } else {
      const link = document.createElement("link")
      link.rel = "canonical"
      link.href = canonicalHref
      document.head.append(link)
    }
  }, [description, keywords, pathname, title, titleIsExact])
}

function useStructuredData(id: string, nodes: unknown[]) {
  useEffect(() => {
    const scriptId = `structured-data-${id}`
    const existing = document.getElementById(scriptId)

    if (nodes.length === 0) {
      existing?.remove()
      return
    }

    const payload = {
      "@context": "https://schema.org",
      "@graph": nodes,
    }

    if (existing) {
      existing.textContent = JSON.stringify(payload)
      return
    }

    const script = document.createElement("script")
    script.id = scriptId
    script.type = "application/ld+json"
    script.textContent = JSON.stringify(payload)
    document.head.append(script)

    return () => {
      script.remove()
    }
  }, [id, nodes])
}

export function getStaticRouteHead(pathname: string) {
  const currentPath = pathname.replace(/\/$/, "") || "/"
  const legalPage = legalPages[currentPath as keyof typeof legalPages]
  const seoHubPage = seoHubPages.find((page) => page.path === currentPath)
  const hostProblemGuide = hostProblemGuides.find((guide) => guide.path === currentPath)
  const cityServiceMatch = serviceAreaCities.flatMap((city) =>
    cityServicePages.map((service) => ({ city, service, path: `/service-areas/${city.slug}/${service.slug}` })),
  ).find((match) => match.path === currentPath)
  const cityPage = serviceAreaCities.find((city) => currentPath === `/service-areas/${city.slug}`)

  if (legalPage) {
    const description = `${legalPage.title} for ShynliAirbnbCleaning.com, covering host quote requests, booking rules, service expectations, and customer choices.`

    return {
      title: `${legalPage.title} | ShynliAirbnbCleaning.com`,
      description,
      canonical: canonicalFor(currentPath),
      structuredData: [
        businessSchema(),
        breadcrumbSchema([
          ["Home", "https://shynliairbnbcleaning.com"],
          [legalPage.title, canonicalFor(currentPath)],
        ]),
      ],
    }
  }

  if (currentPath === hostProblemGuideHub.path) {
    return {
      title: hostProblemGuideHub.metaTitle,
      description: hostProblemGuideHub.description,
      keywords: hostProblemGuideHub.keywords,
      canonical: canonicalFor(hostProblemGuideHub.path),
      structuredData: [
        businessSchema(),
        hostProblemGuideItemListSchema(),
        breadcrumbSchema([
          ["Home", "https://shynliairbnbcleaning.com"],
          [hostProblemGuideHub.title, canonicalFor(hostProblemGuideHub.path)],
        ]),
      ],
    }
  }

  if (hostProblemGuide) {
    return {
      title: hostProblemGuide.metaTitle,
      description: hostProblemGuide.description,
      keywords: hostProblemGuide.keywords,
      canonical: canonicalFor(hostProblemGuide.path),
      structuredData: [
        businessSchema(),
        articleSchema(hostProblemGuide),
        breadcrumbSchema([
          ["Home", "https://shynliairbnbcleaning.com"],
          [hostProblemGuideHub.title, canonicalFor(hostProblemGuideHub.path)],
          [hostProblemGuide.title, canonicalFor(hostProblemGuide.path)],
        ]),
      ],
    }
  }

  if (seoHubPage) {
    return {
      title: `${seoHubPage.title} | ShynliAirbnbCleaning.com`,
      description: seoHubPage.description,
      canonical: canonicalFor(seoHubPage.path),
      structuredData: [
        businessSchema(),
        serviceSchema(seoHubPage.title, seoHubPage.description, seoHubPage.path),
        breadcrumbSchema([
          ["Home", "https://shynliairbnbcleaning.com"],
          [seoHubPage.title, canonicalFor(seoHubPage.path)],
        ]),
      ],
    }
  }

  if (currentPath === "/service-areas") {
    const title = "Airbnb Cleaning Service Areas"
    const description = "Airbnb and short-term rental cleaning service areas for ShynliAirbnbCleaning.com, including Naperville, Aurora, Wheaton, Plainfield, Yorkville, and nearby cities."

    return {
      title: `${title} | ShynliAirbnbCleaning.com`,
      description,
      canonical: canonicalFor("/service-areas"),
      structuredData: [
        businessSchema(),
        serviceSchema(title, "Airbnb and short-term rental cleaning service areas across the Shynli service map.", "/service-areas"),
        breadcrumbSchema([
          ["Home", "https://shynliairbnbcleaning.com"],
          ["Service Areas", "https://shynliairbnbcleaning.com/service-areas"],
        ]),
      ],
    }
  }

  if (cityServiceMatch) {
    const { city, service } = cityServiceMatch
    const serviceDescription = fillCityTemplate(service.description, city)
    const servicePath = `/service-areas/${city.slug}/${service.slug}`
    const pageFaqs = service.faqs.map(([question, answer]) => [fillCityTemplate(question, city), fillCityTemplate(answer, city)] as [string, string])
    const title = `${service.title} in ${city.city}, IL`

    return {
      title: `${title} | ShynliAirbnbCleaning.com`,
      description: serviceDescription,
      canonical: canonicalFor(servicePath),
      structuredData: [
        businessSchema(),
        serviceSchema(title, serviceDescription, servicePath, city),
        faqSchema(pageFaqs),
        breadcrumbSchema([
          ["Home", "https://shynliairbnbcleaning.com"],
          ["Service Areas", "https://shynliairbnbcleaning.com/service-areas"],
          [`${city.city}, IL`, canonicalFor(`/service-areas/${city.slug}`)],
          [title, canonicalFor(servicePath)],
        ]),
      ],
    }
  }

  if (cityPage) {
    const title = `Airbnb Cleaning Service Area in ${cityPage.city}, IL`
    const description = `Airbnb and short-term rental cleaning in ${cityPage.city}, IL with turnover timing, guest-ready reset, linen notes, restocking checks, and photo handoff options.`

    return {
      title: `${title} | ShynliAirbnbCleaning.com`,
      description,
      canonical: canonicalFor(`/service-areas/${cityPage.slug}`),
      structuredData: [
        businessSchema(),
        serviceSchema(title, `Airbnb and short-term rental cleaning in ${cityPage.city}, IL with turnover timing, local route checks, linens, restocking, and photo handoff.`, `/service-areas/${cityPage.slug}`, cityPage),
        breadcrumbSchema([
          ["Home", "https://shynliairbnbcleaning.com"],
          ["Service Areas", "https://shynliairbnbcleaning.com/service-areas"],
          [`${cityPage.city}, IL`, canonicalFor(`/service-areas/${cityPage.slug}`)],
        ]),
      ],
    }
  }

  return {
    title: "ShynliAirbnbCleaning.com | Airbnb Turnover Cleaning",
    description: "Guest-ready Airbnb turnover cleaning with linens, restocking notes, photo handoff, and host-first availability checks.",
    canonical: canonicalFor("/"),
    structuredData: [
      businessSchema(),
      websiteSchema(),
      serviceSchema("Airbnb Turnover Cleaning", "Guest-ready Airbnb turnover cleaning with linens, restocking notes, photo handoff, and host-first availability checks.", "/"),
      breadcrumbSchema([["Home", "https://shynliairbnbcleaning.com"]]),
    ],
  }
}

function businessSchema() {
  return {
    "@type": ["LocalBusiness", "HouseCleaningService"],
    "@id": "https://shynliairbnbcleaning.com/#business",
    name: "ShynliAirbnbCleaning.com",
    url: "https://shynliairbnbcleaning.com",
    telephone: "+1-630-812-7077",
    email: "info@shynli.com",
    priceRange: "$$",
    areaServed: serviceAreaCities.map((city) => ({
      "@type": "City",
      name: `${city.city}, IL`,
    })),
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
  }
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": "https://shynliairbnbcleaning.com/#website",
    name: "ShynliAirbnbCleaning.com",
    url: "https://shynliairbnbcleaning.com",
    publisher: { "@id": "https://shynliairbnbcleaning.com/#business" },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://shynliairbnbcleaning.com/service-areas?city={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }
}

function breadcrumbSchema(items: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, item], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item,
    })),
  }
}

function serviceSchema(name: string, description: string, path: string, area?: ServiceAreaCity) {
  return {
    "@type": "Service",
    "@id": `${canonicalFor(path)}#service`,
    name,
    description,
    provider: { "@id": "https://shynliairbnbcleaning.com/#business" },
    serviceType: "Airbnb turnover cleaning",
    areaServed: area
      ? { "@type": "City", name: `${area.city}, IL` }
      : serviceAreaCities.map((city) => ({ "@type": "City", name: `${city.city}, IL` })),
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
  }
}

function faqSchema(faqs: [string, string][]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  }
}

function hostProblemGuideItemListSchema() {
  return {
    "@type": "ItemList",
    "@id": `${canonicalFor(hostProblemGuideHub.path)}#host-problem-guides`,
    name: hostProblemGuideHub.title,
    description: hostProblemGuideHub.description,
    itemListElement: hostProblemGuides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: canonicalFor(guide.path),
    })),
  }
}

function articleSchema(guide: HostProblemGuide) {
  const articleDate = guide.publishedDate ?? "2026-06-08"

  return {
    "@type": "BlogPosting",
    "@id": `${canonicalFor(guide.path)}#article`,
    headline: guide.headline,
    name: guide.title,
    description: guide.description,
    datePublished: articleDate,
    dateModified: articleDate,
    articleSection: "Airbnb host cleaning guides",
    keywords: guide.keywords,
    mainEntityOfPage: canonicalFor(guide.path),
    author: {
      "@type": "Organization",
      name: "SHYNLI LLC",
      url: "https://shynli.com/",
    },
    publisher: { "@id": "https://shynliairbnbcleaning.com/#business" },
    about: [
      {
        "@type": "Thing",
        name: "Airbnb turnover cleaning",
      },
      {
        "@type": "Thing",
        name: "Short-term rental hosting",
      },
    ],
  }
}

function citySlugFor(city: string) {
  return city.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-")
}

function getNearbyCities(city: ServiceAreaCity, limit = 5) {
  const group = serviceAreaGroups.find((item) => item.label === city.group)
  if (!group) return serviceAreaCities.filter((item) => item.slug !== city.slug).slice(0, limit)

  const cityIndex = group.cities.indexOf(city.city)
  const ordered = group.cities
    .map((name, index) => ({ name, distance: Math.abs(index - cityIndex) }))
    .filter((item) => item.name !== city.city)
    .sort((a, b) => a.distance - b.distance || a.name.localeCompare(b.name))

  return ordered.slice(0, limit).map((item) => ({
    city: item.name,
    slug: citySlugFor(item.name),
    group: city.group,
  }))
}

function getCityProfile(city: ServiceAreaCity) {
  const nearby = getNearbyCities(city)
  const groupContext: Record<string, string> = {
    "A-D": "For hosts in this part of the service map, the quote should start with exact ZIP, parking, access, and guest timing because short drives can still turn into tight turnover windows.",
    "E-L": "Many hosts in this service band need a cleaner who can follow building access, linen storage, and supply notes without the host driving over between stays.",
    "M-S": "This area often works best when the host sends the route ZIP, checkout time, check-in time, laundry expectations, and photo handoff needs before the booking is trusted.",
    "V-Y": "For listings in this part of the map, nearby coverage is useful only when the property size, access, linens, and route timing all fit the next guest arrival.",
  }
  const scenarioOptions = [
    "back-to-back weekend stays",
    "remote host inspections",
    "condo and townhouse turnovers",
    "family-size rental resets",
    "guest-suite check-in prep",
    "repeat host cleanings",
  ]
  const scenario = scenarioOptions[serviceAreaCities.findIndex((item) => item.slug === city.slug) % scenarioOptions.length]

  return {
    scenario,
    localFit: groupContext[city.group],
    pricing: `A ${city.city} quote should reflect the exact listing, not only the city name: rooms, bathrooms, checkout/check-in gap, access, parking, laundry, supply list, photo handoff, and how the previous guest left the home.`,
    nearby,
  }
}

function SeoHeader() {
  return (
    <header className="border-b border-[#dddddd] bg-white px-4 py-5 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a href="/" className="flex min-h-11 items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-[#d7043f] text-white">
            <KeyRound className="size-5" />
          </span>
          <span className="leading-none">
            <span className="block font-black">ShynliAirbnbCleaning.com</span>
            <span className="mt-1 block text-xs font-black text-[#d7043f]">Airbnb turnover cleaning</span>
          </span>
        </a>
        <nav className="flex flex-wrap items-center gap-3 text-sm font-black text-[#717171]" aria-label="Site navigation">
          <a href="/service-areas/" className="hover:text-[#222222]">Service areas</a>
          <a href="/airbnb-cleaning-cost/" className="hover:text-[#222222]">Cost</a>
          <a href="/airbnb-cleaning-checklist/" className="hover:text-[#222222]">Checklist</a>
          <a href="/host-problem-guides/" className="hover:text-[#222222]">Guides</a>
          <a href="/faq/" className="hover:text-[#222222]">FAQ</a>
          <Button asChild className="h-11 rounded-full bg-[#d7043f] px-5 font-black text-white shadow-none hover:bg-[#b51645]">
            <a href={quoteUrl}>Get quote</a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

function SeoFooter() {
  return (
    <footer className="border-t border-[#dddddd] bg-white px-4 py-10 text-[#222222] md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#d7043f] text-white">
              <KeyRound className="size-5" />
            </span>
            <p className="font-black">ShynliAirbnbCleaning.com</p>
          </div>
          <p className="mt-4 max-w-md text-sm font-bold leading-6 text-[#717171]">
            Airbnb, short-term rental, and vacation rental turnover cleaning across the Shynli service map.
          </p>
          <Button asChild className="mt-5 h-11 rounded-full bg-[#d7043f] px-5 font-black text-white shadow-none hover:bg-[#b51645]">
            <a href={quoteUrl}>
              Check availability
              <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>
        <div className="grid gap-8 text-sm font-bold text-[#717171] sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-black text-[#222222]">Turnover help</h3>
            <div className="mt-4 grid gap-3">
              <a href="/airbnb-cleaning/" className="hover:text-[#222222]">Airbnb cleaning</a>
              <a href="/short-term-rental-cleaning/" className="hover:text-[#222222]">Short-term rental cleaning</a>
              <a href="/vacation-rental-cleaning/" className="hover:text-[#222222]">Vacation rental cleaning</a>
              <a href="/airbnb-turnover-cleaning/" className="hover:text-[#222222]">Turnover cleaning</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-[#222222]">Host questions</h3>
            <div className="mt-4 grid gap-3">
              <a href="/airbnb-cleaning-cost/" className="hover:text-[#222222]">Cleaning cost</a>
              <a href="/airbnb-cleaning-checklist/" className="hover:text-[#222222]">Checklist</a>
              <a href="/host-problem-guides/" className="hover:text-[#222222]">Host guides</a>
              <a href="/what-is-included-in-airbnb-cleaning/" className="hover:text-[#222222]">What is included</a>
              <a href="/faq/" className="hover:text-[#222222]">FAQ</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-black text-[#222222]">Company</h3>
            <div className="mt-4 grid gap-3">
              <a href="/service-areas/" className="hover:text-[#222222]">Service areas</a>
              <a href="https://shynli.com/" className="hover:text-[#222222]">Main Shynli site</a>
              <a href={quoteUrl} className="hover:text-[#222222]">Request a quote</a>
              <a href="/privacy-policy/" className="hover:text-[#222222]">Privacy Policy</a>
              <a href="/terms-of-service/" className="hover:text-[#222222]">Terms of Service</a>
              <a href="/cancellation-policy/" className="hover:text-[#222222]">Cancellation Policy</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-[#dddddd] pt-5 text-sm font-bold text-[#717171] md:flex-row md:items-center md:justify-between">
        <p>© 2026 ShynliAirbnbCleaning.com. A Shynli service concept.</p>
        <p>All quote requests route through Shynli Cleaning Service.</p>
      </div>
    </footer>
  )
}

function SeoCtaBand({ city, serviceLabel }: { city?: ServiceAreaCity; serviceLabel?: string }) {
  const headline = city
    ? `Request ${serviceLabel ? `${serviceLabel.toLowerCase()} ` : ""}availability in ${city.city}.`
    : "Send the ZIP, guest times, and scope. We will tell you what is realistic."
  const href = quoteUrl

  return (
    <section className="bg-[#d7043f] px-4 py-14 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-black">Ready to check the turnover window?</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black leading-[0.98] md:text-6xl">
            {headline}
          </h2>
        </div>
        <Button asChild className="h-13 rounded-full bg-white px-6 text-base font-black text-[#222222] shadow-none hover:bg-[#f7f7f7]">
          <a href={href}>{city ? `Request ${city.city} quote` : "Check availability"}</a>
        </Button>
      </div>
    </section>
  )
}

function HostProblemGuidesHubPage() {
  usePageMeta(hostProblemGuideHub.metaTitle, hostProblemGuideHub.description, hostProblemGuideHub.path, hostProblemGuideHub.keywords, true)
  useStructuredData("host-problem-guides", [
    businessSchema(),
    hostProblemGuideItemListSchema(),
    breadcrumbSchema([
      ["Home", "https://shynliairbnbcleaning.com"],
      [hostProblemGuideHub.title, canonicalFor(hostProblemGuideHub.path)],
    ]),
  ])

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <SeoHeader />
      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-[1680px] gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:items-center">
          <div className="max-w-5xl">
            <p className="text-sm font-black text-[#d7043f]">{hostProblemGuideHub.eyebrow}</p>
            <h1 className="mt-4 text-[clamp(3.5rem,6.4vw,7.8rem)] font-black leading-[0.9] tracking-normal">{hostProblemGuideHub.headline}</h1>
            <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#717171]">{hostProblemGuideHub.intro}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              <ShynliBadge>{`${hostProblemGuides.length} practical guides`}</ShynliBadge>
              <ShynliBadge>Built from host questions</ShynliBadge>
              <ShynliBadge>Chicago suburbs context</ShynliBadge>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="relative min-h-[430px] overflow-hidden rounded-[28px] bg-[#222222] text-white shadow-[0_20px_70px_rgba(0,0,0,0.18)]">
              <ResponsiveSiteImage
                image={airbnbSiteImages.window}
                className="absolute inset-0 opacity-78"
                imageClassName="h-full w-full object-cover object-[50%_58%]"
                sizes="(min-width: 1280px) 44vw, 100vw"
                loading="eager"
                fetchPriority="high"
                decorative
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,34,34,0.03)_0%,rgba(34,34,34,0.24)_44%,rgba(34,34,34,0.9)_100%)]" />
              <div className="relative z-10 flex min-h-[430px] flex-col justify-end p-6 md:p-8">
                <p className="text-sm font-black text-[#ffb3c1]">Turnover field notes</p>
                <h2 className="mt-3 max-w-xl text-4xl font-black leading-[0.96] md:text-5xl">
                  From late checkout to property surprises.
                </h2>
                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {["Late checkout", "Pest report", "Left items", "Heavy mess"].map((item) => (
                    <span key={item} className="min-h-10 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-black text-white backdrop-blur-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [String(hostProblemGuides.length), "host guides"],
                ["Real", "host questions"],
                ["Fast", "availability check"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[22px] border border-[#dddddd] bg-white p-5">
                  <p className="text-4xl font-black leading-none text-[#d7043f]">{value}</p>
                  <p className="mt-2 text-sm font-black text-[#717171]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dddddd] bg-[#f7f7f7] px-4 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-[1680px] gap-4 lg:grid-cols-5">
          {hostProblemGuides.map((guide) => (
            <a key={guide.path} href={routeHref(guide.path)} className="group flex min-h-[360px] flex-col rounded-[24px] border border-[#dddddd] bg-white p-5 transition-colors hover:border-[#d7043f]">
              <p className="text-sm font-black text-[#d7043f]">{guide.eyebrow}</p>
              <h2 className="mt-4 text-2xl font-black leading-tight">{guide.title}</h2>
              <p className="mt-4 text-sm font-bold leading-6 text-[#717171]">{guide.targetQuestion}</p>
              <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-black text-[#d7043f]">
                Read guide
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1680px] gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black text-[#d7043f]">Why these guides</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">
              Built for real turnover questions.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Tight timing", "What to do when checkout, check-in, route timing, early arrivals, or cleaner workload creates risk."],
              ["Guest-sensitive details", "How to handle pet hair, smoke odor, stained linens, left items, and cleanliness complaints."],
              ["Cleaner handoff", "What to send before the first clean so access, supplies, linens, and notes are clear."],
              ["Quality control", "How to verify cleaning without turning every turnover into micromanagement."],
              ["Property surprises", "How to respond when pests, heavy mess, or longer stays change the normal cleaning plan."],
              ["Local operations", "How these problems show up for hosts across Naperville and nearby Chicago suburbs."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[24px] border border-[#dddddd] bg-white p-6">
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-3 text-base font-bold leading-7 text-[#717171]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SeoCtaBand />
      <SeoFooter />
    </main>
  )
}

function HostProblemGuidePage({ guide }: { guide: HostProblemGuide }) {
  usePageMeta(guide.metaTitle, guide.description, guide.path, guide.keywords, true)
  useStructuredData(`host-problem-guide-${guide.path}`, [
    businessSchema(),
    articleSchema(guide),
    breadcrumbSchema([
      ["Home", "https://shynliairbnbcleaning.com"],
      [hostProblemGuideHub.title, canonicalFor(hostProblemGuideHub.path)],
      [guide.title, canonicalFor(guide.path)],
    ]),
  ])

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <SeoHeader />
      <article>
        <section className="px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-black text-[#d7043f]">{guide.eyebrow}</p>
              <h1 className="mt-4 text-5xl font-black leading-[0.94] md:text-7xl">{guide.headline}</h1>
              <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#717171]">{guide.intro}</p>
            </div>
            <aside className="rounded-[28px] border border-[#dddddd] bg-[#f7f7f7] p-6">
              <p className="text-sm font-black text-[#d7043f]">Direct answer</p>
              <p className="mt-4 text-2xl font-black leading-tight">{guide.quickAnswer}</p>
              <div className="mt-6 rounded-[20px] bg-white p-5">
                <p className="text-sm font-black text-[#222222]">Target question</p>
                <p className="mt-3 text-base font-bold leading-7 text-[#717171]">{guide.targetQuestion}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-[#dddddd] bg-[#f7f7f7] px-4 py-10 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black text-[#d7043f]">What hosts are asking</p>
            <p className="mt-3 max-w-4xl text-xl font-black leading-8">{guide.redditSignal}</p>
          </div>
        </section>

        <section className="px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.74fr_1.26fr]">
            <div className="lg:sticky lg:top-24">
              <p className="text-sm font-black text-[#d7043f]">Practical guide</p>
              <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">How to handle it without turning the turnover into chaos.</h2>
            </div>
            <div className="grid gap-8">
              {guide.sections.map((section, index) => (
                <section key={section.heading} className="border-t border-[#dddddd] pt-8 first:border-t-0 first:pt-0">
                  <p className="text-sm font-black text-[#d7043f]">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-3xl font-black leading-tight">{section.heading}</h3>
                  <p className="mt-4 text-lg font-bold leading-8 text-[#717171]">{section.body}</p>
                  {section.bullets ? (
                    <ul className="mt-5 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="grid grid-cols-[12px_1fr] gap-3 text-base font-bold leading-7 text-[#717171]">
                          <span className="mt-3 size-1.5 rounded-full bg-[#d7043f]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#dddddd] bg-[#f7f7f7] px-4 py-14 md:px-8 md:py-18">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr]">
            <div>
              <p className="text-sm font-black text-[#d7043f]">Checklist</p>
              <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">{guide.checklistTitle}</h2>
            </div>
            <div className="grid gap-3">
              {guide.checklist.map((item) => (
                <div key={item} className="rounded-[20px] border border-[#dddddd] bg-white p-5 text-base font-black leading-7">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-black text-[#d7043f]">Keep reading</p>
              <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">Keep the cleaning plan connected.</h2>
              <p className="mt-5 text-lg font-bold leading-8 text-[#717171]">{guide.cta}</p>
              <Button asChild className="mt-6 h-12 rounded-full bg-[#d7043f] px-5 font-black text-white shadow-none hover:bg-[#b51645]">
                <a href={quoteUrl}>
                  Request turnover quote
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
            <div className="grid gap-3">
              <a href={routeHref(hostProblemGuideHub.path)} className="group flex min-h-16 items-center justify-between rounded-[22px] border border-[#dddddd] bg-white px-5 font-black transition-colors hover:border-[#d7043f]">
                <span>All host guides</span>
                <ArrowRight className="size-4 text-[#d7043f] transition-transform group-hover:translate-x-1" />
              </a>
              {guide.internalLinks.map((link) => (
                <a key={link.path} href={routeHref(link.path)} className="group rounded-[22px] border border-[#dddddd] bg-white p-5 transition-colors hover:border-[#d7043f]">
                  <span className="flex items-center justify-between gap-4 font-black">
                    {link.title}
                    <ArrowRight className="size-4 text-[#d7043f] transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-3 block text-sm font-bold leading-6 text-[#717171]">{link.note}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </article>
      <SeoFooter />
    </main>
  )
}

function SeoHubPage({ page }: { page: SeoHubPageData }) {
  usePageMeta(page.title, page.description, page.path)
  useStructuredData(`hub-${page.path}`, [
    businessSchema(),
    serviceSchema(page.title, page.description, page.path),
    breadcrumbSchema([
      ["Home", "https://shynliairbnbcleaning.com"],
      [page.title, canonicalFor(page.path)],
    ]),
  ])

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <SeoHeader />
      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-[#d7043f]">{page.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.94] md:text-7xl">{page.headline}</h1>
            <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#717171]">{page.intro}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {page.promises.map((promise) => (
                <ShynliBadge key={promise}>{promise}</ShynliBadge>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-[#dddddd] bg-[#f7f7f7] shadow-[0_20px_70px_rgba(0,0,0,0.10)]">
            <ResponsiveSiteImage
              image={airbnbSiteImages.hero}
              alt="Guest-ready Airbnb bedroom after turnover cleaning"
              imageClassName="h-[420px] w-full object-cover"
              sizes="(min-width: 1024px) 54vw, 100vw"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#dddddd] bg-[#f7f7f7] px-4 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {page.sections.map(([title, copy]) => (
            <Card key={title} className="rounded-[24px] border-[#dddddd] bg-white shadow-none">
              <CardContent className="p-6">
                <p className="text-sm font-black text-[#d7043f]">{title}</p>
                <p className="mt-4 text-xl font-black leading-tight">{copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-black text-[#d7043f]">Before you book</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">
              The quote should answer the host questions first.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Timing", "What are checkout and check-in times, and is the turnover window realistic?"],
              ["Access", "How will the cleaner enter, park, handle building rules, and reach supplies?"],
              ["Linens", "Are clean sets ready, where do used linens go, and is laundry part of the scope?"],
              ["Proof", "Do you want photos, supply notes, issue notes, or a ready-status handoff?"],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-[24px] border border-[#dddddd] bg-white p-6">
                <h3 className="text-2xl font-black">{title}</h3>
                <p className="mt-3 text-base font-bold leading-7 text-[#717171]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dddddd] bg-[#f7f7f7] px-4 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black text-[#d7043f]">Host guides</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">
              Practical fixes for the cleaning problems hosts keep running into.
            </h2>
            <a href={routeHref(hostProblemGuideHub.path)} className="mt-6 inline-flex min-h-11 items-center rounded-full border border-[#dddddd] bg-white px-5 text-sm font-black transition-colors hover:border-[#d7043f] hover:text-[#d7043f]">
              View all host guides
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {hostProblemGuides.map((guide) => (
              <a key={guide.path} href={routeHref(guide.path)} className="group flex min-h-16 items-center justify-between rounded-[22px] border border-[#dddddd] bg-white px-5 font-black transition-colors hover:border-[#d7043f]">
                <span>{guide.title}</span>
                <ArrowRight className="size-4 shrink-0 text-[#d7043f] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dddddd] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black text-[#d7043f]">Related host questions</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">Keep moving through the host questions.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {getRelatedSeoHubPages(page).map((related) => (
              <a key={related.path} href={routeHref(related.path)} className="group flex min-h-16 items-center justify-between rounded-[22px] border border-[#dddddd] bg-white px-5 font-black transition-colors hover:border-[#d7043f]">
                <span>{related.title}</span>
                <ArrowRight className="size-4 text-[#d7043f] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>
      <SeoCtaBand />
      <SeoFooter />
    </main>
  )
}

function ServiceAreasPage() {
  usePageMeta(
    "Airbnb Cleaning Service Areas",
    "Airbnb and short-term rental cleaning service areas for ShynliAirbnbCleaning.com, including Naperville, Aurora, Wheaton, Plainfield, Yorkville, and nearby cities.",
    "/service-areas",
  )
  useStructuredData("service-areas", [
    businessSchema(),
    serviceSchema("Airbnb Cleaning Service Areas", "Airbnb and short-term rental cleaning service areas across the Shynli service map.", "/service-areas"),
    breadcrumbSchema([
      ["Home", "https://shynliairbnbcleaning.com"],
      ["Service Areas", "https://shynliairbnbcleaning.com/service-areas"],
    ]),
  ])

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <SeoHeader />
      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black text-[#d7043f]">Service areas</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.94] md:text-7xl">
            Airbnb turnover cleaning across the Shynli service map.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#717171]">
            Choose your city to see local Airbnb cleaning details. Availability still depends on your exact ZIP, checkout time, check-in time, property size, access, linens, and restocking needs.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {serviceAreaGroups.map((group) => (
              <div key={group.label} className="rounded-[24px] border border-[#dddddd] bg-[#f7f7f7] p-5">
                <p className="text-sm font-black text-[#d7043f]">{group.label}</p>
                <div className="mt-4 grid gap-2">
                  {group.cities.map((city) => {
                    const citySlug = city.toLowerCase().replace(/\./g, "").replace(/\s+/g, "-")

                    return (
                      <a key={city} href={routeHref(`/service-areas/${citySlug}`)} className="flex min-h-11 items-center justify-between rounded-full border border-[#dddddd] bg-white px-4 text-sm font-black transition-colors hover:border-[#d7043f] hover:text-[#d7043f]">
                        {city}
                        <ArrowRight className="size-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dddddd] bg-[#f7f7f7] px-4 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-black text-[#d7043f]">How coverage works</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">
              Your city is the start. The turnover window decides the clean.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#717171]">
              Service-area coverage does not mean every last-minute request is automatically safe. Send the listing ZIP, guest times, access notes, property size, linen plan, and restocking needs so Shynli can confirm whether the route and scope work.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Start with ZIP and timing", "The same city can still have different route, parking, access, and check-in constraints. The quote starts with the exact listing details."],
              ["Choose the closest local page", "Each city page links into Airbnb cleaning, short-term rental cleaning, vacation rental cleaning, and turnover cleaning pages for that location."],
              ["Confirm scope before relying on it", "Linens, laundry, restocking, dishes, exterior areas, and photo handoff should be confirmed before the first booking."],
              ["Protect the next guest experience", "The goal is a clean, stocked, calm arrival: bathrooms ready, beds made, kitchen reset, trash gone, and visible issues reported."],
            ].map(([title, copy]) => (
              <Card key={title} className="rounded-[24px] border-[#dddddd] bg-white shadow-none">
                <CardContent className="p-6">
                  <p className="text-sm font-black text-[#d7043f]">{title}</p>
                  <p className="mt-4 text-lg font-black leading-tight">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <SeoCtaBand />
      <SeoFooter />
    </main>
  )
}

function CityPage({ city }: { city: ServiceAreaCity }) {
  const profile = getCityProfile(city)

  usePageMeta(
    `Airbnb Cleaning Service Area in ${city.city}, IL`,
    `Airbnb and short-term rental cleaning in ${city.city}, IL with turnover timing, guest-ready reset, linen notes, restocking checks, and photo handoff options.`,
    `/service-areas/${city.slug}`,
  )
  useStructuredData(`city-${city.slug}`, [
    businessSchema(),
    serviceSchema(`Airbnb Cleaning Service Area in ${city.city}, IL`, `Airbnb and short-term rental cleaning in ${city.city}, IL with turnover timing, local route checks, linens, restocking, and photo handoff.`, `/service-areas/${city.slug}`, city),
    breadcrumbSchema([
      ["Home", "https://shynliairbnbcleaning.com"],
      ["Service Areas", "https://shynliairbnbcleaning.com/service-areas"],
      [`${city.city}, IL`, canonicalFor(`/service-areas/${city.slug}`)],
    ]),
  ])

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <SeoHeader />
      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black text-[#d7043f]">{city.city}, IL</p>
            <h1 className="mt-4 text-5xl font-black leading-[0.94] md:text-7xl">
              Airbnb cleaning in {city.city} for guest-ready turnovers.
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#717171]">
              If your listing is in {city.city}, start with the turnover window. Shynli can help reset bathrooms, bedrooms, kitchen, floors, trash, guest supplies, and host notes before the next check-in.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <ShynliBadge>{`${city.city} Airbnb cleaning`}</ShynliBadge>
              <ShynliBadge>Short-term rental turnover</ShynliBadge>
              <ShynliBadge>Photo handoff available</ShynliBadge>
            </div>
          </div>
          <div className="rounded-[32px] border border-[#dddddd] bg-[#f7f7f7] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.10)]">
            <div className="rounded-[26px] bg-white p-5">
              <p className="text-sm font-black text-[#d7043f]">Best next step</p>
              <h2 className="mt-3 text-3xl font-black leading-tight">Check whether the route and guest times fit.</h2>
              <p className="mt-4 text-base font-bold leading-7 text-[#717171]">
                Send your ZIP, bedroom/bath count, checkout time, check-in time, access notes, linen expectations, and restocking list. That is what decides whether the clean can be done well.
              </p>
              <Button asChild className="mt-6 h-12 rounded-full bg-[#d7043f] px-5 font-black text-white shadow-none hover:bg-[#b51645]">
                <a href={quoteUrl}>Request {city.city} availability</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#dddddd] bg-[#f7f7f7] px-4 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {[
            ["What hosts ask first", `Can you reach ${city.city}, fit the checkout-to-check-in window, and follow the house notes without creating new stress?`],
            ["What the clean focuses on", "Bathrooms, bedrooms, kitchen, floors, trash, surfaces, towels, guest supplies, and anything that affects arrival comfort."],
            ["What to send for a quote", "ZIP, listing size, guest times, access, parking, linen plan, restocking list, and any photos that show current condition."],
          ].map(([title, copy]) => (
            <Card key={title} className="rounded-[24px] border-[#dddddd] bg-white shadow-none">
              <CardContent className="p-6">
                <p className="text-sm font-black text-[#d7043f]">{title}</p>
                <p className="mt-4 text-xl font-black leading-tight">{copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_1fr]">
          <div className="rounded-[26px] border border-[#dddddd] bg-[#f7f7f7] p-6 md:col-span-2">
            <p className="text-sm font-black text-[#d7043f]">Local relevance</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">{city.city} hosts need more than a city match.</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <p className="text-base font-bold leading-7 text-[#717171]">{profile.localFit}</p>
              <p className="text-base font-bold leading-7 text-[#717171]">
                Common request: {profile.scenario}. The cleaning plan should match the guest clock, not a loose route promise.
              </p>
              <p className="text-base font-bold leading-7 text-[#717171]">{profile.pricing}</p>
            </div>
          </div>
          {cityServicePages.map((service) => (
            <a key={service.slug} href={routeHref(`/service-areas/${city.slug}/${service.slug}`)} className="group rounded-[26px] border border-[#dddddd] bg-white p-6 transition-colors hover:border-[#d7043f]">
              <p className="text-sm font-black text-[#d7043f]">Local service page</p>
              <h2 className="mt-3 text-3xl font-black">{service.label} in {city.city}</h2>
              <p className="mt-4 text-base font-bold leading-7 text-[#717171]">See the local page built around host questions, turnover scope, timing, supplies, and check-in readiness.</p>
              <ArrowRight className="mt-5 size-5 text-[#d7043f] transition-transform group-hover:translate-x-1" />
            </a>
          ))}
          <a href="/service-areas/" className="group rounded-[26px] border border-[#dddddd] bg-white p-6 transition-colors hover:border-[#d7043f]">
            <p className="text-sm font-black text-[#d7043f]">All cities</p>
            <h2 className="mt-3 text-3xl font-black">Back to service areas</h2>
            <p className="mt-4 text-base font-bold leading-7 text-[#717171]">Compare nearby cities and choose the closest page for the listing you want quoted.</p>
            <ArrowRight className="mt-5 size-5 text-[#d7043f] transition-transform group-hover:translate-x-1" />
          </a>
          <div className="rounded-[26px] border border-[#dddddd] bg-white p-6 md:col-span-2">
            <p className="text-sm font-black text-[#d7043f]">Nearby city pages</p>
            <h2 className="mt-3 text-3xl font-black">Compare nearby coverage before you request a quote.</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {profile.nearby.map((nearbyCity) => (
                <a key={nearbyCity.slug} href={routeHref(`/service-areas/${nearbyCity.slug}`)} className="inline-flex min-h-11 items-center rounded-full border border-[#dddddd] px-4 text-sm font-black transition-colors hover:border-[#d7043f] hover:text-[#d7043f]">
                  {nearbyCity.city}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SeoCtaBand city={city} />
      <SeoFooter />
    </main>
  )
}

function CityServicePage({ city, service }: { city: ServiceAreaCity; service: CityServicePageData }) {
  const profile = getCityProfile(city)
  const serviceDescription = fillCityTemplate(service.description, city)
  const servicePath = `/service-areas/${city.slug}/${service.slug}`
  const pageFaqs = service.faqs.map(([question, answer]) => [fillCityTemplate(question, city), fillCityTemplate(answer, city)] as [string, string])

  usePageMeta(
    `${service.title} in ${city.city}, IL`,
    serviceDescription,
    servicePath,
  )
  useStructuredData(`city-service-${city.slug}-${service.slug}`, [
    businessSchema(),
    serviceSchema(`${service.title} in ${city.city}, IL`, serviceDescription, servicePath, city),
    faqSchema(pageFaqs),
    breadcrumbSchema([
      ["Home", "https://shynliairbnbcleaning.com"],
      ["Service Areas", "https://shynliairbnbcleaning.com/service-areas"],
      [`${city.city}, IL`, canonicalFor(`/service-areas/${city.slug}`)],
      [`${service.title} in ${city.city}, IL`, canonicalFor(servicePath)],
    ]),
  ])

  return (
    <main className="min-h-screen bg-white text-[#222222]">
      <SeoHeader />
      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black text-[#d7043f]">{fillCityTemplate(service.eyebrow, city)}</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-black leading-[0.94] md:text-7xl">
            {fillCityTemplate(service.headline, city)}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-bold leading-8 text-[#717171]">
            {fillCityTemplate(service.intro, city)}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {service.promises.map((promise) => (
              <ShynliBadge key={promise}>{promise}</ShynliBadge>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] px-4 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-4">
          {service.steps.map(([title, copy]) => (
            <Card key={title} className="rounded-[24px] border-[#dddddd] bg-white shadow-none">
              <CardContent className="p-6">
                <p className="text-sm font-black text-[#d7043f]">{title}</p>
                <p className="mt-4 text-lg font-black leading-tight">{fillCityTemplate(copy, city)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-black text-[#d7043f]">Host answers</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">What {city.city} hosts usually need to know.</h2>
          </div>
          <div className="grid gap-4">
            {service.faqs.map(([question, answer]) => (
              <div key={question} className="rounded-[24px] border border-[#dddddd] bg-white p-6">
                <h3 className="text-2xl font-black">{question}</h3>
                <p className="mt-3 text-base font-bold leading-7 text-[#717171]">{fillCityTemplate(answer, city)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#dddddd] bg-[#f7f7f7] px-4 py-14 md:px-8 md:py-18">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="text-sm font-black text-[#d7043f]">Local fit and pricing logic</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">
              {service.title} in {city.city} should be quoted from the actual turnover.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#717171]">{profile.localFit}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Likely host scenario", `${city.city} requests often need planning for ${profile.scenario}, especially when checkout and check-in happen on the same day.`],
              ["Pricing logic", profile.pricing],
              ["Local quote details", `Send the ${city.city} listing ZIP, property type, room count, access notes, parking, laundry setup, restocking list, and photos if the last guest left a heavier clean.`],
              ["Nearby comparison", `If the listing is near another service area, compare ${profile.nearby.slice(0, 3).map((nearbyCity) => nearbyCity.city).join(", ")} and the full service-area map before requesting availability.`],
            ].map(([title, copy]) => (
              <Card key={title} className="rounded-[24px] border-[#dddddd] bg-white shadow-none">
                <CardContent className="p-6">
                  <p className="text-sm font-black text-[#d7043f]">{title}</p>
                  <p className="mt-4 text-lg font-black leading-tight">{copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#dddddd] px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-black text-[#d7043f]">Related {city.city} pages</p>
            <h2 className="mt-4 text-4xl font-black leading-[0.98] md:text-6xl">Choose the page closest to the host problem.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a href={routeHref(`/service-areas/${city.slug}`)} className="group flex min-h-16 items-center justify-between rounded-[22px] border border-[#dddddd] bg-white px-5 font-black transition-colors hover:border-[#d7043f]">
              <span>{city.city} service area</span>
              <ArrowRight className="size-4 text-[#d7043f] transition-transform group-hover:translate-x-1" />
            </a>
            {cityServicePages.filter((related) => related.slug !== service.slug).map((related) => (
              <a key={related.slug} href={routeHref(`/service-areas/${city.slug}/${related.slug}`)} className="group flex min-h-16 items-center justify-between rounded-[22px] border border-[#dddddd] bg-white px-5 font-black transition-colors hover:border-[#d7043f]">
                <span>{related.label} in {city.city}</span>
                <ArrowRight className="size-4 text-[#d7043f] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
            {profile.nearby.slice(0, 3).map((nearbyCity) => (
              <a key={nearbyCity.slug} href={routeHref(`/service-areas/${nearbyCity.slug}/${service.slug}`)} className="group flex min-h-16 items-center justify-between rounded-[22px] border border-[#dddddd] bg-white px-5 font-black transition-colors hover:border-[#d7043f]">
                <span>{service.label} in {nearbyCity.city}</span>
                <ArrowRight className="size-4 text-[#d7043f] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
            <a href="/service-areas/" className="group flex min-h-16 items-center justify-between rounded-[22px] border border-[#dddddd] bg-white px-5 font-black transition-colors hover:border-[#d7043f]">
              <span>All service areas</span>
              <ArrowRight className="size-4 text-[#d7043f] transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
      <SeoCtaBand city={city} serviceLabel={service.label} />
      <SeoFooter />
    </main>
  )
}

function useSeoMeta(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    document.title = "ShynliAirbnbCleaning.com | Airbnb Turnover Cleaning"

    const description = "Guest-ready Airbnb turnover cleaning with linens, restocking notes, photo handoff, and host-first availability checks."
    const existing = document.querySelector('meta[name="description"]')
    if (existing) {
      existing.setAttribute("content", description)
    } else {
      const meta = document.createElement("meta")
      meta.name = "description"
      meta.content = description
      document.head.append(meta)
    }

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const canonicalHref = canonicalFor("/")
    if (canonical) {
      canonical.href = canonicalHref
    } else {
      const link = document.createElement("link")
      link.rel = "canonical"
      link.href = canonicalHref
      document.head.append(link)
    }
  }, [enabled])
}

type AppProps = {
  initialPath?: string
}

function App({ initialPath }: AppProps = {}) {
  const runtimePath = initialPath ?? window.location.pathname
  const currentPath = runtimePath.replace(/\/$/, "") || "/"
  const legalPage = legalPages[currentPath as keyof typeof legalPages]
  const seoHubPage = seoHubPages.find((page) => page.path === currentPath)
  const hostProblemGuide = hostProblemGuides.find((guide) => guide.path === currentPath)
  const cityServiceMatch = serviceAreaCities.flatMap((city) =>
    cityServicePages.map((service) => ({ city, service, path: `/service-areas/${city.slug}/${service.slug}` })),
  ).find((match) => match.path === currentPath)
  const cityPage = serviceAreaCities.find((city) => currentPath === `/service-areas/${city.slug}`)
  useSeoMeta(currentPath === "/")
  useStructuredData("home", currentPath === "/" ? [
    businessSchema(),
    websiteSchema(),
    serviceSchema("Airbnb Turnover Cleaning", "Guest-ready Airbnb turnover cleaning with linens, restocking notes, photo handoff, and host-first availability checks.", "/"),
    breadcrumbSchema([["Home", "https://shynliairbnbcleaning.com"]]),
  ] : [])

  if (legalPage) return <LegalPage page={legalPage} pathname={currentPath} />
  if (currentPath === hostProblemGuideHub.path) return <HostProblemGuidesHubPage />
  if (hostProblemGuide) return <HostProblemGuidePage guide={hostProblemGuide} />
  if (seoHubPage) return <SeoHubPage page={seoHubPage} />
  if (currentPath === "/service-areas") return <ServiceAreasPage />
  if (cityServiceMatch) return <CityServicePage city={cityServiceMatch.city} service={cityServiceMatch.service} />
  if (cityPage) return <CityPage city={cityPage} />

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#222222]">
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
              ["Guides", "/host-problem-guides/"],
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
              <ResponsiveSiteImage
                image={airbnbSiteImages.hero}
                className="absolute inset-0"
                imageClassName="h-full w-full object-cover object-center"
                sizes="(min-width: 1024px) 52vw, 100vw"
                loading="eager"
                fetchPriority="high"
                decorative
              />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/92 px-4 py-2 text-sm font-black shadow-[0_6px_24px_rgba(0,0,0,0.16)]">
                Guest-ready bedroom
              </div>
            </div>
            <div className="grid gap-2">
              <div className="relative min-h-[255px] overflow-hidden rounded-[28px] bg-[#f7f7f7]">
                <ResponsiveSiteImage
                  image={airbnbSiteImages.secondary}
                  className="absolute inset-0"
                  imageClassName="h-full w-full object-cover object-[50%_44%]"
                  sizes="(min-width: 1024px) 24vw, 100vw"
                  loading="eager"
                  decorative
                />
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
            <ResponsiveSiteImage
              image={airbnbSiteImages.window}
              className="absolute inset-0 opacity-72"
              imageClassName="h-full w-full object-cover object-[50%_58%]"
              sizes="(min-width: 1024px) 52vw, 100vw"
              decorative
            />
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
              <ResponsiveSiteImage
                image={airbnbSiteImages.proof}
                className="absolute inset-0 opacity-82"
                imageClassName="h-full w-full object-cover object-center"
                sizes="(min-width: 1024px) 42vw, 100vw"
                decorative
              />
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

      <section className="border-y border-[#dddddd] bg-[#f7f7f7] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="mb-4 text-sm font-black text-[#d7043f]">Host guides</p>
            <h2 className="text-4xl font-black leading-[0.96] md:text-6xl">
              Find the exact Airbnb cleaning question you are trying to solve.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-[#717171]">
              Use these guides to understand what to book, what to prepare, and which details affect the quote before the next guest arrives.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {seoGuideGroups.map((group) => (
              <div key={group.label} className="rounded-[24px] border border-[#dddddd] bg-white p-5">
                <p className="text-sm font-black text-[#d7043f]">{group.label}</p>
                <div className="mt-4 grid gap-2">
                  {group.pages.map((page) => (
                    <a key={page.path} href={routeHref(page.path)} className="group flex min-h-11 items-center justify-between rounded-full border border-[#dddddd] px-4 text-sm font-black transition-colors hover:border-[#d7043f] hover:text-[#d7043f]">
                      <span>{page.title}</span>
                      <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
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
                    <label key={item} className="cursor-pointer">
                      <input
                        type="checkbox"
                        name="need"
                        value={item}
                        defaultChecked={item === "Cleaning"}
                        className="peer sr-only"
                      />
                      <span className="flex min-h-12 items-center justify-center rounded-full border border-[#dddddd] bg-white px-3 text-sm font-black transition-colors peer-checked:border-[#d7043f] peer-checked:bg-[#d7043f] peer-checked:text-white hover:border-[#d7043f]">
                        {item}
                      </span>
                    </label>
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

export default App
