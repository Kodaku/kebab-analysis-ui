import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { getUser } from "../store/user/user-actions";
import Sidebar from "./UI/Sidebar";

const AdminHome = () => {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser.id !== null) {
      // console.log(parseInt(currentUser.id!));
      dispatch(getUser(parseInt(currentUser.id!)));
    } else {
      dispatch(getUser(parseInt(localStorage.getItem("id")!)));
    }
  }, [currentUser.id, dispatch]);

  // console.log(currentUser);
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-12 grid-margin">
                <div className="row">
                  <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                    <h3 className="font-weight-bold">
                      Welcome {currentUser.name}
                    </h3>
                  </div>
                  <div className="col-12 col-xl-4">
                    <div className="justify-content-end d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2021. Premium{" "}
                <a
                  href="https://www.bootstrapdash.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bootstrap admin template
                </a>{" "}
                from BootstrapDash. All rights reserved.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                Hand-crafted & made with{" "}
                <i className="ti-heart text-danger ml-1"></i>
              </span>
            </div>
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Distributed by{" "}
                <a
                  href="https://www.themewagon.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Themewagon
                </a>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
