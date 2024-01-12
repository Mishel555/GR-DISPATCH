import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectGroupedRoutes } from '@selectors/routesSelector';
import { getRoutes } from '@thunks/routesThunk';
import { selectRoute } from '@slices/routesSlice';
import Search from '../../Search';
import { RootWrapper, RouteWrapper, StyledRouteGroup } from './styled-components';

const RoutesView = () => {
  const dispatch = useAppDispatch();

  const routes = useAppSelector(selectGroupedRoutes());

  const onSearch = useCallback((search: string | null) => {
    if (search !== null && search.length > 3) {
      return dispatch(getRoutes({ query: search }));
    }

    dispatch(getRoutes({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRoutes({}));

    return () => {
      dispatch(selectRoute(null));
    };
  }, [dispatch]);

  return (
    <RootWrapper>
      <Search onSearch={onSearch} />
      <RouteWrapper>
        {routes?.map((route) => (
          <StyledRouteGroup key={route.id} data={route} />
        ))}
      </RouteWrapper>
    </RootWrapper>
  );
};

export default RoutesView;
