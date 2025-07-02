// src/pages/CartPage.jsx
import { useContext, Fragment, useEffect } from "react";
import { StoreContext } from "../context/storeContext";
import {CirclePlus, CircleMinus} from 'lucide-react'
import {useNavigate} from 'react-router-dom'

const CartPage = ({ showLogin, setShowLogin }) => {
  const navigate = useNavigate();
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const { food_list, cartItem, addToCart, removeFromCart, subTotal, token } =
    useContext(StoreContext);

  const subtotal  = subTotal(); 
  const delivery = subtotal > 0 ? 40 : 0; 
  const total = subtotal + delivery;
  const itemsInCart = food_list.filter(f => cartItem[f._id] > 0);

  useEffect(()=>{
    if(!token){
      setShowLogin("login")
      navigate("/");
    }
  }, [token])

  return (
    <div className="min-h-screen bg-gray-50 px-4 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>


      {itemsInCart.length === 0 && (
        <p className="text-gray-600">Your cart is empty. Go add some dishes!</p>
      )}

      <ul className="space-y-4">
        {itemsInCart.map(item => (
          <Fragment key={item._id}>
            <li className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4">
              <img
                src={`${VITE_API_URL}/images/`+item.image}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h2 className="font-medium">{item.name}</h2>
                <p className="text-sm text-gray-500 truncate">
                  {item.description}
                </p>
                <p className="mt-1 font-semibold">${item.price}</p>
              </div>

              <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                <CirclePlus onClick={() => addToCart(item._id)} className="h-5 w-5 cursor-pointer hover:scale-110 transition" />
                <span className="min-w-[1.25rem] text-center tabular-nums">
                  {cartItem[item._id]}
                </span>
                <CircleMinus onClick={() => removeFromCart(item._id)} className="h-5 w-5 cursor-pointer hover:scale-110 transition"/>
              </div>

              <p className="w-20 text-right font-medium">
                ${item.price * cartItem[item._id]}
              </p>
            </li>
          </Fragment>
        ))}
      </ul>

      {itemsInCart.length > 0 && (
        <div className="mt-10 max-w-md ml-auto bg-white rounded-xl shadow-lg p-6 space-y-3">
          <h3 className="text-lg font-semibold">Order Summary</h3>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery fee</span>
            <span>${delivery}</span>
          </div>

          <hr />

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            disabled={total === 0}
            className="
              w-full mt-4 py-3 rounded-lg
              text-white font-medium
              bg-orange-600 hover:bg-orange-600
              disabled:opacity-50 disabled:cursor-not-allowed
              transition
            "
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
