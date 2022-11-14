import React from 'react'
import ReactDOM from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import GlobalProviders from './contexts/GlobalProvider'
import CmsLayout from './layouts/CmsLayout'

InertiaProgress.init();

const createApp = (plugins: any[]) => {
  
  createInertiaApp({
    resolve: (name: string) => {

      const module = import(`./pages/cms/${name}`);
  
      return module.then(m => {
        if(m.default.layout || m.default.layout === null) return m.default;
        m.default.layout = page => <CmsLayout children={page} navigation={page?.props?.navigation}/>
        return m.default;
      });
    },
    setup({ el, App, props }) {
      console.log(props.initialPage.props);
      props.initialPage.props.plugins = plugins;
      const root = ReactDOM.createRoot(el);
      root.render(
        <GlobalProviders>
          <App {...props} />
        </GlobalProviders>
      )
    },
  })
}

export default createApp;