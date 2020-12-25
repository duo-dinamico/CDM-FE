import axios from "axios";
import { ref } from "vue";

const getRegisters = () => {
  const registers = ref([]);

  const loadRegisters = async (project_number) => {
    try {
      let res = await axios.get(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register`
      );
      console.log("Res: ", res.data.risks);
      registers.value = res.data.risks;
    } catch (err) {
      console.log(err);
    }
  };

  return { registers, loadRegisters };
};

export default getRegisters;
