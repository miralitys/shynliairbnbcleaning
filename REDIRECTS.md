Permanent migration version `2026-10-23.1` moves shynliairbnbcleaning.com to shynlicleaningservice.com with server-side HTTP 301 responses.

The Airbnb domain bindings move from the Render Static Site (`srv-d81162bbc2fs738jqpr0`) to the existing Node redirect service (`srv-d80u9tnlk1mc739ucneg`, repository miralitys/shynlicom). Both existing Render subdomains resolve to the same Render edge addresses, and the apex A record already points at 216.24.57.1. No DNS changes are needed. No new compute service or plan is created.

The Node service imports a byte-identical copy of redirects.mjs as airbnb-redirects.mjs. Requests with either Airbnb hostname use the Airbnb mapping; shynli.com retains its existing mapping. The browser receives a 301 directly to the final main-site URL. There is no browser JavaScript redirect, meta refresh or intermediate main-site URL.

The mapping handles case, trailing slashes, index.html, all 42 city slugs, all requested guide aliases, quote and booking paths, sitemap.xml, robots.txt and unknown paths. Query strings are preserved. The home page and fallback both go to /services/airbnb-cleaning.

The Static Site, source HTML, images and old sitemap remain available for rollback. Its original website still builds to dist/ with npm run build:site. The retained onrender Static Site is marked noindex after the domain move. Render's existing HTTP and www redirects may add hops; those are audited and reported separately, as requested.

Run npm run test:redirects and npm run build before deployment. npm run audit:redirects checks all 376 old sitemap URLs, ten additional paths, discovery files and hostname variants. Evidence is saved to reports/site-redirect-2026-10-23.

No DNS, mail records or settings on shynlicleaningservice.com are changed. Both existing Render services are reused. The reserved /__airbnb_redirect/* endpoint on shynlicom.onrender.com remains available for origin checks; it is not an extra browser hop.

Rollback: restore the Airbnb custom-domain bindings to the retained Static Site, retain dist as its publish directory, remove its noindex header, and deploy the retained source or commit e55604cf1a2294df14a27a141ed57c677e29853b. Restore any prior Render settings from the before snapshot. The Node handler can remain without affecting shynli.com. The 301 cache lifetime is one hour.

References: [Render custom domains](https://render.com/docs/custom-domains), [Render static redirects and rewrites](https://render.com/docs/redirects-rewrites).

Onrender migration configuration version `2026-10-23.2`

`https://shynliairbnbcleaning.onrender.com` now uses the same mapping as its public domain.
Render publishes the `redirect-origin` directory with a deployment marker only, built with
`node scripts/prepare-onrender-redirect.mjs`. Its `/*` rule internally rewrites
to `https://shynlicom.onrender.com/__airbnb_redirect/*`. The existing Node handler returns a server-side
301 directly to the final main-site URL. The internal rewrite adds no client
redirect hop. The sole new diagnostic file `/__shynli_redirect_version.txt`
answers 200 with noindex; all former website paths use the redirect handler. Query parameters are preserved by Render and the Node handler.
The mapping code remains version `2026-10-23.1` and is unchanged.

Original `src/`, `public/` and committed `dist/` files are unchanged. Previous
source revision: `e9e538ae887602d0e1be5a8ffd882c855a571f35`. To restore this Static Site, remove the external
rewrite, restore its prior route rules, set Publish Directory to `dist`, restore
Build Command to `npm run build`, and deploy the retained
revision. Its retained noindex header can be removed when restoring public
content. DNS, custom-domain bindings and the main website are unchanged.
