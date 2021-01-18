import React from 'react';

import Main from '../../layouts/Main';
import SignIn from '../../features/home/auth/SignIn'
import Constant from '../../utils/Constant';
import { History } from 'history';

interface Props {
  history: History
}

export default  (props: Props) => (
  <Main headerType={Constant.HEADER_TYPE.AUTH}>
    <SignIn history={props.history} />
  </Main>
);
