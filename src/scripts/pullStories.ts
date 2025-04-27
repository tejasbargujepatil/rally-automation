import { RallyAPIClient } from '../rally/apiClient';
import { writeFileSync, mkdirSync } from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

async function exportStories() {
    const client = new RallyAPIClient();
    const stories = await client.getStories();
    const outputDir = process.env.STORAGE_PATH || './user_stories';
    
    mkdirSync(outputDir, { recursive: true });
    
    stories.forEach((story, index) => {
        const filePath = path.join(outputDir, `story_${index + 1}.json`);
        writeFileSync(filePath, JSON.stringify(story, null, 2));
    });
}

exportStories().catch(console.error);