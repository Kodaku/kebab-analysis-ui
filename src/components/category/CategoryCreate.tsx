import { Link, useNavigate } from "react-router-dom";
import Footer from "../UI/Footer";
import FormSimpleInput from "../UI/input/FormSimpleInput";
import Sidebar from "../UI/Sidebar";
import { useRef } from "react";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { addCategory } from "../../store/category/category-actions";

const CategoryCreate = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (nameInputRef.current) {
      dispatch(addCategory({ name: nameInputRef.current.value }));
      navigate("/categories");
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create Category</h4>
            <form className="forms-sample" onSubmit={submitHandler}>
              <FormSimpleInput ref={nameInputRef} label="Category Name" />
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <Link to="/categories">
                <button className="btn btn-light">Cancel</button>
              </Link>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
