import React from "react"
import { Link } from "gatsby"

import CloseMenuIcon from "../../../content/assets/close-menu-icon.svg"
import "./menu.css"

export default ({ isMenuOpen, handleMenuButtonClick }) => (
  <div className="nav-menu">
    <div className="layout">
      <button onClick={handleMenuButtonClick}>
        <img src={CloseMenuIcon} />
      </button>
      <nav>
        <ul>
          <li>
            <Link>Donate</Link>
          </li>
          <li>
            <Link>Tonypettigrew.dev</Link>
          </li>
          <li>
            <Link>Email</Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
)
