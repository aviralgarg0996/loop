import React from 'react';

import Main from '../../layouts/Main';
import Purchase from '../../features/home/auth/Purchase';
import Constant from '../../utils/Constant';

export default () => (
  <Main headerType={Constant.HEADER_TYPE.AUTH}>
    <Purchase />
  </Main>
);
