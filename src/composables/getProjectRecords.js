import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const getProjectRecords = () => {
  const route = useRoute();
  const projectRecords = ref([]);

  const loadProjectRecords = async () => {
    try {
      let res = await axios.get(
        `https://cdm-be.herokuapp.com/api/project/${route.params.project_number}/records`
      );
      projectRecords.value = res.data.records;
    } catch (err) {
      console.log(err);
    }
  };

  return { projectRecords, loadProjectRecords };
};

export default getProjectRecords;
