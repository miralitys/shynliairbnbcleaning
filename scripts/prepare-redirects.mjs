import { writeFile } from "node:fs/promises"
import { REDIRECT_VERSION } from "../redirects.mjs"

const configuration = {
  version: REDIRECT_VERSION,
  sourceService: "srv-d81162bbc2fs738jqpr0",
  originService: "srv-d80u9tnlk1mc739ucneg",
  customDomains: ["shynliairbnbcleaning.com", "www.shynliairbnbcleaning.com"],
  deployment: "Move the web domain bindings to the existing Node redirect service. Keep DNS unchanged.",
  rollbackPublishDirectory: "dist",
}
await writeFile("redirect-config.json", JSON.stringify(configuration, null, 2) + "\n")
console.log(`Recorded direct Node redirect deployment, version ${REDIRECT_VERSION}.`)
