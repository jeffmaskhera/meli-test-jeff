import express from 'express';
import React from 'react';
import path from 'path';
import ReactDOM from 'react-dom/server';
import Home from "../client/pages/home/home";
import Items from "../client/pages/items/items";
import Detail from "../client/pages/detail/detail";
import {getDecimalCount} from "../utils/helpers";
import {searchItems, searchProduct} from "../actions/products/products";



const app = express();
var queryParams = ''



app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist', 'static')));

// Endpoint Find Items
app.get('/api/items', async (req, res) => {
    try {
        const { query } = req.query;
        const searchResults = await searchItems(query);
        queryParams = query

        const formattedResponse = {
            author: {
                name: 'Jefrey',
                lastname: 'Sánchez'
            },
            items: searchResults.map(item => ({
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
        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





// Endpoint Find Product
app.get('/api/product', async (req, res) => {
    try {
        const { id } = req.query;

        const productResults = await searchProduct(id);

        const formattedResponse = {
            author: {
                name: 'Jefrey',
                lastname: 'Sánchez'
            },
            items: {
                id: productResults?.id,
                query: queryParams ? queryParams : '',
                title: productResults?.title,
                picture: productResults?.thumbnail,
                price: {
                    currency: productResults?.currency_id,
                    amount: productResults?.price,
                    decimals: getDecimalCount(productResults?.price)
                },
                condition: productResults?.condition,
                free_shipping: productResults?.shipping && productResults?.shipping?.free_shipping,
                sellerName: productResults?.seller && productResults?.seller?.nickname,
                attributes: productResults?.attributes,
            }
        };
        res.json(formattedResponse);

    } catch (error) {
        console.error('Error searching product:', error);
        if (error.response) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(400).json({ error: 'Bad Request' });
        }
    }
});



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
                        <Items item={items}/>
                    </div>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.__data__ = ${JSON.stringify(items || null)};`,
                        }}
                    />
                    <script src="/static/bundle.js"></script>
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

        const title = product?.title ? `Mercado libre te muestra el producto: "${product.title}"` : 'No hay nada';
        const image = product?.thumbnail

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
                <Detail/>
            </div>
            <script src="/static/bundle.js"></script>
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




app.listen(3000, () => console.log('server started http://localhost:3000'))

