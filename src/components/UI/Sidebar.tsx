import { Fragment } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Fragment>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo mr-5" to="/">
            <img src="images/logo.svg" className="mr-2" alt="logo" />
          </Link>
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img src="images/logo-mini.svg" alt="logo" />
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-toggle="minimize"
          >
            <span className="icon-menu"></span>
          </button>
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div
                  className="input-group-prepend hover-cursor"
                  id="navbar-search-icon"
                >
                  <span className="input-group-text" id="search">
                    <i className="icon-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="navbar-search-input"
                  placeholder="Search now"
                  aria-label="search"
                  aria-describedby="search"
                />
              </div>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right"></ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="icon-menu"></span>
          </button>
        </div>
      </nav>
      <div id="right-sidebar" className="settings-panel"></div>
      <nav className="sidebar" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="icon-grid menu-icon"></i>
              <span className="menu-title">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-toggle="collapse"
              to={"/companies"}
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i className="icon-layout menu-icon"></i>
              <span className="menu-title">Companies</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-toggle="collapse"
              to="/categories"
              aria-expanded="false"
              aria-controls="form-elements"
            >
              <i className="icon-columns menu-icon"></i>
              <span className="menu-title">Categories</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-toggle="collapse"
              to="/ingredients"
              aria-expanded="false"
              aria-controls="charts"
            >
              <i className="icon-bar-graph menu-icon"></i>
              <span className="menu-title">Ingredients</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-toggle="collapse"
              to="/default-products"
              aria-expanded="false"
              aria-controls="tables"
            >
              <i className="icon-grid-2 menu-icon"></i>
              <span className="menu-title">Default Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-toggle="collapse"
              to="/products"
              aria-expanded="false"
              aria-controls="icons"
            >
              <i className="icon-contract menu-icon"></i>
              <span className="menu-title">Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              data-toggle="collapse"
              to="/orders"
              aria-expanded="false"
              aria-controls="auth"
            >
              <i className="icon-head menu-icon"></i>
              <span className="menu-title">Orders</span>
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Sidebar;
