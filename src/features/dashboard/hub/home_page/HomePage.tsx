import React from 'react';
import './HomePage.scss';
import ProjectTable from '../../common/project-table/ProjectTable';
import {History} from 'history'

const HomePage = (props: {history: History}) => {
     
    return(
        <ProjectTable history={props.history} hubPage='home'/>
    )
}
export default HomePage;