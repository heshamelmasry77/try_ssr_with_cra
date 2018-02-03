import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import * as routes from './routes';

export default () => (
    <Switch>
        <Route exact path="/" component={routes.HomePage} />
        <Route exact path="/about" component={routes.About} />
        <Route component={routes.NotFound} />
    </Switch>
);
