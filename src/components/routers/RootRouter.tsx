import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROOT_ROUTES } from '@constants/routes';

const router = createBrowserRouter(ROOT_ROUTES);

const RootRouter = () => <RouterProvider router={router} />;

export default RootRouter;
