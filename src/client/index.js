import React from 'react';
import ReactDom from 'react-dom/client';

import './assets/styles/global.scss'
import Home from './pages/home/home'
import Items from "./pages/items/items";
import Detail from "./pages/detail/detail";
import {switchCases} from "../utils/helpers";
import NotFound from "./pages/not-found/notFound";
import {Routes} from "../routes/interface-routes";


const linkElement = document.createElement('link');
linkElement.rel = 'preconnect';
linkElement.href = 'https://fonts.googleapis.com';
document.head.appendChild(linkElement);

const linkGFontElement = document.createElement('link');
linkGFontElement.rel = 'preconnect';
linkGFontElement.href = 'https://fonts.gstatic.com';
linkGFontElement.crossOrigin = true;
document.head.appendChild(linkGFontElement);

const fontLinkElement = document.createElement('link');
fontLinkElement.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,700&display=swap';
fontLinkElement.rel = 'stylesheet';
document.head.appendChild(fontLinkElement);

const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
document.head.appendChild(fontAwesomeLink);


const currentRoute = window.location.pathname
let detailId = null;

if (currentRoute.startsWith([Routes.DETAIL])) {
    detailId = currentRoute.split('/').pop();
}

const componentToRender = switchCases(currentRoute, {
    [Routes.HOME]: <Home items={window.__data__} />,
    [Routes.ITEMS]: <Items response={window.__data__}/>,
    [Routes.DETAIL + detailId]: <Detail response={window.__data__}/>,
    [Routes.NOTFOUND]: <NotFound/> // Page not found
});


ReactDom.hydrateRoot(document.getElementById('root'), componentToRender);
