import React, { useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const toDashboard = () => {
    navigate('/dashboard');
  };

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (emailInputRef.current && passwordInputRef.current) {
      const emailInputWidth = emailInputRef.current.offsetWidth;
      const passwordInputWidth = passwordInputRef.current.offsetWidth;
      const maxWidth = Math.max(emailInputWidth, passwordInputWidth);
      const loginButton = document.getElementById("loginButton");
      if (loginButton) {
        loginButton.style.width = maxWidth + "px";
      }
    }
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: "#ffffff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
                
              <form>
                <div className="card-body p-5">
                <h3 style={{ fontWeight: "bold" }}>Login</h3>
                  <p className="font-weight-bold text-danger"></p>
                  <div className="form-outline mb-4">
                    <input
                      ref={emailInputRef}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Email"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      ref={passwordInputRef}
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form2Example31"
                    />
                    <label className="form-check-label">Keep me logged in?</label>
                  </div>

                  <button
                    id="loginButton"
                    className="btn btn-lg btn-block d-flex justify-content-between align-items-center"
                    type="submit"
                    style={{ backgroundColor: "#003f62", color: "white" }}
                    onClick={toDashboard}
                  >
                    <span>LOGIN</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
