import React from 'react';



const SearchResult=({products, selectorIdProduct})=> {

    const selectorProduct =(id)=>{
        selectorIdProduct(id)
    }

    return (
        <div className="search-result">
            <div className="search-result__container">
                {products && products.length > 0 && products.map((item, i) => {
                    return (
                        <div key={i} className="search-result__container__item">
                            <div className="search-result__container__item__left-side">
                                <div className="search-result__container__item__left-side__image" onClick={()=>selectorProduct(item?.id)}>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="search-result__container__item__left-side__grid-info">
                                    <h2>{item.price}</h2>
                                    <h2>{item.title}</h2>
                                </div>
                            </div>
                            <div className="search-result__container__item__right-side">
                                <p>{item.sellerName}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};


export default SearchResult;
