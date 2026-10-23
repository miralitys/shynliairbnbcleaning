Permanent migration version `2026-10-23.1` moves shynliairbnbcleaning.com to shynlicleaningservice.com with server-side HTTP 301 responses.

The Airbnb Render Static Site (`srv-d81162bbc2fs738jqpr0`) publishes the empty `redirect-public` directory and uses a single external rewrite from `/*` to `https://shynlicom.onrender.com/__airbnb_redirect/*`. This is an internal server proxy. The browser receives a 301 pointing directly at the final main-site URL, with no intermediate browser navigation.

The existing Node redirect service (`srv-d80u9tnlk1mc739ucneg`, repository miralitys/shynlicom) loads a byte-identical copy of this repository's redirects.mjs as airbnb-redirects.mjs. Only the reserved proxy path on shynlicom.onrender.com uses that mapping. Requests on shynli.com continue using their existing mapping. shynlicleaningservice.com is unchanged.

The mapping handles case, trailing slashes, index.html, all 42 city slugs, all requested guide aliases, quote and booking paths, sitemap.xml, robots.txt and unknown paths. Query strings are preserved. The home page and fallback both go to /services/airbnb-cleaning. Source HTML, images and the old sitemap stay in the repository and can still be built to dist/ with npm run build:site.

Render gives existing files precedence over redirect and rewrite rules. Publishing the empty directory prevents the old static pages from bypassing the proxy. The directory is created during the build; the old dist/ remains available for rollback.

Run npm run test:redirects and npm run build before deployment. npm run audit:redirects checks the 376 source URLs and writes CSV/JSON evidence to reports/site-redirect-2026-10-23. HTTP and www may have extra automatic Render redirects; these are reported separately and do not fail the required HTTPS non-www page mapping.

No DNS, mail records or settings on the main site are changed. Both Render services and their existing compute plans are reused.

To roll back the Airbnb site, change the static publish directory back to dist and remove the /* proxy rule. Rebuild from the retained source, or use Render's rollback to commit e55604cf1a2294df14a27a141ed57c677e29853b and restore those settings. The one-hour cache on 301 responses can delay client-visible rollback. The Node proxy handler can remain without affecting shynli.com.

References: [Render static redirects and rewrites](https://render.com/docs/redirects-rewrites), [Render custom domains](https://render.com/docs/custom-domains).
