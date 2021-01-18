import React from 'react';
import  './AuthFooter.scss';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const AuthFooter = () => {
    
    return(
        <Container className="footer-bottom">
            <div className="footer">
                <Link to="/hub/settings/terms-and-condition">
                    <p>Privacy Policy & Terms of Service</p>
                </Link>
                
                <p>© 2020 LOOP Inc. All rights reserved.</p>
            </div>
        </Container>
        
    )
}
export default AuthFooter;