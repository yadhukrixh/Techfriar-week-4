import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface AadhaarApiResponse {
  data: boolean;
  // Add any other properties returned by the API if needed
}

export const aadhaarApi = async (aadhaarNumber: string): Promise<boolean | undefined> => {
  const aadhaarOptions: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://api.apyhub.com/validate/aadhaar',
    headers: {
      'apy-token': 'APY0XsNxqgeX0irbaqfVbF9nLhwqyVLrWC8CBJcBqyHI8UpddjcTSWOpCakr9YNpQEoRV9a9k',
      'Content-Type': 'application/json',
    },
    data: { aadhaar: aadhaarNumber },
  };

  try {
    const response = await axios.request<AadhaarApiResponse>(aadhaarOptions);
    const isValid = response.data.data;  // This should be response.data to get the boolean value
    return isValid;
  } catch (error) {
    console.error("Error occurred while calling the Aadhaar API:", error);
    return undefined;  // Return undefined in case of an error
  }
};

  
