# SPM Associates Enterprise System

A complete production-ready enterprise software for **SPM Associates** (Civil & Interior Contractor).

## Modules
1. **Dashboard**: Analytics and tracking.
2. **Payroll Management**: Advanced HRMS with salary slip generation.
3. **Employee Management**: Worker database and attendance tracking.
4. **Invoice Generator**: GST billing with PDF export.
5. **Profit/Loss Module**: Financial tracking and reports.
6. **Supplier Payment System**: Inventory and supplier bill management.

## Tech Stack
- **Backend**: Java Spring Boot 3, Spring Security, Spring Data JPA, MySQL
- **Frontend**: React 18, TypeScript, Tailwind CSS, Zustand, Recharts
- **DevOps**: Docker, Docker Compose, GitHub Actions

## Getting Started

### Prerequisites
- Docker & Docker Compose (Recommended)
- OR Java 17+ and Node.js 18+ (for local development)

### Option 1: Run with Docker (Recommended)
This will start the Backend, Frontend, and MySQL database in containers.

1. Open a terminal in the project root directory.
2. Run the following command:
   ```bash
   docker-compose up --build
   ```
3. Wait for the services to start.
4. Access the application at: **http://localhost**
   - **Database Access**: Port 3307 (User: root, Pass: root, DB: spm_db)

### Option 2: Run Locally
If you want to run the services individually without Docker.

#### 1. Database Setup
- Install MySQL and create a database named `spm_db`.
- Update `backend/src/main/resources/application.yml` with your MySQL username and password.

#### 2. Backend Setup
```bash
cd backend
./mvnw spring-boot:run
```
The backend will start on **http://localhost:8080**.

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on **http://localhost:5173**.

## Default Credentials
The system comes with a pre-configured admin account:
- **Username**: `admin`
- **Password**: `password`

You can create more users via the Signup page or by adding them to the database.

## Project Structure
- `backend/`: Spring Boot application
- `frontend/`: React application
- `docs/`: Database schema and documentation
- `docker-compose.yml`: Docker orchestration
