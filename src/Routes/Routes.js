import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from '../Pages/Home';
import Auth from '../Pages/Auth';
import { setAuthorizationToken } from '../Services/APIServices';
import { getCookies } from '../Services/Cookies';
import GetEvents from '../Pages/GetEvents';
import CreateEvents from '../Pages/CreateEvents';
import CreatedEvents from '../Pages/CreatedEvents';
import UserBook from '../Pages/UserBook';
const Routes=()=>{
    return(
              <Switch>
                  {setAuthorizationToken(getCookies('USER_TOKEN'))}
                  <Route path='/' exact component={Home}/>
                  <Route path='/login' exact component={Auth}/>
                  <Route path='/events' exact component={GetEvents}/>
                  <Route path='/create-events' exact component={CreateEvents}/>
                  <Route path='/created-events' exact component={CreatedEvents}/>
                  <Route path='/user-booking' exact component={UserBook}/>
                  <Route path='/edit-event' exact component={CreateEvents}/>
              </Switch>
    )
}
export default Routes;