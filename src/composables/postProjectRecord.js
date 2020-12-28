import axios from "axios";

const loadProjectRecords = async (project_number, newRecord) => {
  try {
    // aritficially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await axios.post(
      `https://cdm-be.herokuapp.com/api/project/${project_number}/records`,
      { ...newRecord }
    );
  } catch (err) {
    console.log(err);
  }
};

export default loadProjectRecords;
