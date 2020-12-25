import { ref } from "vue";
import axios from "axios";

const getProjects = () => {
  const projects = ref([]);

  const loadProjects = async () => {
    try {
      // artificially simulating delay
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      let res = await axios.get("https://cdm-be.herokuapp.com/api/projects");
      projects.value = res.data.projects;
    } catch (err) {
      console.log(err);
    }
  };

  return { projects, loadProjects };
};

export default getProjects;
