import React, {useState, useEffect} from 'react'
import Filter from "../../component/filter/filter";
import {formatNumberPrice} from "../../../utils/helpers";
import BreadCrumb from "../../component/bread-crumb/breadCrumb";

const Detail = ({response}) => {
    const product = response.items
    const [breadCrumb, setBreadCrumb] =useState([])

    const loadBreadCrumb =(products)=> {
        const newBreadCrumb = [
            {
                query: products.query,
                attributes: products.attributes
            }
        ];
        setBreadCrumb(newBreadCrumb);
    }

    useEffect(()=> {
        loadBreadCrumb(response.items)
    }, [response])

    const actionBuild=()=> {
        console.log("comprar")
    }

    return (
        <div className="detail">
            <Filter/>
            {breadCrumb &&
                breadCrumb.length > 0 && <BreadCrumb product={breadCrumb}/>
            }

            <div className="detail__main">
                <div className="detail__main__container">
                    {
                        product &&
                        <div className="detail__main__container__grid">
                            <div className="detail__main__container__grid__grid-product">
                                <div className="detail__main__container__grid__grid-product__image">
                                    <img src={product.picture} alt={product.title} />
                                </div>

                                <div className="detail__main__container__grid__grid-product__info-top">
                                    <p>{product.condition} - {product.quantitySold} vendidos</p>
                                    <h2>{product.title}</h2>
                                    <h2>$ {formatNumberPrice(product?.price)}</h2>
                                    <button className="button" onClick={actionBuild}>
                                        Comprar
                                    </button>
                                </div>

                                <div className="detail__main__container__grid__grid-product__info-down">
                                    <h2>Descripción del producto</h2>
                                    <p>{product.title}</p>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

Detail.defaultProps = {
    items: {}
};

export default Detail;