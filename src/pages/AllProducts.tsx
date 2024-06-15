import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import { getMe } from "../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faChevronDown,
  faBorderAll,
} from "@fortawesome/free-solid-svg-icons";

import "../assets/css/style.css";
import album from "../assets/img/album.svg";
import order from "../assets/img/order.svg";

interface Product {
  idProduct: string;
  nama: string;
  description: string;
  category: {
    nama: string;
  };
  price: string;
  stok: {
    stok: number;
  }[];
  url: string;
}

const AllProducts = () => {
  const [products, setProduct] = useState<Product[]>([]);
  const [idProduct, setIdProduct] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isError } = useSelector((state: RootState) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const toAddProduct = () => {
    navigate("/product/add");
  };

  const handleToEditProduct = async (
    userId: string | number
  ): Promise<void> => {
    try {
      await axios.get(`http://localhost:5000/produk/${userId}`);
      getProduct();
      navigate(`/products/edit/${userId}`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleToProductId = async (userId: string | number): Promise<void> => {
    try {
      const data = await axios.get(`http://localhost:5000/produk/${userId}`);
      setIdProduct(data.data.idProduct);
      getProduct();
      navigate(`/products/view/${userId}`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/produk");
      setProduct(response.data.data);
      console.log(response.data.data);

      const counts: { [key: string]: number } = {};
      response.data.data.forEach((product: Product) => {
        counts[product.category.nama] = (counts[product.category.nama] || 0) + 1;
      });
      setCategoryCounts(counts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteProduct = async (
    userId: string | number
  ): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/produk/product/${userId}`);
      getProduct();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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
              {Object.keys(categoryCounts).map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    onClick={() => handleCategoryClick(category)}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{category}</span>
                    <div className="btn btn-sm" style={{ backgroundColor: "#E7E7E3" }}>
                      {categoryCounts[category]}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </aside>

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
            <h1>All Products</h1>
            <nav>
              <ol className="breadcrumb" style={{ margin: 0 }}>
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">All Products</li>
              </ol>
            </nav>
          </div>
          <button
            className="btn"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={toAddProduct}
          >
            <FontAwesomeIcon className="me-2" icon={faCirclePlus} />
            <span>Add New Products</span>
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "24px",
          }}
        >
          {products
            .filter((product) => !selectedCategory || product.category.nama === selectedCategory)
            .map((product) => (
            <div key={product.idProduct} className="card-body card">
              <nav
                className="header-nav"
                style={{ position: "absolute", top: "16px", right: "16px" }}
              >
                <ul className="d-flex align-items-center">
                  <li className="nav-item dropdown pe-3">
                    <button
                      className="nav-link nav-profile d-flex align-items-center pe-0"
                      data-bs-toggle="dropdown"
                    >
                      <span
                        className="d-none d-md-block dropdown-toggle ps-2"
                        style={{ color: "black" }}
                      >
                        ...
                      </span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                      <li>
                        <button
                          onClick={() => handleToProductId(product.idProduct)}
                          className="dropdown-item text-primary"
                        >
                          View
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleToEditProduct(product.idProduct)}
                          className="dropdown-item text-primary"
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDeleteProduct(product.idProduct)}
                          className="dropdown-item text-danger"
                        >
                          Hapus
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <img
                  style={{ width: "84px", height: "84px", borderRadius: "8px" }}
                  src={product.url}
                  alt=""
                />
                <div
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    className="mt-3"
                    style={{
                      color: "#232321",
                      fontSize: "16px",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    {product.category.nama}
                  </div>
                  <div
                    style={{
                      opacity: "0.6",
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    {product.nama}
                  </div>

                  <div
                    style={{
                      color: "#232321",
                      fontSize: "14px",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    {product.price}
                  </div>
                </div>
              </div>
              <div
                style={{
                  color: "#232321",
                  fontSize: "16px",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                Summary
              </div>
              <div
                style={{
                  opacity: "0.6",
                  color: "#232321",
                  fontSize: "14px",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                {product.description}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    opacity: "0.8",
                    color: "#232321",
                    fontSize: "14px",
                    fontWeight: "600",
                    wordWrap: "break-word",
                  }}
                >
                  Sisa produk
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "4px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "4px",
                        left: "0",
                        top: "0",
                        position: "absolute",
                        background: "#E7E7E3",
                        borderRadius: "8px",
                      }}
                    />
                    <div
                      style={{
                        width: "30px",
                        height: "4px",
                        left: "0",
                        top: "0",
                        position: "absolute",
                        background: "#FFA52F",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      opacity: "0.6",
                      color: "black",
                      fontSize: "14px",
                      fontWeight: "600",
                      wordWrap: "break-word",
                    }}
                  >
                    {product.stok[0]?.stok ?? 0}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllProducts;
