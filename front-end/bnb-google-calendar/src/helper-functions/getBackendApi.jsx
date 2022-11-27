const getBackendApi = () => {
  let host = window.location.host;
  if (host === "localhost:5173") {
    return "http://localhost:3000";
  }
};
export default getBackendApi;
