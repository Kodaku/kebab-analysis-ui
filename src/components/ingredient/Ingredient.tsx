import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import {
  fetchIngredients,
  getIngredient,
} from "../../store/ingredient/ingredient-actions";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";
import TableHead from "../UI/table/TableHead";

const Ingredient = () => {
  const tableHeads = ["ID", "Name", "Price", "Update", "Delete"];

  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const actionClickHandler = (ingredientId: number) => {
    dispatch(getIngredient(ingredientId));
  };

  const displayIngredients = () => {
    return ingredients.map((ingredient) => (
      <tr key={ingredient.id}>
        <td>{ingredient.id}</td>
        <td>{ingredient.name}</td>
        <td>{ingredient.price}</td>
        <td>
          <Link to="/ingredients/update">
            <button
              type="button"
              className="btn btn-info"
              onClick={() => {
                actionClickHandler(ingredient.id!);
              }}
            >
              Update
            </button>
          </Link>
        </td>
        <td>
          <Link to="/ingredients/delete">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                actionClickHandler(ingredient.id!);
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
              <h4 className="card-title">Ingredients</h4>
              <Link
                to="/ingredients/create"
                type="button"
                className="btn btn-success"
              >
                Add Ingredient
              </Link>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <TableHead heads={tableHeads} />
                    {displayIngredients()}
                  </thead>
                  <tbody></tbody>
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

export default Ingredient;
