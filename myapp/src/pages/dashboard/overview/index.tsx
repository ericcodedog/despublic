import type { FC } from 'react';
import { Suspense, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Col, Dropdown, Menu, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';
import IntroduceRow from './components/IntroduceRow';
import SalesCard from './components/SalesCard';
import TopSearch from './components/TopSearch';
import ProportionSales from './components/ProportionSales';
import OfflineData from './components/OfflineData';
import { useRequest } from 'umi';

import { fakeChartData } from './service';
import PageLoading from './components/PageLoading';
import type { TimeType } from './components/SalesCard';
import { getTimeDistance } from './utils/utils';
import type { AnalysisData } from './data.d';
import styles from './style.less';
import React, { useEffect } from 'react';
import { Scatter , Bar ,Area } from '@ant-design/charts';//
import {BidirectionalBar ,Rose ,Sankey } from '@ant-design/plots'
import { Column } from '@ant-design/plots';
import { Mix } from '@ant-design/plots';

import { DataView } from '@antv/data-set';



type RangePickerValue = RangePickerProps<moment.Moment>['value'];  

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};

type SalesType = 'all' | 'online' | 'stores';

const DemoMix = () => {
  const data = [
    ['Cosmopolitan', 51, 45, 6],
    ['Martini', 67, 39, 28],
    ['Mojito', 19, 11, 8],
    ['Margarita', 47, 33, 14],
    ['Mai Tai', 32, 20, 12],
    ['Beer', 70, 20, 50],
  ];
  const yearData = [
    ['2010', 60, 176, 35, 25],
    ['2011', 51, 136, 25, 26],
    ['2012', 73, 196, 35, 38],
    ['2013', 84, 315, 43, 41],
    ['2014', 79, 203, 36, 33],
    ['2015', 89, 286, 41, 48],
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
        inter????????????s: [
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
              male: d[2],
              female: d[3],
            })),
          )
          .transform({
            type: 'fold',
            fields: ['male', 'female'],
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
          value: false,
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
          year: d[0],
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
        inter????????????s: [
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






const Analysis: FC<AnalysisProps> = () => {
  const [salesType, setSalesType] = useState<SalesType>('all');
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

  const menu = (
    <Menu>
      <Menu.Item>?????????</Menu.Item>
      <Menu.Item>?????????</Menu.Item>
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

  const DemoSankey = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      asyncFetch();
    }, []);
  
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/antfincdn/nokcOpy6fF/draggable-sankey.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    /**
     * @file Parallel sets are like parallel coordinates, but for categorical dimensions.
     *
     * Parallel Sets: Visual Analysis of Categorical Data. See more in https://kosara.net/publications/Bendix-InfoVis-2005.html
     */
    const sankeyData: { source: never; target: never; value: any; path: string; }[] = [];
    const keys = ['Survived', 'Sex', 'Age', 'Class'];
    data.forEach((d) => {
      keys.reduce((a, b) => {
        if (a && b) {
          sankeyData.push({
            source: d[a],
            target: d[b],
            value: d.value,
            path: `${d[keys[0]]} -> ${d[keys[1]]} -> ${d[keys[2]]} -> ${d[keys[3]]}`,
          });
        }
  
        return b;
      });
    });
    const config = {
      data: sankeyData,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      nodeWidthRatio: 0.01,
      nodePaddingRatio: 0.03,
      nodeDraggable: true,
      rawFields: ['path'],
      tooltip: {
        fields: ['path', 'value'],
        formatter: ({ path, value }) => {
          return {
            name: path,
            value: value,
          };
        },
      },
    };
  
    return <Sankey {...config} />;
  };
  


  const DemoRose = () => {
    const data = [
      {
        type: '?????????',
        value: 27,
      },
      {
        type: '?????????',
        value: 25,
      },
      {
        type: '?????????',
        value: 18,
      },
      {
        type: '?????????',
        value: 15,
      },
      {
        type: '?????????',
        value: 10,
      },
      {
        type: '??????',
        value: 5,
      },
    ];
    const config = {
      data,
      xField: 'type',
      yField: 'value',
      seriesField: 'type',
      radius: 0.9,
      legend: {
        position: 'bottom',
      },
    };
    return <Rose {...config} />;
  };
  

  const DemoBidirectionalBar = () => {
    const data = [
      {
        country: '??????',
        '????????????': 13.4,
        '??????': 12.3,
      },
      {
        country: '??????',
        '????????????': 14.4,
        '??????': 6.3,
      },
      {
        country: '??????',
        '????????????': 18.4,
        '??????': 8.3,
      },
      {
        country: '??????',
        '????????????': 34.4,
        '??????': 13.8,
      },
      {
        country: '??????',
        '????????????': 44.4,
        '??????': 19.5,
      },
      {
        country: '??????',
        '????????????': 24.4,
        '??????': 18.8,
      },
      {
        country: '??????',
        '????????????': 54.4,
        '??????': 24.7,
      },
      {
        country: '??????',
        '????????????': 104.4,
        '??????': 5.3,
      },
      {
        country: '??????',
        '????????????': 165.2,
        '??????': 72.9,
      },
    ];
    const config = {
      data,
      layout: 'vertical',
      xField: 'country',
      yField: ['????????????', '??????'],
      yAxis: {
        '????????????': {
          nice: true,
        },
        '??????': {
          min: 0,
          max: 100,
        },
      },
      tooltip: {
        shared: true,
        //showCrosshairs:true,
        showMarkers: false,
        //crosshairs:true,
        //marker:true,
        /*customContent: (title: any, data: any) => {
          return `<div>${title}
          ${data.x}
          </div>`;
        },*/
      },
    };
    return <BidirectionalBar {...config} />;
  };
    
  

const DemoColumn = () => {
  const data = [
    {
      'name': 'London',
      '??????': 'Jan.',
      '???????????????': 18.9,
    },
    {
      'name': 'London',
      '??????': 'Feb.',
      '???????????????': 28.8,
    },
    {
      'name': 'London',
      '??????': 'Mar.',
      '???????????????': 39.3,
    },
    {
      'name': 'London',
      '??????': 'Apr.',
      '???????????????': 81.4,
    },
    {
      'name': 'London',
      '??????': 'May',
      '???????????????': 47,
    },
    {
      'name': 'London',
      '??????': 'Jun.',
      '???????????????': 20.3,
    },
    {
      'name': 'London',
      '??????': 'Jul.',
      '???????????????': 24,
    },
    {
      'name': 'London',
      '??????': 'Aug.',
      '???????????????': 35.6,
    },
    {
      'name': 'Berlin',
      '??????': 'Jan.',
      '???????????????': 12.4,
    },
    {
      'name': 'Berlin',
      '??????': 'Feb.',
      '???????????????': 23.2,
    },
    {
      'name': 'Berlin',
      '??????': 'Mar.',
      '???????????????': 34.5,
    },
    {
      'name': 'Berlin',
      '??????': 'Apr.',
      '???????????????': 99.7,
    },
    {
      'name': 'Berlin',
      '??????': 'May',
      '???????????????': 52.6,
    },
    {
      'name': 'Berlin',
      '??????': 'Jun.',
      '???????????????': 35.5,
    },
    {
      'name': 'Berlin',
      '??????': 'Jul.',
      '???????????????': 37.4,
    },
    {
      'name': 'Berlin',
      '??????': 'Aug.',
      '???????????????': 42.4,
    },
  ];
  const config = {
    data,
    isStack: true,
    xField: '??????',
    yField: '???????????????',
    seriesField: 'name',

    /** ???????????? */
    color: ['#f88c24', '#111111'],//f88c24

    /** ???????????? */
     marginRatio: 0.1,
    label: {
      // ??????????????? label ??????????????????
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // ??????????????????????????????
      layout: [
        // ???????????????????????????????????????
        {
          type: 'interval-adjust-position',
        }, // ?????????????????????
        {
          type: 'interval-hide-overlap',
        }, // ?????????????????????????????????
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  return <Column {...config} />;
};

const DemoBar = () => {
  const data = [
    {
      'label': 'Mon.',
      'type': 'series1',
      'value': 2800,
    },
    {
      'label': 'Mon.',
      'type': 'series2',
      'value': 2260,
    },
    {
      'label': 'Tues.',
      'type': 'series1',
      'value': 1800,
    },
    {
      'label': 'Tues.',
      'type': 'series2',
      'value': 1300,
    },
    {
      'label': 'Wed.',
      'type': 'series1',
      'value': 950,
    },
    {
      'label': 'Wed.',
      'type': 'series2',
      'value': 900,
    },
    {
      'label': 'Thur.',
      'type': 'series1',
      'value': 500,
    },
    {
      'label': 'Thur.',
      'type': 'series2',
      'value': 390,
    },
    {
      'label': 'Fri.',
      'type': 'series1',
      'value': 170,
    },
    {
      'label': 'Fri.',
      'type': 'series2',
      'value': 100,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'value',
    yField: 'label',

    /** ??????????????? */
    color: ['#1383ab', '#002125'],
    seriesField: 'type',
    marginRatio: 20,
    label: {
      // ??????????????? label ??????????????????
      position: 'middle',
      // 'left', 'middle', 'right'
      // ??????????????????????????????
      layout: [
        // ???????????????????????????????????????
        {
          type: 'interval-adjust-position',
        }, // ?????????????????????
        {
          type: 'interval-hide-overlap',
        }, // ?????????????????????????????????
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  return <Bar {...config} />;
};
 
  const scatdata=data?.scatterData;
  const DemoScatter = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      asyncFetch();
    }, []);
  
    const asyncFetch = () => {//https://gw.alipayobjects.com/os/bmw-prod/3e4db10a-9da1-4b44-80d8-c128f42764a8.json
      fetch('https://gw.alipayobjects.com/os/bmw-prod/3e4db10a-9da1-4b44-80d8-c128f42764a8.json')//https://gw.alipayobjects.com/os/antfincdn/aao6XnO5pW/IMDB.json
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    //const data=scatdata;
    /*const data=[
      {
        Title: "Guardians of the Galaxy",
        Genre: "????????????",
        Revenue: 333.13,
        Rating: 8.1
      },
      {
        Title: "Prometheus",
        Genre: "?????????",
        Revenue: 126.46,
        Rating: 7
      },
      {
        Title: "Split",
        Genre: "?????????",
        Revenue: 138.12,
        Rating: 7.3
      },
      {
        Title: "Sing",
        Genre: "??????",
        Revenue: 270.32,
        Rating: 7.2
      },
      {
        Title: "Suicide Squad",
        Genre: "????????????",
        Revenue: 325.02,
        Rating: 6.2
      },
      {
        Title: "The Great Wall",
        Genre: "????????????",
        Revenue: 45.13,
        Rating: 6.1
      },
      {
        Title: "La La Land",
        Genre: "?????????",
        Revenue: 151.06,
        Rating: 8.3
      },
      {
        Title: "Mindhorn",
        Genre: "?????????",
        Revenue: null,
        Rating: 6.4
      },
      {
        Title: "The Lost City of Z",
        Genre: "????????????",
        Revenue: 8.01,
        Rating: 7.1
      },
      {
        Title: "Passengers",
        Genre: "?????????",
        Revenue: 100.01,
        Rating: 7
      },
      {
        Title: "Fantastic Beasts and Where to Find Them",
        Genre: "?????????",
        Revenue: 234.02,
        Rating: 7.5
      },
      {
        Title: "Hidden Figures",
        Genre: "??????",
        Revenue: 169.27,
        Rating: 7.8
      },
      {
        Title: "Rogue One",
        Genre: "????????????",
        Revenue: 532.17,
        Rating: 7.9
      },
      {
        Title: "Moana",
        Genre: "??????",
        Revenue: 248.75,
        Rating: 7.7
      },
      {
        Title: "Colossal",
        Genre: "????????????",
        Revenue: 2.87,
        Rating: 6.4
      },
      {
        Title: "The Secret Life of Pets",
        Genre: "??????",
        Revenue: 368.31,
        Rating: 6.6
      },
      {
        Title: "Hacksaw Ridge",
        Genre: "??????",
        Revenue: 67.12,
        Rating: 8.2
      },
      {
        Title: "Jason Bourne",
        Genre: "????????????",
        Revenue: 162.16,
        Rating: 6.7
      },
      {
        Title: "Lion",
        Genre: "??????",
        Revenue: 51.69,
        Rating: 8.1
      },
      {
        Title: "Gold",
        Genre: "?????????",
        Revenue: 7.22,
        Rating: 6.7
      },
      {
        Title: "Hounds of Love",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.7
      },
      {
        Title: "Trolls",
        Genre: "??????",
        Revenue: 153.69,
        Rating: 6.5
      },
      {
        Title: "Independence Day: Resurgence",
        Genre: "????????????",
        Revenue: 103.14,
        Rating: 5.3
      },
      {
        Title: "Paris pieds nus",
        Genre: "?????????",
        Revenue: null,
        Rating: 6.8
      },
      {
        Title: "Bahubali: The Beginning",
        Genre: "????????????",
        Revenue: 6.5,
        Rating: 8.3
      },
      {
        Title: "Dead Awake",
        Genre: "?????????",
        Revenue: 0.01,
        Rating: 4.7
      },
      {
        Title: "Bad Moms",
        Genre: "?????????",
        Revenue: 113.08,
        Rating: 6.2
      },
      {
        Title: "Assassin's Creed",
        Genre: "????????????",
        Revenue: 54.65,
        Rating: 5.9
      },
      {
        Title: "Why Him?",
        Genre: "?????????",
        Revenue: 60.31,
        Rating: 6.3
      },
      {
        Title: "X-Men: Apocalypse",
        Genre: "????????????",
        Revenue: 155.33,
        Rating: 7.1
      },
      {
        Title: "Deadpool",
        Genre: "????????????",
        Revenue: 363.02,
        Rating: 8
      },
      {
        Title: "Resident Evil: The Final Chapter",
        Genre: "????????????",
        Revenue: 26.84,
        Rating: 5.6
      },
      {
        Title: "Captain America: Civil War",
        Genre: "????????????",
        Revenue: 408.08,
        Rating: 7.9
      },
      {
        Title: "Interstellar",
        Genre: "?????????",
        Revenue: 187.99,
        Rating: 8.6
      },
      {
        Title: "Doctor Strange",
        Genre: "????????????",
        Revenue: 232.6,
        Rating: 7.6
      },
      {
        Title: "The Magnificent Seven",
        Genre: "????????????",
        Revenue: 93.38,
        Rating: 6.9
      },
      {
        Title: "5- 25- 77",
        Genre: "?????????",
        Revenue: null,
        Rating: 7.1
      },
      {
        Title: "Sausage Party",
        Genre: "??????",
        Revenue: 97.66,
        Rating: 6.3
      },
      {
        Title: "Moonlight",
        Genre: "??????",
        Revenue: 27.85,
        Rating: 7.5
      },
      {
        Title: "Don't Fuck in the Woods",
        Genre: "?????????",
        Revenue: null,
        Rating: 2.7
      },
      {
        Title: "The Founder",
        Genre: "??????",
        Revenue: 12.79,
        Rating: 7.2
      },
      {
        Title: "Lowriders",
        Genre: "??????",
        Revenue: 4.21,
        Rating: 6.3
      },
      {
        Title: "Pirates of the Caribbean: On Stranger Tides",
        Genre: "????????????",
        Revenue: 241.06,
        Rating: 6.7
      },
      {
        Title: "Miss Sloane",
        Genre: "??????",
        Revenue: 3.44,
        Rating: 7.3
      },
      {
        Title: "Fallen",
        Genre: "?????????",
        Revenue: null,
        Rating: 5.6
      },
      {
        Title: "Star Trek Beyond",
        Genre: "????????????",
        Revenue: 158.8,
        Rating: 7.1
      },
      {
        Title: "The Last Face",
        Genre: "??????",
        Revenue: null,
        Rating: 3.7
      },
      {
        Title: "Star Wars: Episode VII - The Force Awakens",
        Genre: "????????????",
        Revenue: 936.63,
        Rating: 8.1
      },
      {
        Title: "Underworld: Blood Wars",
        Genre: "????????????",
        Revenue: 30.35,
        Rating: 5.8
      },
      {
        Title: "M??????'s Day",
        Genre: "?????????",
        Revenue: 32.46,
        Rating: 5.6
      },
      {
        Title: "John Wick",
        Genre: "????????????",
        Revenue: 43,
        Rating: 7.2
      },
      {
        Title: "The Dark Knight",
        Genre: "????????????",
        Revenue: 533.32,
        Rating: 9
      },
      {
        Title: "Silence",
        Genre: "?????????",
        Revenue: 7.08,
        Rating: 7.3
      },
      {
        Title: "Don't Breathe",
        Genre: "????????????",
        Revenue: 89.21,
        Rating: 7.2
      },
      {
        Title: "Me Before You",
        Genre: "??????",
        Revenue: 56.23,
        Rating: 7.4
      },
      {
        Title: "Their Finest",
        Genre: "?????????",
        Revenue: 3.18,
        Rating: 7
      },
      {
        Title: "Sully",
        Genre: "??????",
        Revenue: 125.07,
        Rating: 7.5
      },
      {
        Title: "Batman v Superman: Dawn of Justice",
        Genre: "????????????",
        Revenue: 330.25,
        Rating: 6.7
      },
      {
        Title: "The Autopsy of Jane Doe",
        Genre: "?????????",
        Revenue: null,
        Rating: 6.8
      },
      {
        Title: "The Girl on the Train",
        Genre: "????????????",
        Revenue: 75.31,
        Rating: 6.5
      },
      {
        Title: "Fifty Shades of Grey",
        Genre: "??????",
        Revenue: 166.15,
        Rating: 4.1
      },
      {
        Title: "The Prestige",
        Genre: "??????",
        Revenue: 53.08,
        Rating: 8.5
      },
      {
        Title: "Kingsman: The Secret Service",
        Genre: "????????????",
        Revenue: 128.25,
        Rating: 7.7
      },
      {
        Title: "Patriots Day",
        Genre: "??????",
        Revenue: 31.86,
        Rating: 7.4
      },
      {
        Title: "Mad Max: Fury Road",
        Genre: "????????????",
        Revenue: 153.63,
        Rating: 8.1
      },
      {
        Title: "Wakefield",
        Genre: "??????",
        Revenue: 0.01,
        Rating: 7.5
      },
      {
        Title: "Deepwater Horizon",
        Genre: "????????????",
        Revenue: 61.28,
        Rating: 7.2
      },
      {
        Title: "The Promise",
        Genre: "??????",
        Revenue: null,
        Rating: 5.9
      },
      {
        Title: "Allied",
        Genre: "????????????",
        Revenue: 40.07,
        Rating: 7.1
      },
      {
        Title: "A Monster Calls",
        Genre: "??????",
        Revenue: 3.73,
        Rating: 7.5
      },
      {
        Title: "Collateral Beauty",
        Genre: "??????",
        Revenue: 30.98,
        Rating: 6.8
      },
      {
        Title: "Zootopia",
        Genre: "??????",
        Revenue: 341.26,
        Rating: 8.1
      },
      {
        Title: "Pirates of the Caribbean: At World's End",
        Genre: "????????????",
        Revenue: 309.4,
        Rating: 7.1
      },
      {
        Title: "The Avengers",
        Genre: "????????????",
        Revenue: 623.28,
        Rating: 8.1
      },
      {
        Title: "Inglourious Basterds",
        Genre: "?????????",
        Revenue: 120.52,
        Rating: 8.3
      },
      {
        Title: "Pirates of the Caribbean: Dead Man's Chest",
        Genre: "????????????",
        Revenue: 423.03,
        Rating: 7.3
      },
      {
        Title: "Ghostbusters",
        Genre: "????????????",
        Revenue: 128.34,
        Rating: 5.3
      },
      {
        Title: "Inception",
        Genre: "????????????",
        Revenue: 292.57,
        Rating: 8.8
      },
      {
        Title: "Captain Fantastic",
        Genre: "?????????",
        Revenue: 5.88,
        Rating: 7.9
      },
      {
        Title: "The Wolf of Wall Street",
        Genre: "??????",
        Revenue: 116.87,
        Rating: 8.2
      },
      {
        Title: "Gone Girl",
        Genre: "????????????",
        Revenue: 167.74,
        Rating: 8.1
      },
      {
        Title: "Furious Seven",
        Genre: "????????????",
        Revenue: 350.03,
        Rating: 7.2
      },
      {
        Title: "Jurassic World",
        Genre: "????????????",
        Revenue: 652.18,
        Rating: 7
      },
      {
        Title: "Live by Night",
        Genre: "????????????",
        Revenue: 10.38,
        Rating: 6.4
      },
      {
        Title: "Avatar",
        Genre: "????????????",
        Revenue: 760.51,
        Rating: 7.8
      },
      {
        Title: "The Hateful Eight",
        Genre: "????????????",
        Revenue: 54.12,
        Rating: 7.8
      },
      {
        Title: "The Accountant",
        Genre: "????????????",
        Revenue: 86.2,
        Rating: 7.4
      },
      {
        Title: "Prisoners",
        Genre: "????????????",
        Revenue: 60.96,
        Rating: 8.1
      },
      {
        Title: "Warcraft",
        Genre: "????????????",
        Revenue: 47.17,
        Rating: 7
      },
      {
        Title: "The Help",
        Genre: "??????",
        Revenue: 169.71,
        Rating: 8.1
      },
      {
        Title: "War Dogs",
        Genre: "?????????",
        Revenue: 43.02,
        Rating: 7.1
      },
      {
        Title: "Avengers: Age of Ultron",
        Genre: "????????????",
        Revenue: 458.99,
        Rating: 7.4
      },
      {
        Title: "The Nice Guys",
        Genre: "????????????",
        Revenue: 36.25,
        Rating: 7.4
      },
      {
        Title: "Kimi no na wa",
        Genre: "??????",
        Revenue: 4.68,
        Rating: 8.6
      },
      {
        Title: "The Void",
        Genre: "?????????",
        Revenue: 0.15,
        Rating: 5.8
      },
      {
        Title: "Personal Shopper",
        Genre: "??????",
        Revenue: 1.29,
        Rating: 6.3
      },
      {
        Title: "The Departed",
        Genre: "????????????",
        Revenue: 132.37,
        Rating: 8.5
      },
      {
        Title: "Legend",
        Genre: "??????",
        Revenue: 1.87,
        Rating: 7
      },
      {
        Title: "Thor",
        Genre: "????????????",
        Revenue: 181.02,
        Rating: 7
      },
      {
        Title: "The Martian",
        Genre: "?????????",
        Revenue: 228.43,
        Rating: 8
      },
      {
        Title: "Contratiempo",
        Genre: "????????????",
        Revenue: null,
        Rating: 7.9
      },
      {
        Title: "The Man from U.N.C.L.E.",
        Genre: "????????????",
        Revenue: 45.43,
        Rating: 7.3
      },
      {
        Title: "Hell or High Water",
        Genre: "????????????",
        Revenue: 26.86,
        Rating: 7.7
      },
      {
        Title: "The Comedian",
        Genre: "?????????",
        Revenue: 1.66,
        Rating: 5.4
      },
      {
        Title: "The Legend of Tarzan",
        Genre: "????????????",
        Revenue: 126.59,
        Rating: 6.3
      },
      {
        Title: "All We Had",
        Genre: "??????",
        Revenue: null,
        Rating: 5.8
      },
      {
        Title: "Ex Machina",
        Genre: "??????",
        Revenue: 25.44,
        Rating: 7.7
      },
      {
        Title: "The Belko Experiment",
        Genre: "????????????",
        Revenue: 10.16,
        Rating: 6.3
      },
      {
        Title: "12 Years a Slave",
        Genre: "??????",
        Revenue: 56.67,
        Rating: 8.1
      },
      {
        Title: "The Bad Batch",
        Genre: "??????",
        Revenue: null,
        Rating: 6.1
      },
      {
        Title: 300,
        Genre: "????????????",
        Revenue: 210.59,
        Rating: 7.7
      },
      {
        Title: "Harry Potter and the Deathly Hallows: Part 2",
        Genre: "?????????",
        Revenue: 380.96,
        Rating: 8.1
      },
      {
        Title: "Office Christmas Party",
        Genre: "?????????",
        Revenue: 54.73,
        Rating: 5.8
      },
      {
        Title: "The Neon Demon",
        Genre: "?????????",
        Revenue: 1.33,
        Rating: 6.2
      },
      {
        Title: "Dangal",
        Genre: "????????????",
        Revenue: 11.15,
        Rating: 8.8
      },
      {
        Title: "10 Cloverfield Lane",
        Genre: "??????",
        Revenue: 71.9,
        Rating: 7.2
      },
      {
        Title: "Finding Dory",
        Genre: "??????",
        Revenue: 486.29,
        Rating: 7.4
      },
      {
        Title: "Miss Peregrine's Home for Peculiar Children",
        Genre: "?????????",
        Revenue: 87.24,
        Rating: 6.7
      },
      {
        Title: "Divergent",
        Genre: "?????????",
        Revenue: 150.83,
        Rating: 6.7
      },
      {
        Title: "Mike and Dave Need Wedding Dates",
        Genre: "?????????",
        Revenue: 46.01,
        Rating: 6
      },
      {
        Title: "Boyka: Undisputed IV",
        Genre: "????????????",
        Revenue: null,
        Rating: 7.4
      },
      {
        Title: "The Dark Knight Rises",
        Genre: "????????????",
        Revenue: 448.13,
        Rating: 8.5
      },
      {
        Title: "The Jungle Book",
        Genre: "?????????",
        Revenue: 364,
        Rating: 7.5
      },
      {
        Title: "Transformers: Age of Extinction",
        Genre: "????????????",
        Revenue: 245.43,
        Rating: 5.7
      },
      {
        Title: "Nerve",
        Genre: "?????????",
        Revenue: 38.56,
        Rating: 6.6
      },
      {
        Title: "Mamma Mia!",
        Genre: "?????????",
        Revenue: 143.7,
        Rating: 6.4
      },
      {
        Title: "The Revenant",
        Genre: "?????????",
        Revenue: 183.64,
        Rating: 8
      },
      {
        Title: "Fences",
        Genre: "??????",
        Revenue: 57.64,
        Rating: 7.3
      },
      {
        Title: "Into the Woods",
        Genre: "?????????",
        Revenue: 128,
        Rating: 6
      },
      {
        Title: "The Shallows",
        Genre: "??????",
        Revenue: 55.12,
        Rating: 6.4
      },
      {
        Title: "Whiplash",
        Genre: "??????",
        Revenue: 13.09,
        Rating: 8.5
      },
      {
        Title: "Furious 6",
        Genre: "????????????",
        Revenue: 238.67,
        Rating: 7.1
      },
      {
        Title: "The Place Beyond the Pines",
        Genre: "????????????",
        Revenue: 21.38,
        Rating: 7.3
      },
      {
        Title: "No Country for Old Men",
        Genre: "????????????",
        Revenue: 74.27,
        Rating: 8.1
      },
      {
        Title: "The Great Gatsby",
        Genre: "??????",
        Revenue: 144.81,
        Rating: 7.3
      },
      {
        Title: "Shutter Island",
        Genre: "??????",
        Revenue: 127.97,
        Rating: 8.1
      },
      {
        Title: "Brimstone",
        Genre: "??????",
        Revenue: null,
        Rating: 7.1
      },
      {
        Title: "Star Trek",
        Genre: "????????????",
        Revenue: 257.7,
        Rating: 8
      },
      {
        Title: "Diary of a Wimpy Kid",
        Genre: "?????????",
        Revenue: 64,
        Rating: 6.2
      },
      {
        Title: "The Big Short",
        Genre: "??????",
        Revenue: 70.24,
        Rating: 7.8
      },
      {
        Title: "Room",
        Genre: "??????",
        Revenue: 14.68,
        Rating: 8.2
      },
      {
        Title: "Django Unchained",
        Genre: "??????",
        Revenue: 162.8,
        Rating: 8.4
      },
      {
        Title: "Ah-ga-ssi",
        Genre: "??????",
        Revenue: 2.01,
        Rating: 8.1
      },
      {
        Title: "The Edge of Seventeen",
        Genre: "?????????",
        Revenue: 14.26,
        Rating: 7.4
      },
      {
        Title: "Watchmen",
        Genre: "????????????",
        Revenue: 107.5,
        Rating: 7.6
      },
      {
        Title: "Superbad",
        Genre: "?????????",
        Revenue: 121.46,
        Rating: 7.6
      },
      {
        Title: "Inferno",
        Genre: "????????????",
        Revenue: 34.26,
        Rating: 6.2
      },
      {
        Title: "The BFG",
        Genre: "?????????",
        Revenue: 55.47,
        Rating: 6.4
      },
      {
        Title: "The Hunger Games",
        Genre: "?????????",
        Revenue: 408,
        Rating: 7.2
      },
      {
        Title: "White Girl",
        Genre: "??????",
        Revenue: 0.2,
        Rating: 5.8
      },
      {
        Title: "Sicario",
        Genre: "????????????",
        Revenue: 46.88,
        Rating: 7.6
      },
      {
        Title: "Twin Peaks: The Missing Pieces",
        Genre: "??????",
        Revenue: null,
        Rating: 8.1
      },
      {
        Title: "Aliens vs Predator - Requiem",
        Genre: "????????????",
        Revenue: 41.8,
        Rating: 4.7
      },
      {
        Title: "Pacific Rim",
        Genre: "????????????",
        Revenue: 101.79,
        Rating: 7
      },
      {
        Title: "Crazy, Stupid, Love.",
        Genre: "?????????",
        Revenue: 84.24,
        Rating: 7.4
      },
      {
        Title: "Scott Pilgrim vs. the World",
        Genre: "????????????",
        Revenue: 31.49,
        Rating: 7.5
      },
      {
        Title: "Hot Fuzz",
        Genre: "????????????",
        Revenue: 23.62,
        Rating: 7.9
      },
      {
        Title: "Mine",
        Genre: "??????",
        Revenue: null,
        Rating: 6
      },
      {
        Title: "Free Fire",
        Genre: "????????????",
        Revenue: 1.8,
        Rating: 7
      },
      {
        Title: "X-Men: Days of Future Past",
        Genre: "????????????",
        Revenue: 233.91,
        Rating: 8
      },
      {
        Title: "Jack Reacher: Never Go Back",
        Genre: "????????????",
        Revenue: 58.4,
        Rating: 6.1
      },
      {
        Title: "Casino Royale",
        Genre: "????????????",
        Revenue: 167.01,
        Rating: 8
      },
      {
        Title: "Twilight",
        Genre: "??????",
        Revenue: 191.45,
        Rating: 5.2
      },
      {
        Title: "Now You See Me 2",
        Genre: "????????????",
        Revenue: 65.03,
        Rating: 6.5
      },
      {
        Title: "Woman in Gold",
        Genre: "??????",
        Revenue: 33.31,
        Rating: 7.3
      },
      {
        Title: "13 Hours",
        Genre: "????????????",
        Revenue: 52.82,
        Rating: 7.3
      },
      {
        Title: "Spectre",
        Genre: "????????????",
        Revenue: 200.07,
        Rating: 6.8
      },
      {
        Title: "Nightcrawler",
        Genre: "????????????",
        Revenue: 32.28,
        Rating: 7.9
      },
      {
        Title: "Kubo and the Two Strings",
        Genre: "??????",
        Revenue: 48.02,
        Rating: 7.9
      },
      {
        Title: "Beyond the Gates",
        Genre: "?????????",
        Revenue: null,
        Rating: 5.2
      },
      {
        Title: "Her",
        Genre: "??????",
        Revenue: 25.56,
        Rating: 8
      },
      {
        Title: "Frozen",
        Genre: "??????",
        Revenue: 400.74,
        Rating: 7.5
      },
      {
        Title: "Tomorrowland",
        Genre: "????????????",
        Revenue: 93.42,
        Rating: 6.5
      },
      {
        Title: "Dawn of the Planet of the Apes",
        Genre: "????????????",
        Revenue: 208.54,
        Rating: 7.6
      },
      {
        Title: "Tropic Thunder",
        Genre: "????????????",
        Revenue: 110.42,
        Rating: 7
      },
      {
        Title: "The Conjuring 2",
        Genre: "?????????",
        Revenue: 102.46,
        Rating: 7.4
      },
      {
        Title: "Ant-Man",
        Genre: "????????????",
        Revenue: 180.19,
        Rating: 7.3
      },
      {
        Title: "Bridget Jones's Baby",
        Genre: "?????????",
        Revenue: 24.09,
        Rating: 6.7
      },
      {
        Title: "The VVitch: A New-England Folktale",
        Genre: "?????????",
        Revenue: 25.14,
        Rating: 6.8
      },
      {
        Title: "Cinderella",
        Genre: "??????",
        Revenue: 201.15,
        Rating: 7
      },
      {
        Title: "Forushande",
        Genre: "??????",
        Revenue: 3.4,
        Rating: 8
      },
      {
        Title: "Love",
        Genre: "??????",
        Revenue: null,
        Rating: 6
      },
      {
        Title: "Billy Lynn's Long Halftime Walk",
        Genre: "??????",
        Revenue: 1.72,
        Rating: 6.3
      },
      {
        Title: "Crimson Peak",
        Genre: "??????",
        Revenue: 31.06,
        Rating: 6.6
      },
      {
        Title: "Drive",
        Genre: "????????????",
        Revenue: 35.05,
        Rating: 7.8
      },
      {
        Title: "Trainwreck",
        Genre: "?????????",
        Revenue: 110.01,
        Rating: 6.3
      },
      {
        Title: "The Light Between Oceans",
        Genre: "??????",
        Revenue: 12.53,
        Rating: 7.2
      },
      {
        Title: "Below Her Mouth",
        Genre: "??????",
        Revenue: null,
        Rating: 5.6
      },
      {
        Title: "Spotlight",
        Genre: "????????????",
        Revenue: 44.99,
        Rating: 8.1
      },
      {
        Title: "Morgan",
        Genre: "?????????",
        Revenue: 3.91,
        Rating: 5.8
      },
      {
        Title: "Warrior",
        Genre: "????????????",
        Revenue: 13.65,
        Rating: 8.2
      },
      {
        Title: "Captain America: The First Avenger",
        Genre: "????????????",
        Revenue: 176.64,
        Rating: 6.9
      },
      {
        Title: "Hacker",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.3
      },
      {
        Title: "Into the Wild",
        Genre: "?????????",
        Revenue: 18.35,
        Rating: 8.1
      },
      {
        Title: "The Imitation Game",
        Genre: "??????",
        Revenue: 91.12,
        Rating: 8.1
      },
      {
        Title: "Central Intelligence",
        Genre: "????????????",
        Revenue: 127.38,
        Rating: 6.3
      },
      {
        Title: "Edge of Tomorrow",
        Genre: "????????????",
        Revenue: 100.19,
        Rating: 7.9
      },
      {
        Title: "A Cure for Wellness",
        Genre: "??????",
        Revenue: 8.1,
        Rating: 6.5
      },
      {
        Title: "Snowden",
        Genre: "??????",
        Revenue: 21.48,
        Rating: 7.3
      },
      {
        Title: "Iron Man",
        Genre: "????????????",
        Revenue: 318.3,
        Rating: 7.9
      },
      {
        Title: "Allegiant",
        Genre: "????????????",
        Revenue: 66,
        Rating: 5.7
      },
      {
        Title: "X: First Class",
        Genre: "????????????",
        Revenue: 146.41,
        Rating: 7.8
      },
      {
        Title: "Raw (II)",
        Genre: "??????",
        Revenue: 0.51,
        Rating: 7.5
      },
      {
        Title: "Paterson",
        Genre: "?????????",
        Revenue: 2.14,
        Rating: 7.5
      },
      {
        Title: "Bridesmaids",
        Genre: "?????????",
        Revenue: 169.08,
        Rating: 6.8
      },
      {
        Title: "The Girl with All the Gifts",
        Genre: "??????",
        Revenue: null,
        Rating: 6.7
      },
      {
        Title: "San Andreas",
        Genre: "????????????",
        Revenue: 155.18,
        Rating: 6.1
      },
      {
        Title: "Spring Breakers",
        Genre: "??????",
        Revenue: 14.12,
        Rating: 5.3
      },
      {
        Title: "Transformers",
        Genre: "????????????",
        Revenue: 318.76,
        Rating: 7.1
      },
      {
        Title: "Old Boy",
        Genre: "????????????",
        Revenue: null,
        Rating: 5.8
      },
      {
        Title: "Thor: The Dark World",
        Genre: "????????????",
        Revenue: 206.36,
        Rating: 7
      },
      {
        Title: "Gods of Egypt",
        Genre: "????????????",
        Revenue: 31.14,
        Rating: 5.5
      },
      {
        Title: "Captain America: The Winter Soldier",
        Genre: "????????????",
        Revenue: 259.75,
        Rating: 7.8
      },
      {
        Title: "Monster Trucks",
        Genre: "????????????",
        Revenue: 33.04,
        Rating: 5.7
      },
      {
        Title: "A Dark Song",
        Genre: "??????",
        Revenue: null,
        Rating: 6.1
      },
      {
        Title: "Kick-Ass",
        Genre: "????????????",
        Revenue: 48.04,
        Rating: 7.7
      },
      {
        Title: "Hardcore Henry",
        Genre: "????????????",
        Revenue: 9.24,
        Rating: 6.7
      },
      {
        Title: "Cars",
        Genre: "??????",
        Revenue: 244.05,
        Rating: 7.1
      },
      {
        Title: "It Follows",
        Genre: "?????????",
        Revenue: 14.67,
        Rating: 6.9
      },
      {
        Title: "The Girl with the Dragon Tattoo",
        Genre: "????????????",
        Revenue: 102.52,
        Rating: 7.8
      },
      {
        Title: "We're the Millers",
        Genre: "?????????",
        Revenue: 150.37,
        Rating: 7
      },
      {
        Title: "American Honey",
        Genre: "??????",
        Revenue: 0.66,
        Rating: 7
      },
      {
        Title: "The Lobster",
        Genre: "?????????",
        Revenue: 8.7,
        Rating: 7.1
      },
      {
        Title: "Predators",
        Genre: "????????????",
        Revenue: 52,
        Rating: 6.4
      },
      {
        Title: "Maleficent",
        Genre: "????????????",
        Revenue: 241.41,
        Rating: 7
      },
      {
        Title: "Rupture",
        Genre: "?????????",
        Revenue: null,
        Rating: 4.8
      },
      {
        Title: "Pan's Labyrinth",
        Genre: "??????",
        Revenue: 37.62,
        Rating: 8.2
      },
      {
        Title: "A Kind of Murder",
        Genre: "????????????",
        Revenue: 0,
        Rating: 5.2
      },
      {
        Title: "Apocalypto",
        Genre: "????????????",
        Revenue: 50.86,
        Rating: 7.8
      },
      {
        Title: "Mission: Impossible - Rogue Nation",
        Genre: "????????????",
        Revenue: 195,
        Rating: 7.4
      },
      {
        Title: "The Huntsman: Winter's War",
        Genre: "????????????",
        Revenue: 47.95,
        Rating: 6.1
      },
      {
        Title: "The Perks of Being a Wallflower",
        Genre: "??????",
        Revenue: 17.74,
        Rating: 8
      },
      {
        Title: "Jackie",
        Genre: "??????",
        Revenue: 13.96,
        Rating: 6.8
      },
      {
        Title: "The Disappointments Room",
        Genre: "??????",
        Revenue: 2.41,
        Rating: 3.9
      },
      {
        Title: "The Grand Budapest Hotel",
        Genre: "?????????",
        Revenue: 59.07,
        Rating: 8.1
      },
      {
        Title: "The Host",
        Genre: "????????????",
        Revenue: 26.62,
        Rating: 5.9
      },
      {
        Title: "Fury",
        Genre: "????????????",
        Revenue: 85.71,
        Rating: 7.6
      },
      {
        Title: "Inside Out",
        Genre: "??????",
        Revenue: 356.45,
        Rating: 8.2
      },
      {
        Title: "Rock Dog",
        Genre: "??????",
        Revenue: 9.4,
        Rating: 5.8
      },
      {
        Title: "Terminator Genisys",
        Genre: "????????????",
        Revenue: 89.73,
        Rating: 6.5
      },
      {
        Title: "Percy Jackson & the Olympians: The Lightning Thief",
        Genre: "?????????",
        Revenue: 88.76,
        Rating: 5.9
      },
      {
        Title: "Les Mis??rables",
        Genre: "??????",
        Revenue: 148.78,
        Rating: 7.6
      },
      {
        Title: "Children of Men",
        Genre: "??????",
        Revenue: 35.29,
        Rating: 7.9
      },
      {
        Title: "20th Century Women",
        Genre: "?????????",
        Revenue: 5.66,
        Rating: 7.4
      },
      {
        Title: "Spy",
        Genre: "????????????",
        Revenue: 110.82,
        Rating: 7.1
      },
      {
        Title: "The Intouchables",
        Genre: "??????",
        Revenue: 13.18,
        Rating: 8.6
      },
      {
        Title: "Bonjour Anne",
        Genre: "?????????",
        Revenue: 0.32,
        Rating: 4.9
      },
      {
        Title: "Kynodontas",
        Genre: "??????",
        Revenue: 0.11,
        Rating: 7.3
      },
      {
        Title: "Straight Outta Compton",
        Genre: "??????",
        Revenue: 161.03,
        Rating: 7.9
      },
      {
        Title: "The Amazing Spider-Man 2",
        Genre: "????????????",
        Revenue: 202.85,
        Rating: 6.7
      },
      {
        Title: "The Conjuring",
        Genre: "?????????",
        Revenue: 137.39,
        Rating: 7.5
      },
      {
        Title: "The Hangover",
        Genre: "?????????",
        Revenue: 277.31,
        Rating: 7.8
      },
      {
        Title: "Battleship",
        Genre: "????????????",
        Revenue: 65.17,
        Rating: 5.8
      },
      {
        Title: "Rise of the Planet of the Apes",
        Genre: "????????????",
        Revenue: 176.74,
        Rating: 7.6
      },
      {
        Title: "Lights Out",
        Genre: "?????????",
        Revenue: 67.24,
        Rating: 6.4
      },
      {
        Title: "Norman: The Moderate Rise and Tragic Fall of a New York Fixer",
        Genre: "??????",
        Revenue: 2.27,
        Rating: 7.1
      },
      {
        Title: "Birdman or (The Unexpected Virtue of Ignorance)",
        Genre: "?????????",
        Revenue: 42.34,
        Rating: 7.8
      },
      {
        Title: "Black Swan",
        Genre: "??????",
        Revenue: 106.95,
        Rating: 8
      },
      {
        Title: "Dear White People",
        Genre: "?????????",
        Revenue: 4.4,
        Rating: 6.2
      },
      {
        Title: "Nymphomaniac: Vol. I",
        Genre: "??????",
        Revenue: 0.79,
        Rating: 7
      },
      {
        Title: "Teenage Mutant Ninja Turtles: Out of the Shadows",
        Genre: "????????????",
        Revenue: 0.54,
        Rating: 6
      },
      {
        Title: "Knock Knock",
        Genre: "??????",
        Revenue: 0.03,
        Rating: 4.9
      },
      {
        Title: "Dirty Grandpa",
        Genre: "?????????",
        Revenue: 35.54,
        Rating: 6
      },
      {
        Title: "Cloud Atlas",
        Genre: "??????",
        Revenue: 27.1,
        Rating: 7.5
      },
      {
        Title: "X-Men Origins: Wolverine",
        Genre: "????????????",
        Revenue: 179.88,
        Rating: 6.7
      },
      {
        Title: "Satanic",
        Genre: "?????????",
        Revenue: null,
        Rating: 3.7
      },
      {
        Title: "Skyfall",
        Genre: "????????????",
        Revenue: 304.36,
        Rating: 7.8
      },
      {
        Title: "The Hobbit: An Unexpected Journey",
        Genre: "?????????",
        Revenue: 303,
        Rating: 7.9
      },
      {
        Title: "21 Jump Street",
        Genre: "????????????",
        Revenue: 138.45,
        Rating: 7.2
      },
      {
        Title: "Sing Street",
        Genre: "?????????",
        Revenue: 3.23,
        Rating: 8
      },
      {
        Title: "Ballerina",
        Genre: "??????",
        Revenue: null,
        Rating: 6.8
      },
      {
        Title: "Oblivion",
        Genre: "????????????",
        Revenue: 89.02,
        Rating: 7
      },
      {
        Title: "22 Jump Street",
        Genre: "????????????",
        Revenue: 191.62,
        Rating: 7.1
      },
      {
        Title: "Zodiac",
        Genre: "????????????",
        Revenue: 33.05,
        Rating: 7.7
      },
      {
        Title: "Everybody Wants Some!!",
        Genre: "?????????",
        Revenue: 3.37,
        Rating: 7
      },
      {
        Title: "Iron Man Three",
        Genre: "????????????",
        Revenue: 408.99,
        Rating: 7.2
      },
      {
        Title: "Now You See Me",
        Genre: "????????????",
        Revenue: 117.7,
        Rating: 7.3
      },
      {
        Title: "Sherlock Holmes",
        Genre: "????????????",
        Revenue: 209.02,
        Rating: 7.6
      },
      {
        Title: "Death Proof",
        Genre: "??????",
        Revenue: null,
        Rating: 7.1
      },
      {
        Title: "The Danish Girl",
        Genre: "??????",
        Revenue: 12.71,
        Rating: 7
      },
      {
        Title: "Hercules",
        Genre: "????????????",
        Revenue: 72.66,
        Rating: 6
      },
      {
        Title: "Sucker Punch",
        Genre: "????????????",
        Revenue: 36.38,
        Rating: 6.1
      },
      {
        Title: "Keeping Up with the Joneses",
        Genre: "????????????",
        Revenue: 14.9,
        Rating: 5.8
      },
      {
        Title: "Jupiter Ascending",
        Genre: "????????????",
        Revenue: 47.38,
        Rating: 5.3
      },
      {
        Title: "Masterminds",
        Genre: "????????????",
        Revenue: 17.36,
        Rating: 5.8
      },
      {
        Title: "Iris",
        Genre: "??????",
        Revenue: null,
        Rating: 6.1
      },
      {
        Title: "Busanhaeng",
        Genre: "????????????",
        Revenue: 2.13,
        Rating: 7.5
      },
      {
        Title: "Pitch Perfect",
        Genre: "?????????",
        Revenue: 65,
        Rating: 7.2
      },
      {
        Title: "Neighbors 2: Sorority Rising",
        Genre: "?????????",
        Revenue: 55.29,
        Rating: 5.7
      },
      {
        Title: "The Exception",
        Genre: "??????",
        Revenue: null,
        Rating: 7.7
      },
      {
        Title: "Man of Steel",
        Genre: "????????????",
        Revenue: 291.02,
        Rating: 7.1
      },
      {
        Title: "The Choice",
        Genre: "??????",
        Revenue: 18.71,
        Rating: 6.6
      },
      {
        Title: "Ice Age: Collision Course",
        Genre: "??????",
        Revenue: 64.06,
        Rating: 5.7
      },
      {
        Title: "The Devil Wears Prada",
        Genre: "?????????",
        Revenue: 124.73,
        Rating: 6.8
      },
      {
        Title: "The Infiltrator",
        Genre: "??????",
        Revenue: 15.43,
        Rating: 7.1
      },
      {
        Title: "There Will Be Blood",
        Genre: "??????",
        Revenue: 40.22,
        Rating: 8.1
      },
      {
        Title: "The Equalizer",
        Genre: "????????????",
        Revenue: 101.53,
        Rating: 7.2
      },
      {
        Title: "Lone Survivor",
        Genre: "????????????",
        Revenue: 125.07,
        Rating: 7.5
      },
      {
        Title: "The Cabin in the Woods",
        Genre: "?????????",
        Revenue: 42.04,
        Rating: 7
      },
      {
        Title: "The House Bunny",
        Genre: "?????????",
        Revenue: 48.24,
        Rating: 5.5
      },
      {
        Title: "She's Out of My League",
        Genre: "?????????",
        Revenue: 31.58,
        Rating: 6.4
      },
      {
        Title: "Inherent Vice",
        Genre: "?????????",
        Revenue: 8.09,
        Rating: 6.7
      },
      {
        Title: "Alice Through the Looking Glass",
        Genre: "?????????",
        Revenue: 77.04,
        Rating: 6.2
      },
      {
        Title: "Vincent N Roxxy",
        Genre: "????????????",
        Revenue: null,
        Rating: 5.5
      },
      {
        Title: "The Fast and the Furious: Tokyo Drift",
        Genre: "????????????",
        Revenue: 62.49,
        Rating: 6
      },
      {
        Title: "How to Be Single",
        Genre: "?????????",
        Revenue: 46.81,
        Rating: 6.1
      },
      {
        Title: "The Blind Side",
        Genre: "??????",
        Revenue: 255.95,
        Rating: 7.7
      },
      {
        Title: "La vie d'Ad??le",
        Genre: "??????",
        Revenue: 2.2,
        Rating: 7.8
      },
      {
        Title: "The Babadook",
        Genre: "??????",
        Revenue: 0.92,
        Rating: 6.8
      },
      {
        Title: "The Hobbit: The Battle of the Five Armies",
        Genre: "?????????",
        Revenue: 255.11,
        Rating: 7.4
      },
      {
        Title: "Harry Potter and the Order of the Phoenix",
        Genre: "?????????",
        Revenue: 292,
        Rating: 7.5
      },
      {
        Title: "Snowpiercer",
        Genre: "????????????",
        Revenue: 4.56,
        Rating: 7
      },
      {
        Title: "The 5th Wave",
        Genre: "????????????",
        Revenue: 34.91,
        Rating: 5.2
      },
      {
        Title: "The Stakelander",
        Genre: "????????????",
        Revenue: null,
        Rating: 5.3
      },
      {
        Title: "The Visit",
        Genre: "?????????",
        Revenue: 65.07,
        Rating: 6.2
      },
      {
        Title: "Fast Five",
        Genre: "????????????",
        Revenue: 209.81,
        Rating: 7.3
      },
      {
        Title: "Step Up",
        Genre: "????????????",
        Revenue: 65.27,
        Rating: 6.5
      },
      {
        Title: "Lovesong",
        Genre: "??????",
        Revenue: 0.01,
        Rating: 6.4
      },
      {
        Title: "RocknRolla",
        Genre: "????????????",
        Revenue: 5.69,
        Rating: 7.3
      },
      {
        Title: "In Time",
        Genre: "????????????",
        Revenue: 37.55,
        Rating: 6.7
      },
      {
        Title: "The Social Network",
        Genre: "??????",
        Revenue: 96.92,
        Rating: 7.7
      },
      {
        Title: "The Last Witch Hunter",
        Genre: "????????????",
        Revenue: 27.36,
        Rating: 6
      },
      {
        Title: "Victor Frankenstein",
        Genre: "??????",
        Revenue: 5.77,
        Rating: 6
      },
      {
        Title: "A Street Cat Named Bob",
        Genre: "??????",
        Revenue: 0.04,
        Rating: 7.4
      },
      {
        Title: "Green Room",
        Genre: "????????????",
        Revenue: 3.22,
        Rating: 7
      },
      {
        Title: "Blackhat",
        Genre: "????????????",
        Revenue: 7.1,
        Rating: 5.4
      },
      {
        Title: "Storks",
        Genre: "??????",
        Revenue: 72.66,
        Rating: 6.9
      },
      {
        Title: "American Sniper",
        Genre: "????????????",
        Revenue: 350.12,
        Rating: 7.3
      },
      {
        Title: "Dallas Buyers Club",
        Genre: "??????",
        Revenue: 27.3,
        Rating: 8
      },
      {
        Title: "Lincoln",
        Genre: "??????",
        Revenue: 182.2,
        Rating: 7.4
      },
      {
        Title: "Rush",
        Genre: "????????????",
        Revenue: 26.9,
        Rating: 8.1
      },
      {
        Title: "Before I Wake",
        Genre: "??????",
        Revenue: null,
        Rating: 6.1
      },
      {
        Title: "Silver Linings Playbook",
        Genre: "?????????",
        Revenue: 132.09,
        Rating: 7.8
      },
      {
        Title: "Tracktown",
        Genre: "??????",
        Revenue: null,
        Rating: 5.9
      },
      {
        Title: "The Fault in Our Stars",
        Genre: "??????",
        Revenue: 124.87,
        Rating: 7.8
      },
      {
        Title: "Blended",
        Genre: "?????????",
        Revenue: 46.28,
        Rating: 6.5
      },
      {
        Title: "Fast & Furious",
        Genre: "????????????",
        Revenue: 155.02,
        Rating: 6.6
      },
      {
        Title: "Looper",
        Genre: "????????????",
        Revenue: 66.47,
        Rating: 7.4
      },
      {
        Title: "White House Down",
        Genre: "????????????",
        Revenue: 73.1,
        Rating: 6.4
      },
      {
        Title: "Pete's Dragon",
        Genre: "?????????",
        Revenue: 76.2,
        Rating: 6.8
      },
      {
        Title: "Spider-Man 3",
        Genre: "????????????",
        Revenue: 336.53,
        Rating: 6.2
      },
      {
        Title: "The Three Musketeers",
        Genre: "????????????",
        Revenue: 20.32,
        Rating: 5.8
      },
      {
        Title: "Stardust",
        Genre: "?????????",
        Revenue: 38.35,
        Rating: 7.7
      },
      {
        Title: "American Hustle",
        Genre: "????????????",
        Revenue: 150.12,
        Rating: 7.3
      },
      {
        Title: "Jennifer's Body",
        Genre: "?????????",
        Revenue: 16.2,
        Rating: 5.1
      },
      {
        Title: "Midnight in Paris",
        Genre: "?????????",
        Revenue: 56.82,
        Rating: 7.7
      },
      {
        Title: "Lady Macbeth",
        Genre: "??????",
        Revenue: null,
        Rating: 7.3
      },
      {
        Title: "Joy",
        Genre: "??????",
        Revenue: 56.44,
        Rating: 6.6
      },
      {
        Title: "The Dressmaker",
        Genre: "?????????",
        Revenue: 2.02,
        Rating: 7.1
      },
      {
        Title: "Caf?? Society",
        Genre: "?????????",
        Revenue: 11.08,
        Rating: 6.7
      },
      {
        Title: "Insurgent",
        Genre: "?????????",
        Revenue: 130,
        Rating: 6.3
      },
      {
        Title: "Seventh Son",
        Genre: "????????????",
        Revenue: 17.18,
        Rating: 5.5
      },
      {
        Title: "Demain tout commence",
        Genre: "?????????",
        Revenue: null,
        Rating: 7.4
      },
      {
        Title: "The Theory of Everything",
        Genre: "??????",
        Revenue: 35.89,
        Rating: 7.7
      },
      {
        Title: "This Is the End",
        Genre: "?????????",
        Revenue: 101.47,
        Rating: 6.6
      },
      {
        Title: "About Time",
        Genre: "?????????",
        Revenue: 15.29,
        Rating: 7.8
      },
      {
        Title: "Step Br??????s",
        Genre: "?????????",
        Revenue: 100.47,
        Rating: 6.9
      },
      {
        Title: "Clown",
        Genre: "?????????",
        Revenue: 0.05,
        Rating: 5.7
      },
      {
        Title: "Star Trek Into Darkness",
        Genre: "????????????",
        Revenue: 228.76,
        Rating: 7.8
      },
      {
        Title: "Zombieland",
        Genre: "?????????",
        Revenue: 75.59,
        Rating: 7.7
      },
      {
        Title: "Hail, Caesar!",
        Genre: "?????????",
        Revenue: 30,
        Rating: 6.3
      },
      {
        Title: "Slumdog Millionaire",
        Genre: "??????",
        Revenue: 141.32,
        Rating: 8
      },
      {
        Title: "The Twilight Saga: Breaking Dawn - Part 2",
        Genre: "?????????",
        Revenue: 292.3,
        Rating: 5.5
      },
      {
        Title: "American Wrestler: The Wizard",
        Genre: "??????",
        Revenue: null,
        Rating: 6.9
      },
      {
        Title: "The Amazing Spider-Man",
        Genre: "????????????",
        Revenue: 262.03,
        Rating: 7
      },
      {
        Title: "Ben-Hur",
        Genre: "????????????",
        Revenue: 26.38,
        Rating: 5.7
      },
      {
        Title: "Sleight",
        Genre: "????????????",
        Revenue: 3.85,
        Rating: 6
      },
      {
        Title: "The Maze Runner",
        Genre: "????????????",
        Revenue: 102.41,
        Rating: 6.8
      },
      {
        Title: "Criminal",
        Genre: "????????????",
        Revenue: 14.27,
        Rating: 6.3
      },
      {
        Title: "Wanted",
        Genre: "????????????",
        Revenue: 134.57,
        Rating: 6.7
      },
      {
        Title: "Florence Foster Jenkins",
        Genre: "??????",
        Revenue: 27.37,
        Rating: 6.9
      },
      {
        Title: "Collide",
        Genre: "????????????",
        Revenue: 2.2,
        Rating: 5.7
      },
      {
        Title: "Black Mass",
        Genre: "??????",
        Revenue: 62.56,
        Rating: 6.9
      },
      {
        Title: "Creed",
        Genre: "??????",
        Revenue: 109.71,
        Rating: 7.6
      },
      {
        Title: "Swiss Army Man",
        Genre: "?????????",
        Revenue: 4.21,
        Rating: 7.1
      },
      {
        Title: "The Expendables 3",
        Genre: "????????????",
        Revenue: 39.29,
        Rating: 6.1
      },
      {
        Title: "What We Do in the Shadows",
        Genre: "?????????",
        Revenue: 3.33,
        Rating: 7.6
      },
      {
        Title: "Southpaw",
        Genre: "??????",
        Revenue: 52.42,
        Rating: 7.4
      },
      {
        Title: "Hush",
        Genre: "?????????",
        Revenue: null,
        Rating: 6.6
      },
      {
        Title: "Bridge of Spies",
        Genre: "??????",
        Revenue: 72.31,
        Rating: 7.6
      },
      {
        Title: "The Lego Movie",
        Genre: "??????",
        Revenue: 257.76,
        Rating: 7.8
      },
      {
        Title: "Everest",
        Genre: "????????????",
        Revenue: 43.25,
        Rating: 7.1
      },
      {
        Title: "Pixels",
        Genre: "????????????",
        Revenue: 78.75,
        Rating: 5.6
      },
      {
        Title: "Robin Hood",
        Genre: "????????????",
        Revenue: 105.22,
        Rating: 6.7
      },
      {
        Title: "The Wolverine",
        Genre: "????????????",
        Revenue: 132.55,
        Rating: 6.7
      },
      {
        Title: "John Carter",
        Genre: "????????????",
        Revenue: 73.06,
        Rating: 6.6
      },
      {
        Title: "Keanu",
        Genre: "????????????",
        Revenue: 20.57,
        Rating: 6.3
      },
      {
        Title: "The Gunman",
        Genre: "????????????",
        Revenue: 10.64,
        Rating: 5.8
      },
      {
        Title: "Steve Jobs",
        Genre: "??????",
        Revenue: 17.75,
        Rating: 7.2
      },
      {
        Title: "Whisky Galore",
        Genre: "?????????",
        Revenue: null,
        Rating: 5
      },
      {
        Title: "Grown Ups 2",
        Genre: "?????????",
        Revenue: 133.67,
        Rating: 5.4
      },
      {
        Title: "The Age of Adaline",
        Genre: "??????",
        Revenue: 42.48,
        Rating: 7.2
      },
      {
        Title: "The Incredible Hulk",
        Genre: "????????????",
        Revenue: 134.52,
        Rating: 6.8
      },
      {
        Title: "Couples Retreat",
        Genre: "?????????",
        Revenue: 109.18,
        Rating: 5.5
      },
      {
        Title: "Absolutely Anything",
        Genre: "?????????",
        Revenue: null,
        Rating: 6
      },
      {
        Title: "Magic Mike",
        Genre: "?????????",
        Revenue: 113.71,
        Rating: 6.1
      },
      {
        Title: "Minions",
        Genre: "??????",
        Revenue: 336.03,
        Rating: 6.4
      },
      {
        Title: "The Black Room",
        Genre: "?????????",
        Revenue: null,
        Rating: 3.9
      },
      {
        Title: "Bronson",
        Genre: "????????????",
        Revenue: 0.1,
        Rating: 7.1
      },
      {
        Title: "Despicable Me",
        Genre: "??????",
        Revenue: 251.5,
        Rating: 7.7
      },
      {
        Title: "The Best of Me",
        Genre: "??????",
        Revenue: 26.76,
        Rating: 6.7
      },
      {
        Title: "The Invitation",
        Genre: "??????",
        Revenue: 0.23,
        Rating: 6.7
      },
      {
        Title: "Zero Dark Thirty",
        Genre: "??????",
        Revenue: 95.72,
        Rating: 7.4
      },
      {
        Title: "Tangled",
        Genre: "??????",
        Revenue: 200.81,
        Rating: 7.8
      },
      {
        Title: "The Hunger Games: Mockingjay - Part 2",
        Genre: "????????????",
        Revenue: 281.67,
        Rating: 6.6
      },
      {
        Title: "Vacation",
        Genre: "?????????",
        Revenue: 58.88,
        Rating: 6.1
      },
      {
        Title: "Taken",
        Genre: "????????????",
        Revenue: 145,
        Rating: 7.8
      },
      {
        Title: "Pitch Perfect 2",
        Genre: "?????????",
        Revenue: 183.44,
        Rating: 6.5
      },
      {
        Title: "Monsters University",
        Genre: "??????",
        Revenue: 268.49,
        Rating: 7.3
      },
      {
        Title: "Elle",
        Genre: "????????????",
        Revenue: null,
        Rating: 7.2
      },
      {
        Title: "Mechanic: Resurrection",
        Genre: "????????????",
        Revenue: 21.2,
        Rating: 5.6
      },
      {
        Title: "Tusk",
        Genre: "?????????",
        Revenue: 1.82,
        Rating: 5.4
      },
      {
        Title: "The Headhunter's Calling",
        Genre: "??????",
        Revenue: null,
        Rating: 6.9
      },
      {
        Title: "Atonement",
        Genre: "??????",
        Revenue: 50.92,
        Rating: 7.8
      },
      {
        Title: "Harry Potter and the Deathly Hallows: Part 1",
        Genre: "?????????",
        Revenue: 294.98,
        Rating: 7.7
      },
      {
        Title: "Shame",
        Genre: "??????",
        Revenue: 4,
        Rating: 7.2
      },
      {
        Title: "Hanna",
        Genre: "????????????",
        Revenue: 40.25,
        Rating: 6.8
      },
      {
        Title: "The Babysitters",
        Genre: "??????",
        Revenue: 0.04,
        Rating: 5.7
      },
      {
        Title: "Pride and Prejudice and Zombies",
        Genre: "????????????",
        Revenue: 10.91,
        Rating: 5.8
      },
      {
        Title: "300: Rise of an Empire",
        Genre: "????????????",
        Revenue: 106.37,
        Rating: 6.2
      },
      {
        Title: "London Has Fallen",
        Genre: "????????????",
        Revenue: 62.4,
        Rating: 5.9
      },
      {
        Title: "The Curious Case of Benjamin Button",
        Genre: "??????",
        Revenue: 127.49,
        Rating: 7.8
      },
      {
        Title: "Sin City: A Dame to Kill For",
        Genre: "????????????",
        Revenue: 13.75,
        Rating: 6.5
      },
      {
        Title: "The Bourne Ultimatum",
        Genre: "????????????",
        Revenue: 227.14,
        Rating: 8.1
      },
      {
        Title: "Srpski film",
        Genre: "?????????",
        Revenue: null,
        Rating: 5.2
      },
      {
        Title: "The Purge: Election Year",
        Genre: "????????????",
        Revenue: 79,
        Rating: 6
      },
      {
        Title: "3 Idiots",
        Genre: "?????????",
        Revenue: 6.52,
        Rating: 8.4
      },
      {
        Title: "Zoolander 2",
        Genre: "?????????",
        Revenue: 28.84,
        Rating: 4.7
      },
      {
        Title: "World War Z",
        Genre: "????????????",
        Revenue: 202.35,
        Rating: 7
      },
      {
        Title: "Mission: Impossible - Ghost Protocol",
        Genre: "????????????",
        Revenue: 209.36,
        Rating: 7.4
      },
      {
        Title: "Let Me Make You a Martyr",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.4
      },
      {
        Title: "Filth",
        Genre: "?????????",
        Revenue: 0.03,
        Rating: 7.1
      },
      {
        Title: "The Longest Ride",
        Genre: "??????",
        Revenue: 37.43,
        Rating: 7.1
      },
      {
        Title: "The imposible",
        Genre: "??????",
        Revenue: 19,
        Rating: 7.6
      },
      {
        Title: "Kick-Ass 2",
        Genre: "????????????",
        Revenue: 28.75,
        Rating: 6.6
      },
      {
        Title: "Folk Hero & Funny Guy",
        Genre: "?????????",
        Revenue: null,
        Rating: 5.6
      },
      {
        Title: "Oz the Great and Powerful",
        Genre: "?????????",
        Revenue: 234.9,
        Rating: 6.3
      },
      {
        Title: "Brooklyn",
        Genre: "??????",
        Revenue: 38.32,
        Rating: 7.5
      },
      {
        Title: "Coraline",
        Genre: "??????",
        Revenue: 75.28,
        Rating: 7.7
      },
      {
        Title: "Blue Valentine",
        Genre: "??????",
        Revenue: 9.7,
        Rating: 7.4
      },
      {
        Title: "The Thinning",
        Genre: "??????",
        Revenue: null,
        Rating: 6
      },
      {
        Title: "Silent Hill",
        Genre: "?????????",
        Revenue: 46.98,
        Rating: 6.6
      },
      {
        Title: "Dredd",
        Genre: "????????????",
        Revenue: 13.4,
        Rating: 7.1
      },
      {
        Title: "Hunt for the Wilderpeople",
        Genre: "?????????",
        Revenue: 5.2,
        Rating: 7.9
      },
      {
        Title: "Big Hero 6",
        Genre: "??????",
        Revenue: 222.49,
        Rating: 7.8
      },
      {
        Title: "Carrie",
        Genre: "??????",
        Revenue: 35.27,
        Rating: 5.9
      },
      {
        Title: "Iron Man 2",
        Genre: "????????????",
        Revenue: 312.06,
        Rating: 7
      },
      {
        Title: "Demolition",
        Genre: "?????????",
        Revenue: 1.82,
        Rating: 7
      },
      {
        Title: "Pandorum",
        Genre: "????????????",
        Revenue: 10.33,
        Rating: 6.8
      },
      {
        Title: "Olympus Has Fallen",
        Genre: "????????????",
        Revenue: 98.9,
        Rating: 6.5
      },
      {
        Title: "I Am Number Four",
        Genre: "????????????",
        Revenue: 55.09,
        Rating: 6.1
      },
      {
        Title: "Jagten",
        Genre: "??????",
        Revenue: 0.61,
        Rating: 8.3
      },
      {
        Title: "The Proposal",
        Genre: "?????????",
        Revenue: 163.95,
        Rating: 6.7
      },
      {
        Title: "Get Hard",
        Genre: "?????????",
        Revenue: 90.35,
        Rating: 6
      },
      {
        Title: "Just Go with It",
        Genre: "?????????",
        Revenue: 103.03,
        Rating: 6.4
      },
      {
        Title: "Revolutionary Road",
        Genre: "??????",
        Revenue: 22.88,
        Rating: 7.3
      },
      {
        Title: "The Town",
        Genre: "????????????",
        Revenue: 92.17,
        Rating: 7.6
      },
      {
        Title: "The Boy",
        Genre: "?????????",
        Revenue: 35.79,
        Rating: 6
      },
      {
        Title: "Denial",
        Genre: "??????",
        Revenue: 4.07,
        Rating: 6.6
      },
      {
        Title: "Predestination",
        Genre: "??????",
        Revenue: null,
        Rating: 7.5
      },
      {
        Title: "Goosebumps",
        Genre: "?????????",
        Revenue: 80.02,
        Rating: 6.3
      },
      {
        Title: "Sherlock Holmes: A Game of Shadows",
        Genre: "????????????",
        Revenue: 186.83,
        Rating: 7.5
      },
      {
        Title: "Salt",
        Genre: "????????????",
        Revenue: 118.31,
        Rating: 6.4
      },
      {
        Title: "Enemy",
        Genre: "??????",
        Revenue: 1.01,
        Rating: 6.9
      },
      {
        Title: "District 9",
        Genre: "????????????",
        Revenue: 115.65,
        Rating: 8
      },
      {
        Title: "The ?????? Guys",
        Genre: "????????????",
        Revenue: 119.22,
        Rating: 6.7
      },
      {
        Title: "American Gangster",
        Genre: "??????",
        Revenue: 130.13,
        Rating: 7.8
      },
      {
        Title: "Marie Antoinette",
        Genre: "??????",
        Revenue: 15.96,
        Rating: 6.4
      },
      {
        Title: 2012,
        Genre: "????????????",
        Revenue: 166.11,
        Rating: 5.8
      },
      {
        Title: "Harry Potter and the Half-Blood Prince",
        Genre: "?????????",
        Revenue: 301.96,
        Rating: 7.5
      },
      {
        Title: "Argo",
        Genre: "??????",
        Revenue: 136.02,
        Rating: 7.7
      },
      {
        Title: "Eddie the Eagle",
        Genre: "??????",
        Revenue: 15.79,
        Rating: 7.4
      },
      {
        Title: "The Lives of ??????s",
        Genre: "??????",
        Revenue: 11.28,
        Rating: 8.5
      },
      {
        Title: "Pet",
        Genre: "?????????",
        Revenue: null,
        Rating: 5.7
      },
      {
        Title: "Paint It Black",
        Genre: "??????",
        Revenue: null,
        Rating: 8.3
      },
      {
        Title: "Macbeth",
        Genre: "??????",
        Revenue: null,
        Rating: 6.7
      },
      {
        Title: "Forgetting Sarah Marshall",
        Genre: "?????????",
        Revenue: 62.88,
        Rating: 7.2
      },
      {
        Title: "The Giver",
        Genre: "??????",
        Revenue: 45.09,
        Rating: 6.5
      },
      {
        Title: "Triple 9",
        Genre: "????????????",
        Revenue: 12.63,
        Rating: 6.3
      },
      {
        Title: "Perfetti sconosciuti",
        Genre: "?????????",
        Revenue: null,
        Rating: 7.7
      },
      {
        Title: "Angry Birds",
        Genre: "??????",
        Revenue: 107.51,
        Rating: 6.3
      },
      {
        Title: "Moonrise Kingdom",
        Genre: "?????????",
        Revenue: 45.51,
        Rating: 7.8
      },
      {
        Title: "Hairspray",
        Genre: "?????????",
        Revenue: 118.82,
        Rating: 6.7
      },
      {
        Title: "Safe Haven",
        Genre: "??????",
        Revenue: 71.35,
        Rating: 6.7
      },
      {
        Title: "Focus",
        Genre: "?????????",
        Revenue: 53.85,
        Rating: 6.6
      },
      {
        Title: "Ratatouille",
        Genre: "??????",
        Revenue: 206.44,
        Rating: 8
      },
      {
        Title: "Stake Land",
        Genre: "??????",
        Revenue: 0.02,
        Rating: 6.5
      },
      {
        Title: "The Book of Eli",
        Genre: "????????????",
        Revenue: 94.82,
        Rating: 6.9
      },
      {
        Title: "Cloverfield",
        Genre: "????????????",
        Revenue: 80.03,
        Rating: 7
      },
      {
        Title: "Point Break",
        Genre: "????????????",
        Revenue: 28.77,
        Rating: 5.3
      },
      {
        Title: "Under the Skin",
        Genre: "??????",
        Revenue: 2.61,
        Rating: 6.3
      },
      {
        Title: "I Am Legend",
        Genre: "??????",
        Revenue: 256.39,
        Rating: 7.2
      },
      {
        Title: "Men in Black 3",
        Genre: "????????????",
        Revenue: 179.02,
        Rating: 6.8
      },
      {
        Title: "Super 8",
        Genre: "??????",
        Revenue: 126.98,
        Rating: 7.1
      },
      {
        Title: "Law Abiding Citizen",
        Genre: "????????????",
        Revenue: 73.34,
        Rating: 7.4
      },
      {
        Title: "Up",
        Genre: "??????",
        Revenue: 292.98,
        Rating: 8.3
      },
      {
        Title: "Maze Runner: The Scorch Trials",
        Genre: "????????????",
        Revenue: 81.69,
        Rating: 6.3
      },
      {
        Title: "Carol",
        Genre: "??????",
        Revenue: 0.25,
        Rating: 7.2
      },
      {
        Title: "Imperium",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.5
      },
      {
        Title: "Youth",
        Genre: "?????????",
        Revenue: 2.7,
        Rating: 7.3
      },
      {
        Title: "Mr. Nobody",
        Genre: "??????",
        Revenue: null,
        Rating: 7.9
      },
      {
        Title: "City of Tiny Lights",
        Genre: "????????????",
        Revenue: null,
        Rating: 5.7
      },
      {
        Title: "Savages",
        Genre: "????????????",
        Revenue: 47.31,
        Rating: 6.5
      },
      {
        Title: "(500) Days of Summer",
        Genre: "?????????",
        Revenue: 32.39,
        Rating: 7.7
      },
      {
        Title: "Movie 43",
        Genre: "?????????",
        Revenue: 8.83,
        Rating: 4.3
      },
      {
        Title: "Gravity",
        Genre: "??????",
        Revenue: 274.08,
        Rating: 7.8
      },
      {
        Title: "The Boy in the Striped Pyjamas",
        Genre: "??????",
        Revenue: 9.03,
        Rating: 7.8
      },
      {
        Title: "Shooter",
        Genre: "????????????",
        Revenue: 46.98,
        Rating: 7.2
      },
      {
        Title: "Bone Tomahawk",
        Genre: "?????????",
        Revenue: 66.01,
        Rating: 7.1
      },
      {
        Title: "Magic Mike XXL",
        Genre: "?????????",
        Revenue: null,
        Rating: 5.7
      },
      {
        Title: "Easy A",
        Genre: "?????????",
        Revenue: 58.4,
        Rating: 7.1
      },
      {
        Title: "Exodus: Gods and Kings",
        Genre: "????????????",
        Revenue: 65.01,
        Rating: 6
      },
      {
        Title: "Chappie",
        Genre: "????????????",
        Revenue: 31.57,
        Rating: 6.9
      },
      {
        Title: "The Hobbit: The Desolation of Smaug",
        Genre: "?????????",
        Revenue: 258.36,
        Rating: 7.9
      },
      {
        Title: "Half of a Yellow Sun",
        Genre: "??????",
        Revenue: 0.05,
        Rating: 6.2
      },
      {
        Title: "Anthropoid",
        Genre: "??????",
        Revenue: 2.96,
        Rating: 7.2
      },
      {
        Title: "The Counselor",
        Genre: "????????????",
        Revenue: 16.97,
        Rating: 5.3
      },
      {
        Title: "Viking",
        Genre: "????????????",
        Revenue: 23.05,
        Rating: 4.7
      },
      {
        Title: "Whiskey Tango Foxtrot",
        Genre: "??????",
        Revenue: null,
        Rating: 6.6
      },
      {
        Title: "Trust",
        Genre: "????????????",
        Revenue: 0.06,
        Rating: 7
      },
      {
        Title: "Birth of the Dragon",
        Genre: "????????????",
        Revenue: 93.05,
        Rating: 3.9
      },
      {
        Title: "Elysium",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.6
      },
      {
        Title: "The Green Inferno",
        Genre: "?????????",
        Revenue: 7.19,
        Rating: 5.4
      },
      {
        Title: "Godzilla",
        Genre: "????????????",
        Revenue: 200.66,
        Rating: 6.4
      },
      {
        Title: "The Bourne Legacy",
        Genre: "????????????",
        Revenue: 113.17,
        Rating: 6.7
      },
      {
        Title: "A Good Year",
        Genre: "?????????",
        Revenue: 7.46,
        Rating: 6.9
      },
      {
        Title: "Friend Request",
        Genre: "?????????",
        Revenue: 64.03,
        Rating: 5.4
      },
      {
        Title: "Deja Vu",
        Genre: "????????????",
        Revenue: null,
        Rating: 7
      },
      {
        Title: "Lucy",
        Genre: "????????????",
        Revenue: 126.55,
        Rating: 6.4
      },
      {
        Title: "A Quiet Passion",
        Genre: "??????",
        Revenue: 1.08,
        Rating: 7.2
      },
      {
        Title: "Need for Speed",
        Genre: "????????????",
        Revenue: 43.57,
        Rating: 6.5
      },
      {
        Title: "Jack Reacher",
        Genre: "????????????",
        Revenue: 58.68,
        Rating: 7
      },
      {
        Title: "The Do-Over",
        Genre: "????????????",
        Revenue: 0.54,
        Rating: 5.7
      },
      {
        Title: "True ????????????s",
        Genre: "????????????",
        Revenue: null,
        Rating: 7.3
      },
      {
        Title: "American Pastoral",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.1
      },
      {
        Title: "The Ghost Writer",
        Genre: "??????",
        Revenue: 15.52,
        Rating: 7.2
      },
      {
        Title: "Limitless",
        Genre: "??????",
        Revenue: 79.24,
        Rating: 7.4
      },
      {
        Title: "Spectral",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.3
      },
      {
        Title: "P.S. I Love You",
        Genre: "??????",
        Revenue: 53.68,
        Rating: 7.1
      },
      {
        Title: "Zipper",
        Genre: "??????",
        Revenue: null,
        Rating: 5.7
      },
      {
        Title: "Midnight Special",
        Genre: "??????",
        Revenue: 3.71,
        Rating: 6.7
      },
      {
        Title: "Don't Think Twice",
        Genre: "?????????",
        Revenue: 4.42,
        Rating: 6.8
      },
      {
        Title: "Alice in Wonderland",
        Genre: "?????????",
        Revenue: 334.19,
        Rating: 6.5
      },
      {
        Title: "Chuck",
        Genre: "??????",
        Revenue: 0.11,
        Rating: 6.8
      },
      {
        Title: "I, Daniel Blake",
        Genre: "??????",
        Revenue: null,
        Rating: 7.9
      },
      {
        Title: "The Break-Up",
        Genre: "?????????",
        Revenue: 118.68,
        Rating: 5.8
      },
      {
        Title: "Loving",
        Genre: "??????",
        Revenue: 7.7,
        Rating: 7.1
      },
      {
        Title: "Fantastic Four",
        Genre: "????????????",
        Revenue: 56.11,
        Rating: 4.3
      },
      {
        Title: "The Survivalist",
        Genre: "??????",
        Revenue: null,
        Rating: 6.3
      },
      {
        Title: "Colonia",
        Genre: "??????",
        Revenue: null,
        Rating: 7.1
      },
      {
        Title: "The Boy Next Door",
        Genre: "??????",
        Revenue: 35.39,
        Rating: 4.6
      },
      {
        Title: "The Gift",
        Genre: "??????",
        Revenue: 43.77,
        Rating: 7.1
      },
      {
        Title: "Dracula Untold",
        Genre: "????????????",
        Revenue: 55.94,
        Rating: 6.3
      },
      {
        Title: "In the Heart of the Sea",
        Genre: "????????????",
        Revenue: 24.99,
        Rating: 6.9
      },
      {
        Title: "Idiocracy",
        Genre: "?????????",
        Revenue: 0.44,
        Rating: 6.6
      },
      {
        Title: "The Expendables",
        Genre: "????????????",
        Revenue: 102.98,
        Rating: 6.5
      },
      {
        Title: "Sinister",
        Genre: "?????????",
        Revenue: 48.06,
        Rating: 6.8
      },
      {
        Title: "Wreck-It Ralph",
        Genre: "??????",
        Revenue: 189.41,
        Rating: 7.8
      },
      {
        Title: "Snow White and the Huntsman",
        Genre: "????????????",
        Revenue: 155.11,
        Rating: 6.1
      },
      {
        Title: "Pan",
        Genre: "?????????",
        Revenue: 34.96,
        Rating: 5.8
      },
      {
        Title: "Transformers: Dark of the Moon",
        Genre: "????????????",
        Revenue: 352.36,
        Rating: 6.3
      },
      {
        Title: "Juno",
        Genre: "?????????",
        Revenue: 143.49,
        Rating: 7.5
      },
      {
        Title: "A Hologram for the King",
        Genre: "?????????",
        Revenue: 4.2,
        Rating: 6.1
      },
      {
        Title: "Money Monster",
        Genre: "????????????",
        Revenue: 41.01,
        Rating: 6.5
      },
      {
        Title: "The ?????? Woman",
        Genre: "?????????",
        Revenue: 83.91,
        Rating: 6
      },
      {
        Title: "Enchanted",
        Genre: "??????",
        Revenue: 127.71,
        Rating: 7.1
      },
      {
        Title: "The Intern",
        Genre: "?????????",
        Revenue: 75.27,
        Rating: 7.1
      },
      {
        Title: "Little Miss Sunshine",
        Genre: "?????????",
        Revenue: 59.89,
        Rating: 7.8
      },
      {
        Title: "Bleed for This",
        Genre: "??????",
        Revenue: 4.85,
        Rating: 6.8
      },
      {
        Title: "Clash of the Titans",
        Genre: "????????????",
        Revenue: 163.19,
        Rating: 5.8
      },
      {
        Title: "The Finest Hours",
        Genre: "????????????",
        Revenue: 27.55,
        Rating: 6.8
      },
      {
        Title: "Tron",
        Genre: "????????????",
        Revenue: 172.05,
        Rating: 6.8
      },
      {
        Title: "The Hunger Games: Catching Fire",
        Genre: "????????????",
        Revenue: 424.65,
        Rating: 7.6
      },
      {
        Title: "All Good Things",
        Genre: "????????????",
        Revenue: 0.58,
        Rating: 6.3
      },
      {
        Title: "Kickboxer: Vengeance",
        Genre: "????????????",
        Revenue: 131.56,
        Rating: 4.9
      },
      {
        Title: "The Last Airbender",
        Genre: "????????????",
        Revenue: null,
        Rating: 4.2
      },
      {
        Title: "Sex Tape",
        Genre: "?????????",
        Revenue: 38.54,
        Rating: 5.1
      },
      {
        Title: "What to Expect When You're Expecting",
        Genre: "?????????",
        Revenue: 41.1,
        Rating: 5.7
      },
      {
        Title: "Moneyball",
        Genre: "??????",
        Revenue: 75.61,
        Rating: 7.6
      },
      {
        Title: "Ghost Rider",
        Genre: "????????????",
        Revenue: 115.8,
        Rating: 5.2
      },
      {
        Title: "Unbroken",
        Genre: "??????",
        Revenue: 115.6,
        Rating: 7.2
      },
      {
        Title: "Immortals",
        Genre: "????????????",
        Revenue: 83.5,
        Rating: 6
      },
      {
        Title: "Sunshine",
        Genre: "?????????",
        Revenue: 3.68,
        Rating: 7.3
      },
      {
        Title: "Brave",
        Genre: "??????",
        Revenue: 237.28,
        Rating: 7.2
      },
      {
        Title: "M??n som hatar kvinnor",
        Genre: "??????",
        Revenue: 10.1,
        Rating: 7.8
      },
      {
        Title: "Adoration",
        Genre: "??????",
        Revenue: 0.32,
        Rating: 6.2
      },
      {
        Title: "The Drop",
        Genre: "????????????",
        Revenue: 10.72,
        Rating: 7.1
      },
      {
        Title: "She's the Man",
        Genre: "?????????",
        Revenue: 2.34,
        Rating: 6.4
      },
      {
        Title: "Daddy's Home",
        Genre: "?????????",
        Revenue: 150.32,
        Rating: 6.1
      },
      {
        Title: "Let Me In",
        Genre: "??????",
        Revenue: 12.13,
        Rating: 7.2
      },
      {
        Title: "Never Back Down",
        Genre: "????????????",
        Revenue: 24.85,
        Rating: 6.6
      },
      {
        Title: "Grimsby",
        Genre: "????????????",
        Revenue: 6.86,
        Rating: 6.2
      },
      {
        Title: "Moon",
        Genre: "??????",
        Revenue: 5.01,
        Rating: 7.9
      },
      {
        Title: "Megamind",
        Genre: "??????",
        Revenue: 148.34,
        Rating: 7.3
      },
      {
        Title: "Gangster Squad",
        Genre: "????????????",
        Revenue: 46,
        Rating: 6.7
      },
      {
        Title: "Blood Father",
        Genre: "????????????",
        Revenue: 93.95,
        Rating: 6.4
      },
      {
        Title: "He's Just Not That Into You",
        Genre: "?????????",
        Revenue: null,
        Rating: 6.4
      },
      {
        Title: "Kung Fu Panda 3",
        Genre: "??????",
        Revenue: 143.52,
        Rating: 7.2
      },
      {
        Title: "The Rise of the Krays",
        Genre: "????????????",
        Revenue: 6.53,
        Rating: 5.1
      },
      {
        Title: "Handsome Devil",
        Genre: "??????",
        Revenue: null,
        Rating: 7.4
      },
      {
        Title: "Winter's Bone",
        Genre: "??????",
        Revenue: null,
        Rating: 7.2
      },
      {
        Title: "Horrible Bosses",
        Genre: "?????????",
        Revenue: 117.53,
        Rating: 6.9
      },
      {
        Title: "Mommy",
        Genre: "??????",
        Revenue: 3.49,
        Rating: 8.1
      },
      {
        Title: "Hellboy II: The Golden Army",
        Genre: "????????????",
        Revenue: 75.75,
        Rating: 7
      },
      {
        Title: "Beautiful Creatures",
        Genre: "??????",
        Revenue: 19.45,
        Rating: 6.2
      },
      {
        Title: "Toni Erdmann",
        Genre: "?????????",
        Revenue: 1.48,
        Rating: 7.6
      },
      {
        Title: "The Lovely Bones",
        Genre: "??????",
        Revenue: 43.98,
        Rating: 6.7
      },
      {
        Title: "The Assassination of Jesse James by the Coward Robert Ford",
        Genre: "??????",
        Revenue: 3.9,
        Rating: 7.5
      },
      {
        Title: "Don Jon",
        Genre: "?????????",
        Revenue: 24.48,
        Rating: 6.6
      },
      {
        Title: "Bastille Day",
        Genre: "????????????",
        Revenue: 0.04,
        Rating: 6.3
      },
      {
        Title: "Free State of Jones",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.9
      },
      {
        Title: "Mr. Right",
        Genre: "????????????",
        Revenue: 0.03,
        Rating: 6.3
      },
      {
        Title: "The Secret Life of Walter Mitty",
        Genre: "?????????",
        Revenue: 58.23,
        Rating: 7.3
      },
      {
        Title: "Dope",
        Genre: "?????????",
        Revenue: 17.47,
        Rating: 7.3
      },
      {
        Title: "Underworld Awakening",
        Genre: "????????????",
        Revenue: 62.32,
        Rating: 6.4
      },
      {
        Title: "Antichrist",
        Genre: "??????",
        Revenue: 0.4,
        Rating: 6.6
      },
      {
        Title: "Friday the 13th",
        Genre: "?????????",
        Revenue: 65,
        Rating: 5.6
      },
      {
        Title: "Taken 3",
        Genre: "????????????",
        Revenue: 89.25,
        Rating: 6
      },
      {
        Title: "Total Recall",
        Genre: "????????????",
        Revenue: 58.88,
        Rating: 6.3
      },
      {
        Title: "X-Men: The Last Stand",
        Genre: "????????????",
        Revenue: 234.36,
        Rating: 6.7
      },
      {
        Title: "The Escort",
        Genre: "?????????",
        Revenue: null,
        Rating: 6
      },
      {
        Title: "The Whole Truth",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.1
      },
      {
        Title: "Night at the Museum: Secret of the Tomb",
        Genre: "?????????",
        Revenue: 113.73,
        Rating: 6.2
      },
      {
        Title: "Love & ?????? Drugs",
        Genre: "?????????",
        Revenue: 32.36,
        Rating: 6.7
      },
      {
        Title: "The Interview",
        Genre: "?????????",
        Revenue: 6.11,
        Rating: 6.6
      },
      {
        Title: "The Host",
        Genre: "?????????",
        Revenue: 2.2,
        Rating: 7
      },
      {
        Title: "Megan Is Missing",
        Genre: "??????",
        Revenue: null,
        Rating: 4.9
      },
      {
        Title: "WALL??E",
        Genre: "??????",
        Revenue: 223.81,
        Rating: 8.4
      },
      {
        Title: "Knocked Up",
        Genre: "?????????",
        Revenue: 148.73,
        Rating: 7
      },
      {
        Title: "Source Code",
        Genre: "??????",
        Revenue: 54.7,
        Rating: 7.5
      },
      {
        Title: "Lawless",
        Genre: "????????????",
        Revenue: 37.4,
        Rating: 7.3
      },
      {
        Title: "Unfriended",
        Genre: "??????",
        Revenue: 31.54,
        Rating: 5.6
      },
      {
        Title: "American Reunion",
        Genre: "?????????",
        Revenue: 56.72,
        Rating: 6.7
      },
      {
        Title: "The Pursuit of Happyness",
        Genre: "??????",
        Revenue: 162.59,
        Rating: 8
      },
      {
        Title: "Relatos salvajes",
        Genre: "?????????",
        Revenue: 3.08,
        Rating: 8.1
      },
      {
        Title: "The Ridiculous 6",
        Genre: "?????????",
        Revenue: null,
        Rating: 4.8
      },
      {
        Title: "Frantz",
        Genre: "??????",
        Revenue: 0.86,
        Rating: 7.5
      },
      {
        Title: "Viral",
        Genre: "??????",
        Revenue: null,
        Rating: 5.5
      },
      {
        Title: "Gran Torino",
        Genre: "??????",
        Revenue: 148.09,
        Rating: 8.2
      },
      {
        Title: "Burnt",
        Genre: "?????????",
        Revenue: 13.65,
        Rating: 6.6
      },
      {
        Title: "Sleeping Beauty",
        Genre: "??????",
        Revenue: 0.03,
        Rating: 5.3
      },
      {
        Title: "Vampire Academy",
        Genre: "????????????",
        Revenue: 7.79,
        Rating: 5.6
      },
      {
        Title: "Sweeney Todd: The Demon Barber of Fleet Street",
        Genre: "??????",
        Revenue: 52.88,
        Rating: 7.4
      },
      {
        Title: "Solace",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.4
      },
      {
        Title: "Insidious",
        Genre: "?????????",
        Revenue: 53.99,
        Rating: 6.8
      },
      {
        Title: "Popstar: Never Stop Never Stopping",
        Genre: "?????????",
        Revenue: 9.39,
        Rating: 6.7
      },
      {
        Title: "The Levelling",
        Genre: "??????",
        Revenue: null,
        Rating: 6.4
      },
      {
        Title: "Public Enemies",
        Genre: "??????",
        Revenue: 97.03,
        Rating: 7
      },
      {
        Title: "Boyhood",
        Genre: "??????",
        Revenue: 25.36,
        Rating: 7.9
      },
      {
        Title: "Teenage Mutant Ninja Turtles",
        Genre: "????????????",
        Revenue: 190.87,
        Rating: 5.9
      },
      {
        Title: "Eastern Promises",
        Genre: "????????????",
        Revenue: 17.11,
        Rating: 7.7
      },
      {
        Title: "The Daughter",
        Genre: "??????",
        Revenue: 0.03,
        Rating: 6.7
      },
      {
        Title: "Pineapple Express",
        Genre: "????????????",
        Revenue: 87.34,
        Rating: 7
      },
      {
        Title: "The First Time",
        Genre: "?????????",
        Revenue: 0.02,
        Rating: 6.9
      },
      {
        Title: "Gone Baby Gone",
        Genre: "????????????",
        Revenue: 20.3,
        Rating: 7.7
      },
      {
        Title: "The Heat",
        Genre: "????????????",
        Revenue: 159.58,
        Rating: 6.6
      },
      {
        Title: "L'avenir",
        Genre: "??????",
        Revenue: 0.28,
        Rating: 7.1
      },
      {
        Title: "Anna Karenina",
        Genre: "??????",
        Revenue: 12.8,
        Rating: 6.6
      },
      {
        Title: "Regression",
        Genre: "????????????",
        Revenue: 0.05,
        Rating: 5.7
      },
      {
        Title: "Ted 2",
        Genre: "?????????",
        Revenue: 81.26,
        Rating: 6.3
      },
      {
        Title: "Pain & Gain",
        Genre: "?????????",
        Revenue: 49.87,
        Rating: 6.5
      },
      {
        Title: "Blood Diamond",
        Genre: "?????????",
        Revenue: 57.37,
        Rating: 8
      },
      {
        Title: "Devil's Knot",
        Genre: "??????",
        Revenue: null,
        Rating: 6.1
      },
      {
        Title: "Child 44",
        Genre: "????????????",
        Revenue: 1.21,
        Rating: 6.5
      },
      {
        Title: "The Hurt Locker",
        Genre: "??????",
        Revenue: 15.7,
        Rating: 7.6
      },
      {
        Title: "Green Lantern",
        Genre: "????????????",
        Revenue: 116.59,
        Rating: 5.6
      },
      {
        Title: "War on Everyone",
        Genre: "????????????",
        Revenue: null,
        Rating: 5.9
      },
      {
        Title: "The Mist",
        Genre: "?????????",
        Revenue: 25.59,
        Rating: 7.2
      },
      {
        Title: "Escape Plan",
        Genre: "????????????",
        Revenue: 25.12,
        Rating: 6.7
      },
      {
        Title: "Love, Rosie",
        Genre: "?????????",
        Revenue: 0.01,
        Rating: 7.2
      },
      {
        Title: "The DUFF",
        Genre: "?????????",
        Revenue: 34.02,
        Rating: 6.5
      },
      {
        Title: "The Age of Shadows",
        Genre: "????????????",
        Revenue: 0.54,
        Rating: 7.2
      },
      {
        Title: "The Hunger Games: Mockingjay - Part 1",
        Genre: "????????????",
        Revenue: 337.1,
        Rating: 6.7
      },
      {
        Title: "We Need to Talk About Kevin",
        Genre: "??????",
        Revenue: 1.74,
        Rating: 7.5
      },
      {
        Title: "Love & Friendship",
        Genre: "?????????",
        Revenue: 14.01,
        Rating: 6.5
      },
      {
        Title: "The Mortal Instruments: City of Bones",
        Genre: "????????????",
        Revenue: 31.17,
        Rating: 5.9
      },
      {
        Title: "Seven Pounds",
        Genre: "??????",
        Revenue: 69.95,
        Rating: 7.7
      },
      {
        Title: "The King's Speech",
        Genre: "??????",
        Revenue: 138.8,
        Rating: 8
      },
      {
        Title: "Hunger",
        Genre: "??????",
        Revenue: 0.15,
        Rating: 7.6
      },
      {
        Title: "Jumper",
        Genre: "????????????",
        Revenue: 80.17,
        Rating: 6.1
      },
      {
        Title: "Toy Story 3",
        Genre: "??????",
        Revenue: 414.98,
        Rating: 8.3
      },
      {
        Title: "Tinker Tailor Soldier Spy",
        Genre: "??????",
        Revenue: 24.1,
        Rating: 7.1
      },
      {
        Title: "Resident Evil: Retribution",
        Genre: "????????????",
        Revenue: 42.35,
        Rating: 5.4
      },
      {
        Title: "Dear Zindagi",
        Genre: "??????",
        Revenue: 1.4,
        Rating: 7.8
      },
      {
        Title: "Genius",
        Genre: "??????",
        Revenue: 1.36,
        Rating: 6.5
      },
      {
        Title: "Pompeii",
        Genre: "????????????",
        Revenue: 23.22,
        Rating: 5.5
      },
      {
        Title: "Life of Pi",
        Genre: "?????????",
        Revenue: 124.98,
        Rating: 7.9
      },
      {
        Title: "Hachi: A Dog's Tale",
        Genre: "??????",
        Revenue: null,
        Rating: 8.1
      },
      {
        Title: "10 Years",
        Genre: "?????????",
        Revenue: 0.2,
        Rating: 6.1
      },
      {
        Title: "I Origins",
        Genre: "??????",
        Revenue: 0.33,
        Rating: 7.3
      },
      {
        Title: "Live Free or Die Hard",
        Genre: "????????????",
        Revenue: 134.52,
        Rating: 7.2
      },
      {
        Title: "The Matchbreaker",
        Genre: "?????????",
        Revenue: null,
        Rating: 5.5
      },
      {
        Title: "Funny Games",
        Genre: "????????????",
        Revenue: 1.29,
        Rating: 6.5
      },
      {
        Title: "Ted",
        Genre: "?????????",
        Revenue: 218.63,
        Rating: 7
      },
      {
        Title: "RED",
        Genre: "????????????",
        Revenue: 90.36,
        Rating: 7.1
      },
      {
        Title: "Australia",
        Genre: "?????????",
        Revenue: 49.55,
        Rating: 6.6
      },
      {
        Title: "Faster",
        Genre: "????????????",
        Revenue: 23.23,
        Rating: 6.5
      },
      {
        Title: "The Neighbor",
        Genre: "????????????",
        Revenue: null,
        Rating: 5.8
      },
      {
        Title: "The Adjustment Bureau",
        Genre: "??????",
        Revenue: 62.45,
        Rating: 7.1
      },
      {
        Title: "The Hollars",
        Genre: "?????????",
        Revenue: 1.02,
        Rating: 6.5
      },
      {
        Title: "The Judge",
        Genre: "????????????",
        Revenue: 47.11,
        Rating: 7.4
      },
      {
        Title: "Closed Circuit",
        Genre: "????????????",
        Revenue: 5.73,
        Rating: 6.2
      },
      {
        Title: "Transformers: Revenge of the Fallen",
        Genre: "????????????",
        Revenue: 402.08,
        Rating: 6
      },
      {
        Title: "La tortue rouge",
        Genre: "??????",
        Revenue: 0.92,
        Rating: 7.6
      },
      {
        Title: "The Book of Life",
        Genre: "??????",
        Revenue: 50.15,
        Rating: 7.3
      },
      {
        Title: "Incendies",
        Genre: "??????",
        Revenue: 6.86,
        Rating: 8.2
      },
      {
        Title: "The Heartbreak Kid",
        Genre: "?????????",
        Revenue: 36.77,
        Rating: 5.8
      },
      {
        Title: "Happy Feet",
        Genre: "??????",
        Revenue: 197.99,
        Rating: 6.5
      },
      {
        Title: "Entourage",
        Genre: "?????????",
        Revenue: 32.36,
        Rating: 6.6
      },
      {
        Title: "The Strangers",
        Genre: "?????????",
        Revenue: 52.53,
        Rating: 6.2
      },
      {
        Title: "Noah",
        Genre: "????????????",
        Revenue: 101.16,
        Rating: 5.8
      },
      {
        Title: "Neighbors",
        Genre: "?????????",
        Revenue: 150.06,
        Rating: 6.4
      },
      {
        Title: "Nymphomaniac: Vol. II",
        Genre: "??????",
        Revenue: 0.33,
        Rating: 6.7
      },
      {
        Title: "Wild",
        Genre: "?????????",
        Revenue: 37.88,
        Rating: 7.1
      },
      {
        Title: "Grown Ups",
        Genre: "?????????",
        Revenue: 162,
        Rating: 6
      },
      {
        Title: "Blair Witch",
        Genre: "?????????",
        Revenue: 20.75,
        Rating: 5.1
      },
      {
        Title: "The Karate Kid",
        Genre: "????????????",
        Revenue: 176.59,
        Rating: 6.2
      },
      {
        Title: "Dark Shadows",
        Genre: "?????????",
        Revenue: 79.71,
        Rating: 6.2
      },
      {
        Title: "Friends with Benefits",
        Genre: "?????????",
        Revenue: 55.8,
        Rating: 6.6
      },
      {
        Title: "The Illusionist",
        Genre: "??????",
        Revenue: 39.83,
        Rating: 7.6
      },
      {
        Title: "The A-Team",
        Genre: "????????????",
        Revenue: 77.21,
        Rating: 6.8
      },
      {
        Title: "The Guest",
        Genre: "??????",
        Revenue: 0.32,
        Rating: 6.7
      },
      {
        Title: "The Internship",
        Genre: "?????????",
        Revenue: 44.67,
        Rating: 6.3
      },
      {
        Title: "Paul",
        Genre: "?????????",
        Revenue: 37.37,
        Rating: 7
      },
      {
        Title: "This Beautiful Fantastic",
        Genre: "?????????",
        Revenue: null,
        Rating: 6.9
      },
      {
        Title: "The Da Vinci Code",
        Genre: "??????",
        Revenue: 217.54,
        Rating: 6.6
      },
      {
        Title: "Mr. Church",
        Genre: "?????????",
        Revenue: 0.69,
        Rating: 7.7
      },
      {
        Title: "Hugo",
        Genre: "?????????",
        Revenue: 73.82,
        Rating: 7.5
      },
      {
        Title: "The Blackcoat's Daughter",
        Genre: "?????????",
        Revenue: 0.02,
        Rating: 5.6
      },
      {
        Title: "Body of Lies",
        Genre: "????????????",
        Revenue: 39.38,
        Rating: 7.1
      },
      {
        Title: "Knight of Cups",
        Genre: "??????",
        Revenue: 0.56,
        Rating: 5.7
      },
      {
        Title: "The Mummy: Tomb of the Dragon Emperor",
        Genre: "????????????",
        Revenue: 102.18,
        Rating: 5.2
      },
      {
        Title: "The Boss",
        Genre: "?????????",
        Revenue: 63.03,
        Rating: 5.4
      },
      {
        Title: "Hands of Stone",
        Genre: "????????????",
        Revenue: 4.71,
        Rating: 6.6
      },
      {
        Title: "El secreto de sus ojos",
        Genre: "??????",
        Revenue: 20.17,
        Rating: 8.2
      },
      {
        Title: "True Grit",
        Genre: "?????????",
        Revenue: 171.03,
        Rating: 7.6
      },
      {
        Title: "We Are Your Friends",
        Genre: "??????",
        Revenue: 3.59,
        Rating: 6.2
      },
      {
        Title: "A Million Ways to Die in the West",
        Genre: "?????????",
        Revenue: 42.62,
        Rating: 6.1
      },
      {
        Title: "Only for One Night",
        Genre: "??????",
        Revenue: null,
        Rating: 4.6
      },
      {
        Title: "Rules Don't Apply",
        Genre: "?????????",
        Revenue: 3.65,
        Rating: 5.7
      },
      {
        Title: "Ouija: Origin of Evil",
        Genre: "?????????",
        Revenue: 34.9,
        Rating: 6.1
      },
      {
        Title: "Percy Jackson: Sea of Monsters",
        Genre: "?????????",
        Revenue: 68.56,
        Rating: 5.9
      },
      {
        Title: "Fracture",
        Genre: "????????????",
        Revenue: 39,
        Rating: 7.2
      },
      {
        Title: "Oculus",
        Genre: "?????????",
        Revenue: 27.69,
        Rating: 6.5
      },
      {
        Title: "In Bruges",
        Genre: "?????????",
        Revenue: 7.76,
        Rating: 7.9
      },
      {
        Title: "This Means War",
        Genre: "????????????",
        Revenue: 54.76,
        Rating: 6.3
      },
      {
        Title: "L??da Baarov??",
        Genre: "??????",
        Revenue: null,
        Rating: 5
      },
      {
        Title: "The Road",
        Genre: "?????????",
        Revenue: 0.06,
        Rating: 7.3
      },
      {
        Title: "Lavender",
        Genre: "??????",
        Revenue: null,
        Rating: 5.2
      },
      {
        Title: "Deuces",
        Genre: "??????",
        Revenue: null,
        Rating: 6.6
      },
      {
        Title: "Conan the Barbarian",
        Genre: "????????????",
        Revenue: 21.27,
        Rating: 5.2
      },
      {
        Title: "The Fighter",
        Genre: "????????????",
        Revenue: 93.57,
        Rating: 7.8
      },
      {
        Title: "August Rush",
        Genre: "??????",
        Revenue: 31.66,
        Rating: 7.5
      },
      {
        Title: "Chef",
        Genre: "?????????",
        Revenue: 31.24,
        Rating: 7.3
      },
      {
        Title: "Eye in the Sky",
        Genre: "??????",
        Revenue: 18.7,
        Rating: 7.3
      },
      {
        Title: "Eagle Eye",
        Genre: "????????????",
        Revenue: 101.11,
        Rating: 6.6
      },
      {
        Title: "The Purge",
        Genre: "?????????",
        Revenue: 64.42,
        Rating: 5.7
      },
      {
        Title: "PK",
        Genre: "?????????",
        Revenue: 10.57,
        Rating: 8.2
      },
      {
        Title: "Ender's Game",
        Genre: "????????????",
        Revenue: 61.66,
        Rating: 6.7
      },
      {
        Title: "Indiana Jones and the Kingdom of the Crystal Skull",
        Genre: "????????????",
        Revenue: 317.01,
        Rating: 6.2
      },
      {
        Title: "Paper Towns",
        Genre: "??????",
        Revenue: 31.99,
        Rating: 6.3
      },
      {
        Title: "High-Rise",
        Genre: "??????",
        Revenue: 0.34,
        Rating: 5.7
      },
      {
        Title: "Quantum of Solace",
        Genre: "????????????",
        Revenue: 168.37,
        Rating: 6.6
      },
      {
        Title: "The Assignment",
        Genre: "????????????",
        Revenue: null,
        Rating: 4.5
      },
      {
        Title: "How to Train Your Dragon",
        Genre: "??????",
        Revenue: 217.39,
        Rating: 8.1
      },
      {
        Title: "Lady in the Water",
        Genre: "??????",
        Revenue: 42.27,
        Rating: 5.6
      },
      {
        Title: "The Fountain",
        Genre: "??????",
        Revenue: 10.14,
        Rating: 7.3
      },
      {
        Title: "Cars 2",
        Genre: "??????",
        Revenue: 191.45,
        Rating: 6.2
      },
      {
        Title: 31,
        Genre: "?????????",
        Revenue: 0.78,
        Rating: 5.1
      },
      {
        Title: "Final Girl",
        Genre: "????????????",
        Revenue: null,
        Rating: 4.7
      },
      {
        Title: "Chalk It Up",
        Genre: "?????????",
        Revenue: null,
        Rating: 4.8
      },
      {
        Title: "The Man Who Knew Infinity",
        Genre: "??????",
        Revenue: 3.86,
        Rating: 7.2
      },
      {
        Title: "Unknown",
        Genre: "????????????",
        Revenue: 61.09,
        Rating: 6.9
      },
      {
        Title: "Self/less",
        Genre: "????????????",
        Revenue: 12.28,
        Rating: 6.5
      },
      {
        Title: "Mr. Brooks",
        Genre: "????????????",
        Revenue: 28.48,
        Rating: 7.3
      },
      {
        Title: "Tramps",
        Genre: "?????????",
        Revenue: null,
        Rating: 6.5
      },
      {
        Title: "Before We Go",
        Genre: "?????????",
        Revenue: 0.04,
        Rating: 6.9
      },
      {
        Title: "Captain Phillips",
        Genre: "??????",
        Revenue: 107.1,
        Rating: 7.8
      },
      {
        Title: "The Secret Scripture",
        Genre: "??????",
        Revenue: null,
        Rating: 6.8
      },
      {
        Title: "Max Steel",
        Genre: "????????????",
        Revenue: 3.77,
        Rating: 4.6
      },
      {
        Title: "Hotel Transylvania 2",
        Genre: "??????",
        Revenue: 169.69,
        Rating: 6.7
      },
      {
        Title: "Hancock",
        Genre: "????????????",
        Revenue: 227.95,
        Rating: 6.4
      },
      {
        Title: "Sisters",
        Genre: "?????????",
        Revenue: 87.03,
        Rating: 6
      },
      {
        Title: "The Family",
        Genre: "?????????",
        Revenue: 36.92,
        Rating: 6.3
      },
      {
        Title: "Zack and Miri Make a Porno",
        Genre: "?????????",
        Revenue: 31.45,
        Rating: 6.6
      },
      {
        Title: "Ma vie de Courgette",
        Genre: "??????",
        Revenue: 0.29,
        Rating: 7.8
      },
      {
        Title: "Man on a Ledge",
        Genre: "????????????",
        Revenue: 18.6,
        Rating: 6.6
      },
      {
        Title: "No Strings Attached",
        Genre: "?????????",
        Revenue: 70.63,
        Rating: 6.2
      },
      {
        Title: "Rescue Dawn",
        Genre: "?????????",
        Revenue: 5.48,
        Rating: 7.3
      },
      {
        Title: "Despicable Me 2",
        Genre: "??????",
        Revenue: 368.05,
        Rating: 7.4
      },
      {
        Title: "A Walk Among the Tombstones",
        Genre: "????????????",
        Revenue: 25.98,
        Rating: 6.5
      },
      {
        Title: "The World's End",
        Genre: "????????????",
        Revenue: 26,
        Rating: 7
      },
      {
        Title: "Yoga Hosers",
        Genre: "?????????",
        Revenue: null,
        Rating: 4.3
      },
      {
        Title: "Seven Psychopaths",
        Genre: "?????????",
        Revenue: 14.99,
        Rating: 7.2
      },
      {
        Title: "Beowulf",
        Genre: "??????",
        Revenue: 82.16,
        Rating: 6.2
      },
      {
        Title: "Jack Ryan: Shadow Recruit",
        Genre: "????????????",
        Revenue: 50.55,
        Rating: 6.2
      },
      {
        Title: "The Gambler",
        Genre: "????????????",
        Revenue: 33.63,
        Rating: 6
      },
      {
        Title: "Prince of Persia: The Sands of Time",
        Genre: "????????????",
        Revenue: 90.76,
        Rating: 6.6
      },
      {
        Title: "The Spectacular Now",
        Genre: "?????????",
        Revenue: 6.85,
        Rating: 7.1
      },
      {
        Title: "A United Kingdom",
        Genre: "??????",
        Revenue: 3.9,
        Rating: 6.8
      },
      {
        Title: "USS Indianapolis: Men of Courage",
        Genre: "????????????",
        Revenue: null,
        Rating: 5.2
      },
      {
        Title: "Turbo Kid",
        Genre: "????????????",
        Revenue: 0.05,
        Rating: 6.7
      },
      {
        Title: "Mama",
        Genre: "?????????",
        Revenue: 71.59,
        Rating: 6.2
      },
      {
        Title: "Orphan",
        Genre: "?????????",
        Revenue: 41.57,
        Rating: 7
      },
      {
        Title: "To Rome with Love",
        Genre: "?????????",
        Revenue: 16.68,
        Rating: 6.3
      },
      {
        Title: "Fantastic Mr. Fox",
        Genre: "??????",
        Revenue: 21,
        Rating: 7.8
      },
      {
        Title: "Inside Man",
        Genre: "????????????",
        Revenue: 88.5,
        Rating: 7.6
      },
      {
        Title: "I.T.",
        Genre: "????????????",
        Revenue: null,
        Rating: 5.4
      },
      {
        Title: "127 Hours",
        Genre: "?????????",
        Revenue: 18.33,
        Rating: 7.6
      },
      {
        Title: "Annabelle",
        Genre: "?????????",
        Revenue: 84.26,
        Rating: 5.4
      },
      {
        Title: "Wolves at the Door",
        Genre: "?????????",
        Revenue: null,
        Rating: 4.6
      },
      {
        Title: "Suite Fran??aise",
        Genre: "??????",
        Revenue: null,
        Rating: 6.9
      },
      {
        Title: "The Imaginarium of Doctor Parnassus",
        Genre: "?????????",
        Revenue: 7.69,
        Rating: 6.8
      },
      {
        Title: "G.I. Joe: The Rise of Cobra",
        Genre: "????????????",
        Revenue: 150.17,
        Rating: 5.8
      },
      {
        Title: "Christine",
        Genre: "??????",
        Revenue: 0.3,
        Rating: 7
      },
      {
        Title: "Man Down",
        Genre: "??????",
        Revenue: null,
        Rating: 5.8
      },
      {
        Title: "Crawlspace",
        Genre: "?????????",
        Revenue: null,
        Rating: 5.3
      },
      {
        Title: "Shut In",
        Genre: "??????",
        Revenue: 6.88,
        Rating: 4.6
      },
      {
        Title: "The Warriors Gate",
        Genre: "????????????",
        Revenue: null,
        Rating: 5.3
      },
      {
        Title: "Grindhouse",
        Genre: "????????????",
        Revenue: 25.03,
        Rating: 7.6
      },
      {
        Title: "Disaster Movie",
        Genre: "?????????",
        Revenue: 14.17,
        Rating: 1.9
      },
      {
        Title: "Rocky Balboa",
        Genre: "??????",
        Revenue: 70.27,
        Rating: 7.2
      },
      {
        Title: "Diary of a Wimpy Kid: Dog Days",
        Genre: "?????????",
        Revenue: 49,
        Rating: 6.4
      },
      {
        Title: "Jane Eyre",
        Genre: "??????",
        Revenue: 11.23,
        Rating: 7.4
      },
      {
        Title: "Fool's Gold",
        Genre: "????????????",
        Revenue: 70.22,
        Rating: 5.7
      },
      {
        Title: "The Dictator",
        Genre: "?????????",
        Revenue: 59.62,
        Rating: 6.4
      },
      {
        Title: "The Loft",
        Genre: "??????",
        Revenue: 5.98,
        Rating: 6.3
      },
      {
        Title: "Bacalaureat",
        Genre: "????????????",
        Revenue: 0.13,
        Rating: 7.5
      },
      {
        Title: "You Don't Mess with the Zohan",
        Genre: "????????????",
        Revenue: 100.02,
        Rating: 5.5
      },
      {
        Title: "Exposed",
        Genre: "????????????",
        Revenue: null,
        Rating: 4.2
      },
      {
        Title: "Maudie",
        Genre: "??????",
        Revenue: null,
        Rating: 7.8
      },
      {
        Title: "Horrible Bosses 2",
        Genre: "?????????",
        Revenue: 54.41,
        Rating: 6.3
      },
      {
        Title: "A Bigger Splash",
        Genre: "??????",
        Revenue: 1.98,
        Rating: 6.4
      },
      {
        Title: "Melancholia",
        Genre: "??????",
        Revenue: 3.03,
        Rating: 7.1
      },
      {
        Title: "The Princess and the Frog",
        Genre: "??????",
        Revenue: 104.37,
        Rating: 7.1
      },
      {
        Title: "Unstoppable",
        Genre: "????????????",
        Revenue: 81.56,
        Rating: 6.8
      },
      {
        Title: "Flight",
        Genre: "??????",
        Revenue: 93.75,
        Rating: 7.3
      },
      {
        Title: "Home",
        Genre: "??????",
        Revenue: 177.34,
        Rating: 6.7
      },
      {
        Title: "La migliore offerta",
        Genre: "????????????",
        Revenue: 0.09,
        Rating: 7.8
      },
      {
        Title: "Mean Dreams",
        Genre: "??????",
        Revenue: null,
        Rating: 6.3
      },
      {
        Title: 42,
        Genre: "??????",
        Revenue: 95,
        Rating: 7.5
      },
      {
        Title: 21,
        Genre: "????????????",
        Revenue: 81.16,
        Rating: 6.8
      },
      {
        Title: "Begin Again",
        Genre: "??????",
        Revenue: 16.17,
        Rating: 7.4
      },
      {
        Title: "Out of the Furnace",
        Genre: "????????????",
        Revenue: 11.33,
        Rating: 6.8
      },
      {
        Title: "Vicky Cristina Barcelona",
        Genre: "??????",
        Revenue: 23.21,
        Rating: 7.1
      },
      {
        Title: "Kung Fu Panda",
        Genre: "??????",
        Revenue: 215.4,
        Rating: 7.6
      },
      {
        Title: "Barbershop: The Next Cut",
        Genre: "?????????",
        Revenue: 54.01,
        Rating: 5.9
      },
      {
        Title: "Terminator Salvation",
        Genre: "????????????",
        Revenue: 125.32,
        Rating: 6.6
      },
      {
        Title: "Freedom Writers",
        Genre: "??????",
        Revenue: 36.58,
        Rating: 7.5
      },
      {
        Title: "The Hills Have Eyes",
        Genre: "?????????",
        Revenue: 41.78,
        Rating: 6.4
      },
      {
        Title: "Changeling",
        Genre: "??????",
        Revenue: 35.71,
        Rating: 7.8
      },
      {
        Title: "Remember Me",
        Genre: "??????",
        Revenue: 19.06,
        Rating: 7.2
      },
      {
        Title: "Koe no katachi",
        Genre: "??????",
        Revenue: null,
        Rating: 8.4
      },
      {
        Title: "Alexander and the Terrible, Horrible, No Good, Very Bad Day",
        Genre: "?????????",
        Revenue: 66.95,
        Rating: 6.2
      },
      {
        Title: "Locke",
        Genre: "??????",
        Revenue: 1.36,
        Rating: 7.1
      },
      {
        Title: "The 9th Life of Louis Drax",
        Genre: "??????",
        Revenue: null,
        Rating: 6.3
      },
      {
        Title: "Horns",
        Genre: "??????",
        Revenue: 0.16,
        Rating: 6.5
      },
      {
        Title: "Indignation",
        Genre: "??????",
        Revenue: 3.4,
        Rating: 6.9
      },
      {
        Title: "The Stanford Prison Experiment",
        Genre: "??????",
        Revenue: 0.64,
        Rating: 6.9
      },
      {
        Title: "Diary of a Wimpy Kid: Rodrick Rules",
        Genre: "?????????",
        Revenue: 52.69,
        Rating: 6.6
      },
      {
        Title: "Mission: Impossible III",
        Genre: "????????????",
        Revenue: 133.38,
        Rating: 6.9
      },
      {
        Title: "En man som heter Ove",
        Genre: "?????????",
        Revenue: 3.36,
        Rating: 7.7
      },
      {
        Title: "Dragonball Evolution",
        Genre: "????????????",
        Revenue: 9.35,
        Rating: 2.7
      },
      {
        Title: "Red Dawn",
        Genre: "????????????",
        Revenue: 44.8,
        Rating: 5.4
      },
      {
        Title: "One Day",
        Genre: "??????",
        Revenue: 13.77,
        Rating: 7
      },
      {
        Title: "Life as We Know It",
        Genre: "?????????",
        Revenue: 53.36,
        Rating: 6.6
      },
      {
        Title: "28 Weeks Later",
        Genre: "??????",
        Revenue: 28.64,
        Rating: 7
      },
      {
        Title: "Warm Bodies",
        Genre: "?????????",
        Revenue: 66.36,
        Rating: 6.9
      },
      {
        Title: "Blue Jasmine",
        Genre: "??????",
        Revenue: 33.4,
        Rating: 7.3
      },
      {
        Title: "G.I. Joe: Retaliation",
        Genre: "????????????",
        Revenue: 122.51,
        Rating: 5.8
      },
      {
        Title: "Wrath of the Titans",
        Genre: "????????????",
        Revenue: 83.64,
        Rating: 5.8
      },
      {
        Title: "Shin Gojira",
        Genre: "????????????",
        Revenue: 1.91,
        Rating: 6.9
      },
      {
        Title: "Saving Mr. Banks",
        Genre: "??????",
        Revenue: 83.3,
        Rating: 7.5
      },
      {
        Title: "Transcendence",
        Genre: "??????",
        Revenue: 23.01,
        Rating: 6.3
      },
      {
        Title: "Rio",
        Genre: "??????",
        Revenue: 143.62,
        Rating: 6.9
      },
      {
        Title: "Equals",
        Genre: "??????",
        Revenue: 0.03,
        Rating: 6.1
      },
      {
        Title: "Babel",
        Genre: "??????",
        Revenue: 34.3,
        Rating: 7.5
      },
      {
        Title: "The Tree of Life",
        Genre: "??????",
        Revenue: 13.3,
        Rating: 6.8
      },
      {
        Title: "The Lucky One",
        Genre: "??????",
        Revenue: 60.44,
        Rating: 6.5
      },
      {
        Title: "Piranha 3D",
        Genre: "?????????",
        Revenue: 25,
        Rating: 5.5
      },
      {
        Title: "50/50",
        Genre: "?????????",
        Revenue: 34.96,
        Rating: 7.7
      },
      {
        Title: "The Intent",
        Genre: "????????????",
        Revenue: null,
        Rating: 3.5
      },
      {
        Title: "This Is 40",
        Genre: "?????????",
        Revenue: 67.52,
        Rating: 6.2
      },
      {
        Title: "Real Steel",
        Genre: "????????????",
        Revenue: 85.46,
        Rating: 7.1
      },
      {
        Title: "Sex and the City",
        Genre: "?????????",
        Revenue: 152.64,
        Rating: 5.5
      },
      {
        Title: "Rambo",
        Genre: "????????????",
        Revenue: 42.72,
        Rating: 7.1
      },
      {
        Title: "Planet Terror",
        Genre: "????????????",
        Revenue: null,
        Rating: 7.1
      },
      {
        Title: "Concussion",
        Genre: "??????",
        Revenue: 34.53,
        Rating: 7.1
      },
      {
        Title: "The Fall",
        Genre: "?????????",
        Revenue: 2.28,
        Rating: 7.9
      },
      {
        Title: "The Ugly Truth",
        Genre: "?????????",
        Revenue: 88.92,
        Rating: 6.5
      },
      {
        Title: "Bride Wars",
        Genre: "?????????",
        Revenue: 58.72,
        Rating: 5.5
      },
      {
        Title: "Sleeping with ?????? People",
        Genre: "?????????",
        Revenue: 0.81,
        Rating: 6.5
      },
      {
        Title: "Snakes on a Plane",
        Genre: "????????????",
        Revenue: 34.01,
        Rating: 5.6
      },
      {
        Title: "What If",
        Genre: "?????????",
        Revenue: 3.45,
        Rating: 6.8
      },
      {
        Title: "How to Train Your Dragon 2",
        Genre: "??????",
        Revenue: 177,
        Rating: 7.9
      },
      {
        Title: "RoboCop",
        Genre: "????????????",
        Revenue: 58.61,
        Rating: 6.2
      },
      {
        Title: "In Dubious Battle",
        Genre: "??????",
        Revenue: null,
        Rating: 6.2
      },
      {
        Title: "Hello, My Name Is Doris",
        Genre: "?????????",
        Revenue: 14.44,
        Rating: 6.7
      },
      {
        Title: "Ocean's Thirteen",
        Genre: "????????????",
        Revenue: 117.14,
        Rating: 6.9
      },
      {
        Title: "Slither",
        Genre: "?????????",
        Revenue: 7.77,
        Rating: 6.5
      },
      {
        Title: "Contagion",
        Genre: "??????",
        Revenue: 75.64,
        Rating: 6.6
      },
      {
        Title: "Il racconto dei racconti - Tale of Tales",
        Genre: "??????",
        Revenue: 0.08,
        Rating: 6.4
      },
      {
        Title: "I Am the Pretty Thing That Lives in the House",
        Genre: "??????",
        Revenue: null,
        Rating: 4.7
      },
      {
        Title: "Bridge to Terabithia",
        Genre: "?????????",
        Revenue: 82.23,
        Rating: 7.2
      },
      {
        Title: "Coherence",
        Genre: "??????",
        Revenue: 0.07,
        Rating: 7.2
      },
      {
        Title: "Notorious",
        Genre: "??????",
        Revenue: 36.84,
        Rating: 6.7
      },
      {
        Title: "Goksung",
        Genre: "??????",
        Revenue: 0.79,
        Rating: 7.5
      },
      {
        Title: "The Expendables 2",
        Genre: "????????????",
        Revenue: 85.02,
        Rating: 6.6
      },
      {
        Title: "The Girl Next Door",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.7
      },
      {
        Title: "Perfume: The Story of a Murderer",
        Genre: "????????????",
        Revenue: 2.21,
        Rating: 7.5
      },
      {
        Title: "The Golden Compass",
        Genre: "?????????",
        Revenue: 70.08,
        Rating: 6.1
      },
      {
        Title: "Centurion",
        Genre: "????????????",
        Revenue: 0.12,
        Rating: 6.4
      },
      {
        Title: "Scouts Guide to the Zombie Apocalypse",
        Genre: "????????????",
        Revenue: 3.64,
        Rating: 6.3
      },
      {
        Title: "17 Again",
        Genre: "?????????",
        Revenue: 64.15,
        Rating: 6.4
      },
      {
        Title: "No Escape",
        Genre: "????????????",
        Revenue: 27.29,
        Rating: 6.8
      },
      {
        Title: "Superman Returns",
        Genre: "????????????",
        Revenue: 200.07,
        Rating: 6.1
      },
      {
        Title: "The Twilight Saga: Breaking Dawn - Part 1",
        Genre: "?????????",
        Revenue: 281.28,
        Rating: 4.9
      },
      {
        Title: "Precious",
        Genre: "??????",
        Revenue: 47.54,
        Rating: 7.3
      },
      {
        Title: "The Sea of Trees",
        Genre: "??????",
        Revenue: 0.02,
        Rating: 5.9
      },
      {
        Title: "Good Kids",
        Genre: "?????????",
        Revenue: null,
        Rating: 6.1
      },
      {
        Title: "The Master",
        Genre: "??????",
        Revenue: 16.38,
        Rating: 7.1
      },
      {
        Title: "Footloose",
        Genre: "?????????",
        Revenue: 51.78,
        Rating: 5.9
      },
      {
        Title: "If I Stay",
        Genre: "??????",
        Revenue: 50.46,
        Rating: 6.8
      },
      {
        Title: "The Ticket",
        Genre: "??????",
        Revenue: null,
        Rating: 5.4
      },
      {
        Title: "Detour",
        Genre: "??????",
        Revenue: null,
        Rating: 6.3
      },
      {
        Title: "The Love Witch",
        Genre: "?????????",
        Revenue: 0.22,
        Rating: 6.2
      },
      {
        Title: "Talladega Nights: The Ballad of Ricky Bobby",
        Genre: "????????????",
        Revenue: 148.21,
        Rating: 6.6
      },
      {
        Title: "The Human Centipede (First Sequence)",
        Genre: "?????????",
        Revenue: 0.18,
        Rating: 4.4
      },
      {
        Title: "Super",
        Genre: "?????????",
        Revenue: 0.32,
        Rating: 6.8
      },
      {
        Title: "The Siege of Jadotville",
        Genre: "????????????",
        Revenue: null,
        Rating: 7.3
      },
      {
        Title: "Up in the Air",
        Genre: "??????",
        Revenue: 83.81,
        Rating: 7.4
      },
      {
        Title: "The Midnight Meat Train",
        Genre: "?????????",
        Revenue: 0.07,
        Rating: 6.1
      },
      {
        Title: "The Twilight Saga: Eclipse",
        Genre: "?????????",
        Revenue: 300.52,
        Rating: 4.9
      },
      {
        Title: "Transpecos",
        Genre: "??????",
        Revenue: null,
        Rating: 5.8
      },
      {
        Title: "What's Your Number?",
        Genre: "?????????",
        Revenue: 13.99,
        Rating: 6.1
      },
      {
        Title: "Riddick",
        Genre: "????????????",
        Revenue: 42,
        Rating: 6.4
      },
      {
        Title: "The Butler",
        Genre: "??????",
        Revenue: 116.63,
        Rating: 7.2
      },
      {
        Title: "King Cobra",
        Genre: "????????????",
        Revenue: 0.03,
        Rating: 5.6
      },
      {
        Title: "After Earth",
        Genre: "????????????",
        Revenue: 60.52,
        Rating: 4.9
      },
      {
        Title: "Kicks",
        Genre: "?????????",
        Revenue: 0.15,
        Rating: 6.1
      },
      {
        Title: "Me and Earl and the Dying Girl",
        Genre: "?????????",
        Revenue: 6.74,
        Rating: 7.8
      },
      {
        Title: "The Descendants",
        Genre: "?????????",
        Revenue: 82.62,
        Rating: 7.3
      },
      {
        Title: "Sex and the City 2",
        Genre: "?????????",
        Revenue: 95.33,
        Rating: 4.3
      },
      {
        Title: "The Kings of Summer",
        Genre: "?????????",
        Revenue: 1.29,
        Rating: 7.2
      },
      {
        Title: "Death Race",
        Genre: "????????????",
        Revenue: 36.06,
        Rating: 6.4
      },
      {
        Title: "That Awkward Moment",
        Genre: "?????????",
        Revenue: 26.05,
        Rating: 6.2
      },
      {
        Title: "Legion",
        Genre: "????????????",
        Revenue: 40.17,
        Rating: 5.2
      },
      {
        Title: "End of Watch",
        Genre: "????????????",
        Revenue: 40.98,
        Rating: 7.7
      },
      {
        Title: "3 Days to Kill",
        Genre: "????????????",
        Revenue: 30.69,
        Rating: 6.2
      },
      {
        Title: "Lucky Number Slevin",
        Genre: "????????????",
        Revenue: 22.49,
        Rating: 7.8
      },
      {
        Title: "Trance",
        Genre: "????????????",
        Revenue: 2.32,
        Rating: 7
      },
      {
        Title: "Into the Forest",
        Genre: "??????",
        Revenue: 0.01,
        Rating: 5.9
      },
      {
        Title: "The ?????? Boleyn Girl",
        Genre: "??????",
        Revenue: 26.81,
        Rating: 6.7
      },
      {
        Title: "I Spit on Your Grave",
        Genre: "????????????",
        Revenue: 0.09,
        Rating: 6.3
      },
      {
        Title: "Custody",
        Genre: "??????",
        Revenue: null,
        Rating: 6.9
      },
      {
        Title: "Inland Empire",
        Genre: "??????",
        Revenue: null,
        Rating: 7
      },
      {
        Title: "L'odyss??e",
        Genre: "?????????",
        Revenue: null,
        Rating: 6.7
      },
      {
        Title: "The Walk",
        Genre: "?????????",
        Revenue: 10.14,
        Rating: 7.3
      },
      {
        Title: "Wrecker",
        Genre: "????????????",
        Revenue: null,
        Rating: 3.5
      },
      {
        Title: "The Lone Ranger",
        Genre: "????????????",
        Revenue: 89.29,
        Rating: 6.5
      },
      {
        Title: "Texas Chainsaw 3D",
        Genre: "?????????",
        Revenue: 34.33,
        Rating: 4.8
      },
      {
        Title: "Disturbia",
        Genre: "??????",
        Revenue: 80.05,
        Rating: 6.9
      },
      {
        Title: "Rock of Ages",
        Genre: "?????????",
        Revenue: 38.51,
        Rating: 5.9
      },
      {
        Title: "Scream 4",
        Genre: "?????????",
        Revenue: 38.18,
        Rating: 6.2
      },
      {
        Title: "Queen of Katwe",
        Genre: "??????",
        Revenue: 8.81,
        Rating: 7.4
      },
      {
        Title: "My Big Fat Greek Wedding 2",
        Genre: "?????????",
        Revenue: 59.57,
        Rating: 6
      },
      {
        Title: "Dark Places",
        Genre: "??????",
        Revenue: null,
        Rating: 6.2
      },
      {
        Title: "Amateur Night",
        Genre: "?????????",
        Revenue: null,
        Rating: 5
      },
      {
        Title: "It's Only the End of the World",
        Genre: "??????",
        Revenue: null,
        Rating: 7
      },
      {
        Title: "The Skin I Live In",
        Genre: "??????",
        Revenue: 3.19,
        Rating: 7.6
      },
      {
        Title: "Miracles from Heaven",
        Genre: "??????",
        Revenue: 61.69,
        Rating: 7
      },
      {
        Title: "Annie",
        Genre: "?????????",
        Revenue: 85.91,
        Rating: 5.3
      },
      {
        Title: "Across the Universe",
        Genre: "??????",
        Revenue: 24.34,
        Rating: 7.4
      },
      {
        Title: "Let's Be Cops",
        Genre: "?????????",
        Revenue: 82.39,
        Rating: 6.5
      },
      {
        Title: "Max",
        Genre: "?????????",
        Revenue: 42.65,
        Rating: 6.8
      },
      {
        Title: "Your Highness",
        Genre: "?????????",
        Revenue: 21.56,
        Rating: 5.6
      },
      {
        Title: "Final Destination 5",
        Genre: "?????????",
        Revenue: 42.58,
        Rating: 5.9
      },
      {
        Title: "Endless Love",
        Genre: "??????",
        Revenue: 23.39,
        Rating: 6.3
      },
      {
        Title: "Martyrs",
        Genre: "?????????",
        Revenue: null,
        Rating: 7.1
      },
      {
        Title: "Selma",
        Genre: "??????",
        Revenue: 52.07,
        Rating: 7.5
      },
      {
        Title: "Underworld: Rise of the Lycans",
        Genre: "????????????",
        Revenue: 45.8,
        Rating: 6.6
      },
      {
        Title: "Taare Zameen Par",
        Genre: "??????",
        Revenue: 1.2,
        Rating: 8.5
      },
      {
        Title: "Take Me Home Tonight",
        Genre: "?????????",
        Revenue: 6.92,
        Rating: 6.3
      },
      {
        Title: "Resident Evil: Afterlife",
        Genre: "????????????",
        Revenue: 60.13,
        Rating: 5.9
      },
      {
        Title: "Project X",
        Genre: "?????????",
        Revenue: 54.72,
        Rating: 6.7
      },
      {
        Title: "Secret in Their Eyes",
        Genre: "????????????",
        Revenue: null,
        Rating: 6.2
      },
      {
        Title: "Hostel: Part II",
        Genre: "?????????",
        Revenue: 17.54,
        Rating: 5.5
      },
      {
        Title: "Step Up 2: The Streets",
        Genre: "??????",
        Revenue: 58.01,
        Rating: 6.2
      },
      {
        Title: "Search Party",
        Genre: "?????????",
        Revenue: null,
        Rating: 5.6
      },
      {
        Title: "Nine Lives",
        Genre: "?????????",
        Revenue: 19.64,
        Rating: 5.3
      }
    ];*/
    const config = {
      /*
      appendPadding: 10,
      data,
      xField: 'Revenue',// (Millions)
      yField: 'Rating',
      shape: 'circle',
      colorField: 'Genre',
      size: 4,
      */
      appendPadding: 30,
      data,
      xField: 'xG conceded',
      yField: 'Shot conceded',
      colorField: 'Result',
      size: 5,
      shape: 'circle',
      pointStyle: {
        fillOpacity: 1,
      },
      yAxis: {
        nice: true,
        line: {
          style: {
            stroke: '#aaa',
          },
        },
      },
      xAxis: {
        min: 0,
        grid: {
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
        line: {
          style: {
            stroke: '#aaa',
          },
        },
      },
    };
  
    return <Scatter {...config} />;
  };
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
      { "country": "????????????", "date": 1965, "value": 1390.5 },
      { "country": "????????????", "date": 1966, "value": 1469.5 },
      { "country": "????????????", "date": 1967, "value": 1521.7 },
      { "country": "????????????", "date": 1968, "value": 1615.9 },
      { "country": "????????????", "date": 1969, "value": 1703.7 },
      { "country": "????????????", "date": 1970, "value": 1767.8 },
      { "country": "????????????", "date": 1971, "value": 1806.2 },
      { "country": "????????????", "date": 1972, "value": 1903.5 },
      { "country": "????????????", "date": 1973, "value": 1986.6 },
      { "country": "????????????", "date": 1974, "value": 1952 },
      { "country": "????????????", "date": 1975, "value": 1910.4 },
      { "country": "????????????", "date": 1976, "value": 2015.8 },
      { "country": "????????????", "date": 1977, "value": 2074.7 },
      { "country": "????????????", "date": 1978, "value": 2092.7 },
      { "country": "????????????", "date": 1979, "value": 2123.8 },
      { "country": "????????????", "date": 1980, "value": 2068.3 },
      { "country": "????????????", "date": 1981, "value": 2018 },
      { "country": "????????????", "date": 1982, "value": 1951.5 },
      { "country": "????????????", "date": 1983, "value": 1941.1 },
      { "country": "????????????", "date": 1984, "value": 2046.2 },
      { "country": "????????????", "date": 1985, "value": 2053.1 },
      { "country": "????????????", "date": 1986, "value": 2060.7 },
      { "country": "????????????", "date": 1987, "value": 2130.8 },
      { "country": "????????????", "date": 1988, "value": 2223.5 },
      { "country": "????????????", "date": 1989, "value": 2275.9 },
      { "country": "????????????", "date": 1990, "value": 2280.7 },
      { "country": "????????????", "date": 1991, "value": 2282 },
      { "country": "????????????", "date": 1992, "value": 2319.7 },
      { "country": "????????????", "date": 1993, "value": 2366.6 },
      { "country": "????????????", "date": 1994, "value": 2420.2 },
      { "country": "????????????", "date": 1995, "value": 2466.9 },
      { "country": "????????????", "date": 1996, "value": 2547.4 },
      { "country": "????????????", "date": 1997, "value": 2569 },
      { "country": "????????????", "date": 1998, "value": 2585.2 },
      { "country": "????????????", "date": 1999, "value": 2633.8 },
      { "country": "????????????", "date": 2000, "value": 2699.4 },
      { "country": "????????????", "date": 2001, "value": 2640.1 },
      { "country": "????????????", "date": 2002, "value": 2687.7 },
      { "country": "????????????", "date": 2003, "value": 2700.7 },
      { "country": "????????????", "date": 2004, "value": 2759.4 },
      { "country": "????????????", "date": 2005, "value": 2775.6 },
      { "country": "????????????", "date": 2006, "value": 2761.9 },
      { "country": "????????????", "date": 2007, "value": 2809.5 },
      { "country": "????????????", "date": 2008, "value": 2759.4 },
      { "country": "????????????", "date": 2009, "value": 2632.5 },
      { "country": "????????????", "date": 2010, "value": 2720.7 },
      { "country": "????????????", "date": 2011, "value": 2722.9 },
      { "country": "????????????", "date": 2012, "value": 2665.1 },
      { "country": "????????????", "date": 2013, "value": 2738.3 },
      { "country": "????????????", "date": 2014, "value": 2766.8 },
      { "country": "????????????", "date": 2015, "value": 2739.7 },
      { "country": "????????????", "date": 2016, "value": 2761.9 },
      { "country": "????????????", "date": 2017, "value": 2772.8 },
      { "country": "????????????", "date": 1965, "value": 109.2 },
      { "country": "????????????", "date": 1966, "value": 115.7 },
      { "country": "????????????", "date": 1967, "value": 120.5 },
      { "country": "????????????", "date": 1968, "value": 128 },
      { "country": "????????????", "date": 1969, "value": 134.4 },
      { "country": "????????????", "date": 1970, "value": 142.2 },
      { "country": "????????????", "date": 1971, "value": 157.5 },
      { "country": "????????????", "date": 1972, "value": 169.5 },
      { "country": "????????????", "date": 1973, "value": 186.3 },
      { "country": "????????????", "date": 1974, "value": 195.5 },
      { "country": "????????????", "date": 1975, "value": 198 },
      { "country": "????????????", "date": 1976, "value": 211.7 },
      { "country": "????????????", "date": 1977, "value": 223.8 },
      { "country": "????????????", "date": 1978, "value": 236.5 },
      { "country": "????????????", "date": 1979, "value": 251.8 },
      { "country": "????????????", "date": 1980, "value": 262.9 },
      { "country": "????????????", "date": 1981, "value": 262.7 },
      { "country": "????????????", "date": 1982, "value": 265.9 },
      { "country": "????????????", "date": 1983, "value": 268.3 },
      { "country": "????????????", "date": 1984, "value": 278.3 },
      { "country": "????????????", "date": 1985, "value": 285.2 },
      { "country": "????????????", "date": 1986, "value": 304.2 },
      { "country": "????????????", "date": 1987, "value": 315.4 },
      { "country": "????????????", "date": 1988, "value": 324.6 },
      { "country": "????????????", "date": 1989, "value": 329.9 },
      { "country": "????????????", "date": 1990, "value": 331.1 },
      { "country": "????????????", "date": 1991, "value": 339.7 },
      { "country": "????????????", "date": 1992, "value": 355.8 },
      { "country": "????????????", "date": 1993, "value": 368.8 },
      { "country": "????????????", "date": 1994, "value": 390.9 },
      { "country": "????????????", "date": 1995, "value": 408.3 },
      { "country": "????????????", "date": 1996, "value": 425.8 },
      { "country": "????????????", "date": 1997, "value": 448.2 },
      { "country": "????????????", "date": 1998, "value": 465.5 },
      { "country": "????????????", "date": 1999, "value": 463.7 },
      { "country": "????????????", "date": 2000, "value": 476.1 },
      { "country": "????????????", "date": 2001, "value": 477.7 },
      { "country": "????????????", "date": 2002, "value": 483.5 },
      { "country": "????????????", "date": 2003, "value": 489.3 },
      { "country": "????????????", "date": 2004, "value": 515.5 },
      { "country": "????????????", "date": 2005, "value": 533.6 },
      { "country": "????????????", "date": 2006, "value": 564 },
      { "country": "????????????", "date": 2007, "value": 587 },
      { "country": "????????????", "date": 2008, "value": 605.8 },
      { "country": "????????????", "date": 2009, "value": 596.8 },
      { "country": "????????????", "date": 2010, "value": 632.5 },
      { "country": "????????????", "date": 2011, "value": 658.9 },
      { "country": "????????????", "date": 2012, "value": 676.5 },
      { "country": "????????????", "date": 2013, "value": 692 },
      { "country": "????????????", "date": 2014, "value": 697.7 },
      { "country": "????????????", "date": 2015, "value": 701.1 },
      { "country": "????????????", "date": 2016, "value": 696.8 },
      { "country": "????????????", "date": 2017, "value": 700.6 },
      { "country": "????????????", "date": 1965, "value": 1058.1 },
      { "country": "????????????", "date": 1966, "value": 1089.7 },
      { "country": "????????????", "date": 1967, "value": 1121.7 },
      { "country": "????????????", "date": 1968, "value": 1196.6 },
      { "country": "????????????", "date": 1969, "value": 1285.5 },
      { "country": "????????????", "date": 1970, "value": 1369 },
      { "country": "????????????", "date": 1971, "value": 1406.2 },
      { "country": "????????????", "date": 1972, "value": 1472.7 },
      { "country": "????????????", "date": 1973, "value": 1558 },
      { "country": "????????????", "date": 1974, "value": 1535.5 },
      { "country": "????????????", "date": 1975, "value": 1519.3 },
      { "country": "????????????", "date": 1976, "value": 1606.9 },
      { "country": "????????????", "date": 1977, "value": 1632.4 },
      { "country": "????????????", "date": 1978, "value": 1687.5 },
      { "country": "????????????", "date": 1979, "value": 1749.6 },
      { "country": "????????????", "date": 1980, "value": 1706.4 },
      { "country": "????????????", "date": 1981, "value": 1661.4 },
      { "country": "????????????", "date": 1982, "value": 1630.2 },
      { "country": "????????????", "date": 1983, "value": 1645.2 },
      { "country": "????????????", "date": 1984, "value": 1686.9 },
      { "country": "????????????", "date": 1985, "value": 1779.4 },
      { "country": "????????????", "date": 1986, "value": 1811.3 },
      { "country": "????????????", "date": 1987, "value": 1849.7 },
      { "country": "????????????", "date": 1988, "value": 1870 },
      { "country": "????????????", "date": 1989, "value": 1875 },
      { "country": "????????????", "date": 1990, "value": 1853.3 },
      { "country": "????????????", "date": 1991, "value": 1844.6 },
      { "country": "????????????", "date": 1992, "value": 1814.1 },
      { "country": "????????????", "date": 1993, "value": 1805.3 },
      { "country": "????????????", "date": 1994, "value": 1791.3 },
      { "country": "????????????", "date": 1995, "value": 1836.2 },
      { "country": "????????????", "date": 1996, "value": 1896.1 },
      { "country": "????????????", "date": 1997, "value": 1896.4 },
      { "country": "????????????", "date": 1998, "value": 1918.8 },
      { "country": "????????????", "date": 1999, "value": 1907.7 },
      { "country": "????????????", "date": 2000, "value": 1932.1 },
      { "country": "????????????", "date": 2001, "value": 1959.2 },
      { "country": "????????????", "date": 2002, "value": 1954.8 },
      { "country": "????????????", "date": 2003, "value": 1991.6 },
      { "country": "????????????", "date": 2004, "value": 2025.4 },
      { "country": "????????????", "date": 2005, "value": 2037.4 },
      { "country": "????????????", "date": 2006, "value": 2056.4 },
      { "country": "????????????", "date": 2007, "value": 2041.7 },
      { "country": "????????????", "date": 2008, "value": 2038.5 },
      { "country": "????????????", "date": 2009, "value": 1932.1 },
      { "country": "????????????", "date": 2010, "value": 2001.1 },
      { "country": "????????????", "date": 2011, "value": 1949.1 },
      { "country": "????????????", "date": 2012, "value": 1944.3 },
      { "country": "????????????", "date": 2013, "value": 1934 },
      { "country": "????????????", "date": 2014, "value": 1871.2 },
      { "country": "????????????", "date": 2015, "value": 1908.7 },
      { "country": "????????????", "date": 2016, "value": 1934.6 },
      { "country": "????????????", "date": 2017, "value": 1969.5 },
      { "country": "????????????", "date": 1965, "value": 593.3 },
      { "country": "????????????", "date": 1966, "value": 630.9 },
      { "country": "????????????", "date": 1967, "value": 663.2 },
      { "country": "????????????", "date": 1968, "value": 687.8 },
      { "country": "????????????", "date": 1969, "value": 719 },
      { "country": "????????????", "date": 1970, "value": 754.8 },
      { "country": "????????????", "date": 1971, "value": 791.9 },
      { "country": "????????????", "date": 1972, "value": 832.3 },
      { "country": "????????????", "date": 1973, "value": 875.1 },
      { "country": "????????????", "date": 1974, "value": 923.3 },
      { "country": "????????????", "date": 1975, "value": 969 },
      { "country": "????????????", "date": 1976, "value": 1006.5 },
      { "country": "????????????", "date": 1977, "value": 1051.4 },
      { "country": "????????????", "date": 1978, "value": 1094.2 },
      { "country": "????????????", "date": 1979, "value": 1127.1 },
      { "country": "????????????", "date": 1980, "value": 1150.1 },
      { "country": "????????????", "date": 1981, "value": 1174.5 },
      { "country": "????????????", "date": 1982, "value": 1204 },
      { "country": "????????????", "date": 1983, "value": 1229 },
      { "country": "????????????", "date": 1984, "value": 1274.6 },
      { "country": "????????????", "date": 1985, "value": 1257 },
      { "country": "????????????", "date": 1986, "value": 1282 },
      { "country": "????????????", "date": 1987, "value": 1318 },
      { "country": "????????????", "date": 1988, "value": 1341.5 },
      { "country": "????????????", "date": 1989, "value": 1332.5 },
      { "country": "????????????", "date": 1990, "value": 1350.3 },
      { "country": "????????????", "date": 1991, "value": 1308.9 },
      { "country": "????????????", "date": 1992, "value": 1233.1 },
      { "country": "????????????", "date": 1993, "value": 1121 },
      { "country": "????????????", "date": 1994, "value": 1012.2 },
      { "country": "????????????", "date": 1995, "value": 951.2 },
      { "country": "????????????", "date": 1996, "value": 920 },
      { "country": "????????????", "date": 1997, "value": 878.4 },
      { "country": "????????????", "date": 1998, "value": 871.7 },
      { "country": "????????????", "date": 1999, "value": 881.3 },
      { "country": "????????????", "date": 2000, "value": 888.5 },
      { "country": "????????????", "date": 2001, "value": 905.5 },
      { "country": "????????????", "date": 2002, "value": 904 },
      { "country": "????????????", "date": 2003, "value": 924.3 },
      { "country": "????????????", "date": 2004, "value": 938.7 },
      { "country": "????????????", "date": 2005, "value": 942.3 },
      { "country": "????????????", "date": 2006, "value": 978.6 },
      { "country": "????????????", "date": 2007, "value": 989.8 },
      { "country": "????????????", "date": 2008, "value": 998.1 },
      { "country": "????????????", "date": 2009, "value": 926.8 },
      { "country": "????????????", "date": 2010, "value": 967.8 },
      { "country": "????????????", "date": 2011, "value": 1006 },
      { "country": "????????????", "date": 2012, "value": 1014.1 },
      { "country": "????????????", "date": 2013, "value": 989.2 },
      { "country": "????????????", "date": 2014, "value": 987 },
      { "country": "????????????", "date": 2015, "value": 960.7 },
      { "country": "????????????", "date": 2016, "value": 972 },
      { "country": "????????????", "date": 2017, "value": 978 },
      { "country": "????????????", "date": 1965, "value": 48.3 },
      { "country": "????????????", "date": 1966, "value": 50.4 },
      { "country": "????????????", "date": 1967, "value": 52.7 },
      { "country": "????????????", "date": 1968, "value": 55.6 },
      { "country": "????????????", "date": 1969, "value": 58.5 },
      { "country": "????????????", "date": 1970, "value": 61.5 },
      { "country": "????????????", "date": 1971, "value": 64.9 },
      { "country": "????????????", "date": 1972, "value": 70.6 },
      { "country": "????????????", "date": 1973, "value": 77.4 },
      { "country": "????????????", "date": 1974, "value": 82.3 },
      { "country": "????????????", "date": 1975, "value": 82.1 },
      { "country": "????????????", "date": 1976, "value": 93 },
      { "country": "????????????", "date": 1977, "value": 105.7 },
      { "country": "????????????", "date": 1978, "value": 111 },
      { "country": "????????????", "date": 1979, "value": 130.5 },
      { "country": "????????????", "date": 1980, "value": 126.5 },
      { "country": "????????????", "date": 1981, "value": 137.9 },
      { "country": "????????????", "date": 1982, "value": 152.8 },
      { "country": "????????????", "date": 1983, "value": 167.1 },
      { "country": "????????????", "date": 1984, "value": 188.9 },
      { "country": "????????????", "date": 1985, "value": 200.8 },
      { "country": "????????????", "date": 1986, "value": 209.8 },
      { "country": "????????????", "date": 1987, "value": 224.5 },
      { "country": "????????????", "date": 1988, "value": 238.5 },
      { "country": "????????????", "date": 1989, "value": 251.5 },
      { "country": "????????????", "date": 1990, "value": 260 },
      { "country": "????????????", "date": 1991, "value": 271.7 },
      { "country": "????????????", "date": 1992, "value": 296.4 },
      { "country": "????????????", "date": 1993, "value": 304.7 },
      { "country": "????????????", "date": 1994, "value": 340.3 },
      { "country": "????????????", "date": 1995, "value": 352.4 },
      { "country": "????????????", "date": 1996, "value": 363.9 },
      { "country": "????????????", "date": 1997, "value": 381.3 },
      { "country": "????????????", "date": 1998, "value": 387.7 },
      { "country": "????????????", "date": 1999, "value": 395 },
      { "country": "????????????", "date": 2000, "value": 414.9 },
      { "country": "????????????", "date": 2001, "value": 435.6 },
      { "country": "????????????", "date": 2002, "value": 459.4 },
      { "country": "????????????", "date": 2003, "value": 479.3 },
      { "country": "????????????", "date": 2004, "value": 517.1 },
      { "country": "????????????", "date": 2005, "value": 553.7 },
      { "country": "????????????", "date": 2006, "value": 582.6 },
      { "country": "????????????", "date": 2007, "value": 618.2 },
      { "country": "????????????", "date": 2008, "value": 657.1 },
      { "country": "????????????", "date": 2009, "value": 677.2 },
      { "country": "????????????", "date": 2010, "value": 714.3 },
      { "country": "????????????", "date": 2011, "value": 740.9 },
      { "country": "????????????", "date": 2012, "value": 771.1 },
      { "country": "????????????", "date": 2013, "value": 795.3 },
      { "country": "????????????", "date": 2014, "value": 823.1 },
      { "country": "????????????", "date": 2015, "value": 848.3 },
      { "country": "????????????", "date": 2016, "value": 869.7 },
      { "country": "????????????", "date": 2017, "value": 897.2 },
      { "country": "????????????", "date": 1965, "value": 60.6 },
      { "country": "????????????", "date": 1966, "value": 63.3 },
      { "country": "????????????", "date": 1967, "value": 64 },
      { "country": "????????????", "date": 1968, "value": 67.4 },
      { "country": "????????????", "date": 1969, "value": 68.9 },
      { "country": "????????????", "date": 1970, "value": 74.7 },
      { "country": "????????????", "date": 1971, "value": 81.2 },
      { "country": "????????????", "date": 1972, "value": 86.3 },
      { "country": "????????????", "date": 1973, "value": 92.9 },
      { "country": "????????????", "date": 1974, "value": 97.6 },
      { "country": "????????????", "date": 1975, "value": 103.3 },
      { "country": "????????????", "date": 1976, "value": 112.4 },
      { "country": "????????????", "date": 1977, "value": 118.4 },
      { "country": "????????????", "date": 1978, "value": 123.1 },
      { "country": "????????????", "date": 1979, "value": 134.4 },
      { "country": "????????????", "date": 1980, "value": 144.8 },
      { "country": "????????????", "date": 1981, "value": 161.5 },
      { "country": "????????????", "date": 1982, "value": 172.7 },
      { "country": "????????????", "date": 1983, "value": 177.5 },
      { "country": "????????????", "date": 1984, "value": 183.7 },
      { "country": "????????????", "date": 1985, "value": 190.7 },
      { "country": "????????????", "date": 1986, "value": 195.1 },
      { "country": "????????????", "date": 1987, "value": 201.2 },
      { "country": "????????????", "date": 1988, "value": 215.7 },
      { "country": "????????????", "date": 1989, "value": 216.3 },
      { "country": "????????????", "date": 1990, "value": 223.3 },
      { "country": "????????????", "date": 1991, "value": 223 },
      { "country": "????????????", "date": 1992, "value": 226.3 },
      { "country": "????????????", "date": 1993, "value": 227.2 },
      { "country": "????????????", "date": 1994, "value": 233.9 },
      { "country": "????????????", "date": 1995, "value": 243.4 },
      { "country": "????????????", "date": 1996, "value": 250.1 },
      { "country": "????????????", "date": 1997, "value": 255.1 },
      { "country": "????????????", "date": 1998, "value": 259.1 },
      { "country": "????????????", "date": 1999, "value": 267.2 },
      { "country": "????????????", "date": 2000, "value": 273.4 },
      { "country": "????????????", "date": 2001, "value": 283.8 },
      { "country": "????????????", "date": 2002, "value": 287.1 },
      { "country": "????????????", "date": 2003, "value": 300.6 },
      { "country": "????????????", "date": 2004, "value": 323.2 },
      { "country": "????????????", "date": 2005, "value": 326.5 },
      { "country": "????????????", "date": 2006, "value": 332.8 },
      { "country": "????????????", "date": 2007, "value": 346.9 },
      { "country": "????????????", "date": 2008, "value": 368.7 },
      { "country": "????????????", "date": 2009, "value": 373.4 },
      { "country": "????????????", "date": 2010, "value": 386.9 },
      { "country": "????????????", "date": 2011, "value": 385.6 },
      { "country": "????????????", "date": 2012, "value": 399.8 },
      { "country": "????????????", "date": 2013, "value": 410.6 },
      { "country": "????????????", "date": 2014, "value": 425.1 },
      { "country": "????????????", "date": 2015, "value": 429.4 },
      { "country": "????????????", "date": 2016, "value": 438 },
      { "country": "????????????", "date": 2017, "value": 449.5 },
      { "country": "????????????", "date": 1965, "value": 441.6 },
      { "country": "????????????", "date": 1966, "value": 482.9 },
      { "country": "????????????", "date": 1967, "value": 506.1 },
      { "country": "????????????", "date": 1968, "value": 544.1 },
      { "country": "????????????", "date": 1969, "value": 619.8 },
      { "country": "????????????", "date": 1970, "value": 704.9 },
      { "country": "????????????", "date": 1971, "value": 771.4 },
      { "country": "????????????", "date": 1972, "value": 817.9 },
      { "country": "????????????", "date": 1973, "value": 885.1 },
      { "country": "????????????", "date": 1974, "value": 902.2 },
      { "country": "????????????", "date": 1975, "value": 936.1 },
      { "country": "????????????", "date": 1976, "value": 983.2 },
      { "country": "????????????", "date": 1977, "value": 1037.3 },
      { "country": "????????????", "date": 1978, "value": 1106.2 },
      { "country": "????????????", "date": 1979, "value": 1157.6 },
      { "country": "????????????", "date": 1980, "value": 1168 },
      { "country": "????????????", "date": 1981, "value": 1175 },
      { "country": "????????????", "date": 1982, "value": 1186.8 },
      { "country": "????????????", "date": 1983, "value": 1240.7 },
      { "country": "????????????", "date": 1984, "value": 1326.7 },
      { "country": "????????????", "date": 1985, "value": 1395.9 },
      { "country": "????????????", "date": 1986, "value": 1456.5 },
      { "country": "????????????", "date": 1987, "value": 1538 },
      { "country": "????????????", "date": 1988, "value": 1650.5 },
      { "country": "????????????", "date": 1989, "value": 1740.4 },
      { "country": "????????????", "date": 1990, "value": 1812.8 },
      { "country": "????????????", "date": 1991, "value": 1896.9 },
      { "country": "????????????", "date": 1992, "value": 1984.5 },
      { "country": "????????????", "date": 1993, "value": 2088.9 },
      { "country": "????????????", "date": 1994, "value": 2204.3 },
      { "country": "????????????", "date": 1995, "value": 2306.8 },
      { "country": "????????????", "date": 1996, "value": 2413.2 },
      { "country": "????????????", "date": 1997, "value": 2487 },
      { "country": "????????????", "date": 1998, "value": 2481 },
      { "country": "????????????", "date": 1999, "value": 2577.9 },
      { "country": "????????????", "date": 2000, "value": 2671.9 },
      { "country": "????????????", "date": 2001, "value": 2759.7 },
      { "country": "????????????", "date": 2002, "value": 2901.2 },
      { "country": "????????????", "date": 2003, "value": 3145.5 },
      { "country": "????????????", "date": 2004, "value": 3445.8 },
      { "country": "????????????", "date": 2005, "value": 3724.3 },
      { "country": "????????????", "date": 2006, "value": 3944 },
      { "country": "????????????", "date": 2007, "value": 4195.2 },
      { "country": "????????????", "date": 2008, "value": 4310.8 },
      { "country": "????????????", "date": 2009, "value": 4411.1 },
      { "country": "????????????", "date": 2010, "value": 4696.1 },
      { "country": "????????????", "date": 2011, "value": 4951.1 },
      { "country": "????????????", "date": 2012, "value": 5118.2 },
      { "country": "????????????", "date": 2013, "value": 5269.9 },
      { "country": "????????????", "date": 2014, "value": 5382.9 },
      { "country": "????????????", "date": 2015, "value": 5472.4 },
      { "country": "????????????", "date": 2016, "value": 5585.5 },
      { "country": "????????????", "date": 2017, "value": 5743.6 }
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
//ReactDOM.render(<DemoColumn />, document.getElementById('container'));


/*
<Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={data?.visitData || []} />
        </Suspense>
*/
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
*//*
<Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row>
*//*
<Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense>
*/


/*
<ProportionSales
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
*/
  return (
    <GridContent>
      <>
      <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
        </Row>
      <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={data?.visitData || []} visitData3={data?.visitData || []} />
        </Suspense>
        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense>
      </>
      <Suspense fallback={<PageLoading />}>
        <DemoArea/>
      </Suspense>
      <Suspense fallback={<PageLoading />}>
        <DemoScatter/>
      </Suspense>
      <Suspense fallback={<PageLoading />}>
        <DemoBidirectionalBar/>
      </Suspense>
      <Suspense fallback={<PageLoading />}>
        <DemoRose/>
      </Suspense>
      <Suspense fallback={<PageLoading />}>
        <DemoColumn/>
      </Suspense>
      <Suspense fallback={<PageLoading />}>
        <DemoSankey/>
      </Suspense>
      <Suspense fallback={<PageLoading />}>
        <DemoMix/>
      </Suspense>
    </GridContent>
  );
};
///DemoSankey
export default Analysis;
