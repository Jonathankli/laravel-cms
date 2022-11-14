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
      return import(`./pages/live/${name}`);
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