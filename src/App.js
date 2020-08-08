import { EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, Select, Spin } from 'antd';
import 'antd/dist/antd.css';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import React, { useEffect, useState } from 'react';
import { getOperators, getStops, getTripUpdates } from './APIs/api';
import './App.css';
import TimeDetails from './Components/TimeDetails';
import { googleAPIKey } from './IConstants';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

const App = (props) => {
  const [operatorsOps, setOperatosOps] = useState();
  const [allScheduledStopPoints, setAllScheduledStopPoints] = useState();
  const [stopOps, setStopOps] = useState();
  const [selectedStopPoint, setSelectedStopPoint] = useState();
  const [activeMarker, setActiveMarker] = useState();
  const [showingInfoWindow, setShowingInfoWindow] = useState(true);
  const [tripUpdates, setTripUpdates] = useState();
  const [tripUpdatesOfStop, setTripUpdatesOfStop] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getOperators();
        let options = [];
        Array.isArray(res.data) &&
          res.data.forEach((operator) => {
            options.push(
              <Option key={operator.Id} value={operator.Id}>
                {operator.Name}
              </Option>
            );
          });
        setOperatosOps(options);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      }
    })();
  }, []);

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onOperatorChange = (value) => {
    if (!value) {
      return;
    }
    fetchTripUpdates(value);
    fetchStops(value);
  };

  const fetchTripUpdates = async (value) => {
    try {
      setLoading(true);
      const res = await getTripUpdates(value);
      const arr = [];
      res.forEach((entity) => {
        arr.push(entity.tripUpdate.stopTimeUpdate);
      });
      const flattendTrips = arr.flat();
      setTripUpdates(flattendTrips);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const fetchStops = async (value) => {
    try {
      setLoading(true);
      const res = await getStops(value);
      let options = [];
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const onStopChange = (value) => {
    const selectedSp =
      Array.isArray(allScheduledStopPoints) &&
      allScheduledStopPoints.find((sp) => sp.id == value);
    const result = tripUpdates.find((obj) => {
      return obj.stopId === selectedSp.id;
    });
    setTripUpdatesOfStop(result);
    setSelectedStopPoint(selectedSp);
  };

  return (
    <div className='App'>
      <Spin spinning={loading}>
        <Layout>
          <Sider theme='light' breakpoint='lg'>
            <Menu theme='light' mode='inline'>
              <SubMenu key='sub1' icon={<TeamOutlined />} title='Operators'>
                <Menu.Item key='1'>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder='Select an Operator Company'
                    onChange={onOperatorChange}
                  >
                    {operatorsOps}
                  </Select>
                </Menu.Item>
              </SubMenu>
              <SubMenu key='sub2' icon={<EnvironmentOutlined />} title='Stops'>
                <Menu.Item key='2'>
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder='Select a Stop'
                    onChange={onStopChange}
                  >
                    {stopOps}
                  </Select>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header className='site-layout-sub-header-background'>
              <h2>Find arrival and departure times and stop locations </h2>
              {tripUpdatesOfStop && (
                <TimeDetails
                  name={selectedStopPoint.Name}
                  arrivalTime={
                    tripUpdatesOfStop.arrival &&
                    new Date(
                      tripUpdatesOfStop.arrival.time * 1000
                    ).toLocaleTimeString()
                  }
                  departureTime={
                    tripUpdatesOfStop.departure &&
                    new Date(
                      tripUpdatesOfStop.departure.time * 1000
                    ).toLocaleTimeString()
                  }
                />
              )}
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div
                className='site-layout-background'
                style={{
                  padding: 24,
                  position: 'absolute',
                  width: '85%',
                  height: '85%',
                }}
              >
                <Map
                  google={props.google}
                  style={{
                    position: 'absolute',
                    width: '85%',
                    height: '85%',
                  }}
                  center={{
                    lat:
                      selectedStopPoint && selectedStopPoint.Location.Latitude,
                    lng:
                      selectedStopPoint && selectedStopPoint.Location.Longitude,
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
                    <InfoWindow
                      marker={activeMarker}
                      visible={showingInfoWindow}
                    >
                      <div>
                        <h2> {selectedStopPoint.Name} </h2>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>MIT License.</Footer>
          </Layout>
        </Layout>
      </Spin>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: googleAPIKey,
})(App);
