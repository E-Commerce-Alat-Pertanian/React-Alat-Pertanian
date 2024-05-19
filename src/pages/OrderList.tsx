import React from "react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const navigate = useNavigate();

  const toOrderDetail = () => {
    navigate("/order-detail");
  };

  return (
    <div>
      <main id="main" className="main">
        <div
          className="pagetitle"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1>Order List</h1>
            <nav>
              <ol className="breadcrumb" style={{ margin: 0 }}>
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">Order List</li>
              </ol>
            </nav>
          </div>
          <select
            style={{
              width: 219,
              height: 52,
              padding: 16,
              background: "#FFFFF",
              borderRadius: 8,
            }}
          >
            <option value="status1">Change Status</option>
            <option value="status2">Delivered</option>
            <option value="status3">Canceled</option>
          </select>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ fontWeight: "bolder", color: "black" }}
                  >
                    Recent Purchase
                  </h5>

                  <table id="table-id" className="table datatable printable">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Customer Name</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#1</td>
                        <td>s</td>
                        <td>sd</td>
                        <td>twer</td>
                        <td>ewwrg3t</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={toOrderDetail}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>#2</td>
                        <td>s</td>
                        <td>sd</td>
                        <td>twer</td>
                        <td>sdwas</td>
                        <td>
                          <button className="btn btn-primary">View</button>
                        </td>
                      </tr>
                      <tr>
                        <td>#3</td>
                        <td>s</td>
                        <td>sd</td>
                        <td>twer</td>
                        <td>ewwrg3t</td>
                        <td>
                          <button className="btn btn-primary">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrderList;
