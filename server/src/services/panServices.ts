import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface PanValidate {
  result:{
    link_status:boolean;
  }
}

export const panApi = async (pan: string): Promise<boolean | undefined> => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://aadhaar-number-verification-api-using-pan-number.p.rapidapi.com/api/validation/pan_to_aadhaar',
    headers: {
      'x-rapidapi-key': 'ff6606d525mshfaae18d4b5e3bc8p18a307jsn4becdb16dae6',
      'x-rapidapi-host': 'aadhaar-number-verification-api-using-pan-number.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      pan: pan,
      consent: 'y',
    consent_text: 'I hear by declare my consent agreement for fetching my information via AITAN Labs API'
    },
  };

  try {
    const response: AxiosResponse<PanValidate> = await axios.request(options);
    const isValid = response.data.result.link_status; console.log(isValid) // Adjust based on the actual response structure
    return isValid;
  } catch (error) {
    console.error("Error occurred while calling the PAN to Pan API:", error);
    return undefined;  // Return undefined in case of an error
  }
};
