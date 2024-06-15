import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import { getMe } from "../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPrint } from "@fortawesome/free-solid-svg-icons";
import userIcon from "../assets/img/user.svg";
import bagShop from "../assets/img/bagShop.svg";
import "../styles/OrderDetail.css";

interface Keranjang {
  product: {
    idProduct: string;
    nama: string;
    price: number;
  };
  idOrder: string;
  kodeUnik: string;
  quantity: number;
}

const OrderDetail = () => {
  const [idOrder, setIdOrder] = useState("");
  const [kodeUnik, setKodeUnik] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [status, setStatus] = useState("");
  const [alamat, setAlamat] = useState("");
  const [ongkir, setOngkir] = useState(0);
  const [keranjangs, setKeranjangs] = useState<Keranjang[]>([]);
  const { id } = useParams();
  const [newStatus, setNewStatus] = useState("");

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
    getOrderById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrderById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/order/order/${id}`
      );
      const order = response.data;
      setIdOrder(response.data.idOrder);
      setKodeUnik(response.data.kodeUnik);
      setCreatedAt(moment(response.data.createdAt).format("DD-MM-YYYY"));
      setUsername(response.data.customer.username);
      setEmail(response.data.customer.email);
      setNoHp(response.data.customer.noHp);
      setStatus(response.data.status);
      setAlamat(response.data.customer.alamat);
      setOngkir(response.data.ongkir);
      setKeranjangs(order.keranjangs);
    } catch (error) {
      console.error("There was an error fetching the order!", error);
    }
  };

  const calculateSubtotal = () => {
    return keranjangs.reduce((total, keranjang) => {
      return total + keranjang.product.price * keranjang.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  type OrderStatus = "Pending" | "Dikirim" | "Completed";

  const getStatusStyle = (status: OrderStatus): string => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Dikirim":
        return "blue";
      case "Completed":
        return "green";
      default:
        return "grey";
    }
  };

  const isValidStatus = (status: string): status is OrderStatus => {
    return ["Pending", "Dikirim", "Completed"].includes(status);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(event.target.value);
  };

  const updateOrder = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await axios.patch(
        `http://localhost:5000/order/order-update/${id}`,
        { status: newStatus },
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

  const handlePrintButtonClick = () => {
    window.print();
  };

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
                className="pagetitle-detail printable"
                style={{
                  marginTop: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  <h1 style={{ marginRight: "10px" }}>
                    Order ID: {kodeUnik}
                    <span
                      className="px-2 py-2"
                      style={{
                        fontSize: "15px",
                        textAlign: "center",
                        background: isValidStatus(status)
                          ? getStatusStyle(status)
                          : "grey",
                        borderRadius: "10px",
                        marginLeft: "20px",
                        color: "white",
                      }}
                    >
                      {status}
                    </span>
                  </h1>
                  <ol className="breadcrumb mt-3" style={{ margin: 0 }}>
                    <li className="me-2">
                      <FontAwesomeIcon
                        className="ms-auto"
                        icon={faCalendarDays}
                      />
                    </li>
                    <li className="breadcrumb-item active">{createdAt}</li>
                  </ol>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {user && user.role === "kurir" && (
                    <button
                      className="btn me-2"
                      style={{
                        width: 150,
                        height: 50,
                        marginLeft: "10px",
                        background: "#F4F2F2",
                        border: "none",
                      }}
                    >
                      Upload Image
                    </button>
                  )}
                  <select
                    style={{
                      width: 219,
                      height: 52,
                      padding: 16,
                      background: "#F4F2F2",
                      borderRadius: 8,
                      border: "none",
                    }}
                    onChange={handleStatusChange}
                  >
                    <option value="">Change Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Dikirim">Dikirim</option>
                    <option value="Completed">Completed</option>
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
                    onClick={handlePrintButtonClick}
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
                    onClick={updateOrder}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="row printable">
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
                          src={userIcon}
                          alt=""
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "white",
                          }}
                        />
                      </div>
                      <div className="ps-3">
                        <h5
                          className="card-title"
                          style={{ fontWeight: "bold" }}
                        >
                          Customer
                        </h5>
                        <p style={{ marginBottom: "3px" }}>
                          Full Name: {username}
                        </p>
                        <p style={{ marginBottom: "3px" }}>Email: {email}</p>
                        <p style={{ marginBottom: "0" }}>Phone: {noHp}</p>
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
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "white",
                          }}
                        />
                      </div>
                      <div className="ps-3">
                        <h5
                          className="card-title"
                          style={{ fontWeight: "bold" }}
                        >
                          Order Info
                        </h5>
                        <p style={{ marginBottom: "3px" }}>
                          Shipping: Raja Ongkir
                        </p>
                        <p style={{ marginBottom: "0px" }}>Status: {status}</p>
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
                          style={{
                            width: "30px",
                            height: "30px",
                            color: "white",
                          }}
                        />
                      </div>
                      <div className="ps-3">
                        <h5
                          className="card-title"
                          style={{ fontWeight: "bold" }}
                        >
                          Deliver To
                        </h5>
                        <p>Address: {alamat}</p>
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

              <table id="table-id" className="table printable">
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Product ID</th>
                    <th style={{ textAlign: "left" }}>Product Name</th>
                    <th>Quantity</th>
                    <th></th>
                    <th className="pe-4" style={{ textAlign: "right" }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {keranjangs.map((keranjang, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: "left" }}>
                        {keranjang.product.idProduct}
                      </td>
                      <td className="ps-4" style={{ textAlign: "left" }}>
                        {keranjang.product.nama}
                      </td>
                      <td>{keranjang.quantity}</td>
                      <td></td>
                      <td style={{ textAlign: "right" }}>
                      {formatCurrency(keranjang.product.price * keranjang.quantity)}
                      </td>
                    </tr>
                  ))}
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
                    <td className="printable" style={{ textAlign: "right" }}>
                      Subtotal
                    </td>
                    <td className="printable" style={{ textAlign: "right" }}>
                    {formatCurrency(subtotal)}
                    </td>
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
                    <td className="printable" style={{ textAlign: "right" }}>
                      Ongkos Kirim
                    </td>
                    <td className="printable" style={{ textAlign: "right" }}>
                    {formatCurrency(ongkir)}
                    </td>
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
                    <td
                      className="printable"
                      style={{ textAlign: "right", fontSize: "25px" }}
                    >
                      Total
                    </td>
                    <td
                      className="printable"
                      style={{ textAlign: "right", fontSize: "25px" }}
                    >
                      {formatCurrency(subtotal + ongkir)}
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
