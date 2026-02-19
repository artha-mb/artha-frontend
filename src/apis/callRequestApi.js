// callRequestApi.js

const apiUrl = "http://localhost:4200/callrequests";

/* ===============================
   Fetch All Call Requests
================================ */
export const fetchCallRequests = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Server Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch Call Requests Error:", error.message);
    throw error;
  }
};

/* ===============================
   Create New Call Request
================================ */
export const createCallRequest = async (requestData) => {
  try {
    const newRequest = {
      id: Date.now().toString(),
      fullName: requestData.fullName,
      phone: requestData.phone,
      time: requestData.time,
      purpose: requestData.purpose,
      status: "pending", // default status
      createdDate: new Date().toLocaleDateString("en-GB"),
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequest),
    });

    if (!response.ok) {
      throw new Error("Failed to create call request");
    }

    return await response.json();
  } catch (error) {
    console.error("Create Call Request Error:", error.message);
    throw error;
  }
};

/* ===============================
   Update Call Request Status
================================ */
export const updateCallRequestStatus = async (requestId, newStatus) => {
  try {
    const response = await fetch(`${apiUrl}/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update call request status");
    }

    return await response.json();
  } catch (error) {
    console.error("Update Call Request Error:", error.message);
    throw error;
  }
};

/* ===============================
   Delete Call Request
================================ */
export const deleteCallRequest = async (requestId) => {
  try {
    const response = await fetch(`${apiUrl}/${requestId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete call request");
    }

    return true;
  } catch (error) {
    console.error("Delete Call Request Error:", error.message);
    throw error;
  }
};
