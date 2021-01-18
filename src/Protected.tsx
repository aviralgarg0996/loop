import React, { ReactType } from 'react'
import { Redirect, match, Route } from 'react-router-dom'
import { getPath } from './router-paths';

interface IProps{
    component: ReactType;
    path?: string;
    match?: match<{ name?: string }>; 
}

class ProtectedRoute extends React.Component<IProps> {

    constructor(props: any){
        super(props)
    }

    render() {
        const Component = this.props.component;
        const { match, path } = this.props;
        const isAuthenticated = localStorage.getItem("token")  
       
        return ( 
            <Route render={(props: any) => (
                isAuthenticated ? <Component {...props} /> : <Redirect to={getPath('home')} />
            )} />
         );
    }
}

export default ProtectedRoute;