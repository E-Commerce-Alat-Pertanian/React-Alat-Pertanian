import React from "react";
import "../assets/css/style.css";
import logo from "../assets/img/vector.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="/dashboard" className="logo d-flex align-items-center">
            <img className="ps-5" src={logo} alt=""/>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                </li>
            <li className="nav-item dropdown pe-3">
              <button
                className="nav-link nav-profile d-flex align-items-center pe-0"
                data-bs-toggle="dropdown"
              >
                <span className="d-none d-md-block dropdown-toggle ps-2" style={{color: "black"}}>
                  Admin
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                {/* Tambahkan item profil lainnya di sini */}
                <li>
                  <button className="dropdown-item">Logout</button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
