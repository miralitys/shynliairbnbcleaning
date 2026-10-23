Permanent migration version `2026-10-23.1` moves shynliairbnbcleaning.com to shynlicleaningservice.com with server-side HTTP 301 responses.

The Airbnb domain bindings move from the Render Static Site (`srv-d81162bbc2fs738jqpr0`) to the existing Node redirect service (`srv-d80u9tnlk1mc739ucneg`, repository miralitys/shynlicom). Both existing Render subdomains resolve to the same Render edge addresses, and the apex A record already points at 216.24.57.1. No DNS changes are needed. No new compute service or plan is created.

The Node service imports a byte-identical copy of redirects.mjs as airbnb-redirects.mjs. Requests with either Airbnb hostname use the Airbnb mapping; shynli.com retains its existing mapping. The browser receives a 301 directly to the final main-site URL. There is no browser JavaScript redirect, meta refresh or intermediate main-site URL.

The mapping handles case, trailing slashes, index.html, all 42 city slugs, all requested guide aliases, quote and booking paths, sitemap.xml, robots.txt and unknown paths. Query strings are preserved. The home page and fallback both go to /services/airbnb-cleaning.

The Static Site, source HTML, images and old sitemap remain available for rollback. Its original website still builds to dist/ with npm run build:site. The retained onrender Static Site is marked noindex after the domain move. Render's existing HTTP and www redirects may add hops; those are audited and reported separately, as requested.

Run npm run test:redirects and npm run build before deployment. npm run audit:redirects checks all 376 old sitemap URLs, ten additional paths, discovery files and hostname variants. Evidence is saved to reports/site-redirect-2026-10-23.

No DNS, mail records or settings on shynlicleaningservice.com are changed. Both existing Render services are reused. The reserved /__airbnb_redirect/* endpoint on shynlicom.onrender.com remains available for origin checks; it is not an extra browser hop.

Rollback: restore the Airbnb custom-domain bindings to the retained Static Site, retain dist as its publish directory, remove its noindex header, and deploy the retained source or commit e55604cf1a2294df14a27a141ed57c677e29853b. Restore any prior Render settings from the before snapshot. The Node handler can remain without affecting shynli.com. The 301 cache lifetime is one hour.

References: [Render custom domains](https://render.com/docs/custom-domains), [Render static redirects and rewrites](https://render.com/docs/redirects-rewrites).
