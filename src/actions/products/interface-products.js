import {switchCases} from "../../utils/helpers";

export const formatProductData = (data) => ({
    id: data?.['id'] || '',
    condition: determineCondition(data?.['condition'] || ''),
    price: data?.['price']?.['amount'] || '',
    title: data?.['title'] || '',
    image: data?.['picture'] || '',
    sellerName: data?.['sellerName'] || '',
    attributes: data?.['attributes'] || [],
    query: data?.['query'],
});


const determineCondition =(condition)=> {
    return switchCases(condition, {
        'new': 'Nuevo',
        'used': 'Usado',
        'default': '',
    });
}
