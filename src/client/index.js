import React from 'react';
import ReactDom from 'react-dom';
import './assets/styles/global.scss'
import Home from './pages/home/home'
import Items from "./pages/items/items";
import Detail from "./pages/detail/detail";
import {switchCases} from "../utils/helpers";


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



const Routes = {
    HOME: '/',
    ITEMS: '/items',
    DETAIL: '/detail/',
};


const currentRoute = window.location.pathname
const searchParam = new URLSearchParams(window.location.search).get('search');
let detailId = null;


if (currentRoute.startsWith([Routes.DETAIL])) {
    detailId = currentRoute.split('/').pop();
}

const componentToRender = switchCases(currentRoute, {
    [Routes.HOME]: <Home items={window.__data__} />,
    [Routes.ITEMS]: <Items params={searchParam}/>,
    [Routes.DETAIL + detailId]: <Detail detailId={detailId}/>,
    'default': <div>no encontrado</div>, // Página no encontrada
});

ReactDom.hydrate(componentToRender, document.getElementById('root'));



/*
const app = <Home items={window.__data__}/>
ReactDom.hydrate(app, document.getElementById('root'));*/
