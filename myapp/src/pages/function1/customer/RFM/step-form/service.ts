import { request } from 'umi';


import type { AnalysisData } from './data';

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/fake_analysis_chart_data');
}


export async function fakeSubmitForm(params: any) {
  return request('/api/stepForm', {
    method: 'POST',
    data: params,
  });
}
