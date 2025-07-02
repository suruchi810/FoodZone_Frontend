import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';
import { StoreContext } from "../context/storeContext";
import profile_icon from "../assets/frontend_assets/profile_icon.png";

const Navbar = ({ showLogin, setShowLogin }) => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(StoreContext);

    const NAV_HEIGHT = 80; 

    return (
        <>
            <nav
                style={{ height: NAV_HEIGHT }}
                className="w-full fixed top-0 left-0 z-50 px-12 py-4 bg-white"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
                     <div className="flex items-center gap-2 text-3xl font-semibold text-orange-600">
                        <span className="text-2xl">🍔</span>
                        <span className="font-bold">FoodZone</span>
                    </div>

                    <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-600 font-semibold border-b-2 border-orange-600"
                                    : "hover:text-orange-600"
                            }
                        >
                            <li className="cursor-pointer">Home</li>
                        </NavLink>

                        <NavLink
                            to="/menu"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-600 font-semibold border-b-2 border-orange-600"
                                    : "hover:text-orange-600"
                            }
                        >
                            <li className="cursor-pointer">Menu</li>
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-orange-600 font-semibold border-b-2 border-orange-600"
                                    : "hover:text-orange-600"
                            }
                        >
                            <li className="cursor-pointer">Contact</li>
                        </NavLink>
                    </ul>

                    {/* Cart & Auth */}
                    <div className="flex items-center gap-4 relative">
                        <ShoppingCart
                            onClick={() => navigate('/cart')}
                            className="cursor-pointer text-gray-700 hover:text-orange-600 w-6 h-6"
                        />

                        {!token ? (
                            <>
                                <button
                                    onClick={() => setShowLogin("login")}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm"
                                >
                                    Sign In
                                </button>

                                <button
                                    onClick={() => {
                                        setShowLogin("signup");
                                    }}
                                    className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <div className="relative group">
                                <img
                                    src={profile_icon}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                                />

                                <ul className="absolute right-0 top-full w-26 bg-white shadow-md rounded-md text-sm text-gray-70 hidden group-hover:block hover:block z-10">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => navigate('/myorder')}
                                    >
                                        Orders
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            setToken('');
                                            navigate('/');
                                        }}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div style={{ height: NAV_HEIGHT }} aria-hidden="true" />
        </>
    );
};

export default Navbar;
