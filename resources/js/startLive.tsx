import React from 'react'
import ReactDOM from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import GlobalProviders from './contexts/GlobalProvider'

InertiaProgress.init();

const createApp = (plugins: any[]) => {
  
  createInertiaApp({
    resolve: async (name: string) => {
      const pages = import.meta.glob('./pages/**/*.tsx');
      return await pages[`./pages/cms/${name}.tsx`]();
    },
    setup({ el, App, props }) {
      console.log(props.initialPage.props);
      props.initialPage.props.plugins = plugins;
      const root = ReactDOM.createRoot(el);
      root.render(
          <App {...props} />
      )
    },
  })
}

export default createApp;