import { createStore } from "redux";
//  import produce from "immer";

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN-SUCCESS": {
      return {
        ...state,
        loggedIn: true,
        username: action.payload.username,
        cart: action.payload.cart,
        personalInventory: action.payload.personalInventory,
        sellerStatus: action.payload.sellerStatus
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        loggedIn: false,
        username: undefined,
        cart: [],
        personalInventory: [],
        sellerStatus: false
      };
    }
    case "BROWSE": {
      console.log("dispatch browsing");
      return {
        ...state,
        loggedIn: false,
        username: "browsing ...",
        currentItemContainer: "cart"
      };
    }
    case "LOAD-ITEMS": {
      console.log("load items shelf");
      return { ...state, shopItems: action.payload };
    }
    case "LOAD-DESIGNS": {
      console.log("load designs shelf");
      return { ...state, shopDesigns: action.payload };
    }
    case "ADD-TO-CART": {
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
      };
    }

    case "SET-CURRENT-CONTAINER-TYPE": {
      console.log(action.payload);
      return { ...state, currentItemContainer: action.payload };
    }

    case "ADD-TO-ANY-CONTAINER": {
      console.log("adding to container ", action.payload.whichContainer);
      let whichContainer = action.payload.whichContainer;
      let newItem = action.payload.item;
      let newQuantity = parseFloat(action.payload.quantity);
      let containerCopy = state[whichContainer].slice();
      // check if some quantity of item already in cart... if so, increment quantity, rather than create new entry
      const checkInCart = cartItem => {
        return cartItem.item._id === newItem._id;
      };
      let alreadyInCart = containerCopy.some(checkInCart);
      console.log("already in cart? " + alreadyInCart);
      if (alreadyInCart) {
        console.log("adding quantity to Item already in cart");
        containerCopy.forEach(cartItem => {
          if (cartItem.item._id === newItem._id) {
            return (cartItem.quantity =
              parseFloat(cartItem.quantity) + newQuantity);
          }
        });
      } else {
        containerCopy.push({
          item: newItem,
          quantity: newQuantity
        });
      }
      return {
        ...state,
        [whichContainer]: containerCopy
        //cartTotal: parseFloat(state.cartTotal) + newQuantity
      };
    }
    case "EMPTY-CART": {
      return { ...state, cart: [] };
    }
    case "EMPTY-ANY-CONTAINER": {
      return { ...state, [action.payload.whichContainer]: [] };
    }

    case "BECOME-SELLER": {
      return { ...state, sellerStatus: true };
    }
    case "UPDATE-BRICKSEARCH-OBJ": {
      console.log(action.payload.criterion);
      console.log(action.payload.checked);
      return {
        ...state,
        brickSearchObj: {
          ...state.brickSearchObj,
          [action.payload.criterion]: action.payload.checked
        }
      };
      //brickSearchObj{... state.brickSearchObj, dimensions_1x1 : action.payload.checked}});
    }
    case "UPDATE-DESIGNSEARCH-OBJ": {
      console.log(action.payload.criterion);
      console.log(action.payload.checked);
      return {
        ...state,
        designSearchObj: {
          ...state.designSearchObj,
          [action.payload.criterion]: action.payload.checked
        }
      };
    }
    default: {
      return state;
    }
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
    personalInventory: [],
    brickSearchObj: {
      dimensions_1x1: true,
      dimensions_1x2: true,
      dimensions_1x4: true,
      dimensions_2x2: true,
      dimensions_2x3: true,
      dimensions_2x4: true,
      dimensions_2x6: true,
      color_red: true,
      color_orange: true,
      color_yellow: true,
      color_green: true,
      color_blue: true,
      color_violet: true,
      depth_standard: true,
      depth_thin: true
    },
    designSearchObj: {
      theme_general: true,
      theme_space: true,
      theme_pirates: true,
      size_small: true,
      size_medium: true,
      size_large: true
    },
    currentItemContainer: undefined // parts can be added to cart, currentDesignCart or personalInventory
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
