import axios from "axios";
import { ref } from "vue";

const Registers = () => {
  const registers = ref([]);

  const loadRegisters = async (project_number) => {
    try {
      let res = await axios.get(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register`
      );
      registers.value = res.data.risks;
    } catch (err) {
      console.log(err);
    }
  };

  const addRegister = async (newRegister, project_number) => {
    try {
      console.log("new: ", newRegister.value)
      let res = await axios.post(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register`, {...newRegister.value}
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  const delRegister = async (project_number, discipline, stage, number) => {
    try {
      console.log("delRegister", project_number, discipline, stage, number);
      await axios.delete(`https://cdm-be.herokuapp.com/api/project/${project_number}/register/${discipline}-${stage}-${number}`)
      
    } catch (err) {
      console.log(err);
    }
  }

  return { registers, loadRegisters, addRegister, delRegister };
};

export default Registers;
