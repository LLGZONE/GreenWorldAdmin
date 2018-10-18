import * as React from 'react';
import { Form, InputNumber, Button, Input, message } from 'antd';
import { recycleUrl } from '../constants/url';

const FormItem = Form.Item;

class Recycle extends React.Component {
  state = {
    paper: 0,
    bottle: 0,
    stdid: '',
    cloth: 0
  };

  handleSubmit = e => {
    e.preventDefault();
    const values = this.props.form.getFieldsValue();
    values.stdid = 'U20' + values.stdid;
    values.paper = Number(values.paper);
    values.bottle = Number(values.bottle);
    values.cloth = Number(values.cloth);
    fetch(recycleUrl, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          message.success('操作成功');
        } else if (res.error.includes('register')) {
          message.error('学号未注册');
        } else {
          message.error('网络错误');
        }
      });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="学号">
          {getFieldDecorator('stdid')(
            <Input addonBefore="U20" style={{ width: 200 }} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="纸张(kg)">
          {getFieldDecorator('paper', { initialValue: 0 })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="塑料瓶(个)">
          {getFieldDecorator('bottle', { initialValue: 0 })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="衣服(件)">
          {getFieldDecorator('cloth', { initialValue: 0 })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Recycle);
