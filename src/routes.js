import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Detailed from './components/Detailed';

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/task/:id' component={Detailed} />
    </Switch>
)