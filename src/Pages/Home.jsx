/* eslint-disable react/no-unescaped-entities */

import { useEffect } from "react";
import useAxiosPublic from "../components/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard/ProductCard";



const Home = () => {

    const axiosPublic = useAxiosPublic();

    const { data: allProducts = [], isLoading, isError, error } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allProducts');
            return res.data;
        }
    })

    console.log(allProducts);

    if (isLoading) {
        return <div className="flex justify-center items-center my-10">
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }

    if (isError) {
        return <div className="flex justify-center items-center my-10">
            <span className="text-red-600">{error.message}</span>
        </div>
    }

    return (
        <div className="min-h-screen">
            <div className="text-center pt-10">
                <h1 className="text-3xl font-medium mb-3">Welcome to <span className="text-acPink">Athlete's Choice</span></h1>
                <p className="font-medium">Discover our products below</p>
            </div>

            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-2">
                {
                    allProducts.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    />)
                }
            </div>
        </div>
    );
};

export default Home;