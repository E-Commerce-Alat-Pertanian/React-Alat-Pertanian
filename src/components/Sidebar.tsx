/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../assets/css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBorderAll } from "@fortawesome/free-solid-svg-icons";
import album from "../assets/img/album.svg";
import order from "../assets/img/order.svg";

const Sidebar = () => {
  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link collapsed" href="/dashboard">
              <FontAwesomeIcon className="me-2" icon={faBorderAll} />
              <span>DASHBOARD</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/products">
              <img className="me-2" src={album} alt="" />
              <span>ALL PRODUCTS</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="/order-list">
              <img className="me-2" src={order} alt="" />
              <span>ORDER LIST</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              href="/"
            >
              <span>Categories</span>
              <FontAwesomeIcon className="ms-auto" icon={faChevronDown} />
            </a>
            <ul
              id="forms-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a
                  href="#"
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>Pestisida</span>
                  <div className="btn btn-sm" style={{backgroundColor: "#E7E7E3"}}>12</div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>Pupuk</span>
                  <div className="btn btn-sm" style={{backgroundColor: "#E7E7E3"}}>12</div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>Bibit</span>
                  <div className="btn btn-sm" style={{backgroundColor: "#E7E7E3"}}>12</div>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>Alat Pertanian</span>
                  <div className="btn btn-sm" style={{backgroundColor: "#E7E7E3"}}>12</div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
