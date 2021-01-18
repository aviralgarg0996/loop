import React from 'react';
import './MyNetworkPage.scss';
import ProjectTable from '../../common/project-table/ProjectTable';
import { History } from 'history';

const MyNetworkPage = (props: { history: History }) => {
  return <ProjectTable history={props.history} hubPage="myNetwork" />;
};
export default MyNetworkPage;
