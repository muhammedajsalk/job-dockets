📑 Job Dockets & Time Tracking Mini-API
This is a simple backend API for managing job records and employee timesheets (Dockets) for a field services company.

Built with Node.js (LTS), Express, and MongoDB (Mongoose).

🚀 1. Setup and Installation
Prerequisites
Node.js (LTS version) installed.

MongoDB instance running locally or access to a cloud cluster.

Installation Steps
Clone the Repository (or navigate to the project directory).

Install Dependencies:

Bash

npm install
Configure Environment Variables: Create a file named .env in the root directory and specify your database connection:

PORT=3000
MONGO_URI="mongodb://localhost:27017/job-dockets-api" 
🏃 2. How to Run the App
Development Mode (with Nodemon):

Bash

npm run dev
# Server will run on http://localhost:3000
Production Mode:

Bash

npm start
# Server will run on http://localhost:3000
🧐 3. Assumptions Made
Date Format: All incoming Docket date fields and filter parameters (from/to) must be strictly in the DD-MM-YYYY format.

Job ID: All :id or :jobId parameters passed in the URL are assumed to be valid MongoDB ObjectId strings.

Routing: The base path for all job and docket operations is /jobs.

Authentication: User authentication was not required for this task.