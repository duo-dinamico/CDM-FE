import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cdm-be.herokuapp.com/api",
});

export const getProjects = () => {
  return axiosInstance.get("/projects").then((projects) => {
    return projects.data.projects;
  });
};
