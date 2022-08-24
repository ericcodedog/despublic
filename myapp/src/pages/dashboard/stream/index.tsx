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