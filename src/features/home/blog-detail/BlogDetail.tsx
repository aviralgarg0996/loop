import React  from 'react';
import { Col, Container, Row, Card,  CardBody, CardFooter } from 'reactstrap';
import ContactFooter from '../../../layouts/contact_footer/ContactFooter';
import './BlogDetail.scss'
import blog1 from '../../../assets/images/blog1.png'
import logIcon from '../../../assets/images/icons/logo-icon.svg'

const BlogDetailView = (props: any) => {
    return (
        <React.Fragment>
        { props.blogList.map((item: any) => (
           item.id === 1 && <Col md="12">
            <Card className="p-0 mb-5 detail-card">
            <div className="banner">
                <img src={blog1} alt='' className="w-100"/>
                </div>
                <CardBody>
                    <div className="d-flex header-section">
                        <h1>{item.content1}</h1>
                        <div className="blog-list-footer">
                        <div className="d-flex ">
                            <img src={logIcon} className="logo-icon"/>
                            <div className="ml-3">
                                <p className="title">{item.title}</p>
                                <p>{item.time}</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <p className="text-1">{item.content2}</p>
                    <p >{item.content3}</p>
                    <p >{item.content4}</p>
                    <p >{item.content5}</p>
                    <p >{item.content6}</p>
                    <p >{item.content7}</p>
                    <p >{item.content8}</p>
                    <p >{item.content9}</p>
                    <p >{item.content10}</p>
                    <p className="pg-2 mt-5">{item.content11}</p>
                    <p className="pg-2">{item.content12}</p>
                </CardBody>
                <CardFooter>
                    <div className="d-flex justify-content-between blog-list-footer">
                        <div className="d-flex ">
                            <img src={logIcon} className="logo-icon"/>
                            <div className="ml-3">
                                <p className="title">{item.title}</p>
                                <p>{item.time}</p>
                            </div>
                        </div>
                        <div>
                            <a href="https://twitter.com/" target="_blank"><span><i className="icon icon-twitter"></i></span></a>
                            <a href="https://www.facebook.com/" target="_blank"><span><i className="icon icon-facebook-f"></i></span></a>
                            <a href="https://www.linkedin.com/" target="_blank"><span><i className="icon icon-linkedin-in"></i></span></a>
                            <a href="javascript:void(0)"><span><i className="icon icon-share-alt"></i></span></a>
                            <a href="javascript:void(0)"><span><i className="icon icon-heart"></i></span></a>

                            
                        </div>
                    </div>
                </CardFooter>
        </Card>
            </Col>  
            ))}
        
        </React.Fragment>
    )

}
const AllBlogList = (props: any) => {
    return (
        <React.Fragment>
        { props.blogList.map((item: any) => (
            
            <Col md="4">
            <Card className="p-0 recent-card">
                <img src={blog1} alt='' className="w-100"/>
                <CardBody>
                    <p className="pg-1">{item.content1}</p>
                </CardBody>
                <CardFooter>
                    <div className="d-flex justify-content-between blog-list-footer">
                        <div className="d-flex ">
                            <img src={logIcon} className="logo-icon"/>
                            <div className="ml-3">
                                <p className="title">{item.title}</p>
                                <p>{item.time}</p>
                            </div>
                        </div>
                        <div>
                        <span><i className="icon icon-heart"></i></span>
                        </div>
                    </div>
                </CardFooter>
        </Card>
            </Col>  
            ))}
        
        </React.Fragment>
    )

}

