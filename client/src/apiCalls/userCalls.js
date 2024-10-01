import { axiosWithAuth } from "./axiosConfig";



export async function updateUserReq(id, updateUser){
  try {
      const response = await axiosWithAuth.post(`/user/update/${id}`, updateUser)
      return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
  } catch (error) {
      if(error.response.data.message){
          return {status: error.response.status, data: error.response.data.message};
      }else{
          return {status: error.response.status, data: "No server response."};
      }
  }
}

export async function deleteUserReq(id){
  try {
      const response = await axiosWithAuth.delete(`/user/delete/${id}`)
      return {status: response.status, data: response.data.message};
  } catch (error) {
      if(error.response.data.message){
          return {status: error.response.status, data: error.response.data.message};
      }else{
          return {status: error.response.status, data: "No server response."};
      }
  }
}