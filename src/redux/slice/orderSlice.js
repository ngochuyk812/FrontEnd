import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  listOrders: [],
  error: null,
  status: "",
  listOrderByUser: [],
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random delivery date
function getRandomDeliveryDate() {
  var currentDate = new Date(); // Get the current date
  var deliveryDays = getRandomNumber(1, 10); // Generate a random number of days for delivery
  var deliveryDate = new Date(
    currentDate.getTime() + deliveryDays * 24 * 60 * 60 * 1000
  ); // Add the random number of days to the current date

  return deliveryDate;
}

export const getOrderByUser = createAsyncThunk(
  "order/orderById",
  async (id) => {
    console.log(id);
    const response = await axios.get(
      process.env.REACT_APP_API + "/orders?idUser=" + id
    );
    let order = response.data;
    let rs = [];
    console.log(order);

    for (const tmp of order) {
      const orerDetail = await axios.get(
        process.env.REACT_APP_API + "/ordersDetail?idOrder=" + tmp.id
      );
      let rsDetail = orerDetail.data;
      let itemRs = { ...tmp, detail: rsDetail };
      rs.push(itemRs);
      console.log(itemRs);
    }
    return rs;
  }
);

export const cancelOrder = createAsyncThunk(
    "order/canelOrder",
    async (order) => {
      order = {...order, status_transport: -1}
      const response = await axios.put(
          process.env.REACT_APP_API + "/orders/" + order.id, order
      );
      let arrOrder = initialState.listOrderByUser
      let res = response.data;
      console.log(arrOrder, res)
      return res;
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
  let dateExp = getRandomDeliveryDate()
  const firstResponse = await axios.post(process.env.REACT_APP_API + "/orders", {
    idUser: item.idUser,
    totalAmount: item.totalAmount,
    orderDate: formattedDateTime,
    note: note,
    deliveryDate: dateExp,
    address: item.address,
  });
  response = firstResponse.data;
  const postRequests = infoProduct.map((e) => {
    return axios.post(process.env.REACT_APP_API + "/ordersDetail", {
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
    response2 = await axios.post(process.env.REACT_APP_API + "/cashs", {
      idOrder: response.id,
      nameUser: item.name,
      phoneNumber: item.sdt,
      province: item.province,
      district: item.district,
    });
  } else {
    response2 = await axios.post(process.env.REACT_APP_API + "/creditCards", {
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
    address: item.address,
    orderDate: formattedDateTime,
    deliveryDate: dateExp,
    note: note,
    detail:[...infoProduct]
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
      })
      .addCase(getOrderByUser.pending, (state) => {
        state.status = "loading";
        state.status = "";
        state.error = "";
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        action.payload.forEach(tmp=>{
          if(!tmp.status_transport){
            if((new Date(tmp.deliveryDate).getTime() - new Date().getTime()) > 0){
              tmp['status_transport'] =0
            }else
              tmp['status_transport'] =1
          }
        })
        state.listOrderByUser = action.payload;
        state.error = null;
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
        .addCase(cancelOrder.pending, (state) => {
          state.status = "loading";
          state.status = "";
          state.error = "";
        })
        .addCase(cancelOrder.fulfilled, (state, action) => {
          let arr = [...state.listOrderByUser]
          arr.forEach((tmp, index)=>{
            if(tmp.id === action.payload.id)
              arr[index] = action.payload
          })
          state.listOrderByUser = arr
          state.status = "succeeded";
          state.error = null;
        })
        .addCase(cancelOrder.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
    ;
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
