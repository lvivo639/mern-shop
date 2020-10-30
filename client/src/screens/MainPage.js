import React, {useState, useEffect} from 'react';
import ProductCard from "../components/ProductCard";
import axios from 'axios'

const MainPage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get('/products')
            setProducts(data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Latest products</h1>
            <div className="row">
                {products.map(product =>
                    <div key={product._id} className="py-3 col col-xl-4">
                        <ProductCard product={product}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;