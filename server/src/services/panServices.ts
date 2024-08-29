import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface PanValidate {
  link_status: boolean;
}

export const panApi = async (pan: string): Promise<boolean | undefined> => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: 'https://aadhaar-number-verification-api-using-pan-number.p.rapidapi.com/api/validation/pan_to_aadhaar',
    headers: {
      'x-rapidapi-key': 'bc37cf8455msha968f009ab68504p1b8d61jsnc819cfecde5f',
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
    console.log(response);
    const isValid = response.data.link_status;  // Adjust based on the actual response structure
    return isValid;
  } catch (error) {
    console.error("Error occurred while calling the PAN to Pan API:", error);
    return undefined;  // Return undefined in case of an error
  }
};
