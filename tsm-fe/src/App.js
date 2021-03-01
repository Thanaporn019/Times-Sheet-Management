import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from './Layout/Head';
import { ConfigProvider, Layout } from "antd";
// const { Content } = Layout;
import Routing from './routes'


class App extends Component {

  render() {

    return (
      <ConfigProvider>
        <Layout>
          <Layout>
            <Head></Head>
            {/* <Content> */}
              <div className="gx-main-content-wrapper">
                {/* {children} */}
                <Routing />
              </div>
              {/* <Footer>
                  <div className="gx-layout-footer-content">
                    {footerText}
                  </div>
                </Footer> */}
            {/* </Content> */}
          </Layout>
          {/* <Customizer/> */}
        </Layout>
      </ConfigProvider>
    )
  }
}

export default App;