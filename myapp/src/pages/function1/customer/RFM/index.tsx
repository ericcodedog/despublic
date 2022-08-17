import { PageContainer } from '@ant-design/pro-layout';
import { Card, Input } from 'antd';
import type { FC } from 'react';
import { history } from 'umi';

type SearchProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const tabList = [
  {
    key: 'articles',
    tab: '文章',
  },
  {
    key: 'projects',
    tab: '项目',
  },
  {
    key: 'applications',
    tab: '应用',
  },
];

const Search: FC<SearchProps> = (props) => {
  const handleTabChange = (key: string) => {
    const { match } = props;
    const url = match.url === '/' ? '' : match.url;
    switch (key) {
      case 'articles':
        history.push(`${url}/articles`);
        break;
      case 'applications':
        history.push(`${url}/applications`);
        break;
      case 'projects':
        history.push(`${url}/projects`);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  const getTabKey = () => {
    const { match, location } = props;
    const url = match.path === '/' ? '' : match.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };
/*
tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
style={{ textAlign: 'center' }}
<PageContainer
    content={
        <div >
          RFM模型是衡量客户价值和客户创造利益能力的重要工具和手段。在众多的客户关系管理(CRM)的分析模式中，RFM模型是被广泛提到的。该机械模型通过一个客户的近期购买行为、购买的总体频率以及花了多少钱3项指标来描述该客户的价值状况。
        </div>
      }
      
    >
      
    </PageContainer>

*/
  return (
    <PageContainer
    content={
        <div >
          RFM模型是衡量客户价值和客户创造利益能力的重要工具和手段。在众多的客户关系管理(CRM)的分析模式中，RFM模型是被广泛提到的。该机械模型通过一个客户的近期购买行为、购买的总体频率以及花了多少钱3项指标来描述该客户的价值状况。
        </div>
      }
    >
      {props.children}
    </PageContainer>
  );
};

export default Search;
