import { ref } from "vue";
import axios from "axios";

const getSingleProject = () => {
  let project = ref({});

  const loadSingleProject = async (project_number) => {
    try {
      let res = await axios.get(
        `https://cdm-be.herokuapp.com/api/project/${project_number}`
      );
      project.value = res.data.project;
    } catch (err) {
      console.log(err);
    }
  };

  return { project, loadSingleProject };
};

export default getSingleProject;
