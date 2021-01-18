import React, { FC } from 'react';
import './Main.scss';
import HomeHeader from './header/HomeHeader';
import Constant from '../utils/Constant';
import LoginHeader from './header/LoginHeader';
// import { Switch, Route } from 'react-router-dom';
// import { getPath } from '../router-paths';

type Props = {
   headerType?: number
};

  const Main: FC<Props> = ({ children, headerType }) =>  
    (
      <React.Fragment>
        {console.log("headerType", headerType)} 
          {
            headerType === Constant.HEADER_TYPE.HOME ?
            <HomeHeader /> : headerType === Constant.HEADER_TYPE.AUTH ? <LoginHeader /> :  null
          }
          {/* <Switch>
            <Route exact path={getPath('home')} render={Home}  />
          </Switch> */}
          <main className="App-main">{children}</main>
        </React.Fragment>
    )
    
export default Main;
