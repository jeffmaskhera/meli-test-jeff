import React, {useEffect, useState} from 'react';



const BreadCrumb=({product})=> {

    const [breadCrumb,  setBreadCrumb ] = useState([]);

    const createBreadCrumb =(data)=> {
        if (data && data.length > 0) {
            const valueCount = {};
            const groupCount = {};
            const idCount = {};

            data.forEach(item => {
                const attributes = item.attributes;
                attributes.forEach(attribute => {
                    const valueName = attribute.name ? attribute.name : 'Producto';
                    const idName = attribute.id ? attribute.id : 'Producto';
                    const groupName = attribute?.['attribute_group_name'] ? attribute?.['attribute_group_name'] : 'Producto';

                    valueCount[valueName] = (valueCount[valueName] || 0) + 1;
                    groupCount[groupName] = (groupCount[groupName] || 0) + 1;
                    idCount[idName] = (idCount[idName] || 0) + 1;
                });
            });

            const mostFrequentValue = Object.keys(valueCount).reduce((a, b) => valueCount[a] > valueCount[b] ? a : b, null);
            const mostFrequentGroup = Object.keys(groupCount).reduce((a, b) => groupCount[a] > groupCount[b] ? a : b, null);
            const mostFrequentId = Object.keys(idCount).reduce((a, b) => idCount[a] > idCount[b] ? a : b, null);
            const buildBreadCrumb = [data[0].query, mostFrequentGroup, mostFrequentId, mostFrequentValue];

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



