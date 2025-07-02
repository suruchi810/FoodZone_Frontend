import React, { useEffect, useState } from 'react'
import bgImg from '../assets/frontend_assets/header_img.png'
import ExploreMenu from './ExploreMenu'
import DisplayMenu from './DisplayMenu';
import Signin from './Signin';
import Signup from './Signup';

const Home = ({ showLogin, setShowLogin }) => {

    const [category, setCategory] = useState("all");

    useEffect(() => {
    }, [showLogin])

    return (
        <>
            {showLogin === "login" && (
                <>
                    <Signin showLogin={showLogin} setShowLogin={setShowLogin}/>
                    <div className="fixed inset-0 bg-black/30 z-40"></div>
                </>
            )}

            {showLogin === "signup" && (
                <>
                    <Signup showLogin={showLogin} setShowLogin={setShowLogin}/>
                    <div className="fixed inset-0 bg-black/30 z-40"></div>
                </>
            )}

            <section className="py-3 lg:px-[100px] bg-white">
                <div className="relative overflow-hidden rounded-xl">
                    <img
                        src={bgImg}
                        alt="Delicious food"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute inset-0 flex items-center px-6 md:px-12">
                        <div className="text-white max-w-xl">
                            <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                                One Zone. Endless Flavors.
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-white/90 drop-shadow-sm">
                                At FoodZone, we serve more than just food — we serve memories. Handcrafted recipes, locally sourced ingredients, and flavors that feel like home. Dine in, take out, or order online — your perfect meal awaits.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ExploreMenu category={category} setCategory={setCategory} />
            <DisplayMenu category={category} setCategory={setCategory} />
        </>
    );

}

export default Home