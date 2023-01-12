import React from 'react'
import ReactDOM from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import GlobalProviders from './contexts/GlobalProvider'
import CmsLayout from './layouts/CmsLayout'

InertiaProgress.init();

const createApp = (plugins: any[]) => {
  
  createInertiaApp({
    resolve: async (name: string) => {

      const pages = import.meta.glob('./pages/**/*.tsx');
      const module = await pages[`./pages/cms/${name}.tsx`]();
  
      if(module.default.layout || module.default.layout === null) return module.default;
      module.default.layout = page => <CmsLayout children={page} navigation={page?.props?.navigation}/>
      return module.default;
    },
    setup({ el, App, props }) {
      console.log(props.initialPage.props);
      props.initialPage.props.plugins = plugins;
      const root = ReactDOM.createRoot(el);
      root.render(
        <GlobalProviders inertiaProps={props.initialPage.props}>
          <App {...props} />
        </GlobalProviders>
      )
    },
  })
}

export default createApp;