import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Routes from '../Routes'
import { Provider } from 'react-redux'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import serialize from 'serialize-javascript'
import { HelmetProvider } from 'react-helmet-async';

export default (req: any, store: ToolkitStore, scriptTags: string) => {
  const helmetContext = {};

   const content = renderToString(
    <HelmetProvider context={helmetContext}>
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <div>
          <Routes />
        </div>
      </StaticRouter>
    </Provider>
    </HelmetProvider>
  )

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="manifest" href="manifest.json"/>
       </head>
      <body>
        <div id="root">${content}</div>
        <script>window.INITIAL_STATE=${serialize(store.getState())}</script>
        <script defer="defer" src="bundle.js"></script>
        ${scriptTags}
      </body>
    </html>
    `
}
