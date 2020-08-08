import axios from 'axios';
import { authToken as apiKey, baseUrl } from '../Constants';

const addAuthToken = (url: string) => {
  return `${url}api_key=${apiKey}`;
};

export const getOperators = () => {
  let config = {
    headers: {
      Accept: 'text/html',
      Cookie: 'Version=1',
    },
  };
  const url = addAuthToken('/operators?');
  return axios.get(baseUrl + url);
};

export const getLines = async (operatorId: string) => {
  try {
    const url = addAuthToken(`/lines?operator_id=${operatorId}&`);
    let res = await axios.get(baseUrl + url);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getStops = async (operatorId: string) => {
  try {
    const url = addAuthToken(`/stops?operator_id=${operatorId}&`);
    const res = await axios.get(baseUrl + url);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getTimeTable = async (operatorId: string, lineId: string) => {
  try {
    const url =
      baseUrl +
      addAuthToken(`/timetable?operator_id=${operatorId}&line_id=${lineId}&`);
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getPatterns = async (operatorId: string, lineId: string) => {
  try {
    const url =
      baseUrl +
      addAuthToken(`/patterns?operator_id=${operatorId}&line_id=${lineId}&`);
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getTripUpdates = async (operatorId: string) => {
  try {
    const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
    const url = baseUrl + addAuthToken(`/tripupdates?agency=${operatorId}&`);
    const res = await fetch(url);
    //https://stackoverflow.com/questions/47578951/using-node-gtfs-realtime-binding-to-parse-mbta-trip-updates-feed
    //https://github.com/protobufjs/protobuf.js/issues/963
    if (res.ok) {
      const bufferRes = await res.arrayBuffer();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
        new Uint8Array(bufferRes)
      );
      return feed.entity;
    }
  } catch (err) {
    throw err;
  }
};
