import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import { getMe } from "../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Order {
  idOrder: string;
  kodeUnik: string;
  status: string;
  createdAt: string;
  customer: {
    username: string;
  };
  ongkir: string;
  totalPembayaran: string;
  urlKurir: string;
  urlPembayaran: string;
}

const OrderList = () => {
  const [orders, setOrder] = useState<Order[]>([]);
  const [statusOrder, setStatusOrder] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state: RootState) => state.auth);

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
      setStatusOrder(response.data.status);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteOrder = async (userId: string | number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/order/order/${userId}`);
      getOrder();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCompleted = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: string | number
  ) => {
    e.preventDefault();
    console.log("ID:", userId);
    const jsonData = { status: "Completed" };
    try {
      await axios.patch(
        `http://localhost:5000/order/order-update/${userId}`,
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  // Fungsi untuk memformat angka sebagai mata uang IDR
  const formatCurrency = (number: string | number) => {
    // Konversi string ke number
    const num = typeof number === "string" ? parseFloat(number) : number;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
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
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">Pilih Status</option>
            <option value="Pending">Pending</option>
            <option value="Dikirim">Dikirim</option>
            <option value="Completed">Completed</option>
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
                        <th>ongkir</th>
                        <th>Total Produk</th>
                        {user && user.role === "kurir" && <th>Total Bayar</th>}
                        <th>Bukti Pengiriman</th>
                        {user && user.role === "admin" && <th>Bukti Bayar</th>}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders
                        .filter(
                          (order) =>
                            !selectedStatus || order.status === selectedStatus
                        )
                        .map((order, index) => (
                          <tr key={order.idOrder}>
                            <td>{order.kodeUnik}</td>
                            <td>
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td>{order.customer.username}</td>
                            <td>{order.status}</td>
                            <td>{formatCurrency(order.ongkir)}</td>
                            <td>{formatCurrency(order.totalPembayaran)}</td>
                            {user && user.role === "kurir" && (
                              <td>
                                {formatCurrency(
                                  order.totalPembayaran + order.ongkir
                                )}
                              </td>
                            )}
                            <td>
                              {order.urlKurir ? (
                                <a
                                  href={order.urlKurir}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Lihat Gambar
                                </a>
                              ) : (
                                "-"
                              )}
                            </td>
                            {user && user.role === "admin" && (
                              <td>
                                {order.urlPembayaran ? (
                                <a
                                  href={order.urlPembayaran}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Lihat Gambar
                                </a>
                              ) : (
                                "-"
                              )}
                              </td>
                            )}
                            <td>
                              {user && user.role === "admin" && (
                                <Link
                                  className="btn btn-primary me-2"
                                  to={`/order-detail/${order.idOrder}`}
                                >
                                  View
                                </Link>
                              )}
                              {user && user.role === "kurir" && (
                                <Link
                                  className="btn btn-primary me-2"
                                  to={`/order-list/${order.idOrder}`}
                                >
                                  Upload
                                </Link>
                              )}
                              {user && user.role === "admin" && (
                                <button
                                  onClick={() =>
                                    handleDeleteOrder(order.idOrder)
                                  }
                                  className="btn btn-danger me-2"
                                >
                                  Delete
                                </button>
                              )}
                              {user &&
                                user.role === "kurir" &&
                                order.status !== "Completed" && (
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={(e) =>
                                      handleCompleted(e, order.idOrder)
                                    }
                                  >
                                    <FontAwesomeIcon icon={faCheck} />
                                  </button>
                                )}
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
