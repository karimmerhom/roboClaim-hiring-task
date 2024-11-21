import axios from "./axios-default";
import { globalErrorHandler } from "./api-helper";

const baseUrl = "files/";

export async function getFiles() {
    try {
        let response = await axios.get(baseUrl);
        return response
    } catch (err) {
        return globalErrorHandler(err);
    }
  }

  export async function uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      let response = await axios.post(baseUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (err) {
      return globalErrorHandler(err);
    }
  }

  
export async function getFile(id) {
    try {
        let response = await axios.get(baseUrl+`${id}`);
        return response
    } catch (err) {
        return globalErrorHandler(err);
    }
  }
