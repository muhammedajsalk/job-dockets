📑 Job Dockets & Time Tracking Mini-APIThis is a simple backend API for managing job records and employee timesheets (Dockets) for a field services company.Built with Node.js (LTS), Express, and MongoDB (Mongoose).🚀 1. Setup and InstallationPrerequisitesNode.js (LTS version) installed.MongoDB instance running locally (e.g., via MongoDB Compass or Docker) or access to a cloud cluster (e.g., MongoDB Atlas).Installation StepsClone the Repository (or navigate to the project directory).Install Dependencies:Bashnpm install
This installs Express, Mongoose, Joi, dotenv, and moment.Configure Environment Variables:Create a file named .env in the root directory and specify your database connection:PORT=3000
MONGO_URI="mongodb://localhost:27017/job-dockets-api" 
🏃 2. How to Run the AppThe server can be run in development mode using nodemon (for automatic restarts) or in production mode.Development Mode:Bashnpm run dev
# Server will run on http://localhost:3000
Production Mode:Bashnpm start
# Server will run on http://localhost:3000
🧐 3. Assumptions MadeDate Format: All incoming Docket date fields in the request body and from/to filter parameters in the URL must be strictly in the DD-MM-YYYY format.Job ID: All :id or :jobId parameters passed in the URL are assumed to be valid 24-character MongoDB ObjectId strings.API Structure: The base path for all job and docket operations is /jobs.🌐 4. API Endpoints ReferenceThe base URL for all endpoints is http://localhost:3000/jobs.4.1. Jobs ManagementMethodEndpointDescriptionPOST/Creates a new job. jobNumber must be unique.GET/Lists jobs with optional filters.GET/:idReturns a single job including all associated dockets.PATCH/:id/closeMarks a job as closed. Prevents new dockets from being created for this job.Example: POST /jobsURL: POST http://localhost:3000/jobsRequest Body (req.body):JSON{
    "jobNumber": "JOB-001",
    "clientName": "Acme Corp",
    "siteLocation": "123 Main Street"
    // "status" is optional, defaults to "open"
}
Example: GET /jobs (Filtering/Pagination)URL: GET http://localhost:3000/jobs?status=open&page=2&limit=104.2. Dockets ManagementMethodEndpointDescriptionPOST/:jobId/docketsCreates a new docket for the specified job. Requires the job to be open.GET/:jobId/docketsLists dockets for a single job with optional filters.GET/dockets/summaryGlobal Endpoint - Returns aggregate data across all jobs.Example: POST /jobs/:jobId/docketsURL: POST http://localhost:3000/jobs/{{JOB_A_ID}}/docketsRequest Body (req.body):JSON{
    "supervisorName": "John Doe",
    "date": "20-11-2025", 
    "labourItems": [
        {
            "workerName": "Worker A",
            "role": "electrician",
            "hoursWorked": 7.5 // Must be > 0
        },
        {
            "workerName": "Worker B",
            "role": "labourer",
            "hoursWorked": 3.0 
        }
    ],
    "notes": "Completed initial setup."
}
Example: GET /jobs/:jobId/dockets (Filtering)URL (Filter by Supervisor and Date Range):GET http://localhost:3000/jobs/{{JOB_A_ID}}/dockets?supervisorName=John&from=01-11-2025&to=30-11-2025
