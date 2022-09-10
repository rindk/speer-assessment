import React from 'react';
import { Route, Routes } from 'react-router-dom';

export function renderRoute(routes) {
  return routes.map((route, index) => {
    // // Redirect router
    // if (route.redirect && !route.element) {
    //   route.element = () => <Navigate to={route.redirect} />;
    // }
    return (
      <Route key={index} path={route.path} element={<route.element />}>
        {route.children && renderRoute(route.children)}
      </Route>
    );
  });
}
