import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../app/store';
import { getMe } from "../features/authSlice";

interface Order {
  idOrder: string;
  status: string
  createdAt: string;
  // category: string;
  customer: {
    username: string;
  };
}

const OrderList = () => {
  const [orders, setOrder] = useState<Order[]>([]);
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

  const toOrderDetail = () => {
    navigate("/order-detail");
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const response = await axios.get("http://localhost:5000/order/order");
      setOrder(response.data.data);
      console.log(response.data.data);

      // const counts: { [key: string]: number } = {};
      // response.data.forEach((product: Product) => {
      // counts[product.category] = (counts[product.category] || 0) + 1;
      // });
      // setCategoryCounts(counts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.idOrder}>
                        <td>{index + 1}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>{order.customer.username}</td>
                        <td>{order.status}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={toOrderDetail}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                      ))}

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
