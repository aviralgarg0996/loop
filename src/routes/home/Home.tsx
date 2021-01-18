import React from 'react';

import Main from '../../layouts/Main';
import Constant from '../../utils/Constant'
import HomePage from '../../features/home/home/Home';
import { History } from 'history';

interface IProps {
  history: History
}
export default ({history}: IProps) => { 
  
  return (
      <Main headerType={Constant.HEADER_TYPE.HOME}>
        <HomePage />
      </Main>
    );
}