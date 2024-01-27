import { toast } from "react-toastify";
import httpRequest from "../config/httpRequest/HttpRequest";

export const fetchDemo = async (): Promise<string> => {
  try {
    const response = await httpRequest.get<string>("/2");
    return response.data || ""; // Return an empty string if response.data is undefined
  } catch (e) {
    toast.error(`Error : ${e}`, { autoClose: 2000 });
    return ""; // Return an empty string in case of an error
  }
};
