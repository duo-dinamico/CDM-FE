import { ref, computed } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const getProjectRecords = () => {
  const route = useRoute();
  const projectRecords = ref([]);
  const versionNumberList = computed(() => {
    if (projectRecords.value) {
      return projectRecords.value.map((projectRecord) => {
        return projectRecord.version_number;
      });
    }
  });

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

  return { projectRecords, loadProjectRecords, versionNumberList };
};

export default getProjectRecords;
