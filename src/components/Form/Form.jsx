import React from "react";
import stylesForm from "./Form.module.css";
import { Form, Input, Button, Select } from 'antd';
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

  const onFinish = (values) => {
    console.log(values);
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
        name="AmountDay"
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
          <Option value="2weeks">2 weeks</Option>
          <Option value="1month">1 month</Option>
          <Option value="3months">3 months</Option>
          <Option value="6months">6 months</Option>
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
      {textSuccess && <p>Sucessfully sent</p>}
    </Form>
    
  );
};

export default MainForm
