import axios from "axios";

export const axiosGet = async (path) => {
  try {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
    const result = await axios.get(path, {}, config);
    if (result && result.data) {
      return result;
    }
  } catch (error) {
    console.log("🚀 ~ file: api-helper.js ~ line 16 ~ axiosGet ~ error", error);
    return error;
  }
};
