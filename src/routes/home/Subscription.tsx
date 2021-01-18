import React from 'react';

import Main from '../../layouts/Main';
import Constant from '../../utils/Constant'
import Subscription from '../../features/home/subscription/Subscription';

export default () => (
  <Main headerType={Constant.HEADER_TYPE.HOME}>
    <Subscription />
  </Main>
);
