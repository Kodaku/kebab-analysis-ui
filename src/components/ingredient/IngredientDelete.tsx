import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { deleteIngredient } from "../../store/ingredient/ingredient-actions";
import DeleteActions from "../modals/DeleteActions";
import Modal from "../modals/Modal";

const IngredientDelete = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentIngredient = useAppSelector(
    (state) => state.ingredients.currentIngredient
  );

  const deleteHandler = () => {
    dispatch(deleteIngredient(currentIngredient.id!));
    navigate("/ingredients");
  };

  const renderActions: () => JSX.Element = () => {
    return (
      <DeleteActions routePath={`/ingredients`} deleteHandler={deleteHandler} />
    );
  };

  const renderContent = () => {
    return <p>Are you sure you want to delete this ingredient?</p>;
  };

  return (
    <div className="container">
      <Modal
        title="Delete Ingredient"
        content={renderContent}
        actions={renderActions}
        onDismiss={() => {
          navigate("/ingredients");
        }}
      />
    </div>
  );
};

export default IngredientDelete;
