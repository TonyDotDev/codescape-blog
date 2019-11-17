import React, { useState } from "react"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"
import wordmark from "../../content/assets/wordmark-logo.svg"
import SvgContactIcon from "./SvgContactIcon/svgContactIcon"
import SvgMenuButtonIcon from "./SvgMenuButtonIcon/svg-menu-button-icon"
import Menu from "./menu/menu"
import "./global.css"
import "./layout.css"

export default ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuButtonClick = () => setIsMenuOpen(!isMenuOpen)

  const menuOpenClass = isMenuOpen ? "menu-open" : ""

  document.documentElement.style.overflowY = isMenuOpen ? "hidden" : "auto"

  return (
    <div className={`page ${menuOpenClass}`}>
      <Menu
        isMenuOpen={isMenuOpen}
        handleMenuButtonClick={handleMenuButtonClick}
      />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          position: `relative`,
          zIndex: 1,
        }}
      >
        <header className="global-header">
          <Link className="logo">
            <img src={wordmark} alt="codescape wordmark logo" />
          </Link>
          <a className="contact-link" href="mailto:get@tonypettigrew.dev">
            <SvgContactIcon />
          </a>
          <button onClick={handleMenuButtonClick} className="menu-button-icon">
            <SvgMenuButtonIcon isMenuOpen={isMenuOpen} />
          </button>
        </header>
        <main>{children}</main>
        <footer className="global-footer">
          &#xA9; {new Date().getFullYear()}{" "}
          <a href="https://www.tonypettigrew.dev">Tony Pettigrew</a>{" "}
        </footer>
      </div>
    </div>
  )
}
