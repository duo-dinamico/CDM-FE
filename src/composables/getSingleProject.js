import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const getSingleProject = () => {
  const route = useRoute();
  let project = ref({});

  const loadSingleProject = async () => {
    try {
      let res = await axios.get(
        `https://cdm-be.herokuapp.com/api/project/${route.params.project_number}`
      );
      project.value = res.data.project;
    } catch (err) {
      console.log(err);
    }
  };

  return { project, loadSingleProject };
};

export default getSingleProject;
