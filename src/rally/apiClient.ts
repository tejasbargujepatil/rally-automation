// import axios from 'axios';
// import * as dotenv from 'dotenv';

// dotenv.config();

// export class RallyAPIClient {
//     private readonly baseUrl: string;
//     private readonly apiKey: string;

//     constructor() {
//         this.baseUrl = process.env.RALLY_BASE_URL || '';
//         this.apiKey = process.env.RALLY_API_KEY || '';
//     }

//     async getStories(): Promise<any[]> {
//         const response = await axios.get(`${this.baseUrl}/hierarchicalrequirement`, {
//             headers: {
//                 'ZSESSIONID': this.apiKey,
//                 'Content-Type': 'application/json'
//             }
//         });
//         return response.data.QueryResult.Results;
//     }
    
// }

import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export class RallyAPIClient {
    private readonly baseUrl: string;
    private readonly apiKey: string;

    constructor() {
        this.baseUrl = process.env.RALLY_BASE_URL || '';
        this.apiKey = process.env.RALLY_API_KEY || '';
    }

    private validateConfig() {
        if (!this.baseUrl || !this.apiKey) {
            throw new Error('Missing Rally API configuration. Check your .env file');
        }
    }

    async getStories(): Promise<any[]> {
        this.validateConfig();
        const endpoint = new URL('hierarchicalrequirement', this.baseUrl).toString();

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    'ZSESSIONID': this.apiKey,
                    'Content-Type': 'application/json'
                }
            });
            return response.data.QueryResult.Results;
        } catch (error: any) {
            throw new Error(`Failed to fetch stories: ${error.response?.data?.Errors || error.message}`);
        }
    }
}
