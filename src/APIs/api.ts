import axios from "axios";
import { authToken as apiKey, baseUrl } from "../IConstants";

const addAuthToken = (url: string) => {
  return `${url}api_key=${apiKey}`;
};

export const getOperators = async () => {
  const url = addAuthToken("/operators?");
  const res = await axios.get(baseUrl + url);
  console.log("operators", res);
};

export const getLines = async (operatorId: string) => {
  const url = addAuthToken(`/lines?operator_id=${operatorId}&`);
  let res = await axios.get(baseUrl + url);
  console.log("lines", res);
};

export const getStops = async (operatorId: string) => {
  const url = addAuthToken(`/stops?operator_id=${operatorId}&`);
  const res = await axios.get(baseUrl + url);
  console.log("stops", res);
};

export const getTimeTable = async (operatorId: string, lineId: string) => {
  const url =
    baseUrl +
    addAuthToken(`/timetable?operator_id=${operatorId}&line_id=${lineId}&`);
  const res = await axios.get(url);
  console.log("timetable", res);
};

export const getPatterns = async (operatorId: string, lineId: string) => {
  const url =
    baseUrl +
    addAuthToken(`/patterns?operator_id=${operatorId}&line_id=${lineId}&`);
  const res = await axios.get(url);
  console.log("patterns", res);
};
