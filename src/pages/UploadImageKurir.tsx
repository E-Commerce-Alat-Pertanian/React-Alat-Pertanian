/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import { getMe } from "../features/authSlice";

const UploadImageKurir = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { id } = useParams();

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

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    try {
      await axios.patch(
        `http://localhost:5000/order/order-kurir/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/order-list");
    } catch (error) {
      console.log(error);
    }
  };

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file); // Correct the typing here
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Upload Bukti</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Upload Image</li>
              <li className="breadcrumb-item active">Bukti Pengiriman</li>
            </ol>
          </nav>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={uploadImage}>
              <label
                className="card-title"
                style={{ fontWeight: "bolder", color: "black" }}
              >
                Upload Image
              </label>
              <div className="control">
                <div className="file">
                  <input type="file" onChange={loadImage} />
                </div>
              </div>
              <label
                className="card-title"
                style={{ fontWeight: "bolder", color: "black" }}
              >
                Preview
              </label>
              {preview ? (
                <figure>
                  <img
                    src={preview}
                    style={{ width: "50%" }}
                    alt="Preview Image"
                  />
                </figure>
              ) : null}
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadImageKurir;
