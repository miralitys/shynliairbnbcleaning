import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import HomeApp from "./HomeApp"

const root = createRoot(document.getElementById("root")!)
const currentPath = window.location.pathname.replace(/\/$/, "") || "/"

function renderApp(App: () => React.JSX.Element) {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

if (currentPath === "/") {
  renderApp(HomeApp)
} else {
  import("./App").then(({ default: App }) => renderApp(App))
}
