import axios from "axios";

export const fetchCurrMetricData = (syl) => {
  return axios.get(
    `https://data.messari.io/api/v1/assets/${syl.toLowerCase()}/metrics`
  );
};
