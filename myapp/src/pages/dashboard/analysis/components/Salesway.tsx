import { Card,  DatePicker, Typography } from 'antd';
import numeral from 'numeral';
import type { RadioChangeEvent } from 'antd/es/radio';
import { Donut } from '@ant-design/charts';
import { measureTextWidth, Pie } from '@ant-design/plots';
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
    
    <div>
      <Text>销售额</Text>
      <Pie
        //forceFit
        height={360}
        radius={1}
        angleField="y"
        colorField="x"
        data={salesPieData as DataItem[]}
        legend={{
          visible: true
        }}
        label={{
          type:'inner',
          style: {
            fontSize: 15,
            textAlign: 'center',
          },
          //visible: true,
          //type: 'spider',
          formatter: (text, item ,percent) => {
            //eslint-disable-next-line no-underscore-dangle
            //return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`;
            return  `${item._origin.x}: ${(numeral(item._origin.y).format('0,0')*1).toFixed(0)}%`;
          },
          //content: ({ percent }) => `${item._origin.x}: ${(percent * 100).toFixed(0)}%`,
        }}
        statistic={
          {
            totalLabel: '销售额比例',
          } as DonutConfig['statistic']
        }
        
      />
      
    </div>
  </Card>
);

export default Salesway;

function renderStatistic(d: number, text: any, arg2: { fontSize: number; }) {
  throw new Error('Function not implemented.');
}
/*<div className={styles.salesExtraWrap}>
            <RangePicker
              value={rangePickerValue}
              onChange={handleRangePickerChange}
              style={{ width: 256 }}
            />
          </div>*/
          /*<Donut
        //forceFit
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
      />*/