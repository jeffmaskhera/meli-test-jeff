import React, {useEffect, useState} from 'react';



const BreadCrumb=({product})=> {

    const [breadCrumb,  setBreadCrumb ] = useState([]);


    const createBreadCrumb =(data)=> {
        if (data && data.length > 0) {
            const valueCount = {};

            data.forEach(item => {
                const attributes = item.attributes;
                attributes.forEach(attribute => {
                    const valueName = attribute.value_name;
                    valueCount[valueName] = (valueCount[valueName] || 0) + 1;
                });
            });

            const mostFrequentValue = Object.keys(valueCount).reduce((a, b) => valueCount[a] > valueCount[b] ? a : b, null);
            const buildBreadCrumb = [data[0].query, mostFrequentValue];

            setBreadCrumb(buildBreadCrumb);
        }
    }

    useEffect(()=> {
        createBreadCrumb(product)
    }, [product])

    return (
        <div className="bread-crumb">
            <div className="bread-crumb__container">
            {breadCrumb && breadCrumb.length > 0 &&
                breadCrumb.map((item, index)=> {
                    const isLastItem = index === breadCrumb.length - 1;
                    return (
                        <h2 className="bread-crumb__container__item" key={index}>
                            {item.toLowerCase()} {isLastItem ? null : '>'}
                        </h2>
                    )
                })
            }
            </div>
        </div>
    );
};


export default BreadCrumb;



