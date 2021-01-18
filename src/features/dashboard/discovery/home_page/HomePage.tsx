import React from 'react';
import './HomePage.scss'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; 
import ListCard from '../../common/list_card/ListCard';
import FooterDashboard from '../../common/footer_dahboard/FooterDashboard';
import { connect } from 'react-redux';
import { discovery, discoveryFeatured, discoverHomeData } from '../../../../redux/discovery/action';
import { getProfileById, playTrack } from '../../../../redux/user/action'; 
import { History } from 'history';
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1366 },
        items: 5
    }, 
    desktop: {
        breakpoint: { max: 1365, min: 1001 },
        items: 4
    },
    desktop2: {
        breakpoint: { max: 1000, min: 768 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 767, min: 499 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 500, min: 0 },
        items: 2.5
    }
};

interface IProps{
    getProfileById: (id: string) => Promise<any>,
    discovery: ()=> Promise<any>,
    discoveryFeatured: ()=> Promise<any>,
    playTrack: (data: any, isPaused: boolean) => Promise<any>,
    discover: any[],
    discoverFeatured: any[],
    history: History, 
    playingTrack: any,
    discoverHomeData: any,
    discoverTitles: any
}

interface IState{
    filteredDiscover: any[],
    filteredDiscoverFeatured: any[],
    searchKey: string;
    user: any | null
}

class HomePage extends React.Component<IProps, IState> {
    
    readonly state: IState = {filteredDiscover: [], filteredDiscoverFeatured: [], searchKey: '', user: JSON.parse( JSON.stringify(localStorage.getItem("userData")) )};

    constructor(props: any){
        super(props);
    }

    componentWillMount(){
        this.props.discoveryFeatured();
        this.props.discovery();
        this.props.discoverHomeData();
    }

    componentDidUpdate(props: IProps){
        if(props.discover != this.props.discover || props.discoverFeatured != this.props.discoverFeatured){
            this.onSearch(this.state.searchKey);
        }
    }

    onSearch = (searchKey: string) => {
        let { filteredDiscoverFeatured, filteredDiscover } = this.state;
        let { discover, discoverFeatured } = this.props;
        searchKey = searchKey.toLowerCase();
        filteredDiscover = discover.filter((item: any) => `${item.first_name} ${item.last_name}`.toLowerCase().includes(searchKey))
        filteredDiscoverFeatured = discoverFeatured.filter((item: any) => `${item.first_name} ${item.last_name}`.toLowerCase().includes(searchKey))
        this.setState({ searchKey, filteredDiscoverFeatured, filteredDiscover });
    }

    trackClicked = (item: any) => {
        const { playingTrack } = this.props;
        this.props.getProfileById(item.user_id).then((res: any) => {
            let demoTrack = (res.data.demo_track || []).find((item: any) => item.primary === 1);
            if(demoTrack){
                demoTrack.first_name = res.data.first_name;
                demoTrack.last_name = res.data.last_name;
                let isPaused  = false;
                if(playingTrack){
                    isPaused =  playingTrack.track_id != demoTrack.track_id ? false : !playingTrack.isPaused ;
                }
                this.props.playTrack(demoTrack, isPaused)
            }else{
                toast.error("Demo track not found")
            }
        });
    }

    isPlaying = (id: string) => {
        const { playingTrack } = this.props;
        let isPaused  = false;
        if(playingTrack){
            isPaused =  playingTrack.track_id !=  id ? false : !playingTrack.isPaused ;
        }
    }

    render () {
        let { history } = this.props;
        const titlesData = this.props && this.props.discoverTitles;
        const title = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'title')
        const title2 = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'title_home_1')
        const description = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'description')
        const description2 = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'description_home_1')
        const myDate = new Date();
        const hrs = myDate.getHours();

        let { filteredDiscoverFeatured, filteredDiscover } = this.state;
        const { user } = this.state;
        let parsedUser : any   = {}
        if(user   ){
            parsedUser = JSON.parse(  user  )
        }
        return (
            <React.Fragment>
                <div className="homePage">
                <ToastContainer />
                    <div className="top-head">
                        <h1>{hrs < 12 ? 'Good Morning' : (hrs >= 12 && hrs <= 17) ? 'Good Afternoon' : (hrs >= 17 && hrs <= 24) ? 'Good Evening' : null }, {parsedUser.first_name || ""}</h1>
                        <div className="search-field">
                            <input type="text" placeholder="Search" onChange={(event: any) => this.onSearch(event.target.value)} />
                            <i className="icon icon-search"></i>
                        </div>
                    </div>
                    <div className="featured">
                        <p className="f-p1">{title && title.text}</p>
                        <p className="f-p">{description && description.text}</p>
                        <div className="position-relative">
                            <Carousel responsive={responsive} className="carousel-custom">
                                {
                                    filteredDiscover && filteredDiscover.map((user, index) => (
                                        <ListCard key={index} history={history} data={user} onClick={ this.trackClicked }/>
                                    )) 
                                }
                            </Carousel>
                            {/* <div className={filteredDiscover.length === 4  ? '' : 'gradiant'}></div> */}
                        </div>
                    </div>
                    <div className="featured  ">
                        <p className="f-p1">{title2 && title2.text}</p>
                        <p className="f-p">{description2 && description2.text}</p>
                        <div className="position-relative">
                            <Carousel responsive={responsive} className="carousel-custom">
                            {
                                    filteredDiscoverFeatured && filteredDiscoverFeatured.map((user, index) => (
                                        <ListCard  key={index} history={history}  data={user} onClick={ this.trackClicked } />
                                    )) 
                                }
                            </Carousel>
                            {/* <div className={filteredDiscoverFeatured.length === 4  ? '' : 'gradiant'}></div> */}
                        </div>
                    </div>
                </div>
                {/* <FooterDashboard /> */}
            </React.Fragment>
        )
    }
    
}


const mapStateToProps = ( state: any ) => {
    return { 
        discover: state.discovery.discover,
        discoverFeatured: state.discovery.discoverFeatured,
        discoverTitles: state.discovery.disData,
        playingTrack: state.user.playingTrack,
    }
}

const mapDispatchToProps =  {
    discovery, discoveryFeatured, playTrack, getProfileById , discoverHomeData 
}

export default  connect(mapStateToProps, mapDispatchToProps )(HomePage);

