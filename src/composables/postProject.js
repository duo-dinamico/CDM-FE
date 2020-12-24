import axios from "axios";

const insertProject = async (newProject) => {
  try {
    // aritficially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await axios.post(`https://cdm-be.herokuapp.com/api/project`, {
      ...newProject,
    });
  } catch (err) {
    console.log(err);
  }
};

export default insertProject;
