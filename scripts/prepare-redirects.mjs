import { mkdir, rm, writeFile } from "node:fs/promises"
import { REDIRECT_VERSION } from "../redirects.mjs"

// Keep dist/ and all source files for rollback. Existing static HTML overrides
// Render rules, so the redirect deployment publishes a separate empty directory.
await rm("redirect-public", { recursive: true, force: true })
await mkdir("redirect-public", { recursive: true })
const configuration = {
  version: REDIRECT_VERSION,
  sourceService: "srv-d81162bbc2fs738jqpr0",
  originService: "srv-d80u9tnlk1mc739ucneg",
  publishDirectory: "redirect-public",
  routes: [{
    type: "rewrite",
    source: "/*",
    destination: "https://shynlicom.onrender.com/__airbnb_redirect/*",
  }],
}
await writeFile("redirect-config.json", JSON.stringify(configuration, null, 2) + "\n")
console.log(`Prepared empty redirect-public directory, version ${REDIRECT_VERSION}.`)
