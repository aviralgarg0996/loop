import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router';

import store, { history } from './store';
import Home from './routes/home/Home';
import { getPath } from './router-paths';
import SignIn from './routes/home/SignIn';
import SignUp from './routes/home/SignUp';
import Purchase from './routes/home/Purchase';
import Plan from './routes/home/Plan';
import PurchaseSuccessR from './routes/home/PurchaseSuccess';
import HowItWork from './routes/home/HowItWork'
import Subscription from './routes/home/Subscription';
import BlogList from './routes/home/BlogList';
import BlogDetail from './routes/home/BlogDetail';
import Discovery from './routes/discovery/Discovery';
import Hub from './routes/hubs/Hub';
import LoadercScreen from './layouts/LoaderScreen';

const isLoogedIn = () => {
  return localStorage.getItem('token') != null || localStorage.getItem('token');
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route exact path={getPath('signIn')} component={SignIn} />
              <Route exact path={getPath('signUp')} render={SignUp} />
              <Route exact path={getPath('plan')} render={Plan} />
              <Route exact path={getPath('purchase')} render={Purchase} />
              <Route exact path={getPath('purchaseSuccess')} render={PurchaseSuccessR} />
              <Route exact path={getPath('howItWork')} render={HowItWork} />
              <Route exact path={getPath('subscription')} render={Subscription} />
              <Route exact path={getPath('blogList')} render={BlogList} />
              <Route exact path={getPath('blogDetail')} render={BlogDetail} />
              <Route path={getPath('discovery')} component={Discovery} />
              <Route path={getPath('hub')} component={Hub} />
              {/* <ProtectedRoute path={getPath('discovery')}  component={Discovery} /> */}
              {/* <ProtectedRoute path={getPath('hub')} component={Hub} /> */}
              <Route exact path={getPath('home')} render={Home} />
              <Route >
                {isLoogedIn() ? <Redirect to={getPath('discovery')} /> : <Redirect to={getPath('home')} />}
              </Route>
            </Switch>
          </div>

        </ConnectedRouter>
        <LoadercScreen></LoadercScreen>
      </Provider>
    );
  }
}

export default App;
