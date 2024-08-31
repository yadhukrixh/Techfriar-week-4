import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface BankAccountValidatePost {
    request_id: string;
}



const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getRequestId = async (accountNumber: string, ifscCode: string): Promise<string | undefined> => {
    const postOptions: AxiosRequestConfig = {
        method: 'POST',
        url: 'https://indian-bank-account-verification.p.rapidapi.com/v3/tasks/async/verify_with_source/validate_bank_account',
        headers: {
            'x-rapidapi-key':'fbc66e045emsha9139dbbab0095dp1334fbjsn98f9d7f8029e',
            'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            task_id: '123',
            group_id: '1234',
            data: {
                bank_account_no: accountNumber,
                bank_ifsc_code: ifscCode
            }
        }
    };

    try {
        const middleResponse: AxiosResponse<BankAccountValidatePost> = await axios.request(postOptions);
        const request_id:string = middleResponse.data.request_id;
        return request_id;

    } catch (error) {
        console.error("Error during API call:", error);
        return undefined;  // Return undefined in case of an error
    }
};


interface BankAccountValidateGet {
    action: string;
    completed_at: string;
    created_at: string;
    group_id: string;
    request_id: string;
    result: {
        account_exists?: string;
        amount_deposited: string;
        bank_account_number: string;
        ifsc_code: string;
        message: string | null;
        name_at_bank: string;
        status: string;
    };
    status: string;
    task_id: string;
    type: string;
}

export const bankAccountValidation = async (requestId: string): Promise<boolean | undefined> => {
    const getOptions: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://indian-bank-account-verification.p.rapidapi.com/v3/tasks',
        params: {
            request_id: requestId,
        },
        headers: {
            'x-rapidapi-key': 'fbc66e045emsha9139dbbab0095dp1334fbjsn98f9d7f8029e',
            'x-rapidapi-host': 'indian-bank-account-verification.p.rapidapi.com',
        },
    };

    try {
        let response: AxiosResponse<BankAccountValidateGet[]>;
        let status: string;

        do {
            console.log("Waiting 2 seconds...");
            await delay(2000); // Wait 2 seconds between requests
            response = await axios.request(getOptions);
            status = response.data[0].status;
           
        } while (status === "in_progress");

        if (status === "completed") {
            if (response.data[0].result.account_exists === 'YES') {
                console.log(response.data[0].result.account_exists)
                return true;
            } else {
                return false;
            }
        } else {
            console.log("Unexpected status:", status);
            return false;
        }
    } catch (error) {
        console.error("Error during API call:", error);
        return false;
    }
};



