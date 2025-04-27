// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

// export const postRequest = async (endpoint: string, data: object) => {
//   try {
//     const response = await axios.post(`${API_URL}/${endpoint}`, data);
//     return response.data;
//   } catch (error: unknown) {
//     console.error('API Error:', error);

//     if (axios.isAxiosError(error) && error.response) {
//       throw error.response.data;
//     } else {
//       throw new Error('Something went wrong!');
//     }
//   }
// };




import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// const API_URL = 'https://6ctr1tjt-5000.uks1.devtunnels.ms/api';

// User data post request run on authentication
const postRequest = async (endpoint: string, data: object) => {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data);
    return response.data;
  } catch (error: unknown) {
    console.error('API Error:', error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong!');
    }
  }
};

//Testing API for student scan post request
export const postRequesttwo = async (endpoint: string, data: object) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}/${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("API Error:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error("Something went wrong!");
    }
  }
};
// User data get request
const getRequest = async (endpoint: string, token?: string) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('API Error:', error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong!');
    }
  }
};


const generateQr = async (title: string) => {
  const token = localStorage.getItem('token');

  try {
    const res = await axios.post(
      `${API_URL}/lecturer/generate`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error: unknown) {
    console.error('QR generation error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong!');
    }
  }
};


export const deleteRequest = async (endpoint: string, token?: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("API Error:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error("Something went wrong!");
    }
  }
};



export { postRequest, getRequest, generateQr  };
