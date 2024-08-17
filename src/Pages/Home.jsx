import useAxiosPublic from "../components/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard/ProductCard";
import { FaSearch } from "react-icons/fa";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";



const Home = () => {
    const axiosPublic = useAxiosPublic();
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [sortingMethod, setSortingMethod] = useState('Name');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const searchInput = useRef();
    const selectCategory = useRef();
    const selectBrand = useRef();
    const selectSortingOption = useRef();
    const minPrice = useRef();
    const maxPrice = useRef();

    // get all products
    const { data: allProducts = [], isLoading, isError, error } = useQuery({
        queryKey: ['allProducts', sortingMethod],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allProducts?sortOption=${sortingMethod}`);
            return res.data;
        }
    })


    // get all categories
    const { data: categoryNames = [] } = useQuery({
        queryKey: ['categoryNames'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categoryNames');
            return res.data;
        }
    })


    // get all brands
    const { data: brandNames = [] } = useQuery({
        queryKey: ['brandNames'],
        queryFn: async () => {
            const res = await axiosPublic.get('/brandNames');
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


    // search products by name
    const handleSearch = async () => {
        const searchedProduct = searchInput.current.value;

        const res = await axiosPublic.get(`/searchProduct?productName=${searchedProduct}`);

        if (res.data.message == 0) {
            return toast.error("No data is found with that name.");
        }

        setSearchedProducts(res.data);

        // reset other filters
        selectCategory.current.value = "Filter by category";
        selectBrand.current.value = "Filter by brand";
        setSortingMethod("Name");
        selectSortingOption.current.value = "Name";
        minPrice.current.value = "";
        maxPrice.current.value = "";
    }


    // filter products by category
    const handleCategoryFilter = async () => {
        const filteredCategoryName = selectCategory.current.value;

        if (filteredCategoryName !== "Filter by category") {
            const res = await axiosPublic.get(`/filterByCategory?categoryName=${filteredCategoryName}`);

            setSearchedProducts(res.data);

            // reset other filters
            searchInput.current.value = '';
            setSortingMethod("Name");
            selectSortingOption.current.value = "Name";
            selectBrand.current.value = "Filter by brand";
            minPrice.current.value = "";
            maxPrice.current.value = "";
        }

    }


    // filter products by brand
    const handleBrandFilter = async () => {
        const filteredBrandName = selectBrand.current.value;

        if (filteredBrandName !== "Filter by brand") {
            const res = await axiosPublic.get(`/filterByBrand?brandName=${filteredBrandName}`);

            setSearchedProducts(res.data);

            // reset other filters
            searchInput.current.value = '';
            setSortingMethod("Name");
            selectSortingOption.current.value = "Name";
            selectCategory.current.value = "Filter by category";
            minPrice.current.value = "";
            maxPrice.current.value = "";
        }

    }


    // sort products
    const handleSort = () => {
        setSortingMethod(selectSortingOption.current.value);

        // reset other filters
        searchInput.current.value = '';
        setSearchedProducts([]);
        selectCategory.current.value = "Filter by category"
        selectBrand.current.value = "Filter by brand";
        minPrice.current.value = "";
        maxPrice.current.value = "";
    }


    // handle the disabled submit button
    const handleInputChange = () => {
        const minimumPrice = minPrice.current.value;
        const maximumPrice = maxPrice.current.value;

        if (minimumPrice && maximumPrice && !isNaN(minimumPrice) && !isNaN(maximumPrice)) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    };


    // filter products by price range
    const handlePriceRange = async e => {
        e.preventDefault();

        const minimumPrice = minPrice.current.value;
        const maximumPrice = maxPrice.current.value;


        const res = await axiosPublic.get(`/filterByPrice?minPrice=${minimumPrice}&&maxPrice=${maximumPrice}`);
        setSearchedProducts(res.data);

        // reset other filters
        searchInput.current.value = '';
        selectCategory.current.value = "Filter by category";
        selectBrand.current.value = "Filter by brand";
        setSortingMethod("Name");
        selectSortingOption.current.value = "Name"
    }


    return (
        <div className="min-h-screen">
            <ToastContainer />
            <div className="text-center pt-10">
                <h1 className="text-3xl font-medium mb-3">Welcome to <span className="text-acPink">Athlete{`'`}s Choice</span></h1>
                <p className="font-medium">Discover our products below</p>
            </div>

            {/* search box and category filter */}
            <div className="max-w-sm md:max-w-md mx-auto mt-10">
                <div className="flex gap-2 md:gap-0 flex-col md:flex-row">
                    <label className="input input-sm md:input-md input-bordered flex items-center md:rounded-r-none">
                        <input ref={searchInput} type="text" placeholder="Search by name" className="grow" />
                        <button onClick={handleSearch} className="btn btn-xs md:btn-sm btn-circle bg-acPink hover:bg-transparent hover:border-acPink text-white">
                            <FaSearch />
                        </button>
                    </label>

                    <select onChange={handleCategoryFilter} ref={selectCategory} className="select select-bordered select-sm md:select-md join-item md:rounded-l-none">
                        <option defaultValue>Filter by category</option>
                        {
                            categoryNames.map((category, index) => <option key={index}>{category}</option>)
                        }
                    </select>
                </div>
            </div>


            {/* sort option and brand filter */}
            <div className="flex justify-center items-center mt-10">
                <h2 className="mr-2">Sort by: </h2>

                <select onChange={handleSort} ref={selectSortingOption} defaultValue={sortingMethod} className="select select-bordered rounded-r-none select-sm md:select-md join-item">
                    <option>Name</option>
                    <option>Newest Added</option>
                    <option>Price low to high</option>
                    <option>Price high to low</option>
                </select>

                <select onChange={handleBrandFilter} ref={selectBrand} className="select select-bordered select-sm md:select-md join-item rounded-l-none">
                    <option defaultValue>Filter by brand</option>
                    {
                        brandNames.map((brand, index) => <option key={index}>{brand}</option>)
                    }
                </select>
            </div>


            {/* price range */}
            <form onSubmit={handlePriceRange} className="max-w-md mx-auto mt-10">
                <label className="form-control md:flex-row justify-center items-center gap-2">
                    <div className="label">
                        <span className="label-text">Filter by price: </span>
                    </div>
                    <div className="flex gap-2">
                        <input onChange={handleInputChange} ref={minPrice} type="number" placeholder="Minimum" className="input input-bordered w-32" />

                        <input onChange={handleInputChange} ref={maxPrice} type="number" placeholder="Maximum" className="input input-bordered w-32" />
                    </div>

                    <button disabled={isSubmitDisabled} className="btn btn-circle bg-acPink hover:border-acPink text-white">
                        <FaSearch />
                    </button>
                </label>
            </form>


            {/* show the products */}
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 mx-2">
                {
                    searchedProducts.length === 0 && allProducts?.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    />)
                }

                {
                    searchedProducts.length > 0 && searchedProducts?.map(product => <ProductCard
                        key={product._id}
                        product={product}
                    />)
                }
            </div>
        </div>
    );
};

export default Home;