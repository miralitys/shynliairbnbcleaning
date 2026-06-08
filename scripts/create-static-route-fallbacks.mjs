import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import React from "react"
import { renderToString } from "react-dom/server"
import { createServer } from "vite"

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

const indexHtml = readFileSync(indexPath, "utf8")
const optimizedIndexHtml = indexHtml.replace(
  /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
  `<link rel="preload" crossorigin href="$1" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" crossorigin href="$1"></noscript>`,
)

const viteServer = await createServer({
  appType: "custom",
  server: { middlewareMode: true },
})

let staticHomeHtml
let appModule
try {
  const homeModule = await viteServer.ssrLoadModule("/src/HomeApp.tsx")
  appModule = await viteServer.ssrLoadModule("/src/App.tsx")
  staticHomeHtml = createStaticHomeHtml(optimizedIndexHtml, homeModule)
} finally {
  await viteServer.close()
}

writeFileSync(indexPath, staticHomeHtml)

for (const route of routes) {
  const cleanRoute = route.replace(/^\/+/, "")
  const routeFile = path.join(distDir, cleanRoute, "index.html")

  mkdirSync(path.dirname(routeFile), { recursive: true })
  writeFileSync(routeFile, createStaticRouteHtml(optimizedIndexHtml, appModule, route))
}

writeFileSync(
  path.join(distDir, "route-fallbacks.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), routes: routes.length }, null, 2)}\n`,
)

console.log(`Created static fallbacks for ${routes.length} sitemap routes.`)

function createStaticHomeHtml(html, homeModule) {
  const staticMarkup = renderToString(React.createElement(homeModule.default))
  const cssHref = html.match(/href="([^"]+\.css)"/)?.[1]
  const inlineCss = cssHref
    ? readFileSync(path.join(distDir, cssHref.replace(/^\//, "")), "utf8").replace(/<\/style/gi, "<\\/style")
    : ""
  const structuredData = JSON.stringify(homeModule.homeStructuredData)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")

  return html
    .replace(/\s*<script type="module" crossorigin src="[^"]+"><\/script>/g, "")
    .replace(/\s*<link rel="modulepreload" crossorigin href="[^"]+">/g, "")
    .replace(/\s*<link rel="preload" crossorigin href="[^"]+\.css" as="style" onload="this\.onload=null;this\.rel='stylesheet'"><noscript><link rel="stylesheet" crossorigin href="[^"]+\.css"><\/noscript>/g, "")
    .replace(/<title>[^<]*<\/title>/, `<title>${homeModule.homeTitle}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${homeModule.homeDescription}" />`,
    )
    .replace(
      "</head>",
      () => `<link rel="canonical" href="${homeModule.homeCanonical}" />${inlineCss ? `<style data-inline-home-css>${inlineCss}</style>` : ""}<script id="structured-data-home" type="application/ld+json">${structuredData}</script></head>`,
    )
    .replace(/<body>[\s\S]*<\/body>/, () => `<body>\n    <div id="root">${staticMarkup}</div>\n  </body>`)
}

function createStaticRouteHtml(html, appModule, route) {
  const staticMarkup = renderToString(React.createElement(appModule.default, { initialPath: route }))
  const routeHead = appModule.getStaticRouteHead(route)
  const cssHref = html.match(/href="([^"]+\.css)"/)?.[1]
  const inlineCss = cssHref
    ? readFileSync(path.join(distDir, cssHref.replace(/^\//, "")), "utf8").replace(/<\/style/gi, "<\\/style")
    : ""
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": routeHead.structuredData,
  })
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
  const keywordsMeta = routeHead.keywords
    ? `<meta name="keywords" content="${escapeAttribute(routeHead.keywords)}" />`
    : ""

  return html
    .replace(/\s*<script type="module"(?: crossorigin)? src="[^"]+"><\/script>/g, "")
    .replace(/\s*<link rel="modulepreload"(?: crossorigin)? href="[^"]+">/g, "")
    .replace(/\s*<link rel="preload" crossorigin href="[^"]+\.css" as="style" onload="this\.onload=null;this\.rel='stylesheet'"><noscript><link rel="stylesheet" crossorigin href="[^"]+\.css"><\/noscript>/g, "")
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(routeHead.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeAttribute(routeHead.description)}" />`,
    )
    .replace(/\s*<link rel="canonical" href="[^"]+"\s*\/?>/g, "")
    .replace(
      "</head>",
      () => `${keywordsMeta}<link rel="canonical" href="${escapeAttribute(routeHead.canonical)}" />${inlineCss ? `<style data-inline-route-css>${inlineCss}</style>` : ""}<script id="structured-data-route" type="application/ld+json">${structuredData}</script></head>`,
    )
    .replace(/<body>[\s\S]*<\/body>/, () => `<body>\n    <div id="root">${staticMarkup}</div>\n  </body>`)
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;")
}
