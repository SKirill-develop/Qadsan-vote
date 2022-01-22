import React from "react";
import stylesForm from "./Form.module.css";
import albedo from "@albedo-link/intent";
import { Form, Input, Button, Select, InputNumber, notification } from 'antd';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 6,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


const MainForm = () => {

  const [form] = Form.useForm();
  const [textSuccess, setTextSuccess] = React.useState()
  const [amount, setAmount] = React.useState()
  const [term, setTerm] = React.useState()

  const onFinish = (values) => {
    console.log(values);
    setAmount(values.summ)
    setTerm(values.term)
    fetch("https://qadsan.vote/send.php", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        if (response === "success") {
          onReset();
          setTextSuccess(true)
        }
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const openNotificationWithIcon = (type, res) => {
    notification[type]({
      message: 'Success',
      description:
        res,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const payFromAlbedo = () => {
    albedo.pay({
      amount: amount+'',
      destination: 'GDX5MITPDDBVRZXNEZHPDUMVTEIS7FNK644BF7X3FDVDFXNNFYVQ5F6G',
      asset_code: 'QADSAN',
      asset_issuer: 'GAOLE7JSN4OB7344UCOOEGIHEQY2XNLCW6YHKOCGZLTDV4VRTXQM27QU',
      memo: term,
      memo_type: 'text',
      network: 'public',
      submit: true
  })
      .then(res => {
        openNotificationWithIcon('success', res.tx_hash)
        setTextSuccess(false);
      })
  }



  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="StellarWallet"
        label="Your stellar address"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="summ"
        label="Amount"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="term"
        label="Term"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a term"
          allowClear
        >
          <Option value="2-weeks">2 weeks</Option>
          <Option value="1-month">1 month</Option>
          <Option value="3-months">3 months</Option>
          <Option value="6-months">6 months</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {textSuccess && 
      <div className="">
      <h6>Send Your tikens on wallet: GDX5MITPDDBVRZXNEZHPDUMVTEIS7FNK644BF7X3FDVDFXNNFYVQ5F6G or</h6> 
      <button onClick={payFromAlbedo}>Pay From Albedo</button>
      </div>
      }
    </Form>
    
  );
};

export default MainForm
