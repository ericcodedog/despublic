import { Card,  DatePicker, Typography } from 'antd';
import numeral from 'numeral';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Donut } from '@ant-design/charts';
import type { DonutConfig } from '@ant-design/charts/es/donut';
import React from 'react';
import type { DataItem } from '../data';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import styles from '../style.less';
type RangePickerValue = RangePickerProps<moment.Moment>['value'];
export type TimeType = 'today' | 'week' | 'month' | 'year';
const { Text } = Typography;
const { RangePicker } = DatePicker;
const Salesway = ({
  dropdownGroup,
  salesType,
  loading,
  salesPieData,
  handleChangeSalesType,
  handleRangePickerChange,
  rangePickerValue,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: DataItem[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  rangePickerValue: RangePickerValue;
}) => (
  
  <Card
    
    //loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="销售渠道收益占比"
    style={{
      height: '100%',
    }}
    
  >
    <div className={styles.salesExtraWrap}>
            <RangePicker
              value={rangePickerValue}
              onChange={handleRangePickerChange}
              style={{ width: 256 }}
            />
          </div>
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

export default Salesway;
