import { ReactEventHandler, SyntheticEvent, useState } from 'react';
import { ResizeCallbackData } from 'react-resizable';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { IDriverIncome } from '@types';
import { COLORS } from '@constants/theme';
import { getDriverStatus, minutesToHours } from '@utils';
import { useAppSelector } from '@hooks';
import { selectActiveDriverId } from '@selectors/driversSelector';
import { CountBadge, TextBadge } from '@components/ui';
import ResizableHeading from './ResizableHeading';
import TableHeading from './TableHeading';
import TableColumn from './TableColumn';
import { Label, TableWrapper } from './styled-components';
import './style.scss';

interface IProps {
  data: IDriverIncome[];
}

const COLUMNS: ColumnsType<IDriverIncome> = [
  {
    width: 130,
    dataIndex: ['driver', 'name'],
    sortDirections: ['ascend', 'descend'],
    title: (titleProps) => (
      <TableHeading titleProps={titleProps} dataIndex={['driver', 'name']}>Driver</TableHeading>
    ),
    sorter: (a, b) => {
      if (a.driver.name < b.driver.name) return -1;

      if (a.driver.name > b.driver.name) return 1;

      return 0;
    },
    render: (name, record) => (
      <TableColumn driverId={record.driver.id}>
        <Label bold>{name}</Label>
      </TableColumn>
    ),
  },
  {
    width: 95,
    dataIndex: ['driver', 'team', 'alias'],
    sortDirections: ['ascend', 'descend'],
    title: (titleProps) => (
      <TableHeading titleProps={titleProps} dataIndex={['driver', 'team', 'alias']}>Team</TableHeading>
    ),
    sorter: (a, b) => {
      if (a.driver.team.alias < b.driver.team.alias) return -1;

      if (a.driver.team.alias > b.driver.team.alias) return 1;

      return 0;
    },
    render: (team, record) => (
      <TableColumn driverId={record.driver.id}>
        <Label>{team}</Label>
      </TableColumn>
    ),
  },
  {
    width: 110,
    dataIndex: ['driver', 'lastCoordinatesTime'],
    sortDirections: ['ascend', 'descend'],
    title: (titleProps) => (
      <TableHeading titleProps={titleProps} dataIndex={['driver', 'lastCoordinatesTime']}>Was Online</TableHeading>
    ),
    sorter: (a, b) => {
      if (a.driver.lastCoordinatesTime < b.driver.lastCoordinatesTime) return -1;

      if (a.driver.lastCoordinatesTime > b.driver.lastCoordinatesTime) return 1;

      return 0;
    },
    render: (data, record) => {
      const fromAgo = dayjs(data).fromNow();
      const isOnline = getDriverStatus(data) === 'online';

      return (
        <TableColumn driverId={record.driver.id}>
          <TextBadge color={isOnline ? COLORS.CYAN : COLORS.GREY_LIGHT}>
            {isOnline ? 'Online' : fromAgo}
          </TextBadge>
        </TableColumn>
      );
    },
  },
  {
    width: 95,
    dataIndex: ['visibleMinutes'],
    sortDirections: ['ascend', 'descend'],
    title: (titleProps) => (
      <TableHeading titleProps={titleProps} dataIndex={['visibleMinutes']}>Visible Hours</TableHeading>
    ),
    sorter: (a, b) => {
      if (a.visibleMinutes < b.visibleMinutes) return -1;

      if (a.visibleMinutes > b.visibleMinutes) return 1;

      return 0;
    },
    render: (minutes, record) => (
      <TableColumn driverId={record.driver.id}>
        <Label bold>{minutesToHours(minutes)}</Label>
      </TableColumn>
    ),
  },
  {
    width: 110,
    dataIndex: ['completedOrdersCount'],
    sortDirections: ['ascend', 'descend'],
    title: (titleProps) => (
      <TableHeading titleProps={titleProps} dataIndex={['completedOrdersCount']}>Completed Orders</TableHeading>
    ),
    sorter: (a, b) => {
      if (a.completedOrdersCount < b.completedOrdersCount) return -1;

      if (a.completedOrdersCount > b.completedOrdersCount) return 1;

      return 0;
    },
    render: (count, record) => (
      <TableColumn driverId={record.driver.id}>
        <CountBadge count={count} />
      </TableColumn>
    ),
  },
];

const DriversResizableTable = ({ data }: IProps) => {
  const activeDriver = useAppSelector(selectActiveDriverId);

  const [cols, setCols] = useState<ColumnsType<IDriverIncome>>(COLUMNS);

  const handleResize = (index: number) => (_: SyntheticEvent, { size }: ResizeCallbackData) => {
    const tempCols = [...cols];

    tempCols[index] = {
      ...tempCols[index],
      width: size.width,
    };

    setCols(tempCols);
  };

  const mergeColumns: ColumnsType<IDriverIncome> = cols.map((col, index) => ({
    ...col,
    onHeaderCell: (column: ColumnsType<IDriverIncome>[number]) => ({
      onResize: handleResize(index) as ReactEventHandler<any>, // eslint-disable-line
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...(column.dataIndex !== 'completedOrdersCount' && ({
        width: column.width,
      })),
    }),
  }));

  return (
    <TableWrapper>
      <Table
        bordered={false}
        pagination={false}
        columns={mergeColumns}
        dataSource={data}
        components={{ header: { cell: ResizableHeading } }}
        rowClassName={(record) => activeDriver === record.driver.id ? 'ant-table-row-custom-selected' : ''}
        className="driversTable"
      />
    </TableWrapper>
  );
};

export default DriversResizableTable;
