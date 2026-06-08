export type HostProblemGuideSection = {
  heading: string
  body: string
  bullets?: string[]
}

export type HostProblemGuideLink = {
  title: string
  path: string
  note: string
}

export type HostProblemGuide = {
  path: string
  title: string
  metaTitle: string
  description: string
  keywords: string
  eyebrow: string
  headline: string
  targetQuestion: string
  quickAnswer: string
  intro: string
  redditSignal: string
  sections: HostProblemGuideSection[]
  checklistTitle: string
  checklist: string[]
  internalLinks: HostProblemGuideLink[]
  cta: string
}

export const hostProblemGuideHub = {
  path: "/host-problem-guides",
  title: "Airbnb Host Problem Guides",
  metaTitle: "Airbnb Host Problem Guides | ShynliAirbnbCleaning.com",
  description:
    "Practical Airbnb host cleaning guides for late checkout, missed turnover prevention, cleaner access, quality control, and cleanliness complaints.",
  keywords:
    "Airbnb host cleaning guides, Airbnb turnover problems, short-term rental cleaning questions, Airbnb cleaner checklist, Chicago suburbs Airbnb cleaning",
  eyebrow: "Host problem guides",
  headline: "Airbnb cleaning articles built around the problems hosts actually ask about.",
  intro:
    "These guides are written for short-term rental hosts, co-hosts, and property managers who need fewer surprises between checkout and check-in. Each article answers a specific operational question instead of repeating a generic cleaning checklist.",
}

