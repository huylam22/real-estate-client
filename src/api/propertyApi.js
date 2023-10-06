export const apiURL = "https://real-estate-production-acd8.up.railway.app/";
// export const apiURL = "http://localhost:8080/";

export const propertyAPI = {
  getPropertyDetail: (propertyId, type) =>
    `${apiURL}api/v1/properties/${propertyId}${type ? `/${type}` : ""}`,
  getProperties: (
    landType = "",
    query = "",
    page = 0,

    size = 12,
    order = "desc"
  ) =>
    `${apiURL}api/v1/properties?sort=id,${order}&page=${page}&size=${size}&propertyPostingStatus=${query}&propertyLandType=${landType}`,
  getPropertiesSearch: (query = "") =>
    `${apiURL}api/v1/properties?sort=id,desc&page=0&size=10&propertyPostingStatus=${query}`,
  propertyImage: (path) =>
    `${import.meta.env.VITE_AWS_S3_BUCKET_DOMAIN}/${path}`,
  addPropertyPhoto: (propertyId) =>
    `${apiURL}api/v1/photos/upload/${propertyId}`,
  defaultImage:
    "https://cdn.dribbble.com/userupload/4220677/file/original-c7f0a15e2d639a6dc4b91665ec79ba7b.jpg?compress=1&resize=2048x1536",
};
