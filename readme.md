# Institute Instructor Attendance System

This backend system is designed to track instructors' check-in and check-out times throughout the day and generate aggregated monthly reports. It provides APIs for managing check-in/out times and generating monthly reports.

## Table of Contents

- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)

## Technologies Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database
- Mongoose: MongoDB object modeling tool for Node.js

## API Endpoints

### Create Instructor

- **Endpoint**: `POST /instructor`
- **Description**: This endpoint is used to create a new instructor with the provided name.
- **Request Body**:
  ```json
  {
    "name": "John Doe"
  }
- **name**: The name of the instructor to be created.
- **Response** : Upon successful creation of the instructor, the endpoint returns a JSON response containing a success message along with the details of the created instructor, including their unique ID.


### Check-in

- **Endpoint**: `POST /checkin`
- **Description**:  This endpoint is used to record the check-in time for an instructor.
- **Request Body**:
  ```json
  {
  "instructor": "611234567890123456789012"
  }
- **instructor**: The unique ID of the instructor for whom the check-in time is being recorded.
- **Note** : Checkin time will be by default current Time (only).
- **Response** :Upon successful recording of the check-in time, the endpoint returns a JSON response containing a success message along with the details of the recorded check-in record, including its unique ID, the instructor's ID, and the check-in time.

### Check-out

- **Endpoint**: `POST /checkout`
- **Description**:  This endpoint is used to record the check-out time for an instructor.
- **Request Body**:
  ```json
  {
  "instructor": "611234567890123456789012"
  }
- **instructor**: The unique ID of the instructor for whom the check-out time is being recorded.
- **Note** : Checkin time will be by default current Time (only).
- **Response** :Upon successful recording of the check-out time, the endpoint returns a JSON response containing a success message along with the details of the recorded check-out record, including its unique ID, the instructor's ID, the check-in time, and the check-out time.

### Monthly-report

- **Endpoint**: `GET /monthly-report?month=YYYY-MM`
- **Description**:  This endpoint is used to generate an aggregated monthly report of working hours for all instructors for a specified month.
- **Query Parameters**: Month in the format YYYY-MM.

- **Response** :The endpoint returns a JSON response containing an array of objects, where each object represents an instructor's working hours for the specified month. Each object includes the instructor's unique ID, name, and total working hours for the month.

## Usage

### Recording Check-in and Check-out Times

- **Check-in**: Instructors can record their check-in time using the `/checkin` endpoint.
  - Endpoint: `POST /checkin`
  - Request Body:
    ```json
    {
      "instructor": "611234567890123456789012"
    }
    ```
  - Description: Records the check-in time for the instructor with the specified ID.

- **Check-out**: Instructors can record their check-out time using the `/checkout` endpoint.
  - Endpoint: `POST /checkout`
  - Request Body:
    ```json
    {
      "instructor": "611234567890123456789012"
    }
    ```
  - Description: Records the check-out time for the instructor with the specified ID.

### Generating Monthly Reports

- **Monthly Report**: Monthly reports can be generated to view aggregated working hours of instructors.
  - Endpoint: `GET /monthly-report?month=YYYY-MM`
  - Query Parameters:
    - `month`: Specifies the month for which the report is generated (format: `YYYY-MM`).
  - Description: Generates a report containing total working hours of instructors for the specified month.

### Creating Instructors

- **Create Instructor**: New instructors can be created using the `/instructor` endpoint.
  - Endpoint: `POST /instructor`
  - Request Body:
    ```json
    {
      "name": "John Doe"
    }
    ```
  - Description: Creates a new instructor record with the provided name.
