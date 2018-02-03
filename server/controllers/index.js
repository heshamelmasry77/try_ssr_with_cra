import express from "express";

import serverRenderer from '../middleware/renderer';
import rendererMid from '../middleware/rendererMid';
// import configureStore from '../../src/store/configureStore';
import configStore from '../store';
import { setMessage, setAsyncMessage } from '../../src/reducers/app';

const router = express.Router();
const path = require("path");


export const actionIndex = (req, res, next) => {
    const { store, history } = configStore({}, req.path);
    const context = {}
    store.dispatch(setAsyncMessage("Hi, I'm from server!"))
        .then(() => {
            rendererMid(store, history)(req, res, next);
        });

};


// root (/) should always serve our server rendered page
// router.use('^/$', actionIndex);
router.get('/', actionIndex);


export default router;