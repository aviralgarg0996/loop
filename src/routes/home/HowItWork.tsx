import React from 'react';

import Main from '../../layouts/Main';
import Constant from '../../utils/Constant';
import HowItWork from '../../features/home/how_it_work/HowItWork';

export default () => (
  <Main headerType={Constant.HEADER_TYPE.HOME}>
    <HowItWork />
  </Main>
);
