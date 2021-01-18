import React from 'react';
import './StudioPage.scss';
import ProjectTable from '../../common/project-table/ProjectTable';
import { History } from 'history'


const StudioPage = (props: { history: History }) =>  <ProjectTable history={props.history} hubPage='studio' />
export default StudioPage;