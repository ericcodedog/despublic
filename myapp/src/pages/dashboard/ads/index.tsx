import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { EllipsisOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Dropdown, Menu, Row, Tooltip} from 'antd';
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
import AdsCard from './components/AdsCard';
import { useRequest } from 'umi';

import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
import type { TimeType } from './components/SalesCard';
import { getTimeDistance } from './utils/utils';
import type { AnalysisData } from './data';
import styles from './style.less';
import { Moment } from 'moment';
import ActiveChart from '../monitor/components/ActiveChart';
import { ChartCard, Field } from './components/Charts';
import Yuan from './utils/Yuan';
import Trend from './components/Trend';
import numeral from 'numeral';
import { Progress, TinyArea ,Area} from '@ant-design/charts';
import { DataView } from '@antv/data-set';
import { Funnel } from '@ant-design/plots';

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
type Adsway = 'all' | 'online' | 'stores';
const Analysis: FC<AnalysisProps> = () => {
  const [salesType, setSalesType] = useState<SalesType>('all');
  const [salesWay, setSalesWay] = useState<SalesWay>('all');
  const [eshop , setEshop] = useState<Eshop>('all')
  const [streamway , setStream] = useState<Streamway>('all')
  const [selfway , setself] = useState<Selfsales>('all')
  const [adsway , setads] = useState<Adsway>('all')
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
  let ads;
  if (adsway == 'all'){
    ads = data?.adspie;
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
const DemoArea = () => {
  //const [data, setData] = useState([]);

  /*useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/b21e7336-0b3e-486c-9070-612ede49284e.json')
    //
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };*/
  const data = [
    { "country": "七级推广", "date": 1965, "value": 1390.5 },
    { "country": "七级推广", "date": 1966, "value": 1469.5 },
    { "country": "七级推广", "date": 1967, "value": 1521.7 },
    { "country": "七级推广", "date": 1968, "value": 1615.9 },
    { "country": "七级推广", "date": 1969, "value": 1703.7 },
    { "country": "七级推广", "date": 1970, "value": 1767.8 },
    { "country": "七级推广", "date": 1971, "value": 1806.2 },
    { "country": "七级推广", "date": 1972, "value": 1903.5 },
    { "country": "七级推广", "date": 1973, "value": 1986.6 },
    { "country": "七级推广", "date": 1974, "value": 1952 },
    { "country": "七级推广", "date": 1975, "value": 1910.4 },
    { "country": "七级推广", "date": 1976, "value": 2015.8 },
    { "country": "七级推广", "date": 1977, "value": 2074.7 },
    { "country": "七级推广", "date": 1978, "value": 2092.7 },
    { "country": "七级推广", "date": 1979, "value": 2123.8 },
    { "country": "七级推广", "date": 1980, "value": 2068.3 },
    { "country": "七级推广", "date": 1981, "value": 2018 },
    { "country": "七级推广", "date": 1982, "value": 1951.5 },
    { "country": "七级推广", "date": 1983, "value": 1941.1 },
    { "country": "七级推广", "date": 1984, "value": 2046.2 },
    { "country": "七级推广", "date": 1985, "value": 2053.1 },
    { "country": "七级推广", "date": 1986, "value": 2060.7 },
    { "country": "七级推广", "date": 1987, "value": 2130.8 },
    { "country": "七级推广", "date": 1988, "value": 2223.5 },
    { "country": "七级推广", "date": 1989, "value": 2275.9 },
    { "country": "七级推广", "date": 1990, "value": 2280.7 },
    { "country": "七级推广", "date": 1991, "value": 2282 },
    { "country": "七级推广", "date": 1992, "value": 2319.7 },
    { "country": "七级推广", "date": 1993, "value": 2366.6 },
    { "country": "七级推广", "date": 1994, "value": 2420.2 },
    { "country": "七级推广", "date": 1995, "value": 2466.9 },
    { "country": "七级推广", "date": 1996, "value": 2547.4 },
    { "country": "七级推广", "date": 1997, "value": 2569 },
    { "country": "七级推广", "date": 1998, "value": 2585.2 },
    { "country": "七级推广", "date": 1999, "value": 2633.8 },
    { "country": "七级推广", "date": 2000, "value": 2699.4 },
    { "country": "七级推广", "date": 2001, "value": 2640.1 },
    { "country": "七级推广", "date": 2002, "value": 2687.7 },
    { "country": "七级推广", "date": 2003, "value": 2700.7 },
    { "country": "七级推广", "date": 2004, "value": 2759.4 },
    { "country": "七级推广", "date": 2005, "value": 2775.6 },
    { "country": "七级推广", "date": 2006, "value": 2761.9 },
    { "country": "七级推广", "date": 2007, "value": 2809.5 },
    { "country": "七级推广", "date": 2008, "value": 2759.4 },
    { "country": "七级推广", "date": 2009, "value": 2632.5 },
    { "country": "七级推广", "date": 2010, "value": 2720.7 },
    { "country": "七级推广", "date": 2011, "value": 2722.9 },
    { "country": "七级推广", "date": 2012, "value": 2665.1 },
    { "country": "七级推广", "date": 2013, "value": 2738.3 },
    { "country": "七级推广", "date": 2014, "value": 2766.8 },
    { "country": "七级推广", "date": 2015, "value": 2739.7 },
    { "country": "七级推广", "date": 2016, "value": 2761.9 },
    { "country": "七级推广", "date": 2017, "value": 2772.8 },
    { "country": "六级推广", "date": 1965, "value": 109.2 },
    { "country": "六级推广", "date": 1966, "value": 115.7 },
    { "country": "六级推广", "date": 1967, "value": 120.5 },
    { "country": "六级推广", "date": 1968, "value": 128 },
    { "country": "六级推广", "date": 1969, "value": 134.4 },
    { "country": "六级推广", "date": 1970, "value": 142.2 },
    { "country": "六级推广", "date": 1971, "value": 157.5 },
    { "country": "六级推广", "date": 1972, "value": 169.5 },
    { "country": "六级推广", "date": 1973, "value": 186.3 },
    { "country": "六级推广", "date": 1974, "value": 195.5 },
    { "country": "六级推广", "date": 1975, "value": 198 },
    { "country": "六级推广", "date": 1976, "value": 211.7 },
    { "country": "六级推广", "date": 1977, "value": 223.8 },
    { "country": "六级推广", "date": 1978, "value": 236.5 },
    { "country": "六级推广", "date": 1979, "value": 251.8 },
    { "country": "六级推广", "date": 1980, "value": 262.9 },
    { "country": "六级推广", "date": 1981, "value": 262.7 },
    { "country": "六级推广", "date": 1982, "value": 265.9 },
    { "country": "六级推广", "date": 1983, "value": 268.3 },
    { "country": "六级推广", "date": 1984, "value": 278.3 },
    { "country": "六级推广", "date": 1985, "value": 285.2 },
    { "country": "六级推广", "date": 1986, "value": 304.2 },
    { "country": "六级推广", "date": 1987, "value": 315.4 },
    { "country": "六级推广", "date": 1988, "value": 324.6 },
    { "country": "六级推广", "date": 1989, "value": 329.9 },
    { "country": "六级推广", "date": 1990, "value": 331.1 },
    { "country": "六级推广", "date": 1991, "value": 339.7 },
    { "country": "六级推广", "date": 1992, "value": 355.8 },
    { "country": "六级推广", "date": 1993, "value": 368.8 },
    { "country": "六级推广", "date": 1994, "value": 390.9 },
    { "country": "六级推广", "date": 1995, "value": 408.3 },
    { "country": "六级推广", "date": 1996, "value": 425.8 },
    { "country": "六级推广", "date": 1997, "value": 448.2 },
    { "country": "六级推广", "date": 1998, "value": 465.5 },
    { "country": "六级推广", "date": 1999, "value": 463.7 },
    { "country": "六级推广", "date": 2000, "value": 476.1 },
    { "country": "六级推广", "date": 2001, "value": 477.7 },
    { "country": "六级推广", "date": 2002, "value": 483.5 },
    { "country": "六级推广", "date": 2003, "value": 489.3 },
    { "country": "六级推广", "date": 2004, "value": 515.5 },
    { "country": "六级推广", "date": 2005, "value": 533.6 },
    { "country": "六级推广", "date": 2006, "value": 564 },
    { "country": "六级推广", "date": 2007, "value": 587 },
    { "country": "六级推广", "date": 2008, "value": 605.8 },
    { "country": "六级推广", "date": 2009, "value": 596.8 },
    { "country": "六级推广", "date": 2010, "value": 632.5 },
    { "country": "六级推广", "date": 2011, "value": 658.9 },
    { "country": "六级推广", "date": 2012, "value": 676.5 },
    { "country": "六级推广", "date": 2013, "value": 692 },
    { "country": "六级推广", "date": 2014, "value": 697.7 },
    { "country": "六级推广", "date": 2015, "value": 701.1 },
    { "country": "六级推广", "date": 2016, "value": 696.8 },
    { "country": "六级推广", "date": 2017, "value": 700.6 },
    { "country": "五级推广", "date": 1965, "value": 1058.1 },
    { "country": "五级推广", "date": 1966, "value": 1089.7 },
    { "country": "五级推广", "date": 1967, "value": 1121.7 },
    { "country": "五级推广", "date": 1968, "value": 1196.6 },
    { "country": "五级推广", "date": 1969, "value": 1285.5 },
    { "country": "五级推广", "date": 1970, "value": 1369 },
    { "country": "五级推广", "date": 1971, "value": 1406.2 },
    { "country": "五级推广", "date": 1972, "value": 1472.7 },
    { "country": "五级推广", "date": 1973, "value": 1558 },
    { "country": "五级推广", "date": 1974, "value": 1535.5 },
    { "country": "五级推广", "date": 1975, "value": 1519.3 },
    { "country": "五级推广", "date": 1976, "value": 1606.9 },
    { "country": "五级推广", "date": 1977, "value": 1632.4 },
    { "country": "五级推广", "date": 1978, "value": 1687.5 },
    { "country": "五级推广", "date": 1979, "value": 1749.6 },
    { "country": "五级推广", "date": 1980, "value": 1706.4 },
    { "country": "五级推广", "date": 1981, "value": 1661.4 },
    { "country": "五级推广", "date": 1982, "value": 1630.2 },
    { "country": "五级推广", "date": 1983, "value": 1645.2 },
    { "country": "五级推广", "date": 1984, "value": 1686.9 },
    { "country": "五级推广", "date": 1985, "value": 1779.4 },
    { "country": "五级推广", "date": 1986, "value": 1811.3 },
    { "country": "五级推广", "date": 1987, "value": 1849.7 },
    { "country": "五级推广", "date": 1988, "value": 1870 },
    { "country": "五级推广", "date": 1989, "value": 1875 },
    { "country": "五级推广", "date": 1990, "value": 1853.3 },
    { "country": "五级推广", "date": 1991, "value": 1844.6 },
    { "country": "五级推广", "date": 1992, "value": 1814.1 },
    { "country": "五级推广", "date": 1993, "value": 1805.3 },
    { "country": "五级推广", "date": 1994, "value": 1791.3 },
    { "country": "五级推广", "date": 1995, "value": 1836.2 },
    { "country": "五级推广", "date": 1996, "value": 1896.1 },
    { "country": "五级推广", "date": 1997, "value": 1896.4 },
    { "country": "五级推广", "date": 1998, "value": 1918.8 },
    { "country": "五级推广", "date": 1999, "value": 1907.7 },
    { "country": "五级推广", "date": 2000, "value": 1932.1 },
    { "country": "五级推广", "date": 2001, "value": 1959.2 },
    { "country": "五级推广", "date": 2002, "value": 1954.8 },
    { "country": "五级推广", "date": 2003, "value": 1991.6 },
    { "country": "五级推广", "date": 2004, "value": 2025.4 },
    { "country": "五级推广", "date": 2005, "value": 2037.4 },
    { "country": "五级推广", "date": 2006, "value": 2056.4 },
    { "country": "五级推广", "date": 2007, "value": 2041.7 },
    { "country": "五级推广", "date": 2008, "value": 2038.5 },
    { "country": "五级推广", "date": 2009, "value": 1932.1 },
    { "country": "五级推广", "date": 2010, "value": 2001.1 },
    { "country": "五级推广", "date": 2011, "value": 1949.1 },
    { "country": "五级推广", "date": 2012, "value": 1944.3 },
    { "country": "五级推广", "date": 2013, "value": 1934 },
    { "country": "五级推广", "date": 2014, "value": 1871.2 },
    { "country": "五级推广", "date": 2015, "value": 1908.7 },
    { "country": "五级推广", "date": 2016, "value": 1934.6 },
    { "country": "五级推广", "date": 2017, "value": 1969.5 },
    { "country": "四级推广", "date": 1965, "value": 593.3 },
    { "country": "四级推广", "date": 1966, "value": 630.9 },
    { "country": "四级推广", "date": 1967, "value": 663.2 },
    { "country": "四级推广", "date": 1968, "value": 687.8 },
    { "country": "四级推广", "date": 1969, "value": 719 },
    { "country": "四级推广", "date": 1970, "value": 754.8 },
    { "country": "四级推广", "date": 1971, "value": 791.9 },
    { "country": "四级推广", "date": 1972, "value": 832.3 },
    { "country": "四级推广", "date": 1973, "value": 875.1 },
    { "country": "四级推广", "date": 1974, "value": 923.3 },
    { "country": "四级推广", "date": 1975, "value": 969 },
    { "country": "四级推广", "date": 1976, "value": 1006.5 },
    { "country": "四级推广", "date": 1977, "value": 1051.4 },
    { "country": "四级推广", "date": 1978, "value": 1094.2 },
    { "country": "四级推广", "date": 1979, "value": 1127.1 },
    { "country": "四级推广", "date": 1980, "value": 1150.1 },
    { "country": "四级推广", "date": 1981, "value": 1174.5 },
    { "country": "四级推广", "date": 1982, "value": 1204 },
    { "country": "四级推广", "date": 1983, "value": 1229 },
    { "country": "四级推广", "date": 1984, "value": 1274.6 },
    { "country": "四级推广", "date": 1985, "value": 1257 },
    { "country": "四级推广", "date": 1986, "value": 1282 },
    { "country": "四级推广", "date": 1987, "value": 1318 },
    { "country": "四级推广", "date": 1988, "value": 1341.5 },
    { "country": "四级推广", "date": 1989, "value": 1332.5 },
    { "country": "四级推广", "date": 1990, "value": 1350.3 },
    { "country": "四级推广", "date": 1991, "value": 1308.9 },
    { "country": "四级推广", "date": 1992, "value": 1233.1 },
    { "country": "四级推广", "date": 1993, "value": 1121 },
    { "country": "四级推广", "date": 1994, "value": 1012.2 },
    { "country": "四级推广", "date": 1995, "value": 951.2 },
    { "country": "四级推广", "date": 1996, "value": 920 },
    { "country": "四级推广", "date": 1997, "value": 878.4 },
    { "country": "四级推广", "date": 1998, "value": 871.7 },
    { "country": "四级推广", "date": 1999, "value": 881.3 },
    { "country": "四级推广", "date": 2000, "value": 888.5 },
    { "country": "四级推广", "date": 2001, "value": 905.5 },
    { "country": "四级推广", "date": 2002, "value": 904 },
    { "country": "四级推广", "date": 2003, "value": 924.3 },
    { "country": "四级推广", "date": 2004, "value": 938.7 },
    { "country": "四级推广", "date": 2005, "value": 942.3 },
    { "country": "四级推广", "date": 2006, "value": 978.6 },
    { "country": "四级推广", "date": 2007, "value": 989.8 },
    { "country": "四级推广", "date": 2008, "value": 998.1 },
    { "country": "四级推广", "date": 2009, "value": 926.8 },
    { "country": "四级推广", "date": 2010, "value": 967.8 },
    { "country": "四级推广", "date": 2011, "value": 1006 },
    { "country": "四级推广", "date": 2012, "value": 1014.1 },
    { "country": "四级推广", "date": 2013, "value": 989.2 },
    { "country": "四级推广", "date": 2014, "value": 987 },
    { "country": "四级推广", "date": 2015, "value": 960.7 },
    { "country": "四级推广", "date": 2016, "value": 972 },
    { "country": "四级推广", "date": 2017, "value": 978 },
    { "country": "三级推广", "date": 1965, "value": 48.3 },
    { "country": "三级推广", "date": 1966, "value": 50.4 },
    { "country": "三级推广", "date": 1967, "value": 52.7 },
    { "country": "三级推广", "date": 1968, "value": 55.6 },
    { "country": "三级推广", "date": 1969, "value": 58.5 },
    { "country": "三级推广", "date": 1970, "value": 61.5 },
    { "country": "三级推广", "date": 1971, "value": 64.9 },
    { "country": "三级推广", "date": 1972, "value": 70.6 },
    { "country": "三级推广", "date": 1973, "value": 77.4 },
    { "country": "三级推广", "date": 1974, "value": 82.3 },
    { "country": "三级推广", "date": 1975, "value": 82.1 },
    { "country": "三级推广", "date": 1976, "value": 93 },
    { "country": "三级推广", "date": 1977, "value": 105.7 },
    { "country": "三级推广", "date": 1978, "value": 111 },
    { "country": "三级推广", "date": 1979, "value": 130.5 },
    { "country": "三级推广", "date": 1980, "value": 126.5 },
    { "country": "三级推广", "date": 1981, "value": 137.9 },
    { "country": "三级推广", "date": 1982, "value": 152.8 },
    { "country": "三级推广", "date": 1983, "value": 167.1 },
    { "country": "三级推广", "date": 1984, "value": 188.9 },
    { "country": "三级推广", "date": 1985, "value": 200.8 },
    { "country": "三级推广", "date": 1986, "value": 209.8 },
    { "country": "三级推广", "date": 1987, "value": 224.5 },
    { "country": "三级推广", "date": 1988, "value": 238.5 },
    { "country": "三级推广", "date": 1989, "value": 251.5 },
    { "country": "三级推广", "date": 1990, "value": 260 },
    { "country": "三级推广", "date": 1991, "value": 271.7 },
    { "country": "三级推广", "date": 1992, "value": 296.4 },
    { "country": "三级推广", "date": 1993, "value": 304.7 },
    { "country": "三级推广", "date": 1994, "value": 340.3 },
    { "country": "三级推广", "date": 1995, "value": 352.4 },
    { "country": "三级推广", "date": 1996, "value": 363.9 },
    { "country": "三级推广", "date": 1997, "value": 381.3 },
    { "country": "三级推广", "date": 1998, "value": 387.7 },
    { "country": "三级推广", "date": 1999, "value": 395 },
    { "country": "三级推广", "date": 2000, "value": 414.9 },
    { "country": "三级推广", "date": 2001, "value": 435.6 },
    { "country": "三级推广", "date": 2002, "value": 459.4 },
    { "country": "三级推广", "date": 2003, "value": 479.3 },
    { "country": "三级推广", "date": 2004, "value": 517.1 },
    { "country": "三级推广", "date": 2005, "value": 553.7 },
    { "country": "三级推广", "date": 2006, "value": 582.6 },
    { "country": "三级推广", "date": 2007, "value": 618.2 },
    { "country": "三级推广", "date": 2008, "value": 657.1 },
    { "country": "三级推广", "date": 2009, "value": 677.2 },
    { "country": "三级推广", "date": 2010, "value": 714.3 },
    { "country": "三级推广", "date": 2011, "value": 740.9 },
    { "country": "三级推广", "date": 2012, "value": 771.1 },
    { "country": "三级推广", "date": 2013, "value": 795.3 },
    { "country": "三级推广", "date": 2014, "value": 823.1 },
    { "country": "三级推广", "date": 2015, "value": 848.3 },
    { "country": "三级推广", "date": 2016, "value": 869.7 },
    { "country": "三级推广", "date": 2017, "value": 897.2 },
    { "country": "二级推广", "date": 1965, "value": 60.6 },
    { "country": "二级推广", "date": 1966, "value": 63.3 },
    { "country": "二级推广", "date": 1967, "value": 64 },
    { "country": "二级推广", "date": 1968, "value": 67.4 },
    { "country": "二级推广", "date": 1969, "value": 68.9 },
    { "country": "二级推广", "date": 1970, "value": 74.7 },
    { "country": "二级推广", "date": 1971, "value": 81.2 },
    { "country": "二级推广", "date": 1972, "value": 86.3 },
    { "country": "二级推广", "date": 1973, "value": 92.9 },
    { "country": "二级推广", "date": 1974, "value": 97.6 },
    { "country": "二级推广", "date": 1975, "value": 103.3 },
    { "country": "二级推广", "date": 1976, "value": 112.4 },
    { "country": "二级推广", "date": 1977, "value": 118.4 },
    { "country": "二级推广", "date": 1978, "value": 123.1 },
    { "country": "二级推广", "date": 1979, "value": 134.4 },
    { "country": "二级推广", "date": 1980, "value": 144.8 },
    { "country": "二级推广", "date": 1981, "value": 161.5 },
    { "country": "二级推广", "date": 1982, "value": 172.7 },
    { "country": "二级推广", "date": 1983, "value": 177.5 },
    { "country": "二级推广", "date": 1984, "value": 183.7 },
    { "country": "二级推广", "date": 1985, "value": 190.7 },
    { "country": "二级推广", "date": 1986, "value": 195.1 },
    { "country": "二级推广", "date": 1987, "value": 201.2 },
    { "country": "二级推广", "date": 1988, "value": 215.7 },
    { "country": "二级推广", "date": 1989, "value": 216.3 },
    { "country": "二级推广", "date": 1990, "value": 223.3 },
    { "country": "二级推广", "date": 1991, "value": 223 },
    { "country": "二级推广", "date": 1992, "value": 226.3 },
    { "country": "二级推广", "date": 1993, "value": 227.2 },
    { "country": "二级推广", "date": 1994, "value": 233.9 },
    { "country": "二级推广", "date": 1995, "value": 243.4 },
    { "country": "二级推广", "date": 1996, "value": 250.1 },
    { "country": "二级推广", "date": 1997, "value": 255.1 },
    { "country": "二级推广", "date": 1998, "value": 259.1 },
    { "country": "二级推广", "date": 1999, "value": 267.2 },
    { "country": "二级推广", "date": 2000, "value": 273.4 },
    { "country": "二级推广", "date": 2001, "value": 283.8 },
    { "country": "二级推广", "date": 2002, "value": 287.1 },
    { "country": "二级推广", "date": 2003, "value": 300.6 },
    { "country": "二级推广", "date": 2004, "value": 323.2 },
    { "country": "二级推广", "date": 2005, "value": 326.5 },
    { "country": "二级推广", "date": 2006, "value": 332.8 },
    { "country": "二级推广", "date": 2007, "value": 346.9 },
    { "country": "二级推广", "date": 2008, "value": 368.7 },
    { "country": "二级推广", "date": 2009, "value": 373.4 },
    { "country": "二级推广", "date": 2010, "value": 386.9 },
    { "country": "二级推广", "date": 2011, "value": 385.6 },
    { "country": "二级推广", "date": 2012, "value": 399.8 },
    { "country": "二级推广", "date": 2013, "value": 410.6 },
    { "country": "二级推广", "date": 2014, "value": 425.1 },
    { "country": "二级推广", "date": 2015, "value": 429.4 },
    { "country": "二级推广", "date": 2016, "value": 438 },
    { "country": "二级推广", "date": 2017, "value": 449.5 },
    { "country": "一级推广", "date": 1965, "value": 441.6 },
    { "country": "一级推广", "date": 1966, "value": 482.9 },
    { "country": "一级推广", "date": 1967, "value": 506.1 },
    { "country": "一级推广", "date": 1968, "value": 544.1 },
    { "country": "一级推广", "date": 1969, "value": 619.8 },
    { "country": "一级推广", "date": 1970, "value": 704.9 },
    { "country": "一级推广", "date": 1971, "value": 771.4 },
    { "country": "一级推广", "date": 1972, "value": 817.9 },
    { "country": "一级推广", "date": 1973, "value": 885.1 },
    { "country": "一级推广", "date": 1974, "value": 902.2 },
    { "country": "一级推广", "date": 1975, "value": 936.1 },
    { "country": "一级推广", "date": 1976, "value": 983.2 },
    { "country": "一级推广", "date": 1977, "value": 1037.3 },
    { "country": "一级推广", "date": 1978, "value": 1106.2 },
    { "country": "一级推广", "date": 1979, "value": 1157.6 },
    { "country": "一级推广", "date": 1980, "value": 1168 },
    { "country": "一级推广", "date": 1981, "value": 1175 },
    { "country": "一级推广", "date": 1982, "value": 1186.8 },
    { "country": "一级推广", "date": 1983, "value": 1240.7 },
    { "country": "一级推广", "date": 1984, "value": 1326.7 },
    { "country": "一级推广", "date": 1985, "value": 1395.9 },
    { "country": "一级推广", "date": 1986, "value": 1456.5 },
    { "country": "一级推广", "date": 1987, "value": 1538 },
    { "country": "一级推广", "date": 1988, "value": 1650.5 },
    { "country": "一级推广", "date": 1989, "value": 1740.4 },
    { "country": "一级推广", "date": 1990, "value": 1812.8 },
    { "country": "一级推广", "date": 1991, "value": 1896.9 },
    { "country": "一级推广", "date": 1992, "value": 1984.5 },
    { "country": "一级推广", "date": 1993, "value": 2088.9 },
    { "country": "一级推广", "date": 1994, "value": 2204.3 },
    { "country": "一级推广", "date": 1995, "value": 2306.8 },
    { "country": "一级推广", "date": 1996, "value": 2413.2 },
    { "country": "一级推广", "date": 1997, "value": 2487 },
    { "country": "一级推广", "date": 1998, "value": 2481 },
    { "country": "一级推广", "date": 1999, "value": 2577.9 },
    { "country": "一级推广", "date": 2000, "value": 2671.9 },
    { "country": "一级推广", "date": 2001, "value": 2759.7 },
    { "country": "一级推广", "date": 2002, "value": 2901.2 },
    { "country": "一级推广", "date": 2003, "value": 3145.5 },
    { "country": "一级推广", "date": 2004, "value": 3445.8 },
    { "country": "一级推广", "date": 2005, "value": 3724.3 },
    { "country": "一级推广", "date": 2006, "value": 3944 },
    { "country": "一级推广", "date": 2007, "value": 4195.2 },
    { "country": "一级推广", "date": 2008, "value": 4310.8 },
    { "country": "一级推广", "date": 2009, "value": 4411.1 },
    { "country": "一级推广", "date": 2010, "value": 4696.1 },
    { "country": "一级推广", "date": 2011, "value": 4951.1 },
    { "country": "一级推广", "date": 2012, "value": 5118.2 },
    { "country": "一级推广", "date": 2013, "value": 5269.9 },
    { "country": "一级推广", "date": 2014, "value": 5382.9 },
    { "country": "一级推广", "date": 2015, "value": 5472.4 },
    { "country": "一级推广", "date": 2016, "value": 5585.5 },
    { "country": "一级推广", "date": 2017, "value": 5743.6 }
  ]
  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'country',
    slider: {
      start: 0.1,
      end: 0.9,
    },
  };

  return <Area {...config} />;
};
const DemoFunnel1 = () => {
  const data = [
    {
      stage: '接触广告',
      number: 253256,
    },
    {
      stage: '点击广告',
      number: 151125,
    },
    {
      stage: '停留目标页面',
      number: 144513,
    },
    {
      stage: '加入购物车',
      number: 82517,
    },
    {
      stage: '完成购买',
      number: 52619,
    },
  ];
  const config = {
    //width:600,
    data: data,
    xField: 'stage',
    yField: 'number',
    legend: true,
    
  };
  return <Funnel {...config} />;
};
const DemoFunnel2 = () => {
  const data = [
    {
      stage: '接触广告',
      number: 575769,
    },
    {
      stage: '点击广告',
      number: 351125,
    },
    {
      stage: '停留目标页面',
      number: 244513,
    },
    {
      stage: '加入购物车',
      number: 182517,
    },
    {
      stage: '完成购买',
      number: 152619,
    },
  ];
  const config = {
    data: data,
    xField: 'stage',
    yField: 'number',
    legend: true,
  };
  return <Funnel {...config} />;
};
const DemoFunnel3 = () => {
  const data = [
    {
      stage: '接触广告',
      number: 389517,
    },
    {
      stage: '点击广告',
      number: 228448,
    },
    {
      stage: '停留目标页面',
      number: 118122,
    },
    {
      stage: '加入购物车',
      number: 82517,
    },
    {
      stage: '完成购买',
      number: 52619,
    },
  ];
  const config = {
    data: data,
    xField: 'stage',
    yField: 'number',
    legend: true,
  };
  return <Funnel {...config} />;
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
                salesType={adsway}
                loading={loading}
                salesPieData={ads || []}
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
                offlineChartData={data?.adstrend || []}
                handleTabChange={handleTabChange}
              />
            </Suspense>
          </Col>
        </Row>
        
        <h1 style={{
            marginTop: 24,
          }}>
          广告
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
                  <AdsCard
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
              <DemoArea/>
            </Card>
          </Col>
        </Row>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card title="百度">
              <DemoFunnel1/>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card title="腾讯">
              <DemoFunnel2/>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card title="今日头条">
              <DemoFunnel3/>
            </Card>
          </Col>
        </Row>
        
        
      </>
    </GridContent>
  );
};

export default Analysis;
/*
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