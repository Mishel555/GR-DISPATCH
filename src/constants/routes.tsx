import { RouteObject } from 'react-router-dom';
import loadable from '@loadable/component';
import { DISPATCHER_SIDEBAR_PATHS, ROOT_PATHS } from '@constants/paths';

const HomePage = loadable(() => import('@pages/Home'));

// Dispatcher sidebar views...
const SidebarOrders = loadable(() => import('@components/widgets/DispatcherSidebar/TABVIEWS/Orders'));
const SidebarDrivers = loadable(() => import('@components/widgets/DispatcherSidebar/TABVIEWS/Drivers'));
const SidebarTeams = loadable(() => import('@components/widgets/DispatcherSidebar/TABVIEWS/Teams'));
const SidebarRoutes = loadable(() => import('@components/widgets/DispatcherSidebar/TABVIEWS/Routes'));
const SidebarOrderForm = loadable(() => import('src/components/widgets/DispatcherSidebar/TABVIEWS/OrderForm'));

const DISPATCHER_SIDEBAR_ROUTES: RouteObject[] = [
  { index: true, element: <SidebarOrders /> },
  { path: DISPATCHER_SIDEBAR_PATHS.DRIVERS, element: <SidebarDrivers /> },
  { path: DISPATCHER_SIDEBAR_PATHS.TEAMS, element: <SidebarTeams /> },
  { path: DISPATCHER_SIDEBAR_PATHS.ROUTES, element: <SidebarRoutes /> },
  { path: DISPATCHER_SIDEBAR_PATHS.CREATE_ORDER, element: <SidebarOrderForm /> },
  { path: DISPATCHER_SIDEBAR_PATHS.EDIT_ORDER, element: <SidebarOrderForm /> },
];

export const ROOT_ROUTES: RouteObject[] = [
  {
    path: ROOT_PATHS.ROOT,
    element: <HomePage />,
    children: DISPATCHER_SIDEBAR_ROUTES,
  },
];
