import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import { fetchCurrentUser } from './services/userService';
import { Helmet } from 'react-helmet'

const App = () => {
    return( 
    <div>
     <Helmet>
         <title>React SEO</title>
         <meta property="og:title" content='React SEO'/>
     </Helmet>        
     <Header />
     <Outlet />
    </div>
    );
}
function loadCurrentUser(store:any){   
    return store.dispatch(fetchCurrentUser());
}
export {loadCurrentUser}
export default App;