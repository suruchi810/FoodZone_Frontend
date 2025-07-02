import React from 'react'
import { menu_list } from "../assets/frontend_assets/assets.js"

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='lg:px-[100px] py-3'>
      <h4 className='text-xl font-semibold py-3'>Explore Menu</h4>
      <div className='flex gap-12 overflow-x-auto overflow-hidden'>
        {menu_list.map(menu => {
          const isActive = category === menu.menu_name;   

          return (
            <div
              key={menu.menu_name}               
              onClick={() => setCategory(menu.menu_name)}
              className="flex flex-col items-center cursor-pointer"
            >
              <img
                src={menu.menu_image}
                alt={menu.menu_name}
                className={`
          rounded-full p-1 transition
          border-2
          ${isActive ? 'border-orange-600' : 'border-transparent'}
        `}
              />

              <h4 className="mt-1 text-center">{menu.menu_name}</h4>
            </div>
          );
        })}

      </div>
    </div>
  )
}

export default ExploreMenu