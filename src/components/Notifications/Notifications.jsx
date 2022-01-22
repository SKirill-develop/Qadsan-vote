import { Button, notification, Divider, Space } from 'antd';
import { RadiusUpleftOutlined } from '@ant-design/icons';

const Context = React.createContext({ name: 'Default' });

const Notification = (props) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = placement => {
    api.info({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      placement,
    });
  };

  return (
    <Context.Provider value={{ name: 'Ant Design' }}>
      {contextHolder}
      <Space>
        <Button type="primary" onClick={() => openNotification('topLeft')}>
          <RadiusUpleftOutlined />
          topLeft
        </Button>
      </Space>
      <Divider />
    </Context.Provider>
  );
};

export default Notification