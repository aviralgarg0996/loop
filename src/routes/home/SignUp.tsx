import React from 'react';

import Main from '../../layouts/Main';
import SignUp from '../../features/home/auth/SignUp';
import Constant from '../../utils/Constant';
import { History } from 'history';

interface Props {
  history : History
  /* other props for ChildComponent */
} 

export default (props: Props) => (
  <Main headerType={Constant.HEADER_TYPE.AUTH}>
    <SignUp history={props.history} />
  </Main>
);
