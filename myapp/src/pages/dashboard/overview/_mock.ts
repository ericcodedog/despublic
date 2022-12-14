/*import moment from 'moment';
import type { Request, Response } from 'express';
import type { AnalysisData, RadarData, DataItem } from './data.d';

// mock data
const visitData: DataItem[] = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];//
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData3 = [];
const fakeY3 = [122, 5, 4, 2, 4, 3, 5, 6, 5, 2, 6, 3, 8, 5, 8, 6, 8];//
for (let i = 0; i < fakeY3.length; i += 1) {
  visitData3.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY3[i],
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

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
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
const scatterData=[
  {
    Title: "Guardians of the Galaxy",
    Genre: "古越龙山",
    Revenue: 333.13,
    Rating: 8.1
  },
  {
    Title: "Prometheus",
    Genre: "女儿红",
    Revenue: 126.46,
    Rating: 7
  },
  {
    Title: "Split",
    Genre: "状元红",
    Revenue: 138.12,
    Rating: 7.3
  },
  {
    Title: "Sing",
    Genre: "鉴湖",
    Revenue: 270.32,
    Rating: 7.2
  },
  {
    Title: "Suicide Squad",
    Genre: "古越龙山",
    Revenue: 325.02,
    Rating: 6.2
  },
  {
    Title: "The Great Wall",
    Genre: "古越龙山",
    Revenue: 45.13,
    Rating: 6.1
  },
  {
    Title: "La La Land",
    Genre: "沈永和",
    Revenue: 151.06,
    Rating: 8.3
  },
  {
    Title: "Mindhorn",
    Genre: "沈永和",
    Revenue: null,
    Rating: 6.4
  },
  {
    Title: "The Lost City of Z",
    Genre: "古越龙山",
    Revenue: 8.01,
    Rating: 7.1
  },
  {
    Title: "Passengers",
    Genre: "女儿红",
    Revenue: 100.01,
    Rating: 7
  },
  {
    Title: "Fantastic Beasts and Where to Find Them",
    Genre: "女儿红",
    Revenue: 234.02,
    Rating: 7.5
  },
  {
    Title: "Hidden Figures",
    Genre: "原酒",
    Revenue: 169.27,
    Rating: 7.8
  },
  {
    Title: "Rogue One",
    Genre: "古越龙山",
    Revenue: 532.17,
    Rating: 7.9
  },
  {
    Title: "Moana",
    Genre: "鉴湖",
    Revenue: 248.75,
    Rating: 7.7
  },
];
const getFakeChartData: AnalysisData = {
  visitData,
  visitData3,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
  scatterData: []
};

const fakeChartData = (_: Request, res: Response) => {
  return res.json({
    data: getFakeChartData,
  });
};

export default {
  'GET  /api/fake_analysis_chart_data': fakeChartData,
};
*/