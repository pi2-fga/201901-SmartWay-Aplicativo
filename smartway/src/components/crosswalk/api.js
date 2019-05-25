import axios from 'axios';
import { getHeaders } from '../../shared/utils';

export function crosswalkDetectionAPI(file) {
  const endpoint = `http://18.228.137.154:3000/detect_crosswalk/`;
  // const endpoint = `http://10.0.2.2:3000/detect_crosswalk/`;
  const formData = new FormData();
  const dataFile = { uri: file.uri, name: "crosswalk.png", type: "image/png"}
  formData.append("file", dataFile);
  const headers = getHeaders();
  headers['content-type'] = 'multipart/form-data';
  return axios.post(endpoint, formData, headers);
}