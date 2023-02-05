import { Link, useNavigate } from "react-router-dom";
import Footer from "../UI/Footer";
import FormSimpleInput from "../UI/input/FormSimpleInput";
import Sidebar from "../UI/Sidebar";
import { useRef } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addCompany } from "../../store/company/company-actions";

const CreateCompany = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLSelectElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const civicInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      nameInputRef.current &&
      cityInputRef.current &&
      addressInputRef.current &&
      civicInputRef.current
    ) {
      const address =
        cityInputRef.current.value +
        " " +
        addressInputRef.current.value +
        " " +
        civicInputRef.current.value;
      console.log(nameInputRef.current.value);
      console.log(address);
      dispatch(
        addCompany({ name: nameInputRef.current.value, address: address })
      );
      navigate("/companies");
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create Company</h4>
            <form className="forms-sample" onSubmit={submitHandler}>
              <FormSimpleInput ref={nameInputRef} label="Company Name" />
              <div className="form-group row">
                <label className="col-md-3 col-form-label">City</label>
                <label className="col-md-6 col-form-label">Address</label>
                <label className="col-md-3 col-form-label">Civic Number</label>
              </div>
              <div className="form-group row">
                <div className="col-md-3">
                  <select ref={cityInputRef} className="form-control">
                    <option value="CastelGoffredo">Castel Goffredo</option>
                    <option value="Casaloldo">Casaloldo</option>
                    <option value="Medole">Medole</option>
                    <option value="Poiano">Poiano</option>
                    <option value="Acquafredda">Acquafredda</option>
                    <option value="Casalpoglio">Casalpoglio</option>
                    <option value="Castelnuovo">Castelnuovo</option>
                    <option value="Casalmoro">Casalmoro</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    ref={addressInputRef}
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="col-md-3">
                  <input
                    ref={civicInputRef}
                    className="form-control"
                    type="text"
                  />
                </div>
              </div>
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

export default CreateCompany;
