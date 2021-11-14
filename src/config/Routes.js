import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';
import Home from '../pages/Home';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/:category/search/:keyword" component={Catalog} />
      <Route path="/:category/:id" component={Detail} />
      <Route path="/:category" component={Catalog} />
      <Route path="/" exact component={Home} />
    </Switch>
  );
};
