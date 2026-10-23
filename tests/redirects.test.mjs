import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"
import { CITY_SLUGS, DEFAULT_TARGET, DESTINATION_ORIGIN, GUIDE_GROUPS, GUIDE_INDEX_PATHS, ROOT_REDIRECTS, SERVICE_PATHS, getRedirect } from "../redirects.mjs"

function expect(source, target) {
  assert.equal(getRedirect(source).location, `${DESTINATION_ORIGIN}${target}`, source)
}

test("all explicitly requested mappings, uppercase aliases and query strings", () => {
  assert.equal(SERVICE_PATHS.length, 31)
  const cases = [["/", DEFAULT_TARGET], ["/index.html", DEFAULT_TARGET], ["/service-areas", "/service-areas"], ["/sitemap.xml", "/sitemap.xml"], ["/robots.txt", "/robots.txt"]]
  for (const [source, { target }] of ROOT_REDIRECTS) cases.push([source, target])
  for (const [source, target] of cases) {
    expect(source, target)
    expect(`${source}/`, target)
    expect(`${source.toUpperCase()}/`, target)
    expect(source.replaceAll("a", "A"), target)
    expect(`${source}?gclid=abc%2fDEF&utm_source=google+ads&x=1&x=2&empty=&flag`, `${target}?gclid=abc%2fDEF&utm_source=google+ads&x=1&x=2&empty=&flag`)
  }
  assert.equal(GUIDE_GROUPS.length, 14)
  assert.equal(GUIDE_INDEX_PATHS.length, 5)
})

test("all 42 city hubs and arbitrary city subpages go directly to city slugs without hyphens", () => {
  assert.equal(CITY_SLUGS.length, 42)
  for (const city of CITY_SLUGS) {
    const target = `/${city.replaceAll("-", "")}`
    expect(`/service-areas/${city}`, target)
    for (const page of ["airbnb-cleaning", "short-term-rental-cleaning", "vacation-rental-cleaning", "airbnb-turnover-cleaning", "airbnb-cleaning-cost", "airbnb-cleaning-checklist", "unknown-page", "a/b/c", "quote"]) {
      const source = `/service-areas/${city}/${page}`
      expect(source, target)
      expect(`${source.toUpperCase()}/?utm_campaign=test`, `${target}?utm_campaign=test`)
    }
  }
})

test("booking paths, fallbacks and encoded or malformed paths", () => {
  for (const source of ["/quote", "/quote/step/2", "/booking", "/BOOKING/CONFIRM", "/book-now", "/request-a-quote", "/api/quote/submit", "/a/booking/b", "/get-a-quote", "/booking-confirmation", "/request/quote-form"]) expect(source, "/quote")
  for (const source of ["/nonexistent-xyz", "/assets/app.js", "/service-areas/not-a-city", "/%zz", "//evil.example/", "/quoted-text"]) expect(source, DEFAULT_TARGET)
  expect("/service-areas/BURR%2DRIDGE/", "/burrridge")
  expect("/host-problem-guides/unlisted", "/blog/airbnb")
})

test("every one of the 376 source sitemap URLs has a known mapping", async () => {
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8")
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
  assert.equal(urls.length, 376)
  for (const source of urls) {
    const result = getRedirect(source)
    assert.notEqual(result.group, "fallback", source)
    const target = new URL(result.location)
    assert.equal(target.origin, DESTINATION_ORIGIN)
    assert.ok(!target.pathname.endsWith("/"), result.location)
  }
})
