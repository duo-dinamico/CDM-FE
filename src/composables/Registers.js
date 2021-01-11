import axios from "axios";
import { ref } from "vue";

const Registers = () => {
  const registers = ref([]);
  const risk = ref({});

  const loadRegisters = async (project_number) => {
    // artificially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      let res = await axios.get(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register`
      );
      if (!res.data.msg) {
        registers.value = res.data.risks;
        // Add a new key pair to each register
        for (let [index, reg] of registers.value.entries()) {
          let new_risk_number = 1;
          if (index > 0) {
            for (let i = 0; i < index; i++) {
              if (
                reg.discipline == registers.value[i].discipline &&
                reg.project_lifecycle_stage ==
                  registers.value[i].project_lifecycle_stage
              ) {
                new_risk_number++;
              }
            }
          }
          reg.risk_number =
            reg.discipline +
            "-" +
            reg.project_lifecycle_stage +
            "-" +
            new_risk_number.toString().padStart(3, "0");

          // Convert date to format YYYY-MM-DD
          reg.date = reg.date.substring(0, 10);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadSingleRisk = async (project_number, register_id) => {
    // artificially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      let res = await axios.get(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register/${register_id}`
      );
      if (!res.data.msg) {
        risk.value = res.data.risk;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addRegister = async (newRegister, project_number) => {
    // artificially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      await axios.post(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register`,
        { ...newRegister.value }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const delRegister = async (project_number, register_id) => {
    // artificially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      await axios.delete(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register/${register_id}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const patchRegister = async (
    project_number,
    register_id,
    edited_register
  ) => {
    // artificially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      await axios.patch(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register/${register_id}`,
        { ...edited_register }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    registers,
    loadRegisters,
    addRegister,
    delRegister,
    patchRegister,
    loadSingleRisk,
  };
};

export default Registers;
