import { Card, Radio, Typography } from 'antd';
import numeral from 'numeral';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Donut } from '@ant-design/charts';
import type { DonutConfig } from '@ant-design/charts/es/donut';
import React from 'react';
import type { DataItem } from '../data';
import styles from '../style.less';

const { Text } = Typography;

const Streamway = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: string;
  salesPieData: DataItem[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="销售额类别占比"
    style={{
      height: '100%',
    }}
  >
    <div>
      <Text>销售额</Text>
      <Donut
        forceFit
        height={340}
        radius={0.8}
        angleField="y"
        colorField="x"
        data={salesPieData as DataItem[]}
        legend={{
          visible: false,
        }}
        label={{
          visible: true,
          type: 'spider',
          formatter: (text, item) => {
            // eslint-disable-next-line no-underscore-dangle
            return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
          },
        }}
        statistic={
          {
            totalLabel: '销售额',
          } as DonutConfig['statistic']
        }
      />
    </div>
  </Card>
);

export default Streamway;
