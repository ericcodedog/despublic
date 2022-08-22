/*import moment from 'moment';
import type { Request, Response } from 'express';
import type { AnalysisData, RadarData, DataItem } from './data.d';

// mock data
const visitData: DataItem[] = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1111, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const salesData2 = [];
for (let i = 0; i < 12; i += 1) {
  salesData2.push({
    x: `${i + 1}号产品`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
    x: '古越龙山',
    y: 4544,
  },
  {
    x: '女儿红',
    y: 3321,
  },
  {
    x: '沈永和',
    y: 3113,
  },
  {
    x: '状元红',
    y: 2341,
  },
  {
    x: '鉴湖',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

const salesTypeDataOnline = [
  {
    x: '古越龙山',
    y: 244,
  },
  {
    x: '女儿红',
    y: 321,
  },
  {
    x: '沈永和',
    y: 311,
  },
  {
    x: '状元红',
    y: 41,
  },
  {
    x: '鉴湖',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];

const salesTypeDataOffline = [
  {
    x: '古越龙山',
    y: 99,
  },
  {
    x: '女儿红',
    y: 188,
  },
  {
    x: '沈永和',
    y: 344,
  },
  {
    x: '状元红',
    y: 255,
  },
  {
    x: '鉴湖',
    y: 65,
  },
];


const salesWayData = [
  {
    x: '京东',
    y: 4544,
  },
  {
    x: '淘宝',
    y: 3321,
  },
  {
    x: '抖音',
    y: 3113,
  },
  {
    x: '线下直营店',
    y: 2341,
  },
  {
    x: '非直营店',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

const salesWayDataOnline = [
  {
    x: '古越龙山',
    y: 244,
  },
  {
    x: '女儿红',
    y: 321,
  },
  {
    x: '沈永和',
    y: 311,
  },
  {
    x: '状元红',
    y: 41,
  },
  {
    x: '鉴湖',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];

const salesWayDataOffline = [
  {
    x: '古越龙山',
    y: 99,
  },
  {
    x: '女儿红',
    y: 188,
  },
  {
    x: '沈永和',
    y: 344,
  },
  {
    x: '状元红',
    y: 255,
  },
  {
    x: '鉴湖',
    y: 65,
  },
];

const eshopData = [
  {
    x: '京东',
    y: 4544,
  },
  {
    x: '淘宝',
    y: 3321,
  },
  {
    x: '天猫',
    y: 3113,
  },
  {
    x: '苏宁',
    y: 2341,
  },
  {
    x: '拼多多',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];
const streamData = [
  {
    x: '抖音',
    y: 4544,
  },
  {
    x: '快手',
    y: 3321,
  },
  {
    x: '淘宝直播',
    y: 3113,
  },
  {
    x: '小红书',
    y: 2341,
  },
  {
    x: '得物',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];


const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  const date = moment(new Date().getTime() + 1000 * 60 * 30 * i).format('HH:mm');
  offlineChartData.push({
    date,
    type: '客流量',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData.push({
    date,
    type: '支付笔数',
    value: Math.floor(Math.random() * 100) + 10,
  });
}
const offlineChartData2 = [];
for (let i = 0; i < 20; i += 1) {
  const date = moment(new Date().getTime() + 1000 * 60 * 30 * i).format('HH:mm');
  offlineChartData2.push({
    date,
    type: '客流量',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData2.push({
    date,
    type: '支付笔数',
    value: Math.floor(Math.random() * 100) + 10,
  });
}
const offlineChartData3 = [];
for (let i = 0; i < 20; i += 1) {
  const date = moment(new Date().getTime() + 1000 * 60 * 30 * i).format('HH:mm');
  offlineChartData3.push({
    date,
    type: '古越龙山',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData3.push({
    date,
    type: '女儿红',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData3.push({
    date,
    type: '沈永和',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData3.push({
    date,
    type: '状元红',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData3.push({
    date,
    type: '鉴湖',
    value: Math.floor(Math.random() * 100) + 10,
  });
}
const offlineChartData4 = [];//eshop
for (let i = 0; i < 20; i += 1) {
  const date = moment(new Date().getTime() + 1000 * 60 * 30 * i).format('HH:mm');
  offlineChartData4.push({
    date,
    type: '京东',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData4.push({
    date,
    type: '淘宝',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData4.push({
    date,
    type: '天猫',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData4.push({
    date,
    type: '苏宁',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData4.push({
    date,
    type: '拼多多',
    value: Math.floor(Math.random() * 100) + 10,
  });
}
const offlineChartData5 = [];//eshop
for (let i = 0; i < 10; i += 1) {
  const date = moment(new Date().getTime() + 1000 * 60 * 30 * i).format('HH:mm');
  offlineChartData5.push({
    date,
    type: '抖音',
    value: Math.floor(Math.random() * 100) + i*10,
  });
  offlineChartData5.push({
    date,
    type: '快手',
    value: Math.floor(Math.random() * 100) + i*10,
  });
  offlineChartData5.push({
    date,
    type: '淘宝直播',
    value: Math.floor(Math.random() * 100) + i*10,
  });
  offlineChartData5.push({
    date,
    type: '小红书',
    value: Math.floor(Math.random() * 100) + i*10,
  });
  offlineChartData5.push({
    date,
    type: '得物',
    value: Math.floor(Math.random() * 100) + i*10,
  });
}
const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

const radarData: RadarData[] = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const getFakeChartData: AnalysisData = {
  visitData,
  visitData2,
  salesData,
  salesData2,
  searchData,
  offlineData,
  offlineChartData,
  offlineChartData2,
  offlineChartData3,
  offlineChartData4,
  offlineChartData5,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  salesWayData,
  salesWayDataOnline,
  salesWayDataOffline,
  eshopData,
  streamData,
  radarData,
  offlineChartDataEmpty: [],
  selfsales: []
};*/
import moment from 'moment';
import type { Request, Response } from 'express';
import type { AnalysisData, RadarData, DataItem } from './data.d';

