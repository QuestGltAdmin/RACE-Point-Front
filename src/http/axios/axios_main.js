import axios from "axios";

let timezone = Intl.DateTimeFormat().resolvedOptions();

const axiosMain = axios.create({
  baseURL: "https://q3.donative.in:3006/",
  // baseURL: "https://psmanager.race.foundation/",

  headers: {
    "Content-Type": "application/json",
    Timezone: timezone.timeZone,
  },
});
export default axiosMain;
