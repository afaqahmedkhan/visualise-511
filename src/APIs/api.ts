import axios from "axios";
import { authToken as apiKey, baseUrl } from "../IConstants";
//import { Line } from "./../../src/Models/LineResponseModel"

const addAuthToken = (url: string) => {
  return `${url}api_key=${apiKey}`;
};

export const getOperators = () => {
  let config = {
    headers: {
      Accept: "text/html",
      Cookie: "Version=1",
    },
  };
  const url = addAuthToken("/operators?");
  return axios.get(baseUrl + url, config);
};

export const getLines = async (operatorId: string) => {
  try {
    const url = addAuthToken(`/lines?operator_id=${operatorId}&`);
    let res = await axios.get(baseUrl + url);
    console.log("lines", res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getStops = async (operatorId: string) => {
  try {
    const url = addAuthToken(`/stops?operator_id=${operatorId}&`);
    const res = await axios.get(baseUrl + url);
    console.log("stops", res.data);
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
    console.log("timetable", res.data);
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
    console.log("patterns", res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getTripUpdates = async (operatorId: string) => {
  try {
    const url = baseUrl + addAuthToken(`/tripupdates?agency=${operatorId}&`);
    const res = await axios.get(url);
    console.log("tripupdates", res.data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
