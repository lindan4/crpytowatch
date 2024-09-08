import axios from "axios";

export const fetchCurrMetricData = (syl) => {
  return axios
    .get(`https://data.messari.io/api/v1/assets/${syl.toLowerCase()}/metrics`)
    .then((res) => {
      if (res.status == 200) {
        return res.data.data;
      } else {
        throw res;
      }
    });
};
