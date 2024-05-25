import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from '../app/store';
import { getMe } from "../features/authSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

interface Product {
  idProduct: string;
  nama: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  url: string;
}

const AllProducts = () => {
  const [products, setProduct] = useState<Product[]>([]);
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

  const toAddProduct = () => {
    navigate('/product/add');
  };

  const toProductDetail = () => {
    navigate('/product/details');
  };

  const toEditProduct = () => {
    navigate('/product/edit');
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteProduct = async (userId: string | number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/product/${userId}`);
      getProduct();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <main id="main" className="main">
      <div className="pagetitle" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
        <button className="btn" style={{backgroundColor: "black", color: "white"}} onClick={toAddProduct}>
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

        {products.map((product) => (
          <div key={product.idProduct} className="card-body card">
            <nav className="header-nav" style={{ position: "absolute", top: "16px", right: "16px" }}>
              <ul className="d-flex align-items-center">
                <li className="nav-item dropdown pe-3">
                  <button className="nav-link nav-profile d-flex align-items-center pe-0" data-bs-toggle="dropdown">
                    <span className="d-none d-md-block dropdown-toggle ps-2" style={{ color: "black" }}>
                      ...
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <li>
                      <button onClick={toProductDetail} className="dropdown-item text-primary">View</button>
                    </li>
                    <li>
                      <button onClick={toEditProduct} className="dropdown-item text-primary">Edit</button>
                    </li>
                    <li>
                      <button onClick={() =>
                                  handleDeleteProduct(product.idProduct)
                                } className="dropdown-item text-danger">Hapus</button>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img
                style={{ width: "84px", height: "84px", borderRadius: "8px" }}
                src={product.url}
                alt=""
              />
              <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="mt-3" style={{ color: "#232321", fontSize: "16px", fontWeight: "600", wordWrap: "break-word" }}>
                {product.category}
                </div>
                <div style={{ opacity: "0.6", color: "black", fontSize: "14px", fontWeight: "600", wordWrap: "break-word" }}>
                {product.nama}
                </div>
                
                <div style={{ color: "#232321", fontSize: "14px", fontWeight: "600", wordWrap: "break-word" }}>
                {product.price}
                </div>
              </div>
            </div>
            <div style={{ color: "#232321", fontSize: "16px", fontWeight: "600", wordWrap: "break-word" }}>
              Summary
            </div>
            <div style={{ opacity: "0.6", color: "#232321", fontSize: "14px", fontWeight: "400", wordWrap: "break-word" }}>
            {product.description}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ opacity: "0.8", color: "#232321", fontSize: "14px", fontWeight: "600", wordWrap: "break-word" }}>
                Sisa produk
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "52px", height: "4px", position: "relative" }}>
                  <div style={{ width: "52px", height: "4px", left: "0", top: "0", position: "absolute", background: "#E7E7E3", borderRadius: "8px" }} />
                  <div style={{ width: "30px", height: "4px", left: "0", top: "0", position: "absolute", background: "#FFA52F", borderRadius: "8px" }} />
                </div>
                <div style={{ opacity: "0.6", color: "black", fontSize: "14px", fontWeight: "600", wordWrap: "break-word" }}>
                {product.stock}
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
