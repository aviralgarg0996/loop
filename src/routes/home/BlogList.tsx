import React from 'react';

import Main from '../../layouts/Main';
import Constant from '../../utils/Constant'
import BlogList from '../../features/home/blog_list/BlogList';

export default () => (
  <Main headerType={Constant.HEADER_TYPE.HOME}>
    <BlogList />
  </Main>
);
