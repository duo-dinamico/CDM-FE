import axios from "axios";
import { ref } from "vue";

const Registers = () => {
  const registers = ref([]);

  const loadRegisters = async (project_number) => {
    // artificially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      let res = await axios.get(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register`
      );
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

        // Calculate risk product
        if (reg.likelihood * reg.severity < 4) {
          reg.risk_product = "L";
        } else if (reg.likelihood * reg.severity < 10) {
          reg.risk_product = "M";
        } else {
          reg.risk_product = "H";
        }

        // Calculate risk product mitigation
        if (reg.likelihood_mitigated * reg.severity_mitigation < 4) {
          reg.risk_product_mitigated = "L";
        } else if (reg.likelihood_mitigated * reg.severity_mitigation < 10) {
          reg.risk_product_mitigated = "M";
        } else {
          reg.risk_product_mitigated = "H";
        }

        // Convert date to format YYYY-MM-DD
        reg.date = reg.date.substring(0, 10)
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

  const delRegister = async (project_number, risk_number) => {
    // artificially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      await axios.delete(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register/${risk_number}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const patchRegister = async (
    project_number,
    risk_number,
    edited_register
  ) => {
    // artificially simulating delay
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      await axios.patch(
        `https://cdm-be.herokuapp.com/api/project/${project_number}/register/${risk_number}`,
        { ...edited_register }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return { registers, loadRegisters, addRegister, delRegister, patchRegister };
};

export default Registers;