export const hostProblemGuides: HostProblemGuide[] = [
  {
    path: "/late-checkout-airbnb-cleaning-plan",
    title: "Late Checkout Airbnb Cleaning Plan",
    metaTitle: "Late Checkout Airbnb Cleaning Plan | ShynliAirbnbCleaning.com",
    description:
      "What Airbnb hosts should do when guests check out late and the next check-in is same day, including cleaner communication, priority tasks, and what not to cut.",
    keywords:
      "late checkout Airbnb cleaning, same-day Airbnb turnover plan, Airbnb guest checked out late, short-term rental turnover cleaning, Chicago suburbs Airbnb cleaner",
    eyebrow: "Late checkout",
    headline: "What should hosts do when guests check out late and the next check-in is same day?",
    targetQuestion:
      "What should I do if guests leave late and the cleaner has less time before the next check-in?",
    quickAnswer:
      "Tell the cleaner immediately, confirm the new real window, protect bathrooms, beds, trash, kitchen reset, entry, and guest-facing supplies first, then move non-arrival detail work to a later visit. Do not pretend the original checklist still fits if the guest took part of the turnover window.",
    intro:
      "A late checkout is not just annoying. It changes the labor math. The cleaner loses setup time, laundry time, final walk-through time, and sometimes the calm needed to catch small guest-facing details. Hosts in Naperville, Aurora, Wheaton, Plainfield, and nearby Chicago suburbs should treat a late checkout like a small operations incident: communicate fast, reset priorities, and decide what can safely wait.",
    redditSignal:
      "Hosts repeatedly describe same-day turnovers where the clean ran late, restocking was missed, or the next guest noticed the problem before the host did.",
    sections: [
      {
        heading: "Start by updating the cleaner, not by hoping it works out",
        body:
          "The first move is a short, clear message: guests are still inside, the new access time is unknown or changed, the next check-in time is still fixed, and the cleaner should confirm what scope still fits. This protects everyone from working from the wrong schedule. If the cleaner arrives and cannot enter, the problem becomes bigger: waiting time, route delay, and a rushed reset.",
        bullets: [
          "Send the exact checkout delay as soon as you know it.",
          "Confirm whether the cleaner should wait, leave and return, or start later.",
          "Share the next guest check-in time again so the priority is clear.",
          "Tell the cleaner about any guest message that hints at extra mess, pets, stains, or heavy trash.",
        ],
      },
      {
        heading: "Protect the tasks the next guest will notice first",
        body:
          "When the window shrinks, the checklist should become more focused, not more chaotic. Bathrooms, beds, towels, trash, kitchen surfaces, floors in main traffic areas, entry condition, odors, and promised supplies matter most because the next guest experiences them immediately. Detail tasks are still important, but they should not steal time from arrival readiness.",
        bullets: [
          "Bathrooms should be cleaned, restocked, and checked for hair, used towels, and visible residue.",
          "Beds should be remade with clean linens and enough time for a quick visual check.",
          "Kitchen counters, sink, fridge front, trash, and obvious crumbs should be handled before cosmetic extras.",
          "Entry, living room, and main floors should feel clean when the guest opens the door.",
        ],
      },
      {
        heading: "Know what not to cut",
        body:
          "A late checkout can tempt a host to cut corners, but some shortcuts create bigger risk than they save. Skipping bathroom detail, rushing linen changes, ignoring trash, or leaving supplies unchecked can create a cleanliness complaint even if the listing technically looks staged in photos. If the window is too tight, be honest about what can be completed before check-in.",
        bullets: [
          "Do not skip linen changes unless the listing is blocked and the bed was unused, which is rare.",
          "Do not leave trash, used towels, or guest food behind.",
          "Do not treat photos as proof of cleanliness if there was no time for a real final check.",
          "Do not hide timing risk from the incoming guest if arrival may be affected.",
        ],
      },
      {
        heading: "Move detail work into a recovery clean",
        body:
          "Late checkout often means the cleaner can protect the next arrival, but not complete every deeper task. Create a recovery clean list for the next open window: inside fridge detail, baseboards, under furniture, oven touch-ups, cabinet fronts, patio reset, or extra laundry catch-up. This keeps the turnover honest without letting the property slowly drift below the listing photos.",
      },
      {
        heading: "For Chicago suburbs hosts, route timing matters",
        body:
          "A cleaner serving Naperville, Bolingbrook, Downers Grove, Aurora, or Yorkville may have more than one turnover in a day. A late checkout at one property can affect the next route stop. If your listing has frequent back-to-back bookings, build your house rules and cleaner plan around a realistic buffer, not the tightest possible calendar.",
      },
    ],
    checklistTitle: "Late checkout message to send your cleaner",
    checklist: [
      "Guest is still inside or left at [time].",
      "Next guest check-in is [time] and cannot move / may move.",
      "Access will be available through [lockbox, smart lock, building desk, garage].",
      "Highest priorities are bathrooms, beds, trash, kitchen, floors, entry, supplies, and ready-status photos.",
      "Please tell me what cannot fit so I can schedule detail work later.",
    ],
    internalLinks: [
      {
        title: "Same-Day Airbnb Turnover",
        path: "/same-day-airbnb-turnover",
        note: "Use this for the broader timing reality check before accepting back-to-back stays.",
      },
      {
        title: "Airbnb Turnover Checklist",
        path: "/airbnb-turnover-checklist",
        note: "Use this to define normal priorities before a late checkout compresses the window.",
      },
      {
        title: "Airbnb Cleaning Before Check-In",
        path: "/airbnb-cleaning-before-check-in",
        note: "Use this when the next guest arrival is the main risk.",
      },
    ],
    cta:
      "If your listing is in the Chicago suburbs and late checkout keeps turning into a rushed clean, send Shynli the ZIP, checkout time, check-in time, access notes, linen plan, and what must be guest-ready. We can help confirm whether the window is realistic before you rely on it.",
  },
  {
    path: "/airbnb-turnover-backup-plan",
    title: "Airbnb Turnover Backup Plan",
    metaTitle: "Airbnb Turnover Backup Plan | ShynliAirbnbCleaning.com",
    description:
      "How Airbnb hosts can build a backup cleaning plan so missed turnovers, calendar errors, cleaner illness, and access problems do not become guest check-in emergencies.",
    keywords:
      "Airbnb turnover backup plan, missed Airbnb cleaning, Airbnb cleaner backup, short-term rental cleaning system, Airbnb host cleaning plan",
    eyebrow: "Backup plan",
    headline: "How to build a backup plan so an Airbnb turnover does not get missed.",
    targetQuestion:
      "How do I make sure my cleaner never misses a turnover or misunderstands the schedule?",
    quickAnswer:
      "Use a shared calendar, cleaner-specific access, written scope, confirmation messages, backup cleaner coverage, and a same-day escalation rule. A good backup plan does not depend on memory or one person seeing one text.",
    intro:
      "A missed turnover is one of the fastest ways to turn a good listing into an emergency. The guest does not care whether the calendar sync failed, the cleaner got sick, the lock code changed, or the host forgot to send the new booking. The home is either ready or it is not. Hosts around Naperville and the western Chicago suburbs need a system that makes the clean visible before check-in day.",
    redditSignal:
      "Hosts ask how to make sure cleaners never miss a turnover, and common answers center on calendars, confirmations, backups, access codes, and cleaner reports.",
    sections: [
      {
        heading: "Put every turnover in one source of truth",
        body:
          "Do not rely on scattered texts, screenshots, or memory. Use one shared calendar or turnover platform where checkout, check-in, property address, access notes, and scope live together. The cleaner should be able to see the booking without searching a long message thread. If you manage more than one listing, label each property clearly and avoid nickname confusion.",
        bullets: [
          "Include checkout time, check-in time, property address, parking, and entry method.",
          "Add the linen and restocking scope inside the event, not in a separate forgotten message.",
          "Update changed bookings immediately instead of waiting until the day before.",
          "Use recurring property notes for trash, supplies, and building rules.",
        ],
      },
      {
        heading: "Require confirmation before the turnover day",
        body:
          "A calendar invite is useful, but confirmation closes the loop. Ask for a simple yes from the cleaner the day before or morning of the turnover, especially for weekend bookings and same-day arrivals. If there is no confirmation by a set time, your backup plan starts. This feels strict, but it is calmer than discovering a missed clean at 3 PM.",
      },
      {
        heading: "Create a backup cleaner path before you need it",
        body:
          "Backup coverage should be planned while everything is calm. Identify who can cover emergency resets, what scope they can realistically handle, and how they will access the property. A backup cleaner does not need to know every preference on day one, but they need enough information to protect guest arrival basics.",
        bullets: [
          "Keep a short emergency checklist for each property.",
          "Store backup linen and supply locations clearly.",
          "Make sure emergency access does not depend on the primary cleaner.",
          "Know the extra cost for last-minute work before it happens.",
        ],
      },
      {
        heading: "Use cleaner-specific access whenever possible",
        body:
          "A dedicated smart-lock code or trackable access method helps you see whether the cleaner entered the property. It also prevents confusion when guest codes change. If the building uses a front desk, lockbox, garage, or key pickup, write that process in plain steps and include who to contact if access fails.",
      },
      {
        heading: "Make the final ready status explicit",
        body:
          "The turnover is not complete when the cleaner leaves; it is complete when the host has a clear ready status. That can be a short message with photos, issue notes, low-supply notes, and whether anything needs attention before check-in. If there is a problem, the host still has time to act.",
      },
    ],
    checklistTitle: "Backup turnover system",
    checklist: [
      "Shared calendar or turnover app with every booking.",
      "Written property notes for access, supplies, linens, trash, and photos.",
      "Cleaner confirmation deadline before each turnover.",
      "Backup cleaner or backup company identified in advance.",
      "Cleaner-specific lock code or access trail where possible.",
      "Ready-status message after the clean.",
    ],
    internalLinks: [
      {
        title: "Airbnb Cleaning for Remote Hosts",
        path: "/airbnb-cleaning-for-remote-hosts",
        note: "Use this if you cannot personally inspect every turnover.",
      },
      {
        title: "Airbnb Cleaning With Photo Report",
        path: "/airbnb-cleaning-with-photo-report",
        note: "Use this to define what proof and notes you want after each clean.",
      },
      {
        title: "Cleaning for Property Managers",
        path: "/cleaning-for-property-managers",
        note: "Use this when you manage more than one listing or co-host for owners.",
      },
    ],
    cta:
      "If missed turnovers are your biggest host fear, Shynli can help turn the clean into a clearer handoff: route fit, access notes, scope, linen expectations, photo notes, and ready status for listings across the local service map.",
  },
  {
    path: "/airbnb-cleaner-access-instructions",
    title: "Airbnb Cleaner Access Instructions",
    metaTitle: "Airbnb Cleaner Access Instructions | ShynliAirbnbCleaning.com",
    description:
      "What Airbnb hosts should share before the first turnover: lock codes, parking, building access, supply storage, trash rules, linen location, and emergency contact details.",
    keywords:
      "Airbnb cleaner access instructions, Airbnb cleaning access code, Airbnb turnover instructions, short-term rental cleaner notes, Airbnb host cleaning setup",
    eyebrow: "Cleaner access",
    headline: "Airbnb cleaner access instructions: what hosts should share before the first turnover.",
    targetQuestion:
      "What should I send my cleaner so they can enter the property and complete the turnover without calling me ten times?",
    quickAnswer:
      "Send one clean access note with entry method, parking, building rules, supply locations, linen locations, trash rules, Wi-Fi or alarm notes if relevant, and emergency contacts. The best access instructions prevent delays before the cleaner ever reaches the door.",
    intro:
      "Access problems are easy to underestimate. The cleaner may be ready, the booking may be on the calendar, and the guest may be arriving soon, but a wrong code or unclear parking rule can break the whole turnover. This is especially common in condos, townhomes, apartment-style rentals, and buildings with front desk or garage access in the Chicago suburbs.",
    redditSignal:
      "New hosts often ask what questions to ask cleaners, how to handle storage, how restocking works, and how cleaners should access supplies and laundry.",
    sections: [
      {
        heading: "Write access like the cleaner has never seen the property",
        body:
          "A good access note is boring in the best way. It tells the cleaner exactly where to go, how to enter, what to do if the first method fails, and where to find everything needed for the turnover. Do not assume the cleaner remembers a verbal walkthrough or a detail buried in an old text.",
        bullets: [
          "Street address plus unit number, building name, and any gate or call-box instructions.",
          "Parking location, permit rules, loading zone limits, garage height, or towing risk.",
          "Smart-lock code, lockbox location, key pickup, or front desk process.",
          "Alarm instructions if an alarm is active during cleaning.",
        ],
      },
      {
        heading: "Separate guest access from cleaner access",
        body:
          "Cleaner-specific access is cleaner operationally and safer for the listing. It helps you track entry, change cleaner access without changing guest codes, and avoid confusion when guest codes are scheduled around check-in. If your lock supports it, create a dedicated cleaner code and keep it updated.",
      },
      {
        heading: "Tell the cleaner where supplies live",
        body:
          "Restocking only works when supplies are visible and rules are clear. If toilet paper is in one closet, coffee is in another, towels are in a locked owner cabinet, and trash bags are under the sink, write that down. Also say what not to touch. Many host-cleaner conflicts come from unclear owner closet boundaries.",
        bullets: [
          "Clean linen storage and used linen drop location.",
          "Paper goods, soaps, trash bags, dishwasher tabs, coffee, and guest toiletries.",
          "Extra towels, blankets, pillow protectors, and mattress protectors.",
          "Locked closets, owner-only items, and supplies that should be reported but not used.",
        ],
      },
      {
        heading: "Add trash, laundry, and building rules",
        body:
          "Trash and laundry can consume more turnover time than expected. Include dumpster location, trash room codes, recycling rules, laundry room access, washer/dryer instructions, lint trap expectations, and what to do with stained items. This matters even more in multi-unit buildings and properties with HOA rules.",
      },
      {
        heading: "Keep a short emergency line",
        body:
          "The cleaner should know who to contact if the code fails, the guest has not left, water is leaking, the alarm is active, or supplies are locked away. A simple escalation contact prevents a small access problem from becoming a missed check-in.",
      },
    ],
    checklistTitle: "First-turnover access note",
    checklist: [
      "Exact address, unit, gate, and building instructions.",
      "Parking, garage, front desk, or permit rules.",
      "Cleaner-specific lock code or lockbox steps.",
      "Linen, supply, and used-laundry locations.",
      "Trash, recycling, and dumpster instructions.",
      "Alarm, pet, camera, and owner-closet notes.",
      "Emergency contact for access or guest checkout problems.",
    ],
    internalLinks: [
      {
        title: "How to Prepare for an Airbnb Cleaner",
        path: "/how-to-prepare-for-airbnb-cleaner",
        note: "Use this for the broader host preparation checklist.",
      },
      {
        title: "Airbnb Cleaning Supply Check",
        path: "/airbnb-cleaning-supply-check",
        note: "Use this to define guest essentials and low-stock reporting.",
      },
      {
        title: "Airbnb Linen Service",
        path: "/airbnb-linen-service",
        note: "Use this to clarify clean sets, used sets, and bed setup.",
      },
    ],
    cta:
      "If you want a smoother first clean, send Shynli the access note before the walkthrough or quote. Clear entry, parking, linen, supply, and trash instructions make the turnover easier to plan and easier to repeat.",
  },
  {
    path: "/airbnb-cleaning-quality-control",
    title: "Airbnb Cleaning Quality Control",
    metaTitle: "Airbnb Cleaning Quality Control | ShynliAirbnbCleaning.com",
    description:
      "How Airbnb hosts can quality-control cleaning without micromanaging the cleaner, including first-clean checks, photos, spot checks, guest feedback, and cleaner standards.",
    keywords:
      "Airbnb cleaning quality control, verify Airbnb cleaner, Airbnb cleaning photos, short-term rental cleaning standards, Airbnb host cleaner checklist",
    eyebrow: "Quality control",
    headline: "How to quality-control an Airbnb cleaning without micromanaging the cleaner.",
    targetQuestion:
      "How do I verify my cleaner actually did a good job before guests arrive?",
    quickAnswer:
      "Define the standard, check the first few cleans more closely, request useful photos, spot-check the details photos miss, and turn repeated misses into checklist updates. Quality control works best as a system, not as emotional second-guessing after every turnover.",
    intro:
      "Hosts want confidence, not drama. A cleaner does not need to be watched every minute, but the host still needs a way to know whether bathrooms, beds, kitchen, floors, supplies, and guest-facing details are actually ready. The goal is to create a fair standard that protects the next guest experience and gives the cleaner a clear target.",
    redditSignal:
      "Hosts point out that photos can show staging but not always cleanliness, and many recommend first-clean inspections, spot checks, detailed checklists, and feedback loops.",
    sections: [
      {
        heading: "Start with the standard, not the complaint",
        body:
          "Quality control gets easier when the cleaner knows what good looks like before the first job. Write the house standard for bathrooms, beds, towels, kitchen, floors, entry, supplies, and final photos. Include details that matter for your listing, such as shower glass, fridge handles, under-bed dust, couch crumbs, or patio trash.",
      },
      {
        heading: "Inspect the first few cleanings more closely",
        body:
          "The first three to five cleanings are where you calibrate. If you are local to Naperville, Wheaton, Aurora, Plainfield, or nearby suburbs, a short walk-through after the first turnovers can save months of quiet frustration. If you are remote, ask a co-host, trusted neighbor, or property manager to do a short inspection while expectations are still being set.",
        bullets: [
          "Look behind doors, under beds, inside drawers, and around bathroom edges.",
          "Check towels, linens, hair, crumbs, trash, odors, and obvious dust.",
          "Compare the clean to the listing photos and guest promise.",
          "Send calm feedback with photos and specific examples.",
        ],
      },
      {
        heading: "Use photos, but know their limits",
        body:
          "Photos are useful for room readiness, bed setup, towel placement, supplies, visible damage, and obvious staging. They are weaker for sticky floors, odors, hair in corners, fingerprints, under-furniture crumbs, or whether surfaces were actually sanitized. Ask for photos, but do not treat photos as the entire quality system.",
      },
      {
        heading: "Separate one-off misses from pattern problems",
        body:
          "A single missed item can happen in any service business. A repeated miss is a system issue. If the same bathroom corner, towel count, fridge shelf, supply item, or floor area keeps causing problems, update the checklist and the cleaner's final walk-through. If the cleaner cannot follow the updated standard after clear feedback, the fit may be wrong.",
      },
      {
        heading: "Pay for the standard you expect",
        body:
          "Quality control also has a fairness side. If the host expects restocking, laundry, photos, staging, damage notes, and deep detail inside a short turnover, the scope and price need to match. Otherwise the cleaner is pushed to rush, and the host keeps wondering why quality is inconsistent.",
      },
    ],
    checklistTitle: "Simple Airbnb cleaning QC routine",
    checklist: [
      "Define the house standard in writing.",
      "Inspect or have someone inspect the first three to five cleanings.",
      "Request photos that show beds, bathrooms, kitchen, entry, and supplies.",
      "Spot-check the things photos do not show: hair, crumbs, odors, drawers, and sticky surfaces.",
      "Track repeated misses and update the checklist.",
      "Keep feedback calm, specific, and tied to guest experience.",
    ],
    internalLinks: [
      {
        title: "Photo Handoff Cleaning",
        path: "/photo-handoff-cleaning",
        note: "Use this to decide what photos should be part of the handoff.",
      },
      {
        title: "Airbnb Cleaning Reviews Guide",
        path: "/airbnb-cleaning-reviews-guide",
        note: "Use this to connect cleaner quality with guest feedback patterns.",
      },
      {
        title: "Airbnb Deep Cleaning",
        path: "/airbnb-deep-cleaning",
        note: "Use this when quality problems come from buildup rather than the normal turnover.",
      },
    ],
    cta:
      "If you want fewer quality surprises, Shynli can help define the turnover scope, photo handoff, supply notes, and realistic timing before the first clean, then improve the checklist after early feedback.",
  },
  {
    path: "/airbnb-cleanliness-complaint-response",
    title: "Airbnb Cleanliness Complaint Response",
    metaTitle: "Airbnb Cleanliness Complaint Response | ShynliAirbnbCleaning.com",
    description:
      "What Airbnb hosts should do when a guest says the property was not clean, including response timing, documentation, re-clean decisions, cleaner feedback, and deep-clean follow-up.",
    keywords:
      "Airbnb cleanliness complaint response, Airbnb guest says not clean, short-term rental cleaning complaint, Airbnb cleaning refund, Airbnb re-clean plan",
    eyebrow: "Cleanliness complaints",
    headline: "What to do when a guest says the Airbnb was not clean.",
    targetQuestion:
      "How should I respond when a guest complains that the rental was not clean, even though the cleaner said it was done?",
    quickAnswer:
      "Respond fast, acknowledge the issue without arguing, ask for specific photos, decide whether a re-clean or partial resolution is needed, document the timeline, then review whether the problem was a turnover miss, deep-clean buildup, guest expectation gap, or maintenance issue.",
    intro:
      "A cleanliness complaint feels personal because it can affect the review, the payout, and the next booking. But the best response is operational. The host needs to calm the guest, understand the evidence, fix what can be fixed, and prevent the same issue from repeating. The cleaner may have completed the basic turnover and the guest may still be seeing buildup, odor, hair, dust, or a missed detail that photos did not reveal.",
    redditSignal:
      "Hosts discuss situations where guests left or requested refunds over cleanliness, while other hosts point out the difference between a turnover clean, a deep clean, and an inspection.",
    sections: [
      {
        heading: "Reply quickly and keep the tone calm",
        body:
          "The first response should not be defensive. Acknowledge that cleanliness matters, ask for the specific areas they are seeing, and offer a practical next step. Even if you believe the property was cleaned, arguing too early usually makes the guest feel dismissed and can make the review worse.",
        bullets: [
          "Thank them for telling you quickly.",
          "Ask for photos or a short description of the affected areas.",
          "Offer a reasonable fix if the issue can be corrected during the stay.",
          "Avoid blaming the cleaner or the previous guest in your first message.",
        ],
      },
      {
        heading: "Decide whether this is a re-clean, refund, or documentation issue",
        body:
          "Not every complaint needs the same response. Hair in a bathroom, dirty sheets, trash, or food residue usually calls for urgent correction. Dust under a sofa, oven buildup, stained grout, or old marks may point to deep-clean or maintenance work. If the guest has already left, you may be deciding between documentation, platform response, cleaner feedback, and future prevention.",
      },
      {
        heading: "Compare cleaner photos with guest evidence",
        body:
          "Photos can help, but they are not a courtroom. A staged bed photo does not prove a bathroom edge was clean. A kitchen photo may not show crumbs in drawers. Review what the cleaner documented, what the guest sent, and whether the missed item was inside the agreed turnover scope. This helps keep the conversation fair and specific.",
      },
      {
        heading: "Ask whether the property needs a deep clean",
        body:
          "Some complaints are not caused by one bad turnover. They come from slow buildup: shower glass, vents, baseboards, cabinet fronts, inside appliances, under furniture, mattress protectors, grout, or odor sources. If reviews mention cleanliness even after normal turnovers, schedule deeper upkeep instead of asking the cleaner to solve buildup inside every same-day window.",
      },
      {
        heading: "Turn the complaint into a prevention note",
        body:
          "After the guest issue is handled, update the cleaner checklist. If the complaint involved bathroom hair, add a final hair check. If it involved low supplies, update the restocking minimum. If it involved hidden crumbs, add drawer and sofa checks. The point is not to make the checklist endless; it is to capture the details that actually affect your guests.",
      },
    ],
    checklistTitle: "Cleanliness complaint response flow",
    checklist: [
      "Respond quickly and acknowledge the concern.",
      "Ask for specific photos or affected areas.",
      "Offer re-clean or correction when practical.",
      "Document cleaner photos, guest photos, and timeline.",
      "Classify the cause: turnover miss, deep-clean buildup, maintenance, supplies, or expectation gap.",
      "Update the checklist and schedule deeper upkeep if needed.",
    ],
    internalLinks: [
      {
        title: "Airbnb Cleaning Damage Report",
        path: "/airbnb-cleaning-damage-report",
        note: "Use this to document visible problems after checkout.",
      },
      {
        title: "Airbnb Deep Cleaning",
        path: "/airbnb-deep-cleaning",
        note: "Use this when complaints point to buildup rather than one missed turnover.",
      },
      {
        title: "Airbnb Cleaning Quality Control",
        path: "/airbnb-cleaning-quality-control",
        note: "Use this to prevent repeated cleanliness complaints.",
      },
    ],
    cta:
      "If cleanliness complaints are starting to repeat, use the next walkthrough to separate turnover tasks from deeper upkeep. Shynli can help define the scope, photo notes, and periodic deep-clean priorities for local short-term rental properties.",
  },
]
