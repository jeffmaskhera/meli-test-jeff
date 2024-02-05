import React from 'react';
import ReactDOM from "react-dom/server";
import NotFound from "../../client/pages/not-found/notFound";


export const renderNotFound = async (req, res)=> {
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
        return res.send(html);
    } catch (error) {
        console.error('Error handling default request:', error);
        return res.status(500).send('Internal Server Error');
    }
}