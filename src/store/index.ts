import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-slice";
import { categoriesSlice } from "./category/category-slice";
import { companiesSlice } from "./company/company-slice";
import { defaultProductCreateSlice } from "./default-product/default-product-create-slice";
import { defaultProductsSlice } from "./default-product/default-product-slice";
import { ingredientsSlice } from "./ingredient/ingredient-slice";
import { orderCreateSlice } from "./order/order-create-slice";
import { ordersSlice } from "./order/order-slice";
import { productCreateSlice } from "./product/product-create-slice";
import { productsSlice } from "./product/product-slice";
import { usersSlice } from "./user/users-slice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    auth: authSlice.reducer,
    companies: companiesSlice.reducer,
    categories: categoriesSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    orders: ordersSlice.reducer,
    defaultProducts: defaultProductsSlice.reducer,
    defaultProductCreate: defaultProductCreateSlice.reducer,
    products: productsSlice.reducer,
    productCreate: productCreateSlice.reducer,
    orderCreate: orderCreateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
