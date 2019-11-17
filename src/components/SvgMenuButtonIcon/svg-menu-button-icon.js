import React from "react"

import "./svg-menu-button-icon.css"

export default ({ isMenuOpen }) => {
  const menuOpenClass = isMenuOpen ? "menu-open" : ""

  return (
    <svg
      className={`svg-menu-button-icon ${menuOpenClass}`}
      width="29"
      height="29"
      viewBox="0 0 29 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="rect-top" width="29" height="4" rx="2" fill="#3F3D56" />
      <rect
        className="rect-bot"
        y="7"
        width="29"
        height="4"
        rx="2"
        fill="#3F3D56"
      />
    </svg>
  )
}
