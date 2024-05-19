import React from 'react'

const EditProduct = () => {
  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Edit Product</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item active">All Products</li>
              <li className="breadcrumb-item active">Edit Product</li>
            </ol>
          </nav>
        </div>
        <section className="section">
          <form action="">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-8">
                    <label
                      className="card-title"
                      style={{ fontWeight: "bolder", color: "black" }}
                    >
                      Product Name
                    </label>
                    <div
                      style={{
                        height: 48,
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          height: 48,
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "stretch",
                            height: 48,
                            paddingLeft: 16,
                            borderRadius: 8,
                            border: "1px solid",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            display: "inline-flex",
                          }}
                        >
                          <input
                            type="text"
                            style={{
                              fontSize: 16,
                              border: "none",
                              outline: "none",
                            }}
                            placeholder="Type name here"
                          />
                        </div>
                      </div>
                    </div>

                    <label
                      className="card-title"
                      style={{ fontWeight: "bolder", color: "black" }}
                    >
                      Description
                    </label>
                    <div
                      style={{
                        alignSelf: "stretch",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: 8,
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: 4,
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "stretch",
                            paddingLeft: 16,
                            paddingTop: 10,
                            borderRadius: 8,
                            border: "1px solid",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            display: "inline-flex",
                          }}
                        >
                          <textarea
                            style={{
                              fontSize: 16,
                              border: "none",
                              outline: "none",
                              resize: "none",
                              height: "120px",
                            }}
                            placeholder="Type description here"
                          />
                        </div>
                      </div>
                    </div>

                    <label
                      className="card-title"
                      style={{ fontWeight: "bolder", color: "black" }}
                    >
                      Category
                    </label>
                    <div
                      style={{
                        height: 48,
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          height: 48,
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "stretch",
                            height: 48,
                            paddingLeft: 16,
                            borderRadius: 8,
                            border: "1px solid",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 8,
                            display: "inline-flex",
                          }}
                        >
                          <input
                            type="text"
                            style={{
                              fontSize: 16,
                              border: "none",
                              outline: "none",
                            }}
                            placeholder="Type Category here"
                          />
                        </div>
                      </div>
                    </div>

                    <label
                      className="card-title"
                      style={{ fontWeight: "bolder", color: "black" }}
                    >
                      Brand Name
                    </label>
                    <div
                      style={{
                        height: 48,
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          height: 48,
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "stretch",
                            height: 48,
                            paddingLeft: 16,
                            borderRadius: 8,
                            border: "1px solid",
                            justifyContent: "flex-start",
                            display: "inline-flex",
                          }}
                        >
                          <input
                            type="text"
                            style={{
                              fontSize: 16,
                              border: "none",
                              outline: "none",
                            }}
                            placeholder="Type Brand name here"
                          />
                        </div>
                      </div>
                    </div>

                    <label
                      className="card-title"
                      style={{ fontWeight: "bolder", color: "black" }}
                    >
                      Stock Quantity
                    </label>
                    <div
                      style={{
                        height: 48,
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          alignSelf: "stretch",
                          height: 48,
                          flexDirection: "column",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            alignSelf: "stretch",
                            height: 48,
                            paddingLeft: 16,
                            borderRadius: 8,
                            border: "1px solid",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            display: "inline-flex",
                          }}
                        >
                          <input
                            type="text"
                            style={{
                              fontSize: 16,
                              border: "none",
                              outline: "none",
                            }}
                            placeholder="1258"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <label
                          className="card-title"
                          style={{ fontWeight: "bolder", color: "black" }}
                        >
                          Regular Price
                        </label>
                        <div
                          style={{
                            height: 48,
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            display: "flex",
                          }}
                        >
                          <div
                            style={{
                              alignSelf: "stretch",
                              height: 48,
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              display: "flex",
                            }}
                          >
                            <div
                              style={{
                                alignSelf: "stretch",
                                height: 48,
                                paddingLeft: 16,
                                borderRadius: 8,
                                border: "1px solid",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                display: "inline-flex",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  fontSize: 16,
                                  border: "none",
                                  outline: "none",
                                }}
                                placeholder="1258"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 mb-5">
                        <label
                          className="card-title"
                          style={{ fontWeight: "bolder", color: "black" }}
                        >
                          Sale Price
                        </label>
                        <div
                          style={{
                            height: 48,
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            display: "flex",
                          }}
                        >
                          <div
                            style={{
                              alignSelf: "stretch",
                              height: 48,
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              display: "flex",
                            }}
                          >
                            <div
                              style={{
                                alignSelf: "stretch",
                                height: 48,
                                paddingLeft: 16,
                                borderRadius: 8,
                                border: "1px #232321 solid",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                display: "inline-flex",
                              }}
                            >
                              <input
                                type="text"
                                style={{
                                  fontSize: 16,
                                  border: "none",
                                  outline: "none",
                                }}
                                placeholder="1258"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <label
                      className="card-title"
                      style={{ fontWeight: "bolder", color: "black" }}
                    >
                      Upload Image
                    </label>
                    <div className="control">
                      <div className="file">
                        <input type="file" className="file-input" />
                      </div>
                    </div>

                    <label
                      className="card-title"
                      style={{ fontWeight: "bolder", color: "black" }}
                    >
                      Preview
                    </label>
                    {/* {preview ? (
                    <figure>
                        <img
                        src={preview}
                        style={{ width: "40%" }}
                        alt="Preview Image"
                        />
                    </figure>
                    ) : (
                    ""
                    )} */}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default EditProduct
