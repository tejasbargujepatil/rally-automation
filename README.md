
# Rally Automation Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
4. [Project Structure](#project-structure)
5. [Configuration](#configuration)
6. [Usage](#usage)
7. [Script Details](#script-details)
8. [Testing](#testing)
9. [Troubleshooting](#troubleshooting)
10. [Security](#security)
11. [Version Control](#version-control)
12. [References](#references)
13. [Review](#Review)

## Project Overview <a name="project-overview"></a>
Automation solution to integrate Rally with local file system:
- Pull user stories from Rally API
- Store stories in specified local directory
- Import test cases from CSV to Rally
- Built with TypeScript, Playwright, and Cucumber
- Cross-platform support (Windows & Linux)

## Prerequisites <a name="prerequisites"></a>
### For Windows:
```powershell
# Install Node.js 16+
winget install OpenJS.NodeJS.LTS

# Install Git
winget install Git.Git

# Install VS Code (optional)
winget install Microsoft.VisualStudioCode
```

### For Linux (Ubuntu/Debian):
```bash
# Install Node.js 16+
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Git
sudo apt-get install git

# Install build essentials (for native modules)
sudo apt-get install build-essential
```

## Setup Instructions <a name="setup-instructions"></a>
### 1. Clone Repository
```bash
git clone https://github.com/tejasbargujepatil/rally-automation.git
cd rally-automation
```

### 2. Install Dependencies
```bash
# Install project dependencies
npm install

# Install Playwright browsers
npx playwright install

# Initialize git (if starting new)
git init
```

### 3. Configure Environment
```bash
# Create environment file
cp .env.template .env

# Edit configuration (use proper editor)
code .env
```
Update these values in `.env`:
```ini
RALLY_API_KEY=your_actual_api_key
RALLY_BASE_URL=https://rally1.rallydev.com/slm/webservice/v2.0
STORAGE_PATH=./user_stories
CSV_PATH=./test_cases.csv
```

### 4. Verify Installation
```bash
# Check Node version
node -v # Should be >=16.0.0

# Check npm version
npm -v # Should be >=7.0.0

# Verify TypeScript
npx tsc --version # Should be >=4.0.0
```

## Project Structure <a name="project-structure"></a>
```
rally-automation/
├── docs/                  # Documentation files
├── src/
│   ├── rally/            # Rally API interactions
│   ├── features/         # BDD test definitions
│   ├── scripts/          # Main automation scripts
│   └── utils/            # Helper functions
├── test/                 # Unit tests
├── .env                  # Environment variables
├── .gitignore           # Version control exclusions
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Configuration <a name="configuration"></a>
### Environment Variables (.env)
| Variable | Required | Example | Description |
|----------|----------|---------|-------------|
| `RALLY_API_KEY` | Yes | `_abc123def456` | Rally API key (ZSESSIONID) |
| `RALLY_BASE_URL` | Yes | `https://company.rallydev.com` | Base Rally API URL |
| `STORAGE_PATH` | No | `./rally_data` | Local storage path for user stories |
| `CSV_PATH` | No | `./test_data.csv` | Path to CSV test cases file |

### Security Best Practices
1. Never commit `.env` to version control
2. Restrict file permissions:
   ```bash
   chmod 600 .env
   ```
3. Use environment-specific credentials
4. Enable HTTPS for all API communication

## Usage <a name="usage"></a>
### Pull User Stories from Rally
```bash
npm run pull-stories
```
Sample Output:
```
Found 15 user stories
Saved stories to ./user_stories
```

### Import Test Cases from CSV
```bash
npm run import-testcases
```
Sample CSV Format:
```csv
Name,Description,Priority,TestCaseStatus
"Login Test","Verify user login",High,Approved
"Search Test","Test search functionality",Medium,Draft
```

### Run BDD Tests
```bash
npm test
```
Expected Test Output:
```
2 scenarios (2 passed)
6 steps (6 passed)
```

## Script Details <a name="script-details"></a>
### 1. pullStories.ts
- Authentication: Uses ZSESSIONID header
- API Endpoint: `/hierarchicalrequirement`
- Storage: Saves as JSON files in `STORAGE_PATH`
- Error Handling: Retries failed requests

### 2. importTestCases.ts
- CSV Requirements:
  - Header row required
  - Supported fields: Name, Description, Priority, TestCaseStatus
- API Endpoint: `/testcase`
- Batch Processing: Processes 10 records at a time

## Testing <a name="testing"></a>
### Cucumber Features
```gherkin
Feature: Rally Automation
  Scenario: Export User Stories
    Given Valid Rally credentials
    When Requesting user stories
    Then Stories saved locally
    
  Scenario: Import Test Cases
    Given Valid CSV file
    When Importing test cases
    Then Test cases created in Rally
```

### Running Tests
```bash
# Full test suite
npm test

# Specific feature
npx cucumber-js src/features/rally.feature

# With HTML report
npx cucumber-js --format html:report.html
```

## Troubleshooting <a name="troubleshooting"></a>
### Common Issues
1. **Invalid URL Error**
   - Cause: Incorrect `RALLY_BASE_URL`
   - Fix: Verify URL format: `https://[organization].rallydev.com/slm/webservice/v2.0`

2. **Module Not Found**
   ```bash
   npm install --save-dev @types/module-name
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **CSV File Not Found**
   - Verify file exists at `CSV_PATH`
   - Check file permissions: `ls -l $CSV_PATH`

4. **API Authentication Failures**
   - Regenerate API key in Rally
   - Check network connectivity:
     ```bash
     curl -I $RALLY_BASE_URL
     ```

## Security <a name="security"></a>
### Key Measures
1. Credential Storage
   - API keys only in `.env`
   - Encrypted secrets for CI/CD
2. Data Validation
   - Sanitize CSV inputs
   - Validate API responses
3. Audit Logging
   ```typescript
   // Example audit log
   console.log(`[${new Date().toISOString()}] User stories exported`);
   ```
4. Access Control
   ```bash
   # Set strict file permissions
   chmod 700 src/rally/
   chmod 600 .env
   ```

## Version Control <a name="version-control"></a>
### Git Workflow
1. Initialize Repository
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Branch Strategy
   ```bash
   git checkout -b feature/new-integration
   git push origin main
   ```
3. Ignore Patterns (`.gitignore`)
   ```
   node_modules/
   .env
   user_stories/
   *.log
   ```

## References <a name="references"></a>
1. [Rally API Documentation](https://rally1.rallydev.com/slm/doc/webservice/)
2. [Playwright Documentation](https://playwright.dev/docs/intro)
3. [Cucumber.js Guide](https://cucumber.io/docs/guides/)
4. [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support
For issues contact: [Mail Us](mailto:tejasbarguje9@gmail.com)  
Emergency Hotline: [Chat on WhatsApp](https://wa.me/918087147136?text=Hello%20Tejas%2C%20I%20have%20an%20emergency%20regarding%20the%20project.%20Please%20respond%20ASAP!)

### Portfolio:

**Checkout Our Projects:** [Visit Portfolio](https://tejasbargujepatilcom.vercel.app/)
 
## Review By Client <a name="Review"></a>
<img width="1858" height="959" alt="image" src="https://github.com/user-attachments/assets/8245dea6-2e09-4e4b-98a8-709f5612bfd6" />


---