// mock data
const visitData: DataItem[] = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}
const visitData3 = [];
const fakeY3 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY3.length; i += 1) {
  visitData3.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY3[i],
  });
}
const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const salesData2 = [];
for (let i = 0; i < 12; i += 1) {
  salesData2.push({
    type:"A",
    x: `${i + 1}号产品`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
  /*salesData2.push({
    type:"B",
    x: `${i + 1}号产品.`,
    y: Math.floor(Math.random() * 1000) + 200,
  });*/
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
    x: '古越龙山',
    y: 4544,
  },
  {
    x: '女儿红',
    y: 3321,
  },
  {
    x: '沈永和',
    y: 3113,
  },
  {
    x: '状元红',
    y: 2341,
  },
  {
    x: '鉴湖',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

const salesTypeDataOnline = [
  {
    x: '古越龙山',
    y: 244,
  },
  {
    x: '女儿红',
    y: 321,
  },
  {
    x: '沈永和',
    y: 311,
  },
  {
    x: '状元红',
    y: 41,
  },
  {
    x: '鉴湖',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];

const salesTypeDataOffline = [
  {
    x: '古越龙山',
    y: 99,
  },
  {
    x: '女儿红',
    y: 188,
  },
  {
    x: '沈永和',
    y: 344,
  },
  {
    x: '状元红',
    y: 255,
  },
  {
    x: '鉴湖',
    y: 65,
  },
];

const salesWayData = [
  {
    x: '电商',
    y: 50,
  },
  {
    x: '直播',
    y: 45,
  },
  {
    x: '自营',
    y: 5,
  },
  /*{
    x: '线下直营店',
    y: 2341,
  },
  {
    x: '非直营店',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },*/
];

const salesWayDataOnline = [
  {
    x: '古越龙山',
    y: 244,
  },
  {
    x: '女儿红',
    y: 321,
  },
  {
    x: '沈永和',
    y: 311,
  },
  {
    x: '状元红',
    y: 41,
  },
  {
    x: '鉴湖',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];

const salesWayDataOffline = [
  {
    x: '古越龙山',
    y: 99,
  },
  {
    x: '女儿红',
    y: 188,
  },
  {
    x: '沈永和',
    y: 344,
  },
  {
    x: '状元红',
    y: 255,
  },
  {
    x: '鉴湖',
    y: 65,
  },
];
const eshopData = [
  {
    x: '京东',
    y: 31,
  },
  {
    x: '淘宝',
    y: 23,
  },
  {
    x: '天猫',
    y: 15,
  },
  {
    x: '苏宁',
    y: 13,
  },
  {
    x: '拼多多',
    y: 12,
  },
  {
    x: '其他',
    y: 6,
  },
];
const streamData = [
  {
    x: '抖音',
    y: 31,
  },
  {
    x: '快手',
    y: 23,
  },
  {
    x: '淘宝直播',
    y: 15,
  },
  {
    x: '小红书',
    y: 13,
  },
  {
    x: '得物',
    y: 12,
  },
  {
    x: '其他',
    y: 6,
  },
];
const selfsales = [
  {
    x: '线上',
    y: 50,
  },
  {
    x: '线下',
    y: 50,
  },
];
const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `直播场次. ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  const date = moment(new Date().getTime() + 1000 * 60 * 30 * i).format('HH:mm');
  offlineChartData.push({
    date,
    type: '客流量',
    value: Math.floor(Math.random() * 100) + 10,
  });
  offlineChartData.push({
    date,
    type: '交易支付笔数',
    value: Math.floor(Math.random() * 50) + 10,
  });
}
const offlineChartData2 = [];
for (let i = 0; i < 30; i += 1) {
  const date = moment(new Date().getTime() - 60 * 60 * 24 * 1000 *30 + 60 * 60 * 24 * 1000 * i).format('MM/DD');
  offlineChartData2.push({
    date,
    type: '电商',
    value: Math.floor(Math.random() * 100) + i*10,
  });
  offlineChartData2.push({
    date,
    type: '直播',
    value: Math.floor(Math.random() * 100) + i*10,
  });
  offlineChartData2.push({
    date,
    type: '自营',
    value: Math.floor(Math.random() * 100) + i*10,
  });
}
const offlineChartData3 = [];
for (let i = 0; i < 30; i += 1) {
  const date = moment(new Date().getTime() - 60 * 60 * 24 * 1000 *30 +  60 * 60 * 24 * 1000 * i).format('MM/DD');
  offlineChartData3.push({
    date,
    type: '古越龙山',
    value: Math.floor(Math.random() * 100) + i*10,
  });
  offlineChartData3.push({
    date,
    type: '女儿红',
    value: Math.floor(Math.random() * 100) + i*20,
  });
  offlineChartData3.push({
    date,
    type: '沈永和',
    value: Math.floor(Math.random() * 100) + i*20,
  });
  offlineChartData3.push({
    date,
    type: '状元红',
    value: Math.floor(Math.random() * 100) + i*20,
  });
  offlineChartData3.push({
    date,
    type: '鉴湖',
    value: Math.floor(Math.random() * 100) + i*10,
  });
}
const offlineChartData4 = [];//eshop
for (let i = 0; i < 30; i += 1) {
  const date = moment(new Date().getTime() - 60 * 60 * 24 * 1000 *30 +  60 * 60 * 24 * 1000 * i).format('MM/DD');
  let j=20;
  if(i>10&&i<=20){
    j=40;
  }else if(i>20){
    j=50-i;
  }else if(i<=10){
    j=i+10;
  }
  offlineChartData4.push({
    date,
    type: '京东',
    value: Math.floor(Math.random() * 100) + i*i-10,
  });
  offlineChartData4.push({
    date,
    type: '淘宝',
    value: Math.floor(Math.random() * 100) + j*10,
  });
  offlineChartData4.push({
    date,
    type: '天猫',
    value: Math.floor(Math.random() * 100) + i*j+30,
  });
  offlineChartData4.push({
    date,
    type: '苏宁',
    value: Math.floor(Math.random() * 100) + i*j,
  });
  offlineChartData4.push({
    date,
    type: '拼多多',
    value: Math.floor(Math.random() * 50) + j*10,
  });
}
const offlineChartData5 = [];//eshop
for (let i = 0; i < 30; i += 1) {
  const date = moment(new Date().getTime() - 60 * 60 * 24 * 1000 *30 + 60 * 60 * 24 * 1000 * i).format('MM/DD');
  offlineChartData5.push({
    date,
    type: '抖音',
    value: Math.floor(Math.random() * 50) + i*20,
  });
  offlineChartData5.push({
    date,
    type: '快手',
    value: Math.floor(Math.random() * 50) + i*20,
  });
  offlineChartData5.push({
    date,
    type: '淘宝直播',
    value: Math.floor(Math.random() * 50) + i*10,
  });
  offlineChartData5.push({
    date,
    type: '小红书',
    value: Math.floor(Math.random() * 50) + i*10,
  });
  offlineChartData5.push({
    date,
    type: '得物',
    value: Math.floor(Math.random() * 50) + i*10,
  });
}
const offlineChartDataEmpty = [];//shop
for (let i = 0; i < 30; i += 1) {
  const date = moment(new Date().getTime() - 60 * 60 * 24 * 1000 *30 + 60 * 60 * 24 * 1000 * i).format('MM/DD');
  offlineChartDataEmpty.push({
    date,
    type: '线上',
    value:0,
  });
  offlineChartDataEmpty.push({
    date,
    type: '线下',
    value:0,
  });
}
const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

const radarData: RadarData[] = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const getFakeChartData: AnalysisData = {
  visitData,
  visitData2,
  //visitData3,
  salesData,
  salesData2,
  searchData,
  offlineData,
  offlineChartData,
  offlineChartData2,
  offlineChartData3,
  offlineChartData4,
  offlineChartData5,
  offlineChartDataEmpty,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  salesWayData,
  salesWayDataOnline,
  salesWayDataOffline,
  eshopData,
  streamData,
  radarData,
  selfsales,
};

const fakeChartData = (_: Request, res: Response) => {
  return res.json({
    data: getFakeChartData,
  });
};

export default {
  'GET  /api/fake_analysis_chart_data': fakeChartData,
};
