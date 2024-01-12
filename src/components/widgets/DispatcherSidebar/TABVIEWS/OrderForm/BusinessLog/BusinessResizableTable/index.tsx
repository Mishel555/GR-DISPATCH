import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { IOrderBusinessLog } from '@types';
import { getDateTimeFormatString } from '@utils';
import { useAppSelector } from '@hooks';
import { selectAppDateTimeFormat } from '@selectors/configSelector';
import TableColumn from './TableColumn';
import EventDetails from './EventDetails';
import { Label, TableWrapper, Title } from './styled-components';
import './style.scss';

interface IProps {
  data: IOrderBusinessLog[];
}

const DriversResizableTable = ({ data }: IProps) => {
  const dateTimeFormat = useAppSelector(selectAppDateTimeFormat);

  const COLUMNS: ColumnsType<IOrderBusinessLog> = [
    {
      width: 100,
      title: <Title>Date</Title>,
      dataIndex: 'date',
      render: date => {
        const formattedDate = dayjs(date).format(getDateTimeFormatString(dateTimeFormat));

        return (
          <TableColumn>
            <Label>{formattedDate}</Label>
          </TableColumn>
        );
      },
    },
    {
      width: 80,
      title: <Title>Order status</Title>,
      dataIndex: 'status',
      render: (status, record) => (
        <TableColumn>
          <Label>{status ?? record.apiStatus}</Label>
        </TableColumn>
      ),
    },
    {
      width: 90,
      title: <Title>Updated by</Title>,
      dataIndex: 'source',
      render: (source, record) => (
        <TableColumn>
          <Label>{source ?? `${record.user.name || ''} ${!!record.user.login && `[${record.user.login}]`}`}</Label>
        </TableColumn>
      ),
    },
    {
      width: 90,
      title: <Title>Event</Title>,
      dataIndex: 'log',
      render: (event, record) => {
        const { details } = record;

        return (
          <TableColumn>
            <Space>
              <Label>{event}</Label>
              {!!details && <EventDetails data={details} />}
            </Space>
          </TableColumn>
        );
      },
    },
  ];

  return (
    <TableWrapper>
      <Table
        bordered={false}
        pagination={false}
        columns={COLUMNS}
        dataSource={data}
        className="businessLogTable"
      />
    </TableWrapper>
  );
};

export default DriversResizableTable;
