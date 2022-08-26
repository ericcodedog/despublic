import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Dropdown, Menu, Row, Tooltip } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import IntroduceRow from './components/IntroduceRow';
import SalesCard from './components/SalesCard';
import Incomenewuser from './components/Incomenewuser';
import ProportionSales from './components/ProportionSales';
import Salesway from './components/Salesway';
import OfflineData from './components/OfflineData';
import DataTrend from './components/SalesDataTrend';
import Eshopway from './components/Eshopway';
import Streamway from './components/Streamway';
import FansRank from './components/FansRank';
import StreamCard from './components/StreamCard';
import { useRequest } from 'umi';

import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
import type { TimeType } from './components/SalesCard';
import { getTimeDistance } from './utils/utils';
import type { AnalysisData } from '../data.d';
import styles from './style.less';
import { Moment } from 'moment';
import ActiveChart from '../monitor/components/ActiveChart';
import { ChartCard, Field } from './components/Charts';
import Yuan from './utils/Yuan';
import Trend from './components/Trend';
import numeral from 'numeral';
import { Progress, TinyArea } from '@ant-design/charts';
import { Mix } from '@ant-design/plots';
import { DataView } from '@antv/data-set';
type RangePickerValue = RangePickerProps<moment.Moment>['value'];

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};

type SalesType = 'all' | 'online' | 'stores';
type SalesWay = 'all' | 'online' | 'stores';
type Eshop = 'all' | 'online' | 'stores';
type Streamway = 'all' | 'online' | 'stores';
type Selfsales = 'all' | 'online' | 'stores';

const Analysis: FC<AnalysisProps> = () => {
  const [salesType, setSalesType] = useState<SalesType>('all');
  const [salesWay, setSalesWay] = useState<SalesWay>('all');
  const [eshop , setEshop] = useState<Eshop>('all')
  const [streamway , setStream] = useState<Streamway>('all')
  const [selfway , setself] = useState<Selfsales>('all')
  
  const [currentTabKey, setCurrentTabKey] = useState<string>('');
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance('year'),
  );

  const { loading, data } = useRequest(fakeChartData);

  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };

  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };

  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  let salesPieData;
  if (salesType === 'all') {
    salesPieData = data?.salesTypeData;
  } else {
    salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
  }

  let salesWayPieData;
  if (salesWay === 'all') {
    salesWayPieData = data?.salesWayData;
  } else {
    salesWayPieData = salesWay === 'online' ? data?.salesWayDataOnline : data?.salesWayDataOffline;
  }

  let eshopPieData;
  if (eshop === 'all') {
    eshopPieData = data?.eshopData;
  }
  let streamPieData;
  if (streamway === 'all') {
    streamPieData = data?.streamData;
  }
  let self;
  if (selfway == 'all'){
    self = data?.selfsales;
  }
  
  const menu = (
    <Menu>
      <Menu.Item>操作一</Menu.Item>
      <Menu.Item>操作二</Menu.Item>
    </Menu>
  );

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown overlay={menu} placement="bottomRight">
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );

  const handleChangeSalesType = (e: RadioChangeEvent) => {
    setSalesType(e.target.value);
  };

  const handleTabChange = (key: string) => {
    setCurrentTabKey(key);
  };

  const activeKey = currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || '';
