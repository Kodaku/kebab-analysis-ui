export type ServerResponse = {
  message: string;
  payload: PayloadRecord;
  status: number;
  timestamp: string;
};

type PayloadRecord = {
  records: any[];
};

export type LoginResponse = {
  accessToken: string;
  email: string;
  userId: number;
  userName: string;
};

export type User = {
  id?: string | null;
  name: string;
  email: string;
  password: string;
};

export type AuthToken = {
  id?: string | null;
  accessToken: string | null;
};

export type Company = {
  id?: number;
  name: string;
  address: string;
};

export type Category = {
  id?: number;
  name: string;
};

export type Ingredient = {
  id?: number;
  name: string;
  price: number;
};

export type Order = {
  id?: number;
  name?: string;
  date: string;
  totalAmount: number;
  orderType: string;
  time?: number;
  address?: string;
  phoneNumber?: string;
  orderCompanyId: number;
};

export type DefaultProduct = {
  id?: number;
  name: string;
  price: number;
  categoryId: number;
  ingredients: Ingredient[];
};

export type Product = {
  id?: number;
  name: string;
  price: number;
  defaultProductId: number;
  ingredients: Ingredient[];
};

export type DefaultProductCreate = {
  name: string;
  price: number;
  categoryId: number;
};

export type ProductCreate = {
  price: number;
  categoryId: number;
  defaultProduct: DefaultProduct;
};

export type OrderCreate = {
  orderName: string;
  companyId: number;
  orderDate: string;
  orderTime: string;
  orderTipology: string;
  orderCity: string;
  orderAddress: string;
  orderCivic: string;
  orderPhoneNumber: string;
  total: number;
  products: Product[];
};

export type AuthTokenInitialState = {
  authToken: AuthToken;
};

export type UserInitialState = {
  currentUser: User;
};

export type CompanyInitialState = {
  currentCompany: Company;
  companies: Company[];
};

export type CategoryInitialState = {
  currentCategory: Category;
  categories: Category[];
};

export type IngredientInitialState = {
  currentIngredient: Ingredient;
  ingredients: Ingredient[];
};

export type OrderInitialState = {
  currentOrder: Order;
  orders: Order[];
};

export type DefaultProductInitialState = {
  currentDefaultProduct: DefaultProduct;
  defaultProducts: DefaultProduct[];
  currentIngredients: Ingredient[];
};

export type ProductInitialState = {
  currentProduct: Product;
  products: Product[];
  currentIngredients: Ingredient[];
  baseDefaultProduct: DefaultProduct;
};

export type DefaultProductCreateInitialState = {
  defaultProductCreate: DefaultProductCreate;
};

export type ProductCreateInitialState = {
  productCreate: ProductCreate;
};

export type OrderCreateInitialState = {
  orderCreate: OrderCreate;
};

export type UserParams = {
  id: string;
};
