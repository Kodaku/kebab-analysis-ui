import { Link } from "react-router-dom";
import Footer from "../UI/Footer";
import FormSimpleInput from "../UI/input/FormSimpleInput";
import Sidebar from "../UI/Sidebar";

const CompanyUpdate = () => {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Update Company</h4>
            <form className="forms-sample">
              <FormSimpleInput label="Company Name" />
              <FormSimpleInput label="Company Address" />
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <Link to="/companies" className="btn btn-light">
                Cancel
              </Link>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CompanyUpdate;
