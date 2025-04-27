import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { RallyAPIClient } from '../../rally/apiClient';
import { existsSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

let client: RallyAPIClient;
let storyCount: number;

Given('I have valid Rally credentials', async function () {
  client = new RallyAPIClient();
  // Verify credentials by making a simple request
  await client.getStories();
});

When('I request user stories from Rally', async function () {
  const stories = await client.getStories();
  storyCount = stories.length;
});

Then('Stories should be saved to the local directory', function () {
  const storagePath = process.env.STORAGE_PATH || './user_stories';
  expect(existsSync(storagePath)).toBeTruthy();
  expect(storyCount).toBeGreaterThan(0);
});

Given('I have a valid CSV file', function () {
  const csvPath = process.env.CSV_PATH || './test_cases.csv';
  expect(existsSync(csvPath)).toBeTruthy();
});

When('I import test cases to Rally', function () {
  // Implement your CSV import logic here
  return 'pending';
});

Then('Test cases should be created in Rally', function () {
  // Add verification logic here
  return 'pending';
});