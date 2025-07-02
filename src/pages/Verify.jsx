import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const url = import.meta.env.VITE_BASE_URL;
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
        console.log("response", response);
        
        if (response.data.success) {
            navigate("/myorder")
        } else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    )
}

export default Verify