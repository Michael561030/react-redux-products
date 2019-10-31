import React from 'react';

//Displayed each item as these fields: name, price, category, image
const ProductItem = ({brand, price, bsr_category, img}) => (
    <li>
        <i>Name: </i>{brand} <br/>
        <i>Price: </i>{price} <br/>
        <i>Category: </i>{bsr_category} <br/>
        <i>Photo: </i>
        <img src={img} alt={img} width="100px" height="100px"/>
        <hr/>
    </li>
);

export default ProductItem;