/*
<Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={data?.salesData || []}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense>
<Suspense fallback={null}>
          <FansRank
            rangePickerValue={rangePickerValue}
            salesData={data?.salesData2 || []}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense>

*/ 
/*



*/
const DemoMix = () => {
  const data = [
    ['其他', 66, 30, 6, 10, 5, 15],
    ['鉴湖', 102, 37, 24, 15, 20, 6],
    ['状元红', 49, 9, 7, 15, 13, 5],
    ['沈永和', 75, 20, 14, 20, 8, 13],
    ['女儿红', 44, 15, 12, 9, 3, 5],
    ['古越龙山', 108, 20, 50, 14, 8, 16],
  ];
  const yearData = [
    ['抖音', 60, 176, 35, 25, 2017],
    ['快手', 51, 136, 25, 26, 2018],
    ['淘宝直播', 73, 196, 35, 38, 2019],
    ['小紅书', 84, 315, 43, 41, 2020],
    ['得物', 79, 203, 36, 33, 2021],
    ['其他', 89, 286, 41, 48, 2022],
  ];
  const config = {
    height: 500,
    padding: 'auto',
    tooltip: {
      showMarkers: false,
    },
    views: [
      {
        data: data.map((d) => ({
          type: d[0],
          value: d[1],
        })),
        region: {
          start: {
            x: 0,
            y: 0,
          },
          end: {
            x: 0.5,
            y: 0.4,
          },
        },
        coordinate: {
          type: 'theta',
          cfg: {
            radius: 0.85,
          },
        },
        axes: {
          value: {
            title: {
              text: 'Drinks',
            },
            grid: null,
            tickLine: null,
            line: false,
            ticks: false,
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: '1',
            yField: 'value',
            colorField: 'type',
            mapping: {},
            adjust: {
              type: 'stack',
            },
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-highlight',
          },
        ],
      },
      {
        data: new DataView()
          .source(
            data.map((d) => ({
              type: d[0],
              抖音: d[2],
              快手: d[3],
              淘宝直播: d[4],
              小红书: d[5],
              得物: d[6],
            })),
          )
          .transform({
            type: 'fold',
            fields: ['抖音', '快手', '淘宝直播', '小红书', '得物'],
            key: 'gender',
            value: 'value',
          }).rows,
        region: {
          start: {
            x: 0.5,
            y: 0,
          },
          end: {
            x: 1,
            y: 0.45,
          },
        },
        coordinate: {
          cfg: {
            isTransposed: true,
          },
        },
        axes: {
          value: true,
        },
        geometries: [
          {
            type: 'interval',
            xField: 'type',
            yField: 'value',
            colorField: 'gender',
            mapping: {},
            adjust: {
              type: 'dodge',
              marginRatio: 0,
            },
          },
        ],
      },
      {
        data: yearData.map((d) => ({
          year: d[5],
          ordered: d[1],
        })),
        region: {
          start: {
            x: 0,
            y: 0.52,
          },
          end: {
            x: 0.48,
            y: 1,
          },
        },
        axes: {
          year: {
            title: {
              text: 'Drinks ordered',
            },
          },
        },
        meta: {
          ordered: {
            min: 40,
            max: 90,
          },
        },
        geometries: [
          {
            type: 'area',
            xField: 'year',
            yField: 'ordered',
            mapping: {},
          },
          {
            type: 'line',
            xField: 'year',
            yField: 'ordered',
            mapping: {
              style: {
                lineWidth: 0.5,
              },
            },
          },
        ],
      },
      {
        data: new DataView()
          .source(
            yearData.map((d) => ({
              year: d[0],
              male: d[3],
              female: d[4],
            })),
          )
          .transform({
            type: 'fold',
            fields: ['male', 'female'],
            key: 'gender',
            value: 'turnout',
          }).rows,
        region: {
          start: {
            x: 0.52,
            y: 0.52,
          },
          end: {
            x: 1,
            y: 1,
          },
        },
        axes: {
          year: {
            title: {
              text: 'Turnout by gender',
            },
          },
        },
        geometries: [
          {
            type: 'interval',
            xField: 'year',
            yField: 'turnout',
            colorField: 'gender',
            adjust: {
              type: 'dodge',
              marginRatio: 0,
            },
            mapping: {},
          },
        ],
        interactions: [
          {
            type: 'element-active',
          },
          {
            type: 'association-sibling-highlight',
          },
        ],
      },
    ],
  };
  return <Mix {...config} />;
};

  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={data?.visitData || []} />
        </Suspense>

        
        
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <Streamway
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={streamPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <DataTrend
                activeKey={activeKey}
                loading={loading}
                offlineData={data?.offlineData || []}
                offlineChartData={data?.offlineChartData5 || []}
                handleTabChange={handleTabChange}
              />
            </Suspense>
          </Col>
        </Row>
        <h1 style={{
            marginTop: 24,
          }}>
          进阶数据
        </h1>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          
        </Row>
        
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
                  <StreamCard
                    rangePickerValue={rangePickerValue}
                    salesData={data?.salesData || []}
                    isActive={isActive}
                    handleRangePickerChange={handleRangePickerChange}
                    loading={loading}
                    selectDate={selectDate}
                  />
                </Suspense>
          </Col>
        </Row>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card>
              <DemoMix/>
            </Card>
          </Col>
        </Row>
        <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        
      </>
    </GridContent>
  );
};

export default Analysis;
/*<Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="新增客户"
              action={
                <Tooltip title="指标说明">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <>126560</>}
              footer={<Field label="日增长" value={`${numeral(12423).format('0,0')}人`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              loading={loading}
              title="访问量"
              action={
                <Tooltip title="指标说明">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              total={numeral(8846).format('0,0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <TinyArea
                color="#975FE4"
                xField="x"
                height={46}
                forceFit
                yField="y"
                smooth
                data={data?.visitData}
              />
            </ChartCard>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              loading={loading}
              bordered={false}
              title="运营活动效果(ROI)"
              action={
                <Tooltip title="指标说明">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              total="1.23"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比
                    <span className={styles.trendText}>12%</span>
                  </Trend>
                  <Trend flag="down">
                    日同比
                    <span className={styles.trendText}>11%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <Progress
                height={46}
                percent={0.78}
                color="#13C2C2"
                forceFit
                size={8}
                marker={[
                  {
                    value: 0.8,
                    style: {
                      stroke: '#13C2C2',
                    },
                  },
                ]}
              />
            </ChartCard>
          </Col>*/
/*
<Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
                  <SalesCard
                    rangePickerValue={rangePickerValue}
                    salesData={data?.salesData || []}
                    isActive={isActive}
                    handleRangePickerChange={handleRangePickerChange}
                    loading={loading}
                    selectDate={selectDate}
                  />
                </Suspense>
          </Col>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
                  <FansRank
                    rangePickerValue={rangePickerValue}
                    salesData={data?.salesData2 || []}
                    isActive={isActive}
                    handleRangePickerChange={handleRangePickerChange}
                    loading={loading}
                    selectDate={selectDate}
                  />
                </Suspense>
          </Col>
          */

/*
<Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Incomenewuser
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
                dropdownGroup={dropdownGroup}
                rangePickerValue={rangePickerValue}
                isActive={isActive}
                handleRangePickerChange={handleRangePickerChange}
                selectDate={selectDate}
              />
            </Col>
            <Suspense fallback={null}>
              
              
            </Suspense>


*/


/*<Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense>
        <Card title="活动情况预测" style={{ marginBottom: 24 }} bordered={false}>
              <ActiveChart />
            </Card>
            */
           /*        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={14} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <DataTrend
                activeKey={activeKey}
                loading={loading}
                offlineData={data?.offlineData || []}
                offlineChartData={data?.offlineChartData4 || []}
                handleTabChange={handleTabChange}
              />
            </Suspense>
          </Col>
          <Col xl={10} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <Eshopway
                dropdownGroup={dropdownGroup}
                salesType={eshop}
                loading={loading}
                salesPieData={eshopPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row>
        <h1 style={{
            marginTop: 24,
          }}>
          直播
        </h1>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="新增客户"
              action={
                <Tooltip title="指标说明">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <>126560</>}
              footer={<Field label="日增长" value={`${numeral(12423).format('0,0')}人`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              loading={loading}
              title="访问量"
              action={
                <Tooltip title="指标说明">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              total={numeral(8846).format('0,0')}
              footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <TinyArea
                color="#975FE4"
                xField="x"
                height={46}
                forceFit
                yField="y"
                smooth
                data={data?.visitData}
              />
            </ChartCard>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              loading={loading}
              bordered={false}
              title="运营活动效果(ROI)"
              action={
                <Tooltip title="指标说明">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              total="1.23"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比
                    <span className={styles.trendText}>12%</span>
                  </Trend>
                  <Trend flag="down">
                    日同比
                    <span className={styles.trendText}>11%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <Progress
                height={46}
                percent={0.78}
                color="#13C2C2"
                forceFit
                size={8}
                marker={[
                  {
                    value: 0.8,
                    style: {
                      stroke: '#13C2C2',
                    },
                  },
                ]}
              />
            </ChartCard>
          </Col>
        </Row>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={10} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
              <Streamway
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={streamPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
           
          </Col>
          
          <Col xl={14} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <DataTrend
                activeKey={activeKey}
                loading={loading}
                offlineData={data?.offlineData || []}
                offlineChartData={data?.offlineChartData5 || []}
                handleTabChange={handleTabChange}
              />
            </Suspense>
          </Col>
        </Row>
        <h1 style={{
            marginTop: 24,
          }}>
          自营
        </h1>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              title="新增客户"
              action={
                <Tooltip title="指标说明">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              loading={loading}
              total={() => <>0</>}
              footer={<Field label="日增长" value={`${numeral(0).format('0,0')}人`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比
                <span className={styles.trendText}>0%</span>
              </Trend>
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>0%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              bordered={false}
              loading={loading}
              title="访问量"
              action={
                <Tooltip title="指标说明">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              total={numeral(0).format('0,0')}
              footer={<Field label="日访问量" value={numeral(0).format('0,0')} />}
              contentHeight={46}
            >
              <TinyArea
                color="#975FE4"
                xField="x"
                height={46}
                forceFit
                yField="y"
                smooth
                //data={data?.visitData}
              />
            </ChartCard>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <ChartCard
              loading={loading}
              bordered={false}
              title="运营活动效果(ROI)"
              action={
                <Tooltip title="指标说明">
                  <InfoCircleOutlined />
                </Tooltip>
              }
              total="0"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                  <Trend flag="down">
                    日同比
                    <span className={styles.trendText}>0%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <Progress
                height={46}
                percent={0.0}
                color="#13C2C2"
                forceFit
                size={8}
                marker={[
                  {
                    value: 0.8,
                    style: {
                      stroke: '#13C2C2',
                    },
                  },
                ]}
              />
            </ChartCard>
          </Col>
        
        </Row>
        
        <Row gutter={24}
          style={{
            marginTop: 24,
          }}>
            <Col xl={10} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
              <Streamway
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={self || []}//streamPieData
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
           
          </Col>
          
          <Col xl={14} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <DataTrend
                activeKey={activeKey}
                loading={loading}
                offlineData={data?.offlineData || []}
                offlineChartData={data?.offlineChartDataEmpty || []}
                handleTabChange={handleTabChange}
              />
            </Suspense>
          </Col>
          </Row>
          */