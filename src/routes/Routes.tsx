import { FC } from 'react'
import { RouteProps, Routes as Switch, Route } from 'react-router-dom'

import Home from 'pages/Home/Home'
import Page404 from 'pages/Page404/Page404'
import SuperHeroes from 'pages/SuperHeroes/SuperHeroes'
import RQSuperHeroes from 'pages/RQSuperHeroes/RQSuperHeroes'

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}

interface AppRoute extends RouteProps {
  type?: RouteType
}

export const AppRoutes: AppRoute[] = [
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: '/',
    children: <Home />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/superheroes',
    children: <SuperHeroes />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/rq-superheroes',
    children: <RQSuperHeroes />,
  },
]

const Routes: FC = () => {
  return (
    <Switch>
      {AppRoutes.map((r) => {
        return <Route key={`${r.path}`} path={`/${r.path}`} element={r.children} />
      })}
      <Route path="*" element={<Page404 />} />
    </Switch>
  )
}

export default Routes
