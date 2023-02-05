import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { deleteProduct } from "../../store/product/product-actions";
import DeleteActions from "../modals/DeleteActions";
import Modal from "../modals/Modal";

const ProductDelete = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentProduct = useAppSelector(
    (state) => state.products.currentProduct
  );

  const deleteHandler = () => {
    dispatch(deleteProduct(currentProduct.id!));
    navigate("/products");
  };

  const renderActions: () => JSX.Element = () => {
    return (
      <DeleteActions routePath={`/products`} deleteHandler={deleteHandler} />
    );
  };

  const renderContent = () => {
    return <p>Are you sure you want to delete this product?</p>;
  };

  return (
    <div className="container">
      <Modal
        title="Delete Product"
        content={renderContent}
        actions={renderActions}
        onDismiss={() => {
          navigate("/products");
        }}
      />
    </div>
  );
};

export default ProductDelete;
