import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { updateIngredient } from "../../store/ingredient/ingredient-actions";
import Footer from "../UI/Footer";
import FormSimpleInput from "../UI/input/FormSimpleInput";
import Sidebar from "../UI/Sidebar";

const IngredientUpdate = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const currentIngredient = useAppSelector(
    (state) => state.ingredients.currentIngredient
  );
  const navigate = useNavigate();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (nameInputRef.current && priceInputRef.current) {
      dispatch(
        updateIngredient({
          id: currentIngredient.id,
          name: nameInputRef.current.value,
          price: parseFloat(priceInputRef.current.value),
        })
      );
      navigate("/ingredients");
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create Ingredient</h4>
            <form className="forms-sample" onSubmit={submitHandler}>
              <FormSimpleInput
                defaultValue={currentIngredient.name}
                ref={nameInputRef}
                label="Ingredient Name"
              />
              <FormSimpleInput
                ref={priceInputRef}
                label="Ingredient Price"
                type="number"
                defaultValue={currentIngredient.price.toString()}
                step={0.01}
              />
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <Link to="/ingredients" className="btn btn-light">
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

export default IngredientUpdate;
