const API_URL = "http://localhost:5000/api/auth";

const authService = {
  login: async (username, password, role, faculty) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      withCredentials:true,
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role, faculty }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  },

  logout: async () => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  },
};

export default authService;
