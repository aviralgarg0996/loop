import React, { Component } from "react"
import { connect } from 'react-redux';
import './location.scss'
import { Row } from 'reactstrap';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"
import { location, searchlocation, discoverLocationData } from '../../../../redux/discovery/action';
import locationicon1 from '../../../../assets/images/location-icon1.png';
import locationicon2 from '../../../../assets/images/location-icon2.png';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
import _ from 'lodash';
import { Link } from "react-router-dom";
interface IState {
  selectedMarker: any,
  searchedLocation: any,
  address: any,
}

const exampleMapStyles: any[] = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];

const MapWithAMarker = withScriptjs(withGoogleMap((props: {
  isMarkerShown: boolean, googleMapURL: string,
  loadingElement: any, containerElement: any, mapElement: any, locationList: any[],
  onClick: any,
  selectedMarker: any,
  user: any,
}) => {
  const [position, setPosition] = React.useState({
    lat: 37.0902, lng: 95.7129
  });

  React.useEffect(() => {
    if (props.user && props.user.location) {
      setPosition({
        lat: props.user && props.user.location && parseFloat(props.user.location.lat) || 37.0902,
        lng: props.user && props.user.location && parseFloat(props.user.location.long) || 95.7129
      })
    }
  }, [props.user])

  return (
    <GoogleMap defaultOptions={{
      styles: exampleMapStyles,
    }}
      defaultZoom={10}
      center={position}
    >
      {props.locationList && props.locationList.map((marker, index) => {
        const templat = marker.location.latitude ? parseFloat(marker.location.latitude) : parseFloat(marker.lat);
        if (props.user && props.user.location && props.user.location.lat != templat)
          return (
            <Marker
              key={marker.id}
              onClick={() => props.onClick(marker)}
              // onMouseOut={() => props.onClick(false)}
              position={{ lat: marker.location.latitude ? parseFloat(marker.location.latitude) : parseFloat(marker.lat), lng: marker.location.longitude ? parseFloat(marker.location.longitude) : parseFloat(marker.long) }}
              icon={locationicon2}
            >
              {props.selectedMarker === marker &&
                <InfoWindow>
                  <Link to={`/discovery/view-profile/${marker.user_id}`} className="location-redirect">
                    <div className="loc-prof-img">
                      <img src={marker.photo} />
                    </div>
                    {marker.first_name} {marker.last_name}
                    <div className="expertise-name">
                      {marker.expertise && marker.expertise.map((data: any, i: any) => {
                        if (data)
                        return (
                          <div style={{ marginRight: '3px' }}> {data.name} {marker && marker.expertise.length - 1 !== i ? ' | ' : ''}  </div>
                        )
                      })}
                    </div>
                  </Link>
                </InfoWindow>}
            </Marker>
          )
      })}
      <Marker
        onClick={() => props.onClick(props.user)}
        // onMouseOut={() => props.onClick(false)}
        position={{ lat: props.user && props.user.location && parseFloat(props.user.location.lat), lng: props.user && props.user.location && parseFloat(props.user.location.long) }}
        icon={locationicon1}
      >
        {props.selectedMarker === props.user &&
          <InfoWindow>
            <Link to={`/hub/view-profile/${props.user.user_id}`} className="location-redirect">
              <div className="loc-prof-img">
                <img src={props.user && props.user.photo} />

              </div>
              {props.user.first_name} {props.user.last_name}
              <div className="expertise-name">
                {props.user && props.user.expertise && props.user.expertise.map((data: any, i: any) => {
                  return (
                    <div style={{ marginRight: '3px' }}> {data.name} {props.user && props.user.expertise.length - 1 !== i ? ' | ' : ''}  </div>
                  )
                })}
              </div>

            </Link>
          </InfoWindow>}
      </Marker>
    </GoogleMap>
  )
}));

class Location extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      selectedMarker: false,
      searchedLocation: {},
      address: '',
    }
  }
  componentDidMount() {
    this.props.location();
    this.props.discoverLocationData();
  }

  handleClick = (marker: any) => {
    if(this.state.selectedMarker !== marker){
      this.setState({ selectedMarker: marker })
    } else {
      this.setState({ selectedMarker: false })
    }
  }

  handleChange = (address: any) => {
    if (_.isEmpty(address)) {
      this.props.location();
    }
    this.setState({ address });
  };
 
  handleSelect = (address: any) => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        if (latLng.lat && latLng.lng) {
          this.props.searchlocation({
            lat: latLng.lat,
            long: latLng.lng,
          })
        }
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    let { locationList, user } = this.props;
    const titlesData = this.props && this.props.locationDataTitle;
    const title = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'title')
    const description = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'description')
    
    return (
      <div className="recently">
        <div className="top-head">
          <div>
            <h1>{title && title.text}</h1>
            <p className="f-p">{description && description.text}</p>
          </div>
          <div className="input-area location-search">
            <div className="search-location-in">
               <i className="icon icon-search"></i>
            </div>
            <PlacesAutocomplete
             value={this.state.address}
             onChange={this.handleChange}
             onSelect={this.handleSelect}
             shouldFetchSuggestions={this.state.address.length > 2}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Enter Location',
                      className: 'location-search-input',
                    })}
                    value={this.state.address}
                  />
                  {/* "autocomplete-dropdown-container" */}
                  <div className={suggestions.length > 0 ? 'autocomplete-dropdown-container autocomplete-shadow': 'autocomplete-dropdown-container'}>
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        </div>
        {/* AIzaSyDOplTnOzQM_tYwPVFqxueCYui4brD2j2g */}
        <MapWithAMarker
          selectedMarker={this.state.selectedMarker}
          isMarkerShown={true}
          locationList={locationList}
          onClick={this.handleClick}
          user={user}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDOplTnOzQM_tYwPVFqxueCYui4brD2j2g&v=3.exp&libraries=geometry,drawing,places&callback=myCallbackFunc"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px` }} className="location-area"/>}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div >
    )
  }
}

interface IProps {
  locationList: any[];
  location: () => Promise<any>;
  searchlocation: (latlong: any) => Promise<any>;
  history: History;
  user: any;
  discoverLocationData: any,
  locationDataTitle: any
}

const mapStateToProps = (state: any) => {
  return {
    locationList: state.discovery.location || [],
    user: state.user.profile || {},
    locationDataTitle: state.discovery.locData
  }
}

const mapDispatchToProps = {
  location,
  discoverLocationData,
  searchlocation
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);