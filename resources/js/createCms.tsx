import React from 'react'
import ReactDOM from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import GlobalProviders from './contexts/GlobalProvider'
import CmsLayout from './layouts/CmsLayout'
import { ConfigProviders, FrontendConfig, ServerConfig } from './contexts/ConfigProvider'

export const createCms = (config: FrontendConfig) => {
  
  createInertiaApp({
    resolve: async (name: string) => {

      const pages = import.meta.glob('./pages/**/*.tsx');
      const module: any = await pages[`./pages/cms/${name}.tsx`]();
  
      if(module.default.layout || module.default.layout === null) return module.default;
      module.default.layout = page => <CmsLayout children={page} navigation={page?.props?.navigation}/>
      return module.default;
    },
    setup({ el, App, props }) {
      console.log(props.initialPage.props);
      const root = ReactDOM.createRoot(el);
      root.render(
        <ConfigProviders frontendConfig={config} serverConfig={props.initialPage.props.config as ServerConfig}>
          <GlobalProviders>
            <App {...props} />
          </GlobalProviders>
        </ConfigProviders>
      )
    },
  })
}