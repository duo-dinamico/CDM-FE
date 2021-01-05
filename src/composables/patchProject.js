import axios from "axios";

const editProject = async (project_number, editedProject) => {
  try {
    // aritficially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await axios.patch(
      `https://cdm-be.herokuapp.com/api/project/${project_number}`,
      { ...editedProject }
    );
  } catch (err) {
    console.log(err);
  }
};

export default editProject;
