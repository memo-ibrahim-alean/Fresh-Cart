import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  let baseUrl = `https://ecommerce.routemisr.com`;
  let headers = {
    token: localStorage.getItem('userToken')
  }

  async function AddToCard(id) {
    return axios.post(`${baseUrl}/api/v1/cart
`, { productId: id }, { headers: headers })
  }

  function getLoggedUserCart() {
    return axios.get(`${baseUrl}/api/v1/cart`, { headers: headers })
  }

  function removeItem(id) {
    return axios.delete(`${baseUrl}/api/v1/cart/${id}`, { headers: headers })
  }

  function updateCountItem(id, count) {
    return axios.put(`${baseUrl}/api/v1/cart/${id}`, { count: count }, { headers: headers })
  }

  function onlinePayment(id, shippingAddress) {
    return axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}`,
      { shippingAddress: shippingAddress },
      { headers: headers })
  }
  return <cartContext.Provider value={{ AddToCard, getLoggedUserCart, removeItem, updateCountItem, onlinePayment }}>
    {props.children}
  </cartContext.Provider>
}
