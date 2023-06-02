import React from 'react'
import ReactDOM from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'

export const createLive = (plugins: any[]) => {
  
  createInertiaApp({
    resolve: async (name: string) => {
      const pages = import.meta.glob('./pages/**/*.tsx');
      return await pages[`./pages/cms/${name}.tsx`]();
    },
    setup({ el, App, props }) {
      props.initialPage.props.plugins = plugins;
      const root = ReactDOM.createRoot(el);
      root.render(
          <App {...props} />
      )
    },
  })
}