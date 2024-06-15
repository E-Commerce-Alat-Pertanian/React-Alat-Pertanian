import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AllProducts from "./pages/AllProducts";
import OrderList from "./pages/OrderList";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import OrderDetail from "./pages/OrderDetail";
import UploadImageKurir from "./pages/UploadImageKurir";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <LoginPage />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Sidebar />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Navbar />
              <AllProducts />
            </>
          }
        />
        <Route
          path="/order-list"
          element={
            <>
              <Navbar />
              <Sidebar />
              <OrderList />
            </>
          }
        />
        <Route
          path="/order-detail/:id"
          element={
            <>
              <Navbar />
              <Sidebar />
              <OrderDetail />
            </>
          }
        />
        <Route
          path="/order-list/:id"
          element={
            <>
              <Navbar />
              <Sidebar />
              <UploadImageKurir />
            </>
          }
        />
        <Route
          path="/products/view/:id"
          element={
            <>
              <Navbar />
              <Sidebar />
              <ProductDetail />
            </>
          }
        />
        <Route
          path="/product/add"
          element={
            <>
              <Navbar />
              <Sidebar />
              <AddProduct />
            </>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <>
              <Navbar />
              <Sidebar />
              <EditProduct />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
