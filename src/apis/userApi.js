// userApi.js

const apiUrl = "http://localhost:4200/users";

/* ===============================
   Fetch All Users
================================ */
export const fetchUsers = async () => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Users Error:", error);
    throw error;
  }
};

/* ===============================
   Create User (Mobile from Form)
================================ */
export const createUser = async (userData) => {
  try {
    const newUser = {
      id: Date.now().toString(),

      fullName: userData.fullName,
       userName: userData.userName,
       email: userData.email,
      mobile: userData.mobile,
      password: userData.password,

      classGrade: userData.classGrade || "",
      exam: userData.exam || "",
      attempts: 0,
      averageScore: 0,

      status: "active",
      createdDate: new Date().toLocaleDateString("en-GB"),
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  } catch (error) {
    console.error("Create User Error:", error);
    throw error;
  }
};

// login 
export const loginUser = async (identifier, password) => {
  try {
    const trimmedIdentifier = identifier.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const users = await response.json();

    const foundUser = users.find(user => {
      const userEmail = user.email?.toLowerCase();
      const userName = user.userName?.toLowerCase();

      return (
        (userEmail === trimmedIdentifier ||
          userName === trimmedIdentifier) &&
        user.password === trimmedPassword
      );
    });

    if (!foundUser) return null;

    // ✅ Update status to ACTIVE in db.json
    await fetch(`${apiUrl}/${foundUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "active",
      }),
    });

    // ✅ Fetch updated user
    const updatedResponse = await fetch(`${apiUrl}/${foundUser.id}`);
    const updatedUser = await updatedResponse.json();

    return updatedUser;

  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};


//logout
export const logoutUser = async (userId) => {
  try {
    await fetch(`${apiUrl}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "inactive",
      }),
    });

    localStorage.removeItem("loggedUser");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};


/* ===============================
   Toggle User Status
================================ */
export const toggleUserStatus = async (userId, currentStatus) => {
  try {
    const updatedStatus =
      currentStatus?.toLowerCase() === "active"
        ? "blocked"
        : "active";

    const response = await fetch(`${apiUrl}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: updatedStatus,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user status");
    }

    return await response.json();
  } catch (error) {
    console.error("Toggle Status Error:", error);
    throw error;
  }
};

/* ===============================
   Search Users
================================ */
export const searchUsers = async (query) => {
  try {
    const response = await fetch(
      `${apiUrl}?fullName_like=${query}&mobile_like=${query}`
    );

    if (!response.ok) {
      throw new Error("Failed to search users");
    }

    return await response.json();
  } catch (error) {
    console.error("Search Error:", error);
    throw error;
  }
};

/* ===============================
   Filter Users By Status
================================ */
export const filterUsersByStatus = async (status) => {
  try {
    const response = await fetch(
      `${apiUrl}?status=${status.toLowerCase()}`
    );

    if (!response.ok) {
      throw new Error("Failed to filter users");
    }

    return await response.json();
  } catch (error) {
    console.error("Filter Error:", error);
    throw error;
  }
};
export const updateUserStats = async (userId, updatedData) => {
  try {
    const response = await fetch(`${apiUrl}/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user stats");
    }

    return await response.json();
  } catch (error) {
    console.error("Update User Stats Error:", error);
    throw error;
  }
};


/* ===============================
   Get User By ID
================================ */
export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/${userId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return await response.json();
  } catch (error) {
    console.error("Get User Error:", error);
    throw error;
  }
};