const BlogDetail = () => {
   

    const blogList = [
        {
            id:1,
            title: 'LOOP News',
            time: '2 days ago',
            content1: 'A Quarantined Music Industry: “The Corona Stamp”', 
            content2: "Covid-19 shook mankind in 2020, it's stains on our society have impacted all that we know and it continues to firmly establish itself as the “new norm.” The music industry was one not spared and continues to feel the drastic effects from the measures put in place all around the world. No concerts, festivals, no live shows, no get-togethers, nothing. Even a small performance in your local pub could bring consequences. The repercussions left on countless live performers whose income solely relied on night outs and intimate performances in venues across the country has left them in situations we can’t fathom. So where does this leave them? Where does this leave us? The music lovers, concert-goers, the ears to the beauty that brings people together? ", 
            content3: "If there is one thing that’s definitely visible in the music industry right now, it’s “The Corona Stamp.” From the biggest stars on the planet, to the burgeoning artists, one thing's for sure, coronavirus is present in the art. When governments from around the world began lockdown and social distancing, music makers hit a red light. Recording studios shut, music videos could not be shot, and several artists were forced to put a pause to their projects.",
            content4: "From the start, many were left in the unknown with work that had been on-going. An Indie artist and profound songwriter, Sasha Sloan, was in the early stages of recording her album when it was cut short. Instead, she had to begin recording at home. But this story is one of many. Even the bigger artists including Ariana Grande, Ava Max and Charli XCX all had to “180” in the way they create - the studio to the bedroom. These big names have all had to record new music in their homes and for some, this was far out from the usual and totally new. This was an awakening, forcing creatives to learn the basic fundamentals of the recording process. One of Sweden’s biggest female popstars, Zara Larsson, quoted “I’m so excited to get out of this quarantine at least knowing how to cut my vocals and put down some chords for my own ideas.”. Sabrina Carpenter, the 21-year-old breakout Disney star said, “never sleeping again”, the caption on one of her Instagram posts of her small studio situated right next to her bed.",
            content5: "This is only a fraction of the impact that Covid-19 has had upon creators; music videos have been drastically affected too. Newly released music videos such as Rain On Me by Lady Gaga and Ariana Grande, (shot before lockdown) had a cast consisting of at least 24 dancers. Under the new rules, not only would that be unsafe in a dance studio to learn the choreography, it would be illegal. Coronavirus has lead artists to a current trend we're now seeing a lot of: the artist, and their homemade visuals.  From green screens to nothing but a bedroom, the stars have had to shoot their music videos in the comfort of their own homes.",
            content6: "Charli XCX set a goal of recording a whole new album in just six weeks when lockdown began. Following the release of this project, it seemed the music videos were the start of this new trend. She green-screened her first single from it, “claws.”",
            content7: "Lennon Stella, the Canadian singer and actress removed all of her furniture out of her living room to capture the official video for “fear of being alone” from her latest album “Three. Two. One.” The Jonas Brothers “X” ft. Karol G, a fun, Spanish influenced track hit youtube with yet again, a socially distanced themed video. ",
            content8: "From the likes of Julia Micheals building a fort of sheets for “Give it you,” in her home, to Joy Crooks filming the visualizer in her flat for “Anyone But Me” these videos are showing the lengths artists are going to facing implemented rules.",
            content9: "If it’s not in your bedroom, it’s the environment surrounding you. Katy Perry’s “Daisies” follows the soon to be superstar mum across an escape in nature. Aitch, the young rapper from Manchester used his city to encapsulate his single “30.” The safety precautions? Medical face masks replaced the social distancing in this one. ",
            content10: "To promote their new singles, live performances on late-night TV shows have been replaced by pre-recorded home performances. Jimmy Fallon has replaced his weekly live performance slots to home editions. ",
            content11: "Were not sure how long Covid-19 will co-exist with us, but it looks like artists may have to continue to dig deep for visual creativity a little while longer.",
            content12: "From us to you, stay safe and keep creating.",
            image: '/static/media/blog1.png',
            type:"Industry Wrap Up"
        },
        {
            id:2,
            title: 'LOOP News',
            time: '2 days ago',
            content1: 'Music Venue Trust Calls for £50m Rescue Package', 
            content2: "Isanna is a classically trained UK based singer/songwriter who has been steadily gaining traction since her debut single ‘Until I Met You’ back... ", 
            content3: "If there is one thing that’s definitely visible in the music industry right now, it’s “The Corona Stamp.” From the biggest stars on the planet, to the burgeoning artists, one thing's for sure, coronavirus is present in the art. When governments from around the world began lockdown and social distancing, music makers hit a red light. Recording studios shut, music videos could not be shot, and several artists were forced to put a pause to their projects.",
            content4: "From the start, many were left in the unknown with work that had been on-going. An Indie artist and profound songwriter, Sasha Sloan, was in the early stages of recording her album when it was cut short. Instead, she had to begin recording at home. But this story is one of many. Even the bigger artists including Ariana Grande, Ava Max and Charli XCX all had to “180” in the way they create - the studio to the bedroom. These big names have all had to record new music in their homes and for some, this was far out from the usual and totally new. This was an awakening, forcing creatives to learn the basic fundamentals of the recording process. One of Sweden’s biggest female popstars, Zara Larsson, quoted “I’m so excited to get out of this quarantine at least knowing how to cut my vocals and put down some chords for my own ideas.”. Sabrina Carpenter, the 21-year-old breakout Disney star said, “never sleeping again”, the caption on one of her Instagram posts of her small studio situated right next to her bed.",
            content5: "This is only a fraction of the impact that Covid-19 has had upon creators; music videos have been drastically affected too. Newly released music videos such as Rain On Me by Lady Gaga and Ariana Grande, (shot before lockdown) had a cast consisting of at least 24 dancers. Under the new rules, not only would that be unsafe in a dance studio to learn the choreography, it would be illegal. Coronavirus has lead artists to a current trend we're now seeing a lot of: the artist, and their homemade visuals.  From green screens to nothing but a bedroom, the stars have had to shoot their music videos in the comfort of their own homes.",
            content6: "Charli XCX set a goal of recording a whole new album in just six weeks when lockdown began. Following the release of this project, it seemed the music videos were the start of this new trend. She green-screened her first single from it, “claws.”",
            content7: "Lennon Stella, the Canadian singer and actress removed all of her furniture out of her living room to capture the official video for “fear of being alone” from her latest album “Three. Two. One.” The Jonas Brothers “X” ft. Karol G, a fun, Spanish influenced track hit youtube with yet again, a socially distanced themed video. ",
            content8: "From the likes of Julia Micheals building a fort of sheets for “Give it you,” in her home, to Joy Crooks filming the visualizer in her flat for “Anyone But Me” these videos are showing the lengths artists are going to facing implemented rules.",
            content9: "If it’s not in your bedroom, it’s the environment surrounding you. Katy Perry’s “Daisies” follows the soon to be superstar mum across an escape in nature. Aitch, the young rapper from Manchester used his city to encapsulate his single “30.” The safety precautions? Medical face masks replaced the social distancing in this one. ",
            content10: "To promote their new singles, live performances on late-night TV shows have been replaced by pre-recorded home performances. Jimmy Fallon has replaced his weekly live performance slots to home editions. ",
            
            image: '../../../assets/images/blog2.png',
            type:"Spotlight"
        },
        {
            id:3,
            title: 'LOOP News',
            time: '2 days ago',
            content1: 'Industry Wrap Up', 
            content2: "From industry reform to Covid-19 and some major rebranding, we have all the top stories from the music scene this week. This week’s music news has been From industry reform to Covid-19 and some major...", 
            content3: "If there is one thing that’s definitely visible in the music industry right now, it’s “The Corona Stamp.” From the biggest stars on the planet, to the burgeoning artists, one thing's for sure, coronavirus is present in the art. When governments from around the world began lockdown and social distancing, music makers hit a red light. Recording studios shut, music videos could not be shot, and several artists were forced to put a pause to their projects.",
            content4: "From the start, many were left in the unknown with work that had been on-going. An Indie artist and profound songwriter, Sasha Sloan, was in the early stages of recording her album when it was cut short. Instead, she had to begin recording at home. But this story is one of many. Even the bigger artists including Ariana Grande, Ava Max and Charli XCX all had to “180” in the way they create - the studio to the bedroom. These big names have all had to record new music in their homes and for some, this was far out from the usual and totally new. This was an awakening, forcing creatives to learn the basic fundamentals of the recording process. One of Sweden’s biggest female popstars, Zara Larsson, quoted “I’m so excited to get out of this quarantine at least knowing how to cut my vocals and put down some chords for my own ideas.”. Sabrina Carpenter, the 21-year-old breakout Disney star said, “never sleeping again”, the caption on one of her Instagram posts of her small studio situated right next to her bed.",
            content5: "This is only a fraction of the impact that Covid-19 has had upon creators; music videos have been drastically affected too. Newly released music videos such as Rain On Me by Lady Gaga and Ariana Grande, (shot before lockdown) had a cast consisting of at least 24 dancers. Under the new rules, not only would that be unsafe in a dance studio to learn the choreography, it would be illegal. Coronavirus has lead artists to a current trend we're now seeing a lot of: the artist, and their homemade visuals.  From green screens to nothing but a bedroom, the stars have had to shoot their music videos in the comfort of their own homes.",
            content6: "Charli XCX set a goal of recording a whole new album in just six weeks when lockdown began. Following the release of this project, it seemed the music videos were the start of this new trend. She green-screened her first single from it, “claws.”",
            content7: "Lennon Stella, the Canadian singer and actress removed all of her furniture out of her living room to capture the official video for “fear of being alone” from her latest album “Three. Two. One.” The Jonas Brothers “X” ft. Karol G, a fun, Spanish influenced track hit youtube with yet again, a socially distanced themed video. ",
            content8: "From the likes of Julia Micheals building a fort of sheets for “Give it you,” in her home, to Joy Crooks filming the visualizer in her flat for “Anyone But Me” these videos are showing the lengths artists are going to facing implemented rules.",
            content9: "If it’s not in your bedroom, it’s the environment surrounding you. Katy Perry’s “Daisies” follows the soon to be superstar mum across an escape in nature. Aitch, the young rapper from Manchester used his city to encapsulate his single “30.” The safety precautions? Medical face masks replaced the social distancing in this one. ",
            content10: "To promote their new singles, live performances on late-night TV shows have been replaced by pre-recorded home performances. Jimmy Fallon has replaced his weekly live performance slots to home editions. ",
            
            image: '../../../assets/images/blog2.png',
            type:"Release Review"
        }
    ]
 

    return (
        <div className="blog-detail-page">
            <div className="section-1">
                <Container className="blog-container">
                    <Row>
                        <BlogDetailView blogList={blogList}/>
                     
                    </Row>
                    <div className="recent-post">
                        <Row>
                        <Col md="12" className="d-flex justify-content-between mb-4 mt-4">
                            <div>
                                <h3>Recent Posts</h3>
                            </div>
                            <div>
                                <button className="show-all-btn">
                                        Show All
                                </button>
                            </div>
                        </Col>
                        </Row>
                        <Row className="card-grid">
                            <AllBlogList blogList={blogList}/>
                        </Row>
                    </div>
                </Container>
            </div>
            <ContactFooter />

        </div>
    )
}
export default BlogDetail;