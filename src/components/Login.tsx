import React, { useRef } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import { login } from "../store/auth/auth-actions";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      dispatch(login(emailRef.current.value, passwordRef.current.value));
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src="../../images/logo.svg" alt="logo" />
                </div>
                <h4>Welcome to Kebab Vision</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={loginHandler}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      ref={emailRef}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      ref={passwordRef}
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                    >
                      SIGN IN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
