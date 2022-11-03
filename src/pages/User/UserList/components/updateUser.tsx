import {
    ProForm,
    ProFormDateTimePicker,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    StepsForm,
    ModalForm,
  } from '@ant-design/pro-components';
  import { FormattedMessage, useIntl } from '@umijs/max';
  import { Modal } from 'antd';
  import React from 'react';
  
  export type FormValueType = {
    target?: string;
    template?: string;
    type?: string;
    time?: string;
    frequency?: string;
  } & Partial<API.RuleListItem>;
  
  export type UpdateFormProps = {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    updateModalVisible: boolean;
    values: Partial<API.RuleListItem>;
  };
  
  const updateUser: React.FC<UpdateFormProps> = (props) => {
    console.log(props)
    

    const intl = useIntl();

    return (
        
        <ModalForm<{
            name: string;
            company: string;
          }>
            title="新建表单"
            // form={form}
            autoFocusFirstInput
            visible={props.updateModalVisible}
            modalProps={{
              destroyOnClose: true,
              onCancel: () => props.onCancel()
            }}
            submitTimeout={2000}
            
          >
            <ProForm.Group>
              <ProFormText
                width="md"
                name="name"
                label="签约客户名称"
                tooltip="最长为 24 位"
                placeholder="请输入名称"
              />
      
              <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
              
            </ProForm.Group>
            <ProForm.Group>
              <ProFormSelect
                request={async () => [
                  {
                    value: 'chapter',
                    label: '盖章后生效',
                  },
                ]}
                width="xs"
                name="useMode"
                label="合同约定生效方式"
              />
              <ProFormSelect
                width="xs"
                options={[
                  {
                    value: 'time',
                    label: '履行完终止',
                  },
                ]}
                name="unusedMode"
                label="合同约定失效效方式"
              />
            </ProForm.Group>
            <ProFormText width="sm" name="id" label="主合同编号" />
            <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
            <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
          </ModalForm>
      
          
    )

    return (
      <StepsForm
        stepsProps={{
          size: 'small',
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              width={640}
              bodyStyle={{ padding: '32px 40px 48px' }}
              destroyOnClose
              title={intl.formatMessage({
                id: 'pages.searchTable.updateForm.ruleConfig',
                defaultMessage: '规则配置',
              })}
              visible={props.updateModalVisible}
              footer={submitter}
              onCancel={() => {
                props.onCancel();
              }}
            >
              {dom}
            </Modal>
          );
        }}
        onFinish={props.onSubmit}
      >
        <StepsForm.StepForm
          initialValues={{
            name: props.values.name,
            desc: props.values.desc,
          }}
          title={intl.formatMessage({
            id: 'pages.searchTable.updateForm.basicConfig',
            defaultMessage: '基本信息',
          })}
        >
          <ProFormText
            name="name"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleName.nameLabel',
              defaultMessage: '规则名称',
            })}
            width="md"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchTable.updateForm.ruleName.nameRules"
                    defaultMessage="请输入规则名称！"
                  />
                ),
              },
            ]}
          />
          <ProFormTextArea
            name="desc"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleDesc.descLabel',
              defaultMessage: '规则描述',
            })}
            placeholder={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleDesc.descPlaceholder',
              defaultMessage: '请输入至少五个字符',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchTable.updateForm.ruleDesc.descRules"
                    defaultMessage="请输入至少五个字符的规则描述！"
                  />
                ),
                min: 5,
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            target: '0',
            template: '0',
          }}
          title={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleProps.title',
            defaultMessage: '配置规则属性',
          })}
        >
          <ProFormSelect
            name="target"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.object',
              defaultMessage: '监控对象',
            })}
            valueEnum={{
              0: '表一',
              1: '表二',
            }}
          />
          <ProFormSelect
            name="template"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleProps.templateLabel',
              defaultMessage: '规则模板',
            })}
            valueEnum={{
              0: '规则模板一',
              1: '规则模板二',
            }}
          />
          <ProFormRadio.Group
            name="type"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleProps.typeLabel',
              defaultMessage: '规则类型',
            })}
            options={[
              {
                value: '0',
                label: '强',
              },
              {
                value: '1',
                label: '弱',
              },
            ]}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm
          initialValues={{
            type: '1',
            frequency: 'month',
          }}
          title={intl.formatMessage({
            id: 'pages.searchTable.updateForm.schedulingPeriod.title',
            defaultMessage: '设定调度周期',
          })}
        >
          <ProFormDateTimePicker
            name="time"
            width="md"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.schedulingPeriod.timeLabel',
              defaultMessage: '开始时间',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.searchTable.updateForm.schedulingPeriod.timeRules"
                    defaultMessage="请选择开始时间！"
                  />
                ),
              },
            ]}
          />
          <ProFormSelect
            name="frequency"
            label={intl.formatMessage({
              id: 'pages.searchTable.updateForm.object',
              defaultMessage: '监控对象',
            })}
            width="md"
            valueEnum={{
              month: '月',
              week: '周',
            }}
          />
        </StepsForm.StepForm>
      </StepsForm>
    );
  };
  
  export default updateUser;
  