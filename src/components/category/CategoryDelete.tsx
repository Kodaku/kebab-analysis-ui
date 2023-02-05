import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { deleteCategory } from "../../store/category/category-actions";
import DeleteActions from "../modals/DeleteActions";
import Modal from "../modals/Modal";

const CategoryDelete = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(
    (state) => state.categories.currentCategory
  );

  const deleteHandler = () => {
    dispatch(deleteCategory(currentCategory.id!));
    navigate("/categories");
  };

  const renderActions: () => JSX.Element = () => {
    return (
      <DeleteActions routePath={`/categories`} deleteHandler={deleteHandler} />
    );
  };

  const renderContent = () => {
    return <p>Are you sure you want to delete this category?</p>;
  };

  return (
    <div className="container">
      <Modal
        title="Delete Category"
        content={renderContent}
        actions={renderActions}
        onDismiss={() => {
          navigate("/categories");
        }}
      />
    </div>
  );
};

export default CategoryDelete;
