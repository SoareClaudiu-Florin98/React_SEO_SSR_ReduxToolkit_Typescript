import express from 'express'
import renderer from './helpers/renderer'
import { createStore } from './store'
import { LoaderFunctionArgs, matchRoutes } from 'react-router-dom'
import {routes} from './Routes'
import proxy from 'express-http-proxy';
import { RequestOptions } from 'https'
import { LoaderFunctionParams } from './types'
import { renderToPipeableStream } from 'react-dom/server'
import App from './App'

const app = express();

app.use('/api',proxy('http://react-ssr-api.herokuapp.com',
{
  proxyReqOptDecorator(opts: RequestOptions){
    opts.headers!['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
}
));
app.use(express.static('./dist-client', { index: false }))
app.get('*', (req, res) => {
  const store = createStore(req);

  const loaderArgs :LoaderFunctionArgs =  store  as LoaderFunctionParams
  res.setHeader('content-type', 'text/html');

  const promises = matchRoutes(routes,req.path)?.map(({route})=>{
    return route.loader? route.loader(loaderArgs):null;
  }).map((promise: Promise<any>)=> {
    if(promise){
      return new Promise((resolve,reject) =>{
        promise.then(resolve).catch(resolve)
      })
    }
  })

  if(promises){
    Promise.all(promises).then(()=> {
      res.send(renderer(req,store));
  })
}
else{
  res.send(renderer(req,store));
}
})

app.listen(3000, () => {
  console.log('Listening on PORT 3000')
})
