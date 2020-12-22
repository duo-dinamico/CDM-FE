import { ref } from "vue";
import axios from "axios";

const getProjects = () => {
  const projects = ref([]);

  const loadProjects = async () => {
    try {
      console.log("ive reloaded");
      let res = await axios.get("https://cdm-be.herokuapp.com/api/projects");
      for (let project of res.data.projects) {
        projects.value.push(project);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { projects, loadProjects };
};

export default getProjects;
