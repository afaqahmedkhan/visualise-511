import { Card } from "antd";
import { GoogleApiWrapper } from "google-maps-react";
import React from "react";
import {
  getLines,
  getOperators,
  getPatterns,
  getStops,
  getTimeTable,
} from "./APIs/api";
import "./App.css";
import { googleAPIKey } from "./IConstants";

function App(props) {
  getOperators("AC");
  getPatterns("AC", "19");
  getTimeTable("AC", "19");
  getLines("SF");
  getStops("SF");

  // state = {
  //   showingInfoWindow: false,
  //   activeMarker: {},
  //   selectedPlace: {},
  // };

  const onMarkerClick = (props, marker, e) => {
    // setState({
    //   selectedPlace: props,
    //   activeMarker: marker,
    //   showingInfoWindow: true,
    // });
  };

  const onMapClicked = (props) => {
    // if (state.showingInfoWindow) {
    //   setState({
    //     showingInfoWindow: false,
    //     activeMarker: null,
    //   });
    // }
  };

  return (
    <div className="App">
      <Card title="Stops Located on Google Maps" style={{ width: 300 }}>
        {/* <Map google={props.google} onClick={onMapClicked}>
          <Marker onClick={onMarkerClick} name={"Current location"} />

          <InfoWindow
            marker={state.activeMarker}
            visible={state.showingInfoWindow}
          >
            <div>
              <h1> {state.selectedPlace.name} </h1>
            </div>
          </InfoWindow>
        </Map> */}
      </Card>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: googleAPIKey,
})(App);
