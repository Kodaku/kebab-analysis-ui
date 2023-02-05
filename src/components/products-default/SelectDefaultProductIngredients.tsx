import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchIngredients } from "../../store/ingredient/ingredient-actions";
import { Ingredient } from "../../types";
import ConfirmActions from "../modals/ConfirmActions";
import Modal from "../modals/Modal";
import { useRef } from "react";
import { addIngredientsToDefaultProduct } from "../../store/default-product/default-product-actions";

const SelectDefaultProductIngredients = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const checkboxRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const confirmHandler = () => {
    if (checkboxRef.current) {
      const selectedIngredients: Ingredient[] = [];
      checkboxRef.current.forEach((el, index) => {
        if (el.checked) {
          selectedIngredients.push(ingredients[index]);
        }
      });
      dispatch(addIngredientsToDefaultProduct(selectedIngredients));
      navigate("/default-products/create");
    }
  };

  const renderActions: () => JSX.Element = () => {
    return (
      <ConfirmActions
        routePath={`/default-products/create`}
        confirmHandler={confirmHandler}
      />
    );
  };

  const displaySingleIngredientCheckbox = (
    ingredient: Ingredient,
    index: number
  ) => {
    return (
      <div key={ingredient.id} className="form-check form-check-info">
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            ref={(el) => (checkboxRef.current[index] = el!)}
          />
          {ingredient.name}
          <i className="input-helper"></i>
        </label>
      </div>
    );
  };

  const displayIngredientsColumn = (startIndex: number) => {
    const columnElements = [];
    for (
      let i = startIndex;
      i < startIndex + 3 && i < ingredients.length;
      i++
    ) {
      columnElements.push(displaySingleIngredientCheckbox(ingredients[i], i));
    }

    return {
      newStartIndex: startIndex + 3,
      jsx: <div className="col-md-2">{columnElements}</div>,
    };
  };

  const displayIngredientsRow = (startIndex: number) => {
    const rowElements = [];
    for (let i = 0; i < 5; i++) {
      if (startIndex < ingredients.length) {
        const { newStartIndex, jsx } = displayIngredientsColumn(startIndex);
        startIndex = newStartIndex;
        rowElements.push(jsx);
      } else {
        break;
      }
    }

    return {
      newStartIndex: startIndex,
      jsx: <div className="row">{rowElements}</div>,
    };
  };

  const renderContent = () => {
    let startIndex = 0;
    const contents: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      const { newStartIndex, jsx } = displayIngredientsRow(startIndex);
      startIndex = newStartIndex;
      contents.push(jsx);
    }
    return <Fragment>{contents}</Fragment>;
  };

  return (
    <div className="container">
      <Modal
        title="Add Ingredients"
        content={renderContent}
        actions={renderActions}
        onDismiss={() => {
          navigate("/default-products/create");
        }}
      />
    </div>
  );
};

export default SelectDefaultProductIngredients;
