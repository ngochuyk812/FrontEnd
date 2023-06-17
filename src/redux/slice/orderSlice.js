import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listOrders: [],
  order1: null,
  error: null,
  status: "",
  listOrderByUser: [],
};
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomDeliveryDate() {
  var currentDate = new Date();
  var deliveryDays = getRandomNumber(1, 10);
  var deliveryDate = new Date(
    currentDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000
  );
  return deliveryDate;
}
export const getOrderByUser = createAsyncThunk(
  "order/orderById",
  async (id) => {
    const response = await axios.get(
      "http://localhost:3000/orders?idUser=" + id
    );
    let order = response.data;
    let rs = [];
    console.log(order);

    for (const tmp of order) {
      const orerDetail = await axios.get(
        "http://localhost:3000/ordersDetail?idOrder=" + tmp.id
      );
      let rsDetail = orerDetail.data;
      let itemRs = { ...tmp, detail: rsDetail };
      rs.push(itemRs);
      console.log(itemRs);
    }
    return rs;
  }
);
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
  const deliveryDate = getRandomDeliveryDate();
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    for (const e of infoProduct) {
      totalAmount += e.price;
    }
    return totalAmount;
  };
  const firstResponse = await axios.post("http://localhost:3000/orders", {
    idUser: item.idUser,
    orderDate: formattedDateTime,
    note: note,
    deliveryDate: deliveryDate.toISOString(),
    address: item.address,
    totalAmount: calculateTotalAmount(),
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
    });
  } else {
    response2 = await axios.post("http://localhost:3000/creditCards", {
      idOrder: response.id,
      accountName: item.name,
      cardNumber: item.cardNumber,
      expirationDate: item.expirationDate,
      cvv: item.cvv,
    });
  }

  return {
    id: response.id,
    idUser: item.idUser,
    totalAmount: calculateTotalAmount(),
    orderDate: formattedDateTime,
    deliveryDate: deliveryDate.toISOString(),
    note: note,
    idOrder: response.id,
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
        state.order1 = action.payload;
        state.listOrders = [...state.listOrders, action.payload];
        state.error = null;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(getOrderByUser.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.listOrderByUser = action.payload;
        state.error = null;
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { removeItemFromCart } = orderSlice.actions;
export default orderSlice.reducer;
