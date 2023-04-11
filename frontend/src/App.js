import { ConfigProvider } from "antd";
import React from "react";
import Container from "./components/Container";
import "mapbox-gl/dist/mapbox-gl.css";

function App () {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1DA57A",
          // margin: 0,
          // padding: 0,
        },
      }}
    >
      <Container />
    </ConfigProvider>
  )
}

export default App;
