import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Routes from '../Routes'
import { Provider } from 'react-redux'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import serialize from 'serialize-javascript'
import { Helmet } from 'react-helmet'

export default (req: any, store: ToolkitStore) => {
   const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <div>
          <Routes />
        </div>
      </StaticRouter>
    </Provider>
  )
  const helmet = Helmet.renderStatic();
  return `
    <!doctype html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.ico"/>
        <link rel="manifest" href="manifest.json"/>
        <script defer="defer" src="bundle.js"></script>
       </head>
      <body>
        <div id="root">${content}</div>
          <script>window.INITIAL_STATE=${serialize(store.getState())}</script>
        <script defer="defer" src="bundle.js"></script>
      </body>
    </html>
    `
}
