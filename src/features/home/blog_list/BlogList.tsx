import React, { useState } from 'react';
import { Col, Container, Row, Card, Nav, NavItem, CardBody, Button, NavLink, TabContent, TabPane, CardFooter } from 'reactstrap';
import ContactFooter from '../../../layouts/contact_footer/ContactFooter';
import './BlogList.scss'
import classnames from 'classnames';
import blog1 from '../../../assets/images/blog1.png'
import logIcon from '../../../assets/images/icons/logo-icon.svg'
import heart from '../../../assets/images/icons/heart.svg'
import shareAlt from '../../../assets/images/icons/share-alt.svg'
import { Link } from 'react-router-dom';

const AllBlogList = (props: any) => {
    return (
        <React.Fragment>
            {props.blogList.map((item: any) => (
                <Col md="6" className="mb-5">
                    <Link to="blog-detail">
                        <Card className="p-0">
                            <img src={blog1} alt='' className="w-100" />
                            <CardBody>
                                <p className="p-1">{item.content1}</p>
                                <p >{item.content2}</p>
                            </CardBody>
                            <CardFooter>
                                <div className="d-flex justify-content-between blog-list-footer">
                                    <div className="d-flex ">
                                        <img src={logIcon} className="logo-icon" />
                                        <div className="ml-3">
                                            <p className="title">{item.title}</p>
                                            <p>{item.time}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span><img src={heart} /></span>
                                        <span>
                                            <img src={shareAlt} />
                                        </span>

                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </Link>

                </Col>
            ))}

        </React.Fragment>
    )

}

const BlogList = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab: React.SetStateAction<string>) => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    const blogList = [
        {
            id: 1,
            title: 'LOOP News',
            time: '2 days ago',
            content1: 'A Quarantined Music Industry: “The Corona Stamp”',
            content2: "Covid-19 shook mankind in 2020, it's stains on our society have impacted all that we know and it continues to firmly establish itself as the “new ...",
            image: '/static/media/blog1.png',
            type: "Industry Wrap Up"
        },
        {
            id: 2,
            title: 'LOOP News',
            time: '2 days ago',
            content1: 'Music Venue Trust Calls for £50m Rescue Package',
            content2: "Isanna is a classically trained UK based singer/songwriter who has been steadily gaining traction since her debut single ‘Until I Met You’ back... ",
            image: '../../../assets/images/blog2.png',
            type: "Spotlight"
        },
        {
            id: 3,
            title: 'LOOP News',
            time: '2 days ago',
            content1: 'Industry Wrap Up',
            content2: "From industry reform to Covid-19 and some major rebranding, we have all the top stories from the music scene this week. This week’s music news has been From industry reform to Covid-19 and some major...",
            image: '../../../assets/images/blog2.png',
            type: "Release Review"
        },
        {
            id: 4,
            title: 'LOOP News',
            time: '2 days ago',
            content1: 'Liam Gallagher’s second chance with MTV Unplugged',
            content2: "Last week Liam Gallagher released his awaited MTV Unplugged live album. It has been over 20 years since he was supposed to pass this milestone with...",
            image: '../../../assets/images/blog2.png',
            type: "Hot Topic"
        }
    ]


    return (
        <div className="blog-page">
            <div className="section-1">
                <Container className="blog-container">
                    <Row>
                        <Col md="12" className="left-section">
                            <h1>LOOP News</h1>
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { toggle('1'); }}
                                        >
                                            All Posts
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { toggle('2'); }}
                                        >
                                            Industry Wrap Up
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '3' })}
                                            onClick={() => { toggle('3'); }}
                                        >
                                            Spotlight
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '4' })}
                                            onClick={() => { toggle('4'); }}
                                        >
                                            Release Review
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '5' })}
                                            onClick={() => { toggle('5'); }}
                                        >
                                            Hot Topic
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <AllBlogList blogList={blogList} />
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">

                                    </TabPane>
                                    <TabPane tabId="3">

                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md="4" className="text-center">
                            <Button className="border-gradiant-btn">
                                <div className="inner-module">
                                    <span>Show More</span></div>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ContactFooter />
        </div>
    )
}
export default BlogList;