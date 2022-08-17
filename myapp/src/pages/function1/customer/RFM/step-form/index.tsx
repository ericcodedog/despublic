import React, { Suspense, useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Col, Row } from 'antd';
import { Card, Result, Button, Descriptions, Divider, Alert, Statistic } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';
import type { StepDataType } from './data';
import styles from './style.less';

import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import type { RadioChangeEvent } from 'antd/es/radio';
import ProportionSales from './components/ProportionSales';
import { useRequest } from 'umi';

import { fakeChartData } from './service';

const StepDescriptions: React.FC<{
  stepData: StepDataType;
  bordered?: boolean;
}> = ({ stepData, bordered }) => {
  const { RFMgroup, RFMgoods, RFMdate } = stepData; // RFMtime_end,
  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="人群"> {RFMgroup}</Descriptions.Item>
      <Descriptions.Item label="商品"> {RFMgoods}</Descriptions.Item>
      <Descriptions.Item label="起止时间"> {RFMdate}</Descriptions.Item>
    </Descriptions>
  );
};

const StepResult: React.FC<{
  onFinish: () => Promise<void>;
}> = (props) => {

  type SalesType = 'all' | 'online' | 'stores';

  const [salesType, setSalesType] = useState<SalesType>('all');
  
  const { loading, data } = useRequest(fakeChartData);

 

  let salesPieData: any;
  if (salesType === 'all') {
    salesPieData = data?.salesTypeData;
  } else {
    salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
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

  return (
    <Result
      status="success"
      title="操作成功"
      subTitle="预计两小时内到账"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            再转一笔
          </Button>
          <Button href="RFMresult">查看账单</Button>
        </>
      }
      className={styles.result}
    >
      {props.children}

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
        </>
      </GridContent>
    </Result>
  );
};

const StepForm: React.FC<Record<string, any>> = () => {
  const [stepData, setStepData] = useState<StepDataType>({
    RFMgroup: 'people in beijing',
    RFMgoods: 'apple',
    //RFMtime_end: 'Alex',
    RFMdate: '500',
    receiverMode: 'food',
  });
  const [current, setCurrent] = useState(0);
  const formRef = useRef<FormInstance>();
/* content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"*/
  return (
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm<StepDataType>
            formRef={formRef}
            title="人群 商品类型 起止时间 选择"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormSelect
              label="RFM 人群"
              width="md"
              name="RFMgroup"
              rules={[{ required: true, message: '请选择RFM人群' }]}
              valueEnum={{
                'people in beijing': 'people in beijing',
                'people in shanghai': 'people in shanghai',
              }}
            />

            <ProForm.Group title="商品选择" size={8}>
              <ProFormSelect
                name="receiverMode"
                rules={[{ required: true, message: '请选择RFM商品类型' }]}
                valueEnum={{
                  clothing: 'clothing',
                  Food: 'food',
                  using: 'using',
                  housing: 'housing',
                  transportation: 'transportation',
                }}
              />
              <ProFormText
                name="RFMgoods"
                rules={[{ required: true, message: '请输入商品' }]}
                placeholder="黄酒"
              />
            </ProForm.Group>
            <Alert closable showIcon message="确认时间间隔大于180天" style={{ marginBottom: 24 }} />

            <ProFormDateRangePicker
              label="起止日期"
              width="md"
              name="RFMdate"
              rules={[
                {
                  required: true,
                  message: '请选择起止日期',
                },
              ]}
              placeholder={['开始日期', '结束日期']}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="选择确认">
            <StepDescriptions stepData={stepData} bordered />
            <Divider style={{ margin: '24px 0' }} />
            <div className={styles.result}>
              <ProFormText.Password
                label="密码"
                width="md"
                name="password"
                required={false}
                rules={[{ required: true, message: '需要密码才能进行RFM模拟' }]}
              />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="RFM完成">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </Card>
  );
};

export default StepForm;
