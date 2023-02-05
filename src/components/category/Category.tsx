import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  fetchCategories,
  getCategory,
} from "../../store/category/category-actions";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";
import TableHead from "../UI/table/TableHead";

const Category = () => {
  const tableHeads = ["ID", "Name", "Update", "Delete"];
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteClickHandler = (categoryId: number) => {
    dispatch(getCategory(categoryId));
  };

  const displayCategories = () => {
    return categories.map((category) => (
      <tr key={category.id}>
        <td>{category.id}</td>
        <td>{category.name}</td>
        <td>
          <Link to="/categories/update" type="button" className="btn btn-info">
            Update
          </Link>
        </td>
        <td>
          <Link to="/categories/delete">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteClickHandler(category.id!);
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
              <h4 className="card-title">Categories</h4>
              <Link
                to="/categories/create"
                type="button"
                className="btn btn-success"
              >
                Add Category
              </Link>
              <div className="table-responsive">
                <table className="table table-striped">
                  <TableHead heads={tableHeads} />
                  <tbody>{displayCategories()}</tbody>
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

export default Category;
