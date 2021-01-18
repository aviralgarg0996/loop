import React from 'react';

import Main from '../../layouts/Main';
import Plan from '../../features/home/auth/Plans';
import Constant from '../../utils/Constant';

export default () => (
  <Main headerType={Constant.HEADER_TYPE.AUTH}>
    <Plan />
  </Main>
);
