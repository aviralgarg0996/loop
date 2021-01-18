import React from 'react';

import Main from '../../layouts/Main';
import Constant from '../../utils/Constant'
import BlogDetail from '../../features/home/blog-detail/BlogDetail';

export default () => (
  <Main headerType={Constant.HEADER_TYPE.HOME}>
    <BlogDetail />
  </Main>
);
