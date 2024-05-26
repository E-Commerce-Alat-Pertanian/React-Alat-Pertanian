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
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
