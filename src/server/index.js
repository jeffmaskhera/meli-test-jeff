import express from 'express';
import React from 'react';
import path from 'path';
import ReactDOM from 'react-dom/server';
import Home from "../client/pages/home/home";
import Items from "../client/pages/items/items";
import Detail from "../client/pages/detail/detail";
import {getDecimalCount} from "../utils/helpers";
import {searchItems, searchProduct} from "../actions/products/products";
import NotFound from "../client/pages/not-found/notFound";


const app = express();
var queryParams = ''



app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist', 'static')));


// RENDER PAGES



//PAGE HOME
app.get('/', async (req, res) => {
    const title = `Mercado libre`;
    const description = "Encontrá lo que buscás en Mercado Libre. Todo lo que necesitas lo conseguís en un solo lugar, en Mercado Libre"
    try {
        const root = (
            <html>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta property="og:description" content={description} />
                <body>
                    <div id="root">
                        <Home />
                    </div>
                    <script src="/static/bundle.js"></script>
                </body>
            </html>
        );

        const html = ReactDOM.renderToString(root);
        res.send(html);
    } catch (error) {
        console.error('Error handling ssr request:', error);
        res.status(500).send('Internal Server Error');
    }
});



// PAGE ITEM
app.get('/items', async (req, res) => {
    try {
        const defaultSearchQuery = '';
        const query = req.query.search || defaultSearchQuery;
        const items = await searchItems(query);
        queryParams = query


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
        res.send(html);
    } catch (error) {
        console.error('Error handling /items request:', error);
        res.status(500).send('Internal Server Error');
    }
});




// PAGE DETAIL
app.get('/detail/:id', async (req, res) => {
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
        res.send(html);
    } catch (error) {
        console.error('Error handling /items request:', error);
        res.status(500).send('Internal Server Error');
    }
});



// NOT FOUND
app.get('*', (req, res) => {
    try {
        const title = 'Mercado libre - Página no encontrada';
        const description = "Encontrá lo que buscás en Mercado Libre. Todo lo que necesitas lo conseguís en un solo lugar, en Mercado Libre"
        const root = (
            <html>
                <title>{title}</title>
                <meta name="twitter:description" content={description} />
                <meta property="og:description" content={description} />
                <body>
                    <div id="root">
                        <NotFound />
                    </div>
                    <script src="/static/bundle.js"/>
                </body>
            </html>
        );
        const html = ReactDOM.renderToString(root);
        res.send(html);
    } catch (error) {
        console.error('Error handling default request:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(3000, () => console.log('server started http://localhost:3000'))

