import React from 'react'
import { useContext } from 'react'
import { StoreContext } from '../context/storeContext'
import FoodItem from './FoodItem'

const DisplayMenu = ({ category, setCategory }) => {
  const { food_list } = useContext(StoreContext)
  
  return (
    <div className="lg:px-[100px] py-3">
      <h4 className="text-xl font-semibold py-3">Top dishes near you</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {food_list?.filter(item =>
          category === "all"
            ? true
            : item.category === category
        ).map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );

}

export default DisplayMenu