import { FC } from 'react'
import { RouteProps, Routes as Switch, Route } from 'react-router-dom'

import Home from 'pages/Home/Home'
import Page404 from 'pages/Page404/Page404'
import SuperHeroes from 'pages/SuperHeroes/SuperHeroes'
import RQSuperHeroes from 'pages/RQSuperHeroes/RQSuperHeroes'
import RQSuperHero from 'pages/RQSuperHero/RQSuperHero'
import ParallelQueries from 'pages/ParallelQueries/ParallelQueries'
import DynamicParallelQueries from 'pages/DynamicParallelQueries/DynamicParallelQueries'
import DependentQueries from 'pages/DependentQueries/DependentQueries'
import PaginatedQueries from 'pages/PaginatedQueries/PaginatedQueries'
import InfiniteQueries from 'pages/InfiniteQueries/InfiniteQueries'

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
  {
    type: RouteType.PUBLIC,
    path: '/rq-superheroes/:heroId',
    children: <RQSuperHero />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/parallel-queries',
    children: <ParallelQueries />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/dynamic-parallel-queries',
    children: <DynamicParallelQueries heroIds={[1, 3]} />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/dependent-queries',
    children: <DependentQueries email="test@gmail.com" />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/paginated-queries',
    children: <PaginatedQueries />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/infinite-queries',
    children: <InfiniteQueries />,
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
