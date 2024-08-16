import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {

    const { brandName, categoryName, dateAdded, description, price, productImage, productName, rating } = product


    return (
        <div className="card border glass">
            <figure className='relative p-1'>
                <img
                    className="w-full h-80 rounded-t-xl hover:scale-110 transition-all ease-in-out duration-700"
                    src={productImage}
                    alt={`Image of ${productName}`} />
                <span className='badge badge-lg font-medium absolute bottom-2 right-2 bg-acPink text-white border-acPink'>{categoryName}</span>
            </figure>

            <div className="p-5 text-white">
                <h2 className="text-2xl font-medium">{productName}</h2>
                <p className='mt-2'>{description}</p>

                <div className='mt-4'>
                    <h3 className='text-lg font-semibold font-serif'>Brand: <span className='font-sans font-normal'>{brandName}</span></h3>

                    <h3 className='text-lg font-semibold font-serif'>Price: <span className='font-sans font-normal'>{price}$</span></h3>

                    <h3 className='text-lg font-semibold font-serif flex gap-1'>Rating: <span className='font-sans font-normal flex items-center gap-1'>{rating}<FaStar className='text-orange-500' /></span></h3>

                    <h3 className='text-lg font-semibold font-serif'>Date Added: <span className='font-sans font-normal'>{dateAdded}</span></h3>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object,
}


export default ProductCard;