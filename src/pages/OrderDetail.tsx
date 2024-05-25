import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../app/store';
import { getMe } from "../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPrint} from "@fortawesome/free-solid-svg-icons";
import user from "../assets/img/user.svg"
import bagShop from "../assets/img/bagShop.svg"
import "../styles/OrderDetail.css";

const OrderDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isError } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  
  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Order Details</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">Order List</li>
              <li className="breadcrumb-item active">Order Detail</li>
            </ol>
          </nav>
        </div>

        <section className="section">
          <div className="card">
            <div className="card-body">
              <div
                className="pagetitle-detail"
                style={{
                  marginTop: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  <h1 style={{ marginRight: "10px" }}>
                    Order ID: #6743{" "}
                    <span
                      className="px-2 py-2"
                      style={{
                        fontSize: "15px",
                        textAlign: "center",
                        background: "orange",
                        borderRadius: "10px",
                        marginLeft: "20px",
                      }}
                    >
                      Pending
                    </span>
                  </h1>
                  <ol className="breadcrumb mt-3" style={{ margin: 0 }}>
                    <li className="me-2">
                      <FontAwesomeIcon
                        className="ms-auto"
                        icon={faCalendarDays}
                      />
                    </li>
                    <li className="breadcrumb-item active">
                      26 Oktober 2022 - 30 Oktober 2022
                    </li>
                  </ol>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <select
                    style={{
                      width: 219,
                      height: 52,
                      padding: 16,
                      background: "#F4F2F2",
                      borderRadius: 8,
                      border: "none",
                    }}
                  >
                    <option value="status1">Change Status</option>
                    <option value="status2">Delivered</option>
                    <option value="status3">Canceled</option>
                  </select>
                  <button
                    style={{
                      width: 50,
                      height: 50,
                      background: "#F4F2F2",
                      borderRadius: 8,
                      marginLeft: "10px",
                      border: "none",
                    }}
                  >
                    <FontAwesomeIcon icon={faPrint} />
                  </button>
                  <button
                    className="btn"
                    style={{
                      width: 70,
                      height: 50,
                      marginLeft: "10px",
                      background: "#F4F2F2",
                      border: "none",
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="card-icon px-3 py-3 mb-4"
                        style={{
                          backgroundColor: "#232321",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                            src={user}
                            alt=""
                            style={{ width: "30px", height: "30px", color: "white" }}
                          />
                      </div>
                      <div className="ps-3">
                        <h5
                          className="card-title"
                          style={{ fontWeight: "bold" }}
                        >
                          Customer
                        </h5>
                        <p style={{ marginBottom: "3px" }}>Full Name: Shiristi Singh</p>
                        <p style={{ marginBottom: "3px" }}>Email: shiristi@gmail.com</p>
                        <p style={{ marginBottom: "0" }}>Phone: 085358868477</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="card-icon px-3 py-3 mb-4"
                        style={{
                          backgroundColor: "#232321",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                            src={bagShop}
                            alt=""
                            style={{ width: "30px", height: "30px", color: "white" }}
                          />
                      </div>
                      <div className="ps-3">
                        <h5
                          className="card-title"
                          style={{ fontWeight: "bold" }}
                        >
                          Order Info
                        </h5>
                        <p style={{ marginBottom: "3px" }}>Shipping: Raja Ongkir</p>
                        <p style={{ marginBottom: "3px" }}>Payment Method: Paypal</p>
                        <p style={{ marginBottom: "0px" }}>Status: Pending</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div
                        className="card-icon px-3 py-3 mb-4"
                        style={{
                          backgroundColor: "#232321",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                            src={bagShop}
                            alt=""
                            style={{ width: "30px", height: "30px", color: "white" }}
                          />
                      </div>
                      <div className="ps-3">
                        <h5
                          className="card-title"
                          style={{ fontWeight: "bold" }}
                        >
                          Deliver To
                        </h5>
                        <p>Address: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="card">
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontWeight: "bolder", color: "black" }}
              >
                Products
              </h5>

              <table id="table-id" className="table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Product Name</th>
                    <th style={{ textAlign: "left" }}>Order ID</th>
                    <th>Quantity</th>
                    <th></th>
                    <th className="pe-4" style={{ textAlign: "right" }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left" }}>Lorem, ipsum.</td>
                    <td className="ps-4" style={{ textAlign: "left" }}>
                      #1
                    </td>
                    <td>3</td>
                    <td></td>
                    <td style={{ textAlign: "right" }}>Rp.100.000</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>Lorem, ipsum.</td>
                    <td className="ps-4" style={{ textAlign: "left" }}>
                      #2
                    </td>
                    <td>2</td>
                    <td></td>
                    <td style={{ textAlign: "right" }}>Rp.50.000</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left" }}>Lorem, ipsum.</td>
                    <td className="ps-4" style={{ textAlign: "left" }}>
                      #3
                    </td>
                    <td>1</td>
                    <td></td>
                    <td style={{ textAlign: "right" }}>Rp.20.000</td>
                  </tr>
                </tbody>
              </table>
              <table id="table-id" className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ textAlign: "right" }}>Subtotal</td>
                    <td style={{ textAlign: "right" }}>Rp.200.000</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ textAlign: "right" }}>Ongkos Kirim</td>
                    <td style={{ textAlign: "right" }}>Rp.30.000</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ textAlign: "right", fontSize: "25px" }}>
                      Total
                    </td>
                    <td style={{ textAlign: "right", fontSize: "25px" }}>
                      Rp.230.000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrderDetail;
