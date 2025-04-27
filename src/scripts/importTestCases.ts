import { RallyAPIClient } from '../rally/apiClient';
import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

async function importTestCases() {
    const csvPath = process.env.CSV_PATH || './test_cases.csv';
    const client = new RallyAPIClient();
    
    const csvData = readFileSync(csvPath);
    const testCases = parse(csvData, { columns: true });
    
    for (const testCase of testCases) {
        // Implement your Rally test case creation logic here
        console.log(`Importing test case: ${testCase.Name}`);
        // await client.createTestCase(testCase);
    }
}

importTestCases().catch(console.error);