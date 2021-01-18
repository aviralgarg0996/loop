import React from 'react';

import Main from '../../layouts/Main';
import PurchaseSuccess from '../../features/home/auth/PurchaseSuccess';
import Constant from '../../utils/Constant';

const PurchaseSuccessR = () => (
  <Main headerType={Constant.HEADER_TYPE.AUTH}>
    <PurchaseSuccess />
  </Main>
);
export default PurchaseSuccessR;