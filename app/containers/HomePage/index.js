import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Select } from 'antd';
import { useGetListPairExchangeQuery } from '../../services/bitfinex';

const { Header, Footer, Content } = Layout;

const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

export default function HomePage() {
  const { data, isLoading } = useGetListPairExchangeQuery();
  const [pair, setPair] = useState();
  const [channel, setChannel] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.addEventListener('message', function(event) {
      if (event.data) {
        const message = JSON.parse(event.data);
        if (message.event === 'subscribed') {
          setChannel(message.chanId);
        }
      }
    });
  }, []);

  const handleOpenWS = () => {
    setOpen(true);
  };

  useEffect(() => {
    socket.addEventListener('open', handleOpenWS);

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (channel) {
      socket.send(
        JSON.stringify({
          event: 'unsubscribe',
          chanId: channel,
        }),
      );
    }

    const msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: `t${pair}`,
    });

    if (open) {
      socket.send(msg);
    }
  }, [pair]);

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item>Home</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Tickers</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Select value={pair} onSelect={setPair} style={{ width: 120 }}>
            {!isLoading &&
              data[0].map(item => (
                <Select.Option value={item}>{item}</Select.Option>
              ))}
          </Select>

          {pair}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Test task</Footer>
    </Layout>
  );
}
