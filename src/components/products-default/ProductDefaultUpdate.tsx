import { Link } from "react-router-dom";
import Footer from "../UI/Footer";
import FormDropdownInput from "../UI/input/FormDropdownInput";
import FormSimpleInput from "../UI/input/FormSimpleInput";
import Sidebar from "../UI/Sidebar";

const ProductDefaultUpdate = () => {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create Default Product</h4>
            <form className="forms-sample">
              <FormSimpleInput label="Default Product Name" />
              <FormSimpleInput
                label="Default Product Price"
                type="number"
                placeholder="0.0"
              />
              {/* <FormDropdownInput dropdownTitle="Select Category" /> */}
              <div className="form-group row">
                <div className="col-md-6">
                  <Link
                    to="/default-products/ingredients"
                    className="btn btn-info mr-2"
                  >
                    Add Ingredients
                  </Link>
                </div>
                <div className="col-md-6">
                  <h6>Chosen Ingredients</h6>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <Link to="/default-products" className="btn btn-light">
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

export default ProductDefaultUpdate;
