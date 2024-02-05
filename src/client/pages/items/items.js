import React, {useState, useEffect} from 'react'
import Filter from "../../component/filter/filter";
import SearchResult from "../../component/search-result/searchResult";
import BreadCrumb from "../../component/bread-crumb/breadCrumb";
import {formatProductData} from "../../../actions/products/interface-products";

const Items = ({response}) => {

    const products = response.items.map(formatProductData)
    const [breadCrumb, setBreadCrumb] =useState([])


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
        const url = new URL(window.location.href);
        url.searchParams.set('search', info);
        window.history.pushState({}, '', url.toString());
    }

    const selectorIdProduct =(value)=> {
        window.location.href = (`/detail/${value}`)
    }

    useEffect(()=> {
        loadBreadCrumb(response.items)
    }, [response])



    return (
        <div className="items">
            <Filter searching={searching}/>
            {breadCrumb &&
                breadCrumb.length > 0 && <BreadCrumb product={breadCrumb}/>
            }
            <div>
                {products && products.length > 0 ?
                    <SearchResult products={products} selectorIdProduct={selectorIdProduct}/>
                    :
                    <div className="items__not-found">
                        <h2>No se encontraron productos, por favor intenta de nuevo</h2>
                    </div>
                }
            </div>
        </div>
    );
};

Items.defaultProps = {
    items: {}
};

export default Items;
