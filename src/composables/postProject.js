import axios from "axios";

const insertProject = async (newProject) => {
  try {
    await axios.post(`https://cdm-be.herokuapp.com/api/project`, {
      ...newProject,
    });
  } catch (err) {
    console.log(err);
  }
};

export default insertProject;
