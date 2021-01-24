import axios from "axios";
import Config from "../../config/Config";



interface Window {
  [key:string]: any; // Add index signature
}
let windowObj : Window = window;
const API = () =>{

   let axiosClient =  axios.create(
    {
      baseURL: `https://loop-server.orbiqon.com/public/`,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }
    },
  );

  axiosClient.interceptors.request.use(req => {
    console.log(`API ${req.method} ${req.url}`);
    // Important: request interceptors **must** return the request.
    return req;
  });
  
  axiosClient.interceptors.response.use(
    res => res,
    err => {
      console.log("API ERROR", err.response);
      if (err.response.status === 400) {
        console.log("API ERROR", err.response);
      // localStorage.clear()
      //  windowObj.location = Config.LOGIN_URL;

      //   throw new Error(`${err.config.url} not found`);
      }
      throw err;
    }
  );

  return axiosClient;
}
export default API

