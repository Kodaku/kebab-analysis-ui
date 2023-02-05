import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  fetchDefaultProducts,
  getDefaultProduct,
} from "../../store/default-product/default-product-actions";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";
import TableHead from "../UI/table/TableHead";

const ProductDefault = () => {
  const dispatch = useAppDispatch();
  const defaultProducts = useAppSelector(
    (state) => state.defaultProducts.defaultProducts
  );

  const tableHeads = [
    "ID",
    "Name",
    "Price",
    "Category ID",
    "Ingredients",
    "Update",
    "Delete",
  ];

  useEffect(() => {
    dispatch(fetchDefaultProducts());
  }, [dispatch]);

  const deleteClickHandler = (defaultProductId: number) => {
    dispatch(getDefaultProduct(defaultProductId));
  };

  const displayDefaultProducts = () => {
    return defaultProducts.map((defaultProduct) => (
      <tr key={defaultProduct.id}>
        <td>{defaultProduct.id}</td>
        <td>{defaultProduct.name}</td>
        <td>{defaultProduct.price}</td>
        <td>{defaultProduct.categoryId}</td>
        <td>
          {defaultProduct.ingredients
            ? defaultProduct.ingredients.map(
                (ingredient) => ingredient.name + " "
              )
            : ""}
        </td>
        <td>
          <Link
            to="/default-products/update"
            type="button"
            className="btn btn-info"
          >
            Update
          </Link>
        </td>
        <td>
          <Link to="/default-products/delete">
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                deleteClickHandler(defaultProduct.id!);
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
              <h4 className="card-title">Default Products</h4>
              <Link
                to="/default-products/create"
                type="button"
                className="btn btn-success"
              >
                Add Default Product
              </Link>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <TableHead heads={tableHeads} />
                  </thead>
                  <tbody>{displayDefaultProducts()}</tbody>
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

export default ProductDefault;
