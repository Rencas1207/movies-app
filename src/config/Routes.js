import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
// import Catalog from '../pages/Catalog';
// import Detail from '../pages/Detail/Detail';
// import Home from '../pages/Home';

const HomePage = React.lazy(() => import('../pages/Home'));
const CatalogPage = React.lazy(() => import('../pages/Catalog'));
const DetailPage = React.lazy(() => import('../pages/Detail/Detail'));

export const Routes = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/:category/search/:keyword" component={CatalogPage} />
        <Route path="/:category/:id" component={DetailPage} />
        <Route path="/:category" component={CatalogPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Suspense>
  );
};
