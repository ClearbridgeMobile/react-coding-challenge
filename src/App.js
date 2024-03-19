import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Flex } from "antd";
import ArtifactsList from "./components/ArtifactsList";
import ArtifactDetail from "./components/ArtifactDetail";

const { Header, Footer, Content } = Layout;

function App() {
  const headerStyle = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    fontSize: "24px",
    fontWeight: "bold",
    backgroundColor: "#4096ff",
  };

  const contentStyle = {
    margin: "24px 16px",
    minHeight: "75vh",
  };

  const footerStyle = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4096ff",
  };

  return (
    <Flex>
      <Layout>
        <Header style={headerStyle}>Artworks</Header>
        <Layout>
          <Content style={contentStyle}>
            <Routes>
              <Route path="/" element={<ArtifactsList />} />
              <Route path="/artifact/:id" element={<ArtifactDetail />} />
            </Routes>
          </Content>
        </Layout>
        <Footer style={footerStyle}>Developed by Sneha Spandana Pilla</Footer>
      </Layout>
    </Flex>
  );
}

export default App;
