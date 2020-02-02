import { createStore } from "redux";
import produce from "immer";

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN-SUCCESS":
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        cart: action.payload.cart,
        sellerStatus: action.payload.sellerStatus
      };
    case "LOGOUT":
      return {
        ...state,
        loggedIn: false,
        username: undefined,
        cart: [],
        sellerStatus: false
      };
    case "BROWSE":
      console.log("dispatch browsing");
      return { ...state, loggedIn: false, username: "browsing ..." };
    case "LOAD-ITEMS":
      console.log("load items shelf");
      return { ...state, shopItems: action.payload };
    case "LOAD-DESIGNS":
      console.log("load designs shelf");
      return { ...state, shopDesigns: action.payload };
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
        cart: cartCopy
        //cartTotal: parseFloat(state.cartTotal) + newQuantity
      };

    case "BECOME-SELLER":
      return { ...state, sellerStatus: true };

    //case "UPDATE-BRICKSEARCH-OBJ":
    //return { ...state };
    //brickSearchObj{... state.brickSearchObj, dimensions_1x1 : action.payload.checked}});

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  {
    loggedIn: false,
    username: undefined,
    sellerStatus: false,
    shopItems: [],
    shopDesigns: [],
    cart: [],
    currentDesignCart: [],
    brickSearchObj: {
      dimensions_1x1: true,
      dimensions_1x2: true,
      dimensions_2x2: true,
      dimensions_2x4: true,
      color_red: true,
      color_blue: true,
      color_yellow: true,
      depth_standard: true,
      depth_thin: true
    }
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
