import React from 'react';
import Home from "../../client/pages/home/home";
import ReactDOM from "react-dom/server";



export const renderHome = async (req, res)=> {
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
        return res.send(html);
    } catch (error) {
        console.error('Error handling ssr request:', error);
        return res.status(500).send('Internal Server Error');
    }
}