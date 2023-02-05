import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  fetchCompanies,
  getCompany,
} from "../../store/company/company-actions";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";
import TableHead from "../UI/table/TableHead";

const Company = () => {
  const tableHeads = ["ID", "Name", "Address", "Update", "Delete"];

  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companies.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const deleteClickHandler = (companyId: number) => {
    dispatch(getCompany(companyId));
  };

  const displayCompanies = () => {
    return companies.map((company) => (
      <tr key={company.id}>
        <td>{company.id}</td>
        <td>{company.name}</td>
        <td>{company.address}</td>
        <td>
          <Link to="/companies/update" type="button" className="btn btn-info">
            Update
          </Link>
        </td>
        <td>
          <Link to="/companies/delete">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteClickHandler(company.id!);
              }}
            >
              Delete
            </button>
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <Fragment>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h4 className="card-title">Companies</h4>
              <Link
                to="/companies/create"
                type="button"
                className="btn btn-success"
              >
                Add Company
              </Link>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <TableHead heads={tableHeads} />
                  </thead>
                  <tbody>{displayCompanies()}</tbody>
                </table>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Company;
