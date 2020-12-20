import { ref } from "vue";
import axios from "axios";

const getProjects = () => {
  const projects = ref([]);

  const loadProjects = async () => {
    try {
      let res = await axios.get("https://cdm-be.herokuapp.com/api/projects");
      let { projects } = res.data;
      projects.value = await projects;
    } catch (err) {
      console.log(err);
    }
  };

  return { projects, loadProjects };
};

export default getProjects;
