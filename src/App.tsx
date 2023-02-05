import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./components/AdminHome";
import Category from "./components/category/Category";
import Company from "./components/company/Company";
import CompanyDelete from "./components/company/CompanyDelete";
import CompanyUpdate from "./components/company/CompanyUpdate";
import CreateCompany from "./components/company/CompanyCreate";
import Login from "./components/Login";
import { useAppSelector } from "./hooks/redux-hooks";
import CategoryCreate from "./components/category/CategoryCreate";
import CategoryUpdate from "./components/category/CategoryUpdate";
import CategoryDelete from "./components/category/CategoryDelete";
import Ingredient from "./components/ingredient/Ingredient";
import IngredientCreate from "./components/ingredient/IngredientCreate";
import IngredientUpdate from "./components/ingredient/IngredientUpdate";
import IngredientDelete from "./components/ingredient/IngredientDelete";
import ProductDefault from "./components/products-default/ProductDefault";
import ProductDefaultCreate from "./components/products-default/ProductDefaultCreate";
import SelectDefaultProductIngredients from "./components/products-default/SelectDefaultProductIngredients";
import ProductDefaultUpdate from "./components/products-default/ProductDefaultUpdate";
import ProductDefaultDelete from "./components/products-default/ProductDefaultDelete";
import Product from "./components/products/Product";
import ProductCreate from "./components/products/ProductCreate";
import SelectProductIngredientd from "./components/products/SelectProductIngredients";
import ProductUpdate from "./components/products/ProductUpdate";
import ProductDelete from "./components/products/ProductDelete";
import Order from "./components/orders/Order";
import OrderCreate from "./components/orders/OrderCreate";
import OrderUpdate from "./components/orders/OrderUpdate";
import OrderDelete from "./components/orders/OrderDelete";

const App = () => {
  const authUser = useAppSelector((state) => state.auth.authToken);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (authUser.accessToken !== null) {
      console.log("Login Success");
      setIsLoggedIn(true);
    } else {
      console.log("Login failed");
      setIsLoggedIn(false);
    }
  }, [authUser]);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Login /> : <AdminHome />} />
        {/* Company */}
        <Route path="/companies" element={<Company />} />
        <Route path="/companies/create" element={<CreateCompany />} />
        <Route path="/companies/update" element={<CompanyUpdate />} />
        <Route path="/companies/delete" element={<CompanyDelete />} />

        {/* Category */}
        <Route path="/categories" element={<Category />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/update" element={<CategoryUpdate />} />
        <Route path="/categories/delete" element={<CategoryDelete />} />

        {/* Ingredient */}
        <Route path="/ingredients" element={<Ingredient />} />
        <Route path="/ingredients/create" element={<IngredientCreate />} />
        <Route path="/ingredients/update" element={<IngredientUpdate />} />
        <Route path="/ingredients/delete" element={<IngredientDelete />} />

        {/* Default Product */}
        <Route path="/default-products" element={<ProductDefault />} />
        <Route
          path="/default-products/create"
          element={<ProductDefaultCreate />}
        />
        <Route
          path="/default-products/ingredients"
          element={<SelectDefaultProductIngredients />}
        />
        <Route
          path="/default-products/update"
          element={<ProductDefaultUpdate />}
        />
        <Route
          path="/default-products/delete"
          element={<ProductDefaultDelete />}
        />

        {/* Product */}
        <Route path="/products" element={<Product />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route
          path="/products/ingredients"
          element={<SelectProductIngredientd />}
        />
        <Route path="/products/update" element={<ProductUpdate />} />
        <Route path="/products/delete" element={<ProductDelete />} />

        {/* Order */}
        <Route path="/orders" element={<Order />} />
        <Route path="/orders/create" element={<OrderCreate />} />
        <Route path="/orders/update" element={<OrderUpdate />} />
        <Route path="/orders/delete" element={<OrderDelete />} />
      </Routes>
    </Fragment>
  );
};

export default App;
