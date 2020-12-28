import axios from "axios";

const editProjectRecord = async (project_number, version, editedRecord) => {
  try {
    // aritficially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await axios.patch(
      `https://cdm-be.herokuapp.com/api/project/${project_number}/record/${version}`,
      { ...editedRecord }
    );
  } catch (err) {
    console.log(err);
  }
};

export default editProjectRecord;
