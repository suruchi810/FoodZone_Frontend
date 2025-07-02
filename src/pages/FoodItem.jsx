import React, { useContext } from 'react'
import add_icon from '../assets/frontend_assets/add_icon_white.png'
import add_icon_green from '../assets/frontend_assets/add_icon_green.png'
import remove_icon_red from '../assets/frontend_assets/remove_icon_red.png'
import { StoreContext } from '../context/storeContext'

const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItem, addToCart, removeFromCart } = useContext(StoreContext);
  
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  return (
    <div className="flex flex-col gap-4 shadow-md p-2 rounded-2xl transition transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
      <img
        src={`${VITE_API_URL}/images/`+image}
        alt={name}
        className=""
      />

      {cartItem[id] > 0 ? (
        <div className='inline-flex  w-fit items-center gap-3 px-3 py-1 bg-gray-100 rounded-full shadow-sm'>
          <img onClick={() => addToCart(id)} src={add_icon_green} alt="Add" className="h-8 w-8" />
          <p className='text-lg'>{cartItem[id]}</p>
          <img onClick={() => removeFromCart(id)} src={remove_icon_red} alt="remove" className="h-8 w-8" />
        </div>
      ) : (
        <img onClick={() => addToCart(id)} src={add_icon} alt="Add" className="h-10 w-10" />
      )}

      <div>
        <div className='flex justify-between'>
          <h4 className="text-lg font-semibold">{name}</h4>
          <p className="text-base font-bold text-orange-600">${price}</p>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">{description}</p>

      </div>
    </div>
  );
}

export default FoodItem