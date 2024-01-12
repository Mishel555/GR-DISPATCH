import { ReactNode, useMemo } from 'react';
import Icon from '@ant-design/icons';
import { ColumnTitleProps } from 'antd/es/table/interface';
import { IDriverIncome } from '@types';
import { TableArrowIcon } from '@components/icons';
import { Title, Wrapper } from './styled-components';

interface IProps {
  children: ReactNode;
  titleProps?: ColumnTitleProps<IDriverIncome>;
  dataIndex?: string[];
}

const TableHeading = ({ children, titleProps, dataIndex }: IProps) => {
  const sort = useMemo(() => {
    if (!titleProps || !dataIndex) return null;

    return titleProps.sortColumns?.find(({ column }) => {
      if (!Array.isArray(column.dataIndex)) return false;

      if (!column.dataIndex[0] && !column.dataIndex[1]) return false;

      if (column.dataIndex && Array.isArray(column.dataIndex)) {
        // eslint-disable-next-line
        // @ts-ignore
        return dataIndex.every(index => column.dataIndex.includes(index));
      }

      return dataIndex.includes(column.dataIndex);
    })?.order;
  }, [titleProps, dataIndex]);

  return (
    <Wrapper>
      <Title>{children}</Title>
      {!!sort && <Icon component={() => <TableArrowIcon direction={sort === 'descend' ? 'top' : 'bottom'} />} />}
    </Wrapper>
  );
};

export default TableHeading;
