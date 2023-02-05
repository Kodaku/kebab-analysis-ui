import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import Modal from "../modals/Modal";
import { useRef, useEffect, useCallback } from "react";
import { fetchCategories } from "../../store/category/category-actions";
import {
  fetchDefaultProducts,
  getDefaultProduct,
} from "../../store/default-product/default-product-actions";
import {
  clearBaseDefaultProduct,
  clearIngredientsFromProduct,
  replaceBaseDefaultProduct,
} from "../../store/product/product-actions";
import { DefaultProduct } from "../../types";
import { storeProductCreateData } from "../../store/product/product-create-actions";
import { addProductToOrder } from "../../store/order/order-create-action";

const ProductCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const priceInputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const defaultProductSelectRef = useRef<HTMLSelectElement>(null);
  const categories = useAppSelector((state) => state.categories.categories);
  const defaultProducts = useAppSelector(
    (state) => state.defaultProducts.defaultProducts
  );
  const currentDefaultProduct = useAppSelector(
    (state) => state.defaultProducts.currentDefaultProduct
  );
  const productIngredients = useAppSelector(
    (state) => state.products.currentIngredients
  );
  const productCreate = useAppSelector(
    (state) => state.productCreate.productCreate
  );
  const [defaultProductsInSelect, setDefaultProductsInSelect] = useState<
    DefaultProduct[]
  >(
    defaultProducts.filter(
      (defaultProduct) => defaultProduct.categoryId === productCreate.categoryId
    )
  );
  const [price, setPrice] = useState<number>(0.0);

  const optionCategories: { key: string | undefined; value: string }[] =
    categories.map((category) => {
      return {
        key: category.id?.toString(),
        value: category.name,
      };
    });

  const optionDefaultProducts: { key: string | undefined; value: string }[] =
    defaultProductsInSelect.map((defaultProduct) => {
      return {
        key: defaultProduct.id?.toString(),
        value: defaultProduct.name,
      };
    });

  const computeProductAdditionalPrice = useCallback(() => {
    let total = 0.0;
    productIngredients.forEach((productIngredient) => {
      if (
        currentDefaultProduct.ingredients.findIndex(
          (ingredient) => productIngredient.name === ingredient.name
        ) === -1
      ) {
        total += productIngredient.price;
      }
    });
    return total;
  }, [currentDefaultProduct, productIngredients]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchDefaultProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(replaceBaseDefaultProduct(currentDefaultProduct));
    setPrice(currentDefaultProduct.price + computeProductAdditionalPrice());
  }, [dispatch, currentDefaultProduct, computeProductAdditionalPrice]);

  const defaultProductChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id = parseInt(event.target.value);
    dispatch(getDefaultProduct(id));
  };

  const categorySelectChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDefaultProductsInSelect(
      defaultProducts.filter(
        (defaultProduct) =>
          defaultProduct.categoryId === parseInt(event.target.value)
      )
    );
  };

  const storeProductCreateDataHandler = () => {
    console.log("Storing default product data");
    if (priceInputRef.current && categorySelectRef.current) {
      dispatch(
        storeProductCreateData({
          price: parseFloat(priceInputRef.current.value),
          categoryId: parseInt(categorySelectRef.current.value),
          defaultProduct: currentDefaultProduct,
        })
      );
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (priceInputRef.current && categorySelectRef.current) {
      console.log(priceInputRef.current.value);
      console.log(categorySelectRef.current.value);
      console.log(productIngredients);
      dispatch(
        addProductToOrder({
          name: currentDefaultProduct.name,
          price: parseFloat(priceInputRef.current.value),
          ingredients: productIngredients,
          defaultProductId: currentDefaultProduct.id!,
        })
      );
      dispatch(clearIngredientsFromProduct());
      navigate("/orders/create");
    }
  };

  const renderContent = () => {
    return (
      <form className="forms-sample">
        <div className="form-group row">
          <label className="col-md-6 col-form-label">Product Price</label>
          <div className="col-md-12">
            <input
              ref={priceInputRef}
              type="number"
              className="form-control"
              required
              step={0.01}
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Select Category</label>
          <select
            className="form-control"
            ref={categorySelectRef}
            defaultValue={productCreate.categoryId.toString()}
            onChange={categorySelectChangeHandler}
          >
            {optionCategories.map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select Default Product</label>
          <select
            className="form-control"
            ref={defaultProductSelectRef}
            defaultValue={productCreate.defaultProduct.id}
            onChange={defaultProductChangeHandler}
          >
            {optionDefaultProducts.map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group row">
          <div className="col-md-6">
            <Link to="/products/ingredients">
              <button
                onClick={() => {
                  storeProductCreateDataHandler();
                }}
                className="btn btn-info mr-2"
              >
                Add Ingredients
              </button>
            </Link>
          </div>
          <div className="col-md-6">
            <h6>Chosen Ingredients</h6>
            <p>
              {productIngredients.map((ingredient) => ingredient.name + ", ")}
            </p>
          </div>
        </div>
      </form>
    );
  };

  const createActions = () => {
    return (
      <Fragment>
        <button
          onClick={submitHandler}
          type="submit"
          className="btn btn-primary mr-2"
        >
          Submit
        </button>
        <Link to="/orders/create">
          <button
            onClick={() => {
              dispatch(clearBaseDefaultProduct());
              dispatch(clearIngredientsFromProduct());
            }}
            className="btn btn-light"
          >
            Cancel
          </button>
        </Link>
      </Fragment>
    );
  };

  return (
    <Modal
      title="Create Product"
      content={renderContent}
      actions={createActions}
      onDismiss={() => navigate("/orders/create")}
    />
  );
};

export default ProductCreate;
