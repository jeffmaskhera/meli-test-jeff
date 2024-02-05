import React from 'react';
import ReactDOM from "react-dom/server";
import {searchProduct} from "../../actions/products/products";
import {getDecimalCount} from "../../utils/helpers";
import Detail from "../../client/pages/detail/detail";


export const renderDetail = async (req, res, queryParams)=> {
    try {
        const { id } = req.params;
        const product = await searchProduct(id);


        const formattedResponse = {
            author: {
                name: 'Jefrey',
                lastname: 'Sánchez'
            },
            items: {
                id: product.id,
                query: queryParams ? queryParams : '',
                title: product?.title,
                picture: product?.thumbnail,
                price: {
                    currency: product?.currency_id,
                    amount: product?.price,
                    decimals: getDecimalCount(product?.price)
                },
                condition: product?.condition,
                free_shipping: product?.shipping && product?.shipping?.free_shipping,
                sellerName: product?.seller && product?.seller?.nickname,
                attributes: product?.attributes,
            }
        };

        const title = formattedResponse?.items?.title ? `Mercado libre te muestra el producto: "${formattedResponse?.items?.title}"` : '';
        const image = formattedResponse?.items?.picture

        const root = (
            <html>
            <title>{title}</title>
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={title} />
            <meta name="twitter:image" content={image} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={title} />
            <meta property="og:image" content={image} />

            <body>
            <div id="root">
                <Detail response={formattedResponse}/>
            </div>
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.__data__ = ${JSON.stringify(formattedResponse || null)};`,
                }}
            />
            <script src="/static/bundle.js"/>
            </body>
            </html>
        );

        const html = ReactDOM.renderToString(root);
        return res.send(html);
    } catch (error) {
        console.error('Error handling /items request:', error);
        return res.status(500).send('Internal Server Error');
    }
}