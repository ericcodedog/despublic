import { FC, useEffect } from 'react';
import { Suspense, useState } from 'react';
import { EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Dropdown, Menu, Row, Tooltip ,Statistic} from 'antd';
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
import { useRequest } from 'umi';

import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
import type { TimeType } from './components/SalesCard';
import { getTimeDistance } from './utils/utils';
import type { AnalysisData } from '../data';
import styles from './style.less';
import { Moment } from 'moment';
import ActiveChart from '../monitor/components/ActiveChart';
import ActiveChart1 from '../monitor/components/ActiveChart1';
import { ChartCard, Field } from './components/Charts';
import Yuan from './utils/Yuan';
import Trend from './components/Trend';
import numeral from 'numeral';
import {Gauge, Progress, TinyArea } from '@ant-design/charts';
import { ChoroplethMap } from '@ant-design/maps';
import Map from './components/Map';
import { Scene, PolygonLayer, LineLayer, PointLayer } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';

/*const scene = new Scene({
  id: 'map',
  map: new Mapbox({
    pitch: 0,
    style: 'blank',
    center: [ 116.368652, 39.93866 ],
    zoom: 10.07
  })
});
scene.on('loaded', () => {
  fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/707cd4be-8ffe-4778-b863-3335eefd5fd5.json' //  获取行政区划P噢利用
  )
    .then(res => res.json())
    .then(data => {
      const chinaPolygonLayer = new PolygonLayer({
        autoFit: true
      })
        .source(data)
        .color(
          'name',
          [ '#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15' ]
        )
        .shape('fill')
        .style({
          opacity: 1
        });
      //  图层边界
      const layer2 = new LineLayer({
        zIndex: 2
      })
        .source(data)
        .color('#fff')
        .size(0.5)
        .style({
          opacity: 1
        });

      scene.addLayer(chinaPolygonLayer);
      scene.addLayer(layer2);
    });

  fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/ab42a860-f874-4452-a8b6-4168a36c1f2c.json' //  国界线
  ).then(res => res.json())
    .then(data => {
      const boundaries = new LineLayer({
        zIndex: 2
      })
        .source(data)
        .color('rgb(93,112,146)')
        .size(0.6)
        .style({
          opacity: 1
        });

      scene.addLayer(boundaries);
    });

  fetch(
    'https://gw.alipayobjects.com/os/bmw-prod/d09a3567-8c0e-4711-b8b8-cd82e8870e4b.json' //  标注数据
  ).then(res => res.json())
    .then(data => {
      const labelLayer = new PointLayer({
        zIndex: 5
      })
        .source(data, {
          parser: {
            type: 'json',
            coordinates: 'center'
          }
        })
        .color('#fff')
        .shape('name', 'text')
        .size(12)
        .style({
          opacity: 1,
          stroke: '#fff',
          strokeWidth: 0,
          padding: [ 5, 5 ],
          textAllowOverlap: false
        });

      scene.addLayer(labelLayer);
    });
});*/




const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK


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


  const DemoChoroplethMap = () => {
  const config = {
    map: {
      type: 'mapbox',
      style: 'blank',
      center: [120.19382669582967, 30.258134],
      zoom: 3,
      pitch: 0,
    },
    source: {
      data: [],
      joinBy: {
        sourceField: 'code',
        geoField: 'adcode',
      },
    },
    viewLevel: {
      level: 'world',
      adcode: 'all',
    },
    autoFit: true,
    color: {
      field: 'name',
      value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
    },
    style: {
      opacity: 1,
      stroke: '#ccc',
      lineWidth: 0.6,
      lineOpacity: 1,
    },
    chinaBorder: false,
    label: {
      visible: true,
      field: 'name',
      style: {
        fill: '#000',
        opacity: 0.8,
        fontSize: 10,
        stroke: '#fff',
        strokeWidth: 1.5,
        textAllowOverlap: false,
        padding: [5, 5],
      },
    },
    state: {
      active: true,
      select: {
        stroke: 'black',
        lineWidth: 1.5,
        lineOpacity: 0.8,
      },
    },
    tooltip: {
      items: ['name', 'adcode', 'value'],
    },
    zoom: {
      position: 'bottomright',
    },
    legend: {
      position: 'bottomleft',
    },
  };
  return <ChoroplethMap {...config} />;
};
const DemoChoroplethMapc = () => {
  const [list, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.2/administrative-data/area-list.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const data = list
    .filter(({ level }) => level === 'city')
    .map((item) =>
      Object.assign({}, item, {
        value: Math.random() * 5000,
      }),
    );
  const config = {
    map: {
      type: 'mapbox',
      style: 'blank',
      center: [120.19382669582967, 30.258134],
      zoom: 3,
      pitch: 0,
    },
    source: {
      data: data,
      joinBy: {
        sourceField: 'adcode',
        geoField: 'adcode',
      },
    },
    viewLevel: {
      level: 'country',
      adcode: 100000,
      granularity: 'city',
    },
    autoFit: true,
    color: {
      field: 'value',
      value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
      scale: {
        type: 'quantize',
      },
    },
    style: {
      opacity: 1,
      stroke: '#ccc',
      lineWidth: 0.6,
      lineOpacity: 1,
    },
    label: {
      visible: true,
      field: 'name',
      style: {
        fill: '#000',
        opacity: 0.8,
        fontSize: 10,
        stroke: '#fff',
        strokeWidth: 1.5,
        textAllowOverlap: false,
        padding: [5, 5],
      },
    },
    state: {
      active: {
        stroke: 'black',
        lineWidth: 1,
      },
    },
    tooltip: {
      items: ['name', 'adcode', 'value'],
    },
    zoom: {
      position: 'bottomright',
    },
    legend: {
      position: 'bottomleft',
    },
  };

  return <ChoroplethMap {...config} />;
};

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

<Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card title="活动情况预测" style={{ marginTop: 24 }} bordered={false}>
              <ActiveChart />
            </Card>
            <Card title="消费情况预测" style={{ marginBottom: 0 }} bordered={false}>
              <ActiveChart1 />
            </Card>
            
          </Col>


*/

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
              <Salesway
                dropdownGroup={dropdownGroup}
                salesType={salesWay}
                loading={loading}
                //salesPieData={salesPieData || []}
                salesPieData={salesWayPieData || []}
                handleChangeSalesType={handleChangeSalesType}
                rangePickerValue={undefined} handleRangePickerChange={function (dates: RangeValue<Moment> | undefined, dateStrings: [string, string]): void {
                  throw new Error('Function not implemented.');
                } }                />
            </Suspense>
          </Col>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <DataTrend
                activeKey={activeKey}
                loading={loading}
                offlineData={data?.offlineData || []}
                offlineChartData={data?.offlineChartData2 || []}
                handleTabChange={handleTabChange}
              />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginTop: 24, }}>
            <Card title="活动实时交易情况" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <Statistic
                    title="今日交易总额"
                    suffix="元"
                    value={numeral(124543233).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic title="销售目标完成率" value="92%" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Countdown title="活动剩余时间" value={deadline} format="HH:mm:ss:SSS" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic title="每秒交易总额" suffix="元" value={numeral(234).format('0,0')} />
                </Col>
              </Row>
              <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={8} lg={24} md={24} sm={24} xs={24} style={{ marginTop: 24, }}>
              <div className={styles.mapChart}>
                <DemoChoroplethMap/>
              </div>
          </Col>
           <Col xl={16} lg={24} md={24} sm={24} xs={24} style={{ marginTop: 24, }}>
            <div className={styles.mapChart}>
                <DemoChoroplethMapc/>
              </div>
          </Col>
        </Row>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
         
              
        </Row>
              
            </Card>
          </Col>
          
        </Row>
        <h1 style={{
            marginTop: 24,
          }}>
          电商
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
          <h1 style={{
            marginTop: 24,
          }}>
          品牌
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
                salesPieData={salesPieData || []}//streamPieData
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
                offlineChartData={data?.offlineChartData3|| []}
                handleTabChange={handleTabChange}
              />
            </Suspense>
          </Col>
          </Row>
      </>
    </GridContent>
  );
};

export default Analysis;
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