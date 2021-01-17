import axios from "axios";

const removeProject = async (project_number) => {
    try {
        return await axios.delete(`https://cdm-be.herokuapp.com/api/project/${project_number}`);
    } catch (err) {
        console.log(err)
    }
}

export default removeProject;