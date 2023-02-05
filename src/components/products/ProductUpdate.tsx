import { Link } from "react-router-dom";
import Footer from "../UI/Footer";
import FormDropdownInput from "../UI/input/FormDropdownInput";
import FormSimpleInput from "../UI/input/FormSimpleInput";
import Sidebar from "../UI/Sidebar";

const ProductUpdate = () => {
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Update Product</h4>
            <form className="forms-sample">
              <FormSimpleInput
                label="Product Price"
                type="number"
                placeholder="0.0"
              />
              {/* <FormDropdownInput dropdownTitle="Select Category" />
              <FormDropdownInput dropdownTitle="Select Base Product" /> */}
              <div className="form-group row">
                <div className="col-md-6">
                  <Link
                    to="/products/ingredients"
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
              <Link to="/products" className="btn btn-light">
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

export default ProductUpdate;
