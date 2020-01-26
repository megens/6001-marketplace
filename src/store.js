import { createStore } from "redux";

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN-SUCCESS":
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        cart: action.payload.cart
      };
    case "LOGOUT":
      return { ...state, loggedIn: false, username: "" };
    case "BROWSE":
      console.log("dispatch browser");
      return { ...state, loggedIn: false, username: "browsing ..." };
    case "LOAD-SHELF":
      console.log("load shelf");
      return { ...state, shopItems: action.payload };
    case "ADD-TO-CART":
      console.log("adding to cart");
      let newItem = action.payload.item;
      let newQuantity = parseFloat(action.payload.quantity);
      let cartCopy = state.cart.slice();
      // check if some quantity of item already in cart... if so, increment quantity, rather than create new entry
      const checkInCart = cartItem => {
        return cartItem.item._id === newItem._id;
      };
      let alreadyInCart = cartCopy.some(checkInCart);
      console.log("already in cart? " + alreadyInCart);
      if (alreadyInCart) {
        console.log("adding quantity to Item already in cart");
        cartCopy.forEach(cartItem => {
          if (cartItem.item._id === newItem._id) {
            return (cartItem.quantity =
              parseFloat(cartItem.quantity) + newQuantity);
          }
        });
      } else {
        cartCopy.push({
          item: newItem,
          quantity: newQuantity
        });
      }

      return {
        ...state,
        cart: cartCopy,
        cartTotal: parseFloat(state.cartTotal) + newQuantity
      };

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  {
    loggedIn: false,
    username: undefined,
    shopItems: [],
    cart: [],
    cartTotal: 0
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
