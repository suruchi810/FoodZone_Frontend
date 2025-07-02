// src/pages/CheckoutPage.jsx
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;
  const { cartItem, food_list, subTotal, token } = useContext(StoreContext);
  const itemsInCart = food_list.filter((f) => cartItem[f._id] > 0);

  const subtotal = subTotal();
  const delivery = subtotal > 0 ? 40 : 0;
  const total = subtotal + delivery;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street:"",
    city: "",
    state:"",
    zipCode: "",
    country:"",
    phone:"",
  });


  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItem[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: form,
      items: orderItems,
      amount: subTotal()+40,
    }
    let response = await axios.post(`${url}/api/order/place`, orderData, {headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      alert("Error");
    }
  };

  useEffect(()=>{
    if(!token){
      navigate('/signin')
    }else if(subTotal===0){
      navigate('/cart')
    }
  }, [token])

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">

        <form onSubmit={placeOrder} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={form.street}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              value={form.zipCode}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
          >
            Place Order
          </button>
        </form>

        {/* RIGHT: Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <ul className="divide-y divide-gray-200 mb-4">
            {itemsInCart.map((item) => (
              <li key={item._id} className="py-2 flex justify-between">
                <span>{item.name} × {cartItem[item._id]}</span>
                <span>${item.price * cartItem[item._id]}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-1 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>${delivery}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-base pt-2">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
