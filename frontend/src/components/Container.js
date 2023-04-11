import "./Container.css";
import { Layout, theme } from "antd";
import Mapbox from "./Map/Map";
import ToolBar from "./Map/ToolBar";

const { Header, Content, Footer } = Layout;

const Container = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">Fiber Monitor Display Tool</Header>
      <Content
        style={{
          background: colorBgContainer,
        }}
        className="content"
      >
        <div className="toolBar-container">
          <ToolBar />
        </div>
        <div className="mapbox-container">
          <Mapbox />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        @2023 Created by Ruoxi Yang
      </Footer>
    </Layout>
  );
};
export default Container;
