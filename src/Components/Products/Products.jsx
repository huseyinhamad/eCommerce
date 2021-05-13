import React from "react";
import { Grid } from "@material-ui/core";

import Product from './Product/Product';

const products = [
    {id: 1, name: 'Shoes', description: 'Running Shoes.', price: '$5', image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/38277b478a79419abf6da998000ab640_9366/Runfalcon_Shoes_Black_F36218_01_standard.jpg' },
    {id: 2, name: 'Macbook', description: 'Apple Macbook 5.', price: '$10', image: 'https://productimages.hepsiburada.net/s/32/550/10354045517874.jpg/format:webp' },    
]

const Products = () => {
    return(
        <main>
            <Grid container justify = "center" spacing={4}>
                {products.map((product) => (
                    <Grid item key = {product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;