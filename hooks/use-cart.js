import {useState, createContext, useContext, useEffect} from "react";
import products from "../products.json";
import {initiateCheckout} from "../lib/payments.js";

const defaultCart = {
  products: {},
};

export const CartContext = createContext();

export const useCartState = () => {
  const [cart, updateCart] = useState(defaultCart);

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("spacejelly_cart");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("spacejelly_cart", data);
  }, [cart]);

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({id}) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price,
    };
  });

  const subTotal = cartItems.reduce((acc, {pricePerItem, quantity}) => {
    return acc + pricePerItem * quantity;
  }, 0);

  const totalItems = cartItems.reduce((acc, {quantity}) => {
    return acc + quantity;
  }, 0);

  console.log("subtotal", subTotal);

  const addToCart = ({id} = {}) => {
    updateCart((prev) => {
      let cartState = {...prev};

      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }

      return cartState;
    });
  };

  const updateItem = ({id, quantity}) => {
    updateCart((prev) => {
      let cartState = {...prev};

      if (cartState.products[id]) {
        cartState.products[id].quantity = quantity;
      }

      return cartState;
    });
  };

  const checkout = () => {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity,
        };
      }),
    });
  };

  return {
    cart,
    subTotal,
    totalItems,
    addToCart,
    checkout,
    cartItems,
    updateItem,
  };
};

export const useCart = () => {
  const cart = useContext(CartContext);
  return cart;
};
