import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listOrders: [],
  error: null,
  status: "",
  linkTo: "/",
};
export const addOrder = createAsyncThunk("auth/addOrder", async (item) => {
  let response;
  let response2;
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  let note;
  if (item.note) {
    note = item.note;
  } else {
    note = "";
  }
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  const infoProduct = item.infoProduct;
  console.log(infoProduct);

  const firstResponse = await axios.post("http://localhost:3000/orders", {
    idUser: item.idUser,
    totalAmount: item.totalAmount,
    orderDate: formattedDateTime,
    note: note,
  });
  response = firstResponse.data;

  const postRequests = infoProduct.map((e) => {
    return axios.post("http://localhost:3000/ordersDetail", {
      idOrder: response.id,
      idProduct: e.id,
      nameProduct: e.name,
      color: e.color,
      quantity: e.quantity,
      price: e.price,
    });
  });
  await Promise.all(postRequests);

  if (item.type == 0) {
    response2 = await axios.post("http://localhost:3000/cashs", {
      idOrder: response.id,
      nameUser: item.name,
      phoneNumber: item.sdt,
      address: item.address,
      province: item.province,
      district: item.district,
    });
  } else {
    response2 = await axios.post("http://localhost:3000/creditCards", {
      idOrder: response.id,
      accountName: item.name,
      cardNumber: item.cardNumber,
      expirationDate: item.expirationDate,
      cvv: item.cvv,
      address: item.address,
    });
  }

  return {
    id: response.id,
    idUser: item.idUser,
    totalAmount: item.totalAmount,
    orderDate: formattedDateTime,
    note: note,
  };
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.listOrders = [...state.listOrders, action.payload];
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      });
  },
});

const saveListProductIntoLs = (listProducts) => {
  localStorage.setItem("listProducts", JSON.stringify(listProducts));
};
const getListProductIntoLs = () => {
  return JSON.parse(localStorage.getItem("listProducts"));
};
const saveListCartIntoLs = (listCarts) => {
  localStorage.setItem("listCarts", JSON.stringify(listCarts));
};
const getListCartsIntoLs = () => {
  return JSON.parse(localStorage.getItem("listCarts"));
};
const removeCartToLS = () => {};
export const { removeItemFromCart } = orderSlice.actions;
export default orderSlice.reducer;
