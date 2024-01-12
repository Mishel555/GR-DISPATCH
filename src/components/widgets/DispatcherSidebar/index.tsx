import { Outlet, useMatch } from 'react-router-dom';
import { ISidebarTab } from '@types';
import { DISPATCHER_SIDEBAR_PATHS, ROOT_PATHS } from '@constants/paths';
import { useAppDispatch, useAppSelector } from '@hooks';
import { selectCheckedCount, selectTeamsCount } from '@selectors/teamsSelector';
import { selectAppLayoutSettings } from '@selectors/configSelector';
import { setAppLayoutWidth } from '@slices/configSlice';
import { ResizableContainer, ResizeHandler, RouteWrapper, RootWrapper } from './styled-components';
import Item from './Tools/Tabs/Item';
import Tools from './Tools';

const DispatcherSidebar = () => {
  const dispatch = useAppDispatch();

  const teamsCount = useAppSelector(selectTeamsCount);
  const checkedCount = useAppSelector(selectCheckedCount);
  const appLayoutSettings = useAppSelector(selectAppLayoutSettings);

  const teamsBadge = teamsCount === checkedCount ? 'All' : checkedCount;

  const isEditView = useMatch(`${ROOT_PATHS.ROOT}/${DISPATCHER_SIDEBAR_PATHS.EDIT_ORDER}`);

  const TABS: ISidebarTab[] = [
    { value: DISPATCHER_SIDEBAR_PATHS.ROOT, label: 'Orders' },
    { value: DISPATCHER_SIDEBAR_PATHS.DRIVERS, label: 'Drivers' },
    { value: DISPATCHER_SIDEBAR_PATHS.TEAMS, label: <Item label="Teams" badge={teamsBadge} /> },
    { value: DISPATCHER_SIDEBAR_PATHS.ROUTES, label: 'Routes' },
  ];

  return (
    <ResizableContainer
      axis="x"
      height={0}
      width={appLayoutSettings.initialWidth}
      onResize={(_, data) => dispatch(setAppLayoutWidth(data.size.width))}
      minConstraints={[appLayoutSettings.minWidth, 0]} // width, height
      maxConstraints={[appLayoutSettings.maxWidth, 0]} // width, height
      handle={(<ResizeHandler onClick={(e) => e.stopPropagation()} />)}
      draggableOpts={{ enableUserSelectHack: true }}
    >
      <RootWrapper>
        {!isEditView && <Tools tabs={TABS} />} {/* Hide MapToolbar for edit view... */}
        <RouteWrapper>
          <Outlet />
        </RouteWrapper>
      </RootWrapper>
    </ResizableContainer>
  );
};

export default DispatcherSidebar;
