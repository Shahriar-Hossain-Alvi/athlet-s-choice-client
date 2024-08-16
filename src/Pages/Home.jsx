import useAxiosPublic from "../components/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard/ProductCard";
import { FaSearch } from "react-icons/fa";
import { useRef, useState } from "react";



const Home = () => {
    const searchInput = useRef();
    const axiosPublic = useAxiosPublic();

    const [searchedProducts, setSearchedProducts] = useState([]);

    // get all products
    const { data: allProducts = [], isLoading, isError, error } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allProducts');
            return res.data;
        }
    })

    if (isLoading) {
        return <div className="flex justify-center items-center my-10">
            <span className="loading loading-bars loading-lg text-acPink"></span>
        </div>
    }

    if (isError) {
        return <div className="flex justify-center items-center my-10">
            <span className="text-red-600">{error.message}</span>
        </div>
    }


    const handleSearch = async () => {
        const searchedProduct = searchInput.current.value;

        const res = await axiosPublic.get(`/searchProduct?productName=${searchedProduct}`);
        setSearchedProducts(res.data);

    }


    return (
        <div className="min-h-screen">
            <div className="text-center pt-10">
                <h1 className="text-3xl font-medium mb-3">Welcome to <span className="text-acPink">Athlete{`'`}s Choice</span></h1>
                <p className="font-medium">Discover our products below</p>
            </div>

            <div className="max-w-md mx-auto mt-10">
                <h4 className="font-medium mb-1 text-sm">Search Products by name</h4>
                <label className="input input-bordered flex items-center gap-2">
                    <input ref={searchInput} type="text" placeholder="Search" className="grow" />
                    <button onClick={handleSearch} className="btn btn-sm btn-circle bg-acPink hover:bg-transparent hover:border-acPink text-white">
                        <FaSearch />
                    </button>
                </label>
            </div>

            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-2">
                {
                    searchedProducts.length === 0 && allProducts.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    />)
                }

                {
                    searchedProducts.length > 0 && searchedProducts.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    />)
                }
            </div>
        </div>
    );
};

export default Home;