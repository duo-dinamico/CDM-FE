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

      // Add a new key pair to each register
      for (let [index, reg] of registers.value.entries()) {
        // console.log(index, reg)
        let new_risk_number = 1;
        if (index > 0) {
          for (let i = 0; i < index; i++) {
            // console.log(i, reg.discipline, registers.value[i].discipline);
            if (
              reg.discipline == registers.value[i].discipline &&
              reg.project_lifecycle_stage ==
                registers.value[i].project_lifecycle_stage
            ) {
              new_risk_number++;
              // console.log("yes: ", new_risk_number);
            }
          }
        }
        reg.risk_number =
          reg.discipline +
          "-" +
          reg.project_lifecycle_stage +
          "-" +
          new_risk_number.toString().padStart(3, "0");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addRegister = async (newRegister, project_number) => {
    try {
      await axios.post(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register`,
        { ...newRegister.value }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const delRegister = async (project_number, risk_number) => {
    try {
      await axios.delete(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register/${risk_number}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return { registers, loadRegisters, addRegister, delRegister };
};

export default Registers;
