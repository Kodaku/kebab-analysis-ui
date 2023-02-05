import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { deleteDefaultProduct } from "../../store/default-product/default-product-actions";
import DeleteActions from "../modals/DeleteActions";
import Modal from "../modals/Modal";

const ProductDefaultDelete = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentDefaultProduct = useAppSelector(
    (state) => state.defaultProducts.currentDefaultProduct
  );

  const deleteHandler = () => {
    dispatch(deleteDefaultProduct(currentDefaultProduct.id!));
    navigate("/default-products");
  };

  const renderActions: () => JSX.Element = () => {
    return (
      <DeleteActions
        routePath={`/default-products`}
        deleteHandler={deleteHandler}
      />
    );
  };

  const renderContent = () => {
    return <p>Are you sure you want to delete this default product?</p>;
  };

  return (
    <div className="container">
      <Modal
        title="Delete Default Product"
        content={renderContent}
        actions={renderActions}
        onDismiss={() => {
          navigate("/default-products");
        }}
      />
    </div>
  );
};

export default ProductDefaultDelete;
