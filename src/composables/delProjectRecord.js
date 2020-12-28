import axios from "axios";

const delProjectRecord = async (project_number, version) => {
  try {
    // aritficially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await axios.delete(
      `https://cdm-be.herokuapp.com/api/project/${project_number}/record/${version}`
    );
  } catch (err) {
    console.log(err);
  }
};

export default delProjectRecord;
