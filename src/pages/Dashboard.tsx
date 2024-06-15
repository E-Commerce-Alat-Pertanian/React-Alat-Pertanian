import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../app/store';
import { getMe } from "../features/authSlice";
import bag from "../assets/img/bag.svg";

interface Order {
  idOrder: string;
  status: string
  createdAt: string;
  customer: {
    username: string;
  };
  ongkir: string;
  totalPembayaran: string;
}

const Dashboard = () => {
  const [orders, setOrder] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [activeOrders, setActiveOrders] = useState(0);
  const [activePayment, setActivePayment] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [completedPayment, setCompletedPayment] = useState(0);
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

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const response = await axios.get("http://localhost:5000/order/order");
      setOrder(response.data);

      const totalOrdersCount = response.data.length;
      setTotalOrders(totalOrdersCount);

      const totalPaymentAmount = response.data.reduce((acc: number, order: Order) => acc + parseFloat(order.totalPembayaran), 0);
      setTotalPayment(totalPaymentAmount);

      const activeOrdersData = response.data.filter((order: Order) => order.status === "Pending" || order.status === "Dikirim");
      const activeOrdersCount = activeOrdersData.length;
      const activePaymentAmount = activeOrdersData.reduce((acc: number, order: Order) => acc + parseFloat(order.totalPembayaran), 0);
      setActiveOrders(activeOrdersCount);
      setActivePayment(activePaymentAmount);

      const completedOrdersData = response.data.filter((order: Order) => order.status === "Completed");
      const completedOrdersCount = completedOrdersData.length;
      const completedPaymentAmount = completedOrdersData.reduce((acc: number, order: Order) => acc + parseFloat(order.totalPembayaran), 0);
      setCompletedOrders(completedOrdersCount);
      setCompletedPayment(completedPaymentAmount);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };  

  // Fungsi untuk memformat angka sebagai mata uang IDR
  const formatCurrency = (number: string | number) => {
    // Konversi string ke number
    const num = typeof number === 'string' ? parseFloat(number) : number;
    
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: "bold" }}>
                        Total Orders
                      </h5>

                      <div className="d-flex align-items-center">
                        <div
                          className="card-icon d-flex align-items-center justify-content-center"
                          style={{
                            backgroundColor: "#003f62",
                            borderRadius: "10px",
                          }}
                        >
                          {/* <FontAwesomeIcon icon={faShip} /> */}
                          <img
                            src={bag}
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                          />
                        </div>
                        <div className="ps-3">
                          <h6>{formatCurrency(totalPayment)}</h6>
                          <h6 style={{ fontSize: "1.4em" }}>{totalOrders}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: "bold" }}>
                        Active Orders
                      </h5>

                      <div className="d-flex align-items-center">
                        <div
                          className="card-icon d-flex align-items-center justify-content-center"
                          style={{
                            backgroundColor: "#003f62",
                            borderRadius: "10px",
                          }}
                        >
                          {/* <FontAwesomeIcon icon={faShip} /> */}
                          <img
                            src={bag}
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                          />
                        </div>
                        <div className="ps-3">
                          <h6>{formatCurrency(activePayment)}</h6>
                          <h6 style={{ fontSize: "1.4em" }}>{activeOrders}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="card-body">
                      <h5 className="card-title" style={{ fontWeight: "bold" }}>
                        Completed Orders
                      </h5>

                      <div className="d-flex align-items-center">
                        <div
                          className="card-icon d-flex align-items-center justify-content-center"
                          style={{
                            backgroundColor: "#003f62",
                            borderRadius: "10px",
                          }}
                        >
                          {/* <FontAwesomeIcon icon={faShip} /> */}
                          <img
                            src={bag}
                            alt=""
                            style={{ width: "30px", height: "30px" }}
                          />
                        </div>
                        <div className="ps-3">
                          <h6>{formatCurrency(completedPayment)}</h6>
                          <h6 style={{ fontSize: "1.4em" }}>{completedOrders}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5
                    className="card-title"
                    style={{ fontWeight: "bolder", color: "black" }}
                  >
                    Recent Orders
                  </h5>

                  <table id="table-id" className="table datatable printable">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Customer Name</th>
                        <th>Status</th>
                        <th>Ongkir</th>
                        <th>Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.idOrder}>
                        <td>{index + 1}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>{order.customer.username}</td>
                        <td>{order.status}</td>
                        <td>{formatCurrency(order.ongkir)}</td>
                        <td>{formatCurrency(order.totalPembayaran)}</td>
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

export default Dashboard;
