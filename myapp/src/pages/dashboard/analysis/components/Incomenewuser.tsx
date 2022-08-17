import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, DatePicker, Tooltip } from 'antd';
import { TinyArea } from '@ant-design/charts';
import React from 'react';
import numeral from 'numeral';
import type { DataItem } from '../data';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';


import NumberInfo from './NumberInfo';
import styles from '../style.less';
type RangePickerValue = RangePickerProps<moment.Moment>['value'];
export type TimeType = 'today' | 'week' | 'month' | 'year';

const { RangePicker } = DatePicker;

const Incomenewuser = ({
  rangePickerValue,
  loading,
  visitData2,
  searchData,
  dropdownGroup,
  isActive,
  selectDate,
  handleRangePickerChange,
}: {
  rangePickerValue: RangePickerValue;
  loading: boolean;
  visitData2: DataItem[];
  dropdownGroup: React.ReactNode;
  searchData: DataItem[];
  selectDate: (key: TimeType) => void;
  isActive: (key: TimeType) => string;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
}) => (
  <Card
    loading={loading}
    bordered={false}
    title="线上热门搜索"
    extra={dropdownGroup}
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
    <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              营收
              <Tooltip title="指标说明">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </span>
          }
          gap={8}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <TinyArea xField="x" height={45} forceFit yField="y" smooth data={visitData2} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              新用户
              <Tooltip title="指标说明">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </span>
          }
          total={2.7}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <TinyArea xField="x" height={45} forceFit yField="y" smooth data={visitData2} />
      </Col>
    </Row>



  </Card>
);

export default Incomenewuser;

 


