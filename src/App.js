import { Card, Form, Select } from "antd";
import "antd/dist/antd.css";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import React, { useEffect, useState } from "react";
import { getOperators, getStops, getTripUpdates } from "./APIs/api";
import { googleAPIKey } from "./IConstants";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function App(props) {
  const [operatorId, setOperatorId] = useState();
  const [operatorsOps, setOperatosOps] = useState();
  const [allScheduledStopPoints, setAllScheduledStopPoints] = useState();
  const [stopId, setStopId] = useState();
  const [stopOps, setStopOps] = useState();
  const [selectedStopPoint, setSelectedStopPoint] = useState();
  const [activeMarker, setActiveMarker] = useState();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  useEffect(() => {
    fetchTripUpdates();
    (async () => {
      try {
        const res = await getOperators();
        let options = [];
        Array.isArray(res.data) &&
          res.data.forEach((operator) => {
            options.push(
              <Option key={operator.Id} value={operator.Id}>
                {operator.Id}
              </Option>
            );
          });
        setOperatosOps(options);
      } catch (err) {
        throw err;
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await getPatterns();
  //       let options = [];
  //       Array.isArray(res.data) &&
  //         res.data.forEach((operator) => {
  //           options.push(<Option value={operator.Id}>{operator.Name}</Option>);
  //         });
  //       setOperatos(res.data);
  //       setOperatosOps(options);
  //     } catch (err) {
  //       throw err;
  //     }
  //   })();
  // }, []);

  // setOperatos(options);
  // getPatterns("AC", "19");
  // getTimeTable("AC", "19");
  // getLines("SF");
  // getStops("SF");

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onOperatorChange = (value) => {
    console.log(`selected ${value}`);
    if (!value) {
      return;
    }
    setOperatorId(value);
    fetchStops(value);
  };

  const fetchTripUpdates = async (value) => {
    try {
      const res = await getTripUpdates("SF");
      console.log("trips", res);
    } catch (err) {
      throw err;
    }
  };

  const fetchStops = async (value) => {
    try {
      const res = await getStops(value);
      console.log("stops", res);
      let options = [];
      //Contents.dataObjects.ScheduledStopPoint
      const {
        Contents: {
          dataObjects: { ScheduledStopPoint },
        },
      } = res;
      Array.isArray(ScheduledStopPoint) &&
        ScheduledStopPoint.forEach((stop) => {
          options.push(
            <Option key={stop.id} value={stop.id}>
              {stop.Name}
            </Option>
          );
        });
      setAllScheduledStopPoints(ScheduledStopPoint);
      setStopOps(options);
    } catch (err) {
      throw err;
    }
  };

  const onStopChange = (value) => {
    console.log(`selected ${value}`);
    setStopId(value);
    const selectedSp =
      Array.isArray(allScheduledStopPoints) &&
      allScheduledStopPoints.find((sp) => sp.id == value);
    console.log("selectedSp", selectedSp);
    setSelectedStopPoint(selectedSp);
  };

  return (
    <div className="App">
      {console.log("stopOps", stopOps)}
      <Form {...layout}>
        <Form.Item label="Operator" name="operator">
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Select an Operator Company"
            onChange={onOperatorChange}
          >
            {operatorsOps}
          </Select>
        </Form.Item>

        <Form.Item label="Stop" name="stop">
          <Select
            showSearch
            style={{ width: 300 }}
            placeholder="Select a Stop"
            onChange={onStopChange}
          >
            {stopOps}
          </Select>
        </Form.Item>
        <Form.Item>
          <Card title="Stops Located on Google Maps" style={{ height: 300 }}>
            <Map
              google={props.google}
              center={{
                lat: selectedStopPoint && selectedStopPoint.Location.Latitude,
                lng: selectedStopPoint && selectedStopPoint.Location.Longitude,
              }}
            >
              {selectedStopPoint && (
                <Marker
                  title={selectedStopPoint.Name}
                  name={selectedStopPoint.Name}
                  position={{
                    lat: selectedStopPoint.Location.Latitude,
                    lng: selectedStopPoint.Location.Longitude,
                  }}
                  onClick={onMarkerClick}
                />
              )}
              {selectedStopPoint && (
                <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
                  <div>
                    <h1> {selectedStopPoint.Name} </h1>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </Card>
        </Form.Item>
      </Form>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: googleAPIKey,
})(App);
