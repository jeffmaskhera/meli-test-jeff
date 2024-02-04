import React, {useState, useEffect} from 'react'
import Filter from "../../component/filter/filter";
import SearchResult from "../../component/search-result/searchResult";
import axios from 'axios';
import BreadCrumb from "../../component/bread-crumb/breadCrumb";
import {formatProductData} from "../../../actions/products/interface-products";
import Spinner from "../../component/spinner/spinner";

const Items = ({params}) => {
    const [search, setSearch] = useState(params);
    const [products, setProducts] = useState([]);
    const [breadCrumb, setBreadCrumb] =useState([])
    const [loading, setLoading] = useState(false);


    const loadBreadCrumb =(products)=> {
        const transformedArray = products.map(item => {
            return {
                query: item.query,
                attributes: item.attributes
            };
        });
        setBreadCrumb(transformedArray);
    }


    const searching =(info)=> {
        setSearch(info)
        const url = new URL(window.location.href);
        url.searchParams.set('search', info);
        window.history.pushState({}, '', url.toString());
    }

    const fetchData = async (value) => {
        setLoading(true)
        try {
            const response = await axios.get('/api/items', { params: {  query: value } });
            const items = response.data.items || [];
            setProducts(items.map(formatProductData));
            loadBreadCrumb(items.map(formatProductData))
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };

    const selectorIdProduct =(value)=> {
        window.location.href = (`/detail/${value}`)
    }


    useEffect(()=> {
        fetchData(search)
    }, [search])



    return (
        <div className="items">
            {
                loading && <Spinner />
            }
            <Filter searching={searching}/>
            {breadCrumb &&
                breadCrumb.length > 0 && <BreadCrumb product={breadCrumb}/>
            }
            <div>
                {products
                && products.length > 0 ?
                    <SearchResult products={products} selectorIdProduct={selectorIdProduct}/>
                    :
                   <>
                       {
                           products  && !loading &&
                           <div className="items__not-found">
                               <h2>No se encontraron productos, por favor intenta de nuevo</h2>
                           </div>
                       }
                   </>
                }
            </div>
        </div>
    );
};

Items.defaultProps = {
    items: {}
};

export default Items;
