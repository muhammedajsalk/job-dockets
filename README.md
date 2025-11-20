# 📑 Job Dockets & Time Tracking Mini-API

A production-ready backend API for managing **Jobs** and **Dockets** (timesheets) for a field-services company.  
Built using **Node.js**, **Express**, **MongoDB**, and a clean **Modular MVC architecture**.

---

## 📦 Installation & Setup

### 1. Install Dependencies
```bash
npm install

```

### 2. Create .env File
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/job-dockets-api

```

### 3. Run in Development Mode
```bash
npm run dev

```

### 4. Run in Production
```bash
npm start

```

## 📚 1. Problem Summary

A field-services company needs a backend API to:

- Create and manage **jobs**
- Record daily **dockets**
- Prevent adding dockets to **closed jobs**
- Provide **summaries of hours by role**

---

## 🛠️ 2. Tech Stack

- Node.js (LTS)
- Express.js
- MongoDB (Mongoose)
- Modular MVC Architecture
- Request Validation (Joi or custom)
- Nodemon (development)

---


### 💡 Why Modular MVC?
- Clean separation of concerns  
- All module logic stays together  
- Easy to scale  
- Maintainable folder structure  

---

## 📘 4. Data Models

### **Job Model**
| Field        | Type    | Notes                      |
|--------------|---------|----------------------------|
| jobNumber    | String  | Required, unique           |
| clientName   | String  | Required                   |
| siteLocation | String  | Required                   |
| status       | String  | open/closed (default open) |
| createdAt    | Date    | Auto timestamp             |

---

### **Docket Model**
| Field          | Type      | Notes                                  |
|----------------|-----------|----------------------------------------|
| jobId          | ObjectId  | References Job                         |
| supervisorName | String    | Required                               |
| date           | String    | Required (DD-MM-YYYY)                  |
| labourItems    | Array     | Required, non-empty                    |
| notes          | String    | Optional                               |
| createdAt      | Date      | Auto timestamp                          |

---

## 🔌 5. API Endpoints

---

### 🟦 Jobs API

#### **POST /jobs**
Create a new Job.  
Validations:
- Required fields  
- Unique jobNumber  

---

#### **GET /jobs**
Optional filters:
- `?status=open`
- `?page=1&limit=10`

---

#### **GET /jobs/:id**
Returns job + its dockets.

---

#### **PATCH /jobs/:id/close**
Marks a job as closed.  
➜ Closed jobs **cannot** accept dockets.

---

### 🟩 Dockets API

#### **POST /jobs/:jobId/dockets**
Validations:
- Job must exist  
- Job must be open  
- Valid DD-MM-YYYY date  
- `labourItems` must be non-empty  
- `hoursWorked > 0`  

---

#### **GET /jobs/:jobId/dockets**
Optional filters:
- `?from=DD-MM-YYYY`
- `?to=DD-MM-YYYY`
- `?supervisorName=John`

---

#### **GET /dockets/summary**
Returns:

```json
{
  "totalDockets": 15,
  "totalHoursByRole": {
    "labourer": 120,
    "electrician": 40,
    "supervisor": 30
  }
}

```

---

## 🧪 6. Non-Functional Requirements Implemented

### ✔ Implemented
- Centralized global error handler  
- Request validation middleware  
- Modular MVC folder structure (Modules → Model, Service, Controller, Router)  
- Fully async/await based architecture  
- Proper & consistent HTTP status codes  
- Clean and decoupled service layer  

### ❌ Not Implemented (Optional)
- Jest test cases (optional)

---




## 📬 8. Postman Collection

A complete Postman collection is included to test all API endpoints.

### 📥 How to Import the Collection

1. Open **Postman**
2. Click **Import**
3. Upload the file:


#### Postman will automatically load all folders & requests.

---

### 🌍 Postman Environment Variables

Create a new environment in Postman and add:

| Key       | Value                  |
|-----------|-------------------------|
| base_url  | http://localhost:3000   |

All API requests use:



---

### 📂 Postman Collection Includes

#### 📁 Jobs
- Create Job  
- List Jobs  
- Get Job by ID  
- Close Job  

#### 📁 Dockets
- Create Docket  
- List Dockets (supports filtering)  
- Get Docket by ID  
- Summary Endpoint  

---

### 🔄 Recommended Testing Flow

1. **Create a Job**
2. **Create multiple Dockets** for that job
3. **Filter dockets** by date or supervisor
4. **Close the Job**
5. Try adding a new docket → **Should fail** (expected ❌)
6. Fetch **Summary Report**:
   - Total dockets  
   - Total hours by labour role  

---
