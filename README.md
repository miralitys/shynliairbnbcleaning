# ShynliAirbnbCleaning.com

Standalone Vite + React + shadcn-style site prototype for `ShynliAirbnbCleaning.com`.

## Status

- Created: `2026-05-10`
- Scope: separate site, not a route inside the main Shynli prototype
- Production domain: `shynliairbnbcleaning.com`
- GitHub repository: `https://github.com/miralitys/shynliairbnbcleaning.git`
- Public launch state: concept / draft until short-term rental turnover operations are confirmed
- Visual direction: Airbnb-adjacent white surface, `#FF385C` action color, rounded search pill, listing-style photo grid

## Routes

- `/` - full standalone landing page
- `51` site-wide SEO intent pages, including Airbnb cleaning, short-term rental cleaning, vacation rental cleaning, turnover cleaning, cost, checklist, FAQ, host situations, linens, restocking, photo reports, pricing guides, supply guides, and comparison pages
- `/service-areas` - all-city service-area hub
- `/service-areas/[city]` - 42 city pages
- `/service-areas/[city]/airbnb-cleaning` - 42 city + Airbnb cleaning pages
- `/service-areas/[city]/short-term-rental-cleaning` - 42 city + short-term rental cleaning pages
- `/service-areas/[city]/vacation-rental-cleaning` - 42 city + vacation rental cleaning pages
- `/service-areas/[city]/airbnb-turnover-cleaning` - 42 city + turnover cleaning pages
- `/service-areas/[city]/airbnb-cleaning-cost` - 42 city + Airbnb cleaning cost pages
- `/service-areas/[city]/airbnb-cleaning-checklist` - 42 city + Airbnb cleaning checklist pages
- `/privacy-policy` - ShynliAirbnbCleaning.com privacy page adapted from Shynli legal layer
- `/terms-of-service` - ShynliAirbnbCleaning.com terms page adapted from Shynli legal layer
- `/cancellation-policy` - ShynliAirbnbCleaning.com cancellation page adapted from Shynli legal layer

Current SEO route count: `350`.

## Assets

Local image set:

- `public/airbnb-turnover/bedroom-towels.jpg`
- `public/airbnb-turnover/clean-bedroom.jpg`
- `public/airbnb-turnover/housekeeper-towels.jpg`
- `public/airbnb-turnover/bathroom-towels.jpg`
- `public/sitemap.xml`
- `public/robots.txt`
- `public/_redirects`
- `vercel.json`

## Sections

- Hero with search-style availability prompt
- Host questions / turnover objections
- Checkout-to-check-in timeline
- Turnover scope
- Photo handoff / proof
- Host reasons to book
- Service-area city list from `shynlicleaningservice.com/service-areas`
- Availability form
- Full footer with host links, Shynli links, and legal row

## Service Areas

The service-area block includes all cities listed on `https://shynlicleaningservice.com/service-areas`:

- A-D: Addison, Aurora, Bartlett, Batavia, Bolingbrook, Bristol, Burr Ridge, Carol Stream, Clarendon Hills, Darien, Downers Grove
- E-L: Elmhurst, Geneva, Glen Ellyn, Hinsdale, Homer Glen, Itasca, Lemont, Lisle, Lockport, Lombard
- M-S: Montgomery, Naperville, North Aurora, Oak Brook, Oswego, Plainfield, Romeoville, St. Charles, Streamwood, Sugar Grove
- V-Y: Villa Park, Warrenville, Wayne, West Chicago, Westmont, Wheaton, Willowbrook, Winfield, Wood Dale, Woodridge, Yorkville

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Hosting Settings

Use these settings for static hosting:

- Build command: `npm run build`
- Publish directory: `dist`
- Domain: `shynliairbnbcleaning.com`

Do not use `npm run lint` as the hosting build command by itself; lint checks code but does not create the production output. Do not use `distr` unless the Vite output directory is intentionally changed.

## Verification

Last checked:

```bash
npm run build
npm run lint
```

Legal route checks passed:

- `/privacy-policy`
- `/terms-of-service`
- `/cancellation-policy`

SEO route checks passed:

- `/airbnb-cleaning`
- `/short-term-rental-cleaning`
- `/service-areas`
- `/service-areas/naperville`
- `/service-areas/naperville/airbnb-cleaning`
- `/service-areas/naperville/short-term-rental-cleaning`
- `/service-areas/yorkville/vacation-rental-cleaning`
- `/service-areas/naperville/airbnb-cleaning-cost`
- `/service-areas/yorkville/airbnb-cleaning-checklist`
- `/what-is-included-in-airbnb-cleaning`

Pre-hosting SEO QA passed:

- `350` routes in `public/sitemap.xml`
- `public/robots.txt` points to sitemap
- SPA fallback configured for direct route loads on Netlify/Cloudflare Pages (`public/_redirects`) and Vercel (`vercel.json`)
- `netlify.toml` configured with build command `npm run build` and publish directory `dist`
- full `350/350` sitemap crawl passed with `0` route failures
- duplicate titles, meta descriptions, and H1s: `0`
- meta description length range: `118-161` characters
- minimum visible text on commercial pages after hardening: `1820` characters
- minimum internal links on commercial pages after final audit: `23`
- rendered schema present on `350/350` routes
- local relevance blocks and nearby links present on `294/294` city and city-service pages
- quote routing audit passed: `738` application CTA links, `1` form action, and `347` schema Offer URLs route to `https://shynlicleaningservice.com/quote`
- local `#quote` anchors: `0`
- quote form uses US date/time placeholders and validation: `MM/DD/YYYY`, `h:mm AM/PM`
- native browser `date` / `time` inputs: `0`
- footer audit passed: `350/350` pages have brand, quote link, service-area link, legal links, Shynli link, and copyright
- footer mobile audit failures: `0`
- production domain audit passed: `350/350` routes use `https://shynliairbnbcleaning.com`; old domain hits `0`
- mobile overflow failures: `0`
- visible technical copy hits: `0`
- top-30 production-rendered audit saved to `screenshots/top30-production-seo-audit-2026-05-10.json`
- full production-rendered crawl saved to `screenshots/full-350-production-seo-audit-2026-05-10.json`
- quote routing audit saved to `screenshots/quote-routing-audit-2026-05-10.json`
- final all-in-one readiness audit saved to `screenshots/final-prehosting-readiness-audit-2026-05-10.json`
- footer audit saved to `screenshots/footer-audit-2026-05-10.json`
- production domain audit saved to `screenshots/domain-deployment-audit-2026-05-11.json`

Expected browser target when running locally:

- `http://127.0.0.1:{port}/`
