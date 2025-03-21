import axios from "axios";

const API_URL = "http://localhost:5000/info";

const infoService = {
  dept: async () => {
    try {
      const response = await axios.get(`${API_URL}/dept`,{
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  },
  trade: async () => {
    try {
      const response = await axios.get(`${API_URL}/trade`,{
        withCredentials: true, // ✅ Ensures cookies (JWT) are sent
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  },
  employees: async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`,{
        withCredentials: true, // ✅ Ensures cookies (JWT) are sent
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  },
  employees_per_faculty: async () => {
    try {
      const response = await axios.get(`${API_URL}/employeesFac`,{
        withCredentials: true, // Ensures cookies (JWT) are sent
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  }
};

export default infoService;
