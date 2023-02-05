import { Link, useNavigate } from "react-router-dom";
import Footer from "../UI/Footer";
import FormDropdownInput from "../UI/input/FormDropdownInput";
import FormSimpleInput from "../UI/input/FormSimpleInput";
import Sidebar from "../UI/Sidebar";
import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchCategories } from "../../store/category/category-actions";
import {
  addDefaultProduct,
  clearIngredientsFromDefaultProduct,
} from "../../store/default-product/default-product-actions";
import { storeDefaultProductCreateData } from "../../store/default-product/default-product-create-actions";

const ProductDefaultCreate = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const categorySelectRef = useRef<HTMLSelectElement>(null);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const productIngredients = useAppSelector(
    (state) => state.defaultProducts.currentIngredients
  );
  const defaultProductCreate = useAppSelector(
    (state) => state.defaultProductCreate.defaultProductCreate
  );
  const navigate = useNavigate();

  const optionCategories: { key: string | undefined; value: string }[] =
    categories.map((category) => {
      return {
        key: category.id?.toString(),
        value: category.name,
      };
    });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const storeDefaultProductCreateDataHandler = () => {
    console.log("Storing default product data");
    if (
      nameInputRef.current &&
      priceInputRef.current &&
      categorySelectRef.current
    ) {
      dispatch(
        storeDefaultProductCreateData({
          name: nameInputRef.current.value,
          price: parseFloat(priceInputRef.current.value),
          categoryId: parseInt(categorySelectRef.current.value),
        })
      );
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      nameInputRef.current &&
      priceInputRef.current &&
      categorySelectRef.current
    ) {
      console.log(nameInputRef.current.value);
      console.log(priceInputRef.current.value);
      console.log(categorySelectRef.current.value);
      console.log(productIngredients);
      dispatch(
        addDefaultProduct({
          name: nameInputRef.current.value,
          price: parseFloat(priceInputRef.current.value),
          categoryId: parseInt(categorySelectRef.current.value),
          ingredients: productIngredients,
        })
      );
      dispatch(clearIngredientsFromDefaultProduct());
      navigate("/default-products");
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Create Default Product</h4>
            <form className="forms-sample" onSubmit={submitHandler}>
              <FormSimpleInput
                ref={nameInputRef}
                label="Default Product Name"
                defaultValue={defaultProductCreate.name}
              />
              <FormSimpleInput
                ref={priceInputRef}
                label="Default Product Price"
                type="number"
                placeholder="0.0"
                step={0.01}
                defaultValue={defaultProductCreate.price.toString()}
              />
              <FormDropdownInput
                ref={categorySelectRef}
                options={optionCategories}
                dropdownTitle="Select Category"
                defaultValue={defaultProductCreate.categoryId.toString()}
              />
              <div className="form-group row">
                <div className="col-md-6">
                  <Link to="/default-products/ingredients">
                    <button
                      className="btn btn-info mr-2"
                      onClick={() => {
                        storeDefaultProductCreateDataHandler();
                      }}
                    >
                      Add Ingredients
                    </button>
                  </Link>
                </div>
                <div className="col-md-6">
                  <h6>Chosen Ingredients</h6>
                  <p>
                    {productIngredients.map(
                      (ingredient) => ingredient.name + ", "
                    )}
                  </p>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <Link to="/default-products">
                <button
                  className="btn btn-light"
                  onClick={() => {
                    dispatch(clearIngredientsFromDefaultProduct());
                  }}
                >
                  Cancel
                </button>
              </Link>
            </form>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProductDefaultCreate;
