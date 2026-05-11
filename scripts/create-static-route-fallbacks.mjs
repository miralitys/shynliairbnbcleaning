import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

const distDir = path.resolve("dist")
const sitemapPath = path.join(distDir, "sitemap.xml")
const indexPath = path.join(distDir, "index.html")

if (!existsSync(sitemapPath) || !existsSync(indexPath)) {
  throw new Error("Expected dist/sitemap.xml and dist/index.html before creating route fallbacks.")
}

const sitemap = readFileSync(sitemapPath, "utf8")
const routes = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)]
  .map((match) => new URL(match[1]).pathname)
  .filter((pathname) => pathname !== "/" && !path.extname(pathname))

for (const route of routes) {
  const cleanRoute = route.replace(/^\/+/, "")
  const routeFile = path.join(distDir, cleanRoute, "index.html")

  mkdirSync(path.dirname(routeFile), { recursive: true })
  copyFileSync(indexPath, routeFile)
}

writeFileSync(
  path.join(distDir, "route-fallbacks.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), routes: routes.length }, null, 2)}\n`,
)

console.log(`Created static fallbacks for ${routes.length} sitemap routes.`)
