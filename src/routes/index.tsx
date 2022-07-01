import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const routes = [
  { path: "/", component: lazy(() => import("pages/Home")) },
  { path: "/app", component: lazy(() => import("pages/Application")) },
  { path: "/app/:tab", component: lazy(() => import("pages/Application")) },
];

function ComposeRoutes() {
  return (
    <Suspense fallback={<div />}>
      <Routes>
        {routes.map(({ component, path }, i) => {
          const PageComponent = component;
          return <Route key={i} path={path} element={<PageComponent />} />;
        })}
      </Routes>
    </Suspense>
  );
}

export default ComposeRoutes;
export { ComposeRoutes };
