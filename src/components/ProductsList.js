import React from 'react';
import ProductItem from './ProductItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsList = ({products, category, input}) => {
    debugger;
    return (
        <ul>
            {
                products.filter(item => {
                return (input === '' || item.brand.toLowerCase().includes(input.toLowerCase()))
                    && (category === '' || category === 'all' || item.bsr_category.toLowerCase().replace(/\s/g, "").includes(category.toLowerCase()))
                }).map((d, index) => (
                    <ProductItem
                        key={index}
                        brand={d.brand}
                        price={d.price}
                        bsr_category={d.bsr_category}
                        img={d.img}
                    />
                ))
            }
        </ul>
    )
};

export default ProductsList;