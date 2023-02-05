import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchProducts, getProduct } from "../../store/product/product-actions";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";
import TableHead from "../UI/table/TableHead";

const Product = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  const tableHeads = ["ID", "Name", "Price", "Ingredients", "Update", "Delete"];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deleteClickHandler = (productId: number) => {
    dispatch(getProduct(productId));
  };

  const displayProducts = () => {
    return products.map((product) => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          {product.ingredients.map((ingredient) => ingredient.name + ", ")}
        </td>
        <td>
          <Link to="/products/update" type="button" className="btn btn-info">
            Update
          </Link>
        </td>
        <td>
          <Link to="/products/delete">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                deleteClickHandler(product.id!);
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
              <h4 className="card-title">Products</h4>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <TableHead heads={tableHeads} />
                  </thead>
                  <tbody>{displayProducts()}</tbody>
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

export default Product;
