import express from 'express';
import React from 'react';
import path from 'path';
import {renderHome} from "./controllers/home-controller";
import {renderItems} from "./controllers/items-controller";
import {renderDetail} from "./controllers/detail-controller";
import {renderNotFound} from "./controllers/not-found-controller";
import {Routes} from "../routes/interface-routes";


const app = express();
var queryParams = ''



app.use('/static', express.static(path.join(__dirname, '..', '..', 'dist', 'static')));


// RENDER PAGES



//PAGE HOME
app.get([Routes.HOME], renderHome);


// PAGE ITEM
app.get([Routes.ITEMS], renderItems, async (req, res)=> {
    queryParams = res.locals.params
});


// PAGE DETAIL
app.get([Routes.DETAIL]+':id', (req, res) => {
    renderDetail(req, res, queryParams);
});


// NOT FOUND
app.get([Routes.NOTFOUND], renderNotFound);


app.listen(3000, () => console.log('server started http://localhost:3000'))

