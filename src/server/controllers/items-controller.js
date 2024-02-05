import React from 'react';
import ReactDOM from "react-dom/server";
import {searchItems} from "../../actions/products/products";
import {getDecimalCount} from "../../utils/helpers";
import Items from "../../client/pages/items/items";



export const renderItems = async (req, res, next)=> {
    try {
        const defaultSearchQuery = '';
        const query = req.query.search || defaultSearchQuery;
        const items = await searchItems(query);

        const formattedResponse = {
            author: {
                name: 'Jefrey',
                lastname: 'Sánchez'
            },
            items: items.map(item => ({
                id: item?.id,
                query: query,
                title: item?.title,
                picture: item?.thumbnail,
                price: {
                    currency: item?.currency_id,
                    amount: item?.price,
                    decimals: getDecimalCount(item?.price)
                },
                condition: item?.condition,
                free_shipping: item?.shipping && item?.shipping?.free_shipping,
                sellerName: item?.seller && item?.seller?.nickname,
                attributes: item?.attributes,
            }))
        };


        const title = `Mercado libre búsqueda de "${query}"`;
        const titlesArray = items.map(obj => obj?.title);

        const root = (
            <html>
                <title>{title}</title>
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={title} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={titlesArray} />
                    <body>
                        <div id="root">
                            <Items response={formattedResponse}/>
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
        res.locals.params = query
        next();
        return res.send(html)
    } catch (error) {
        console.error('Error handling /items request:', error);
        return res.status(500).send('Internal Server Error');
    }
}