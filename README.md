# Garbage Collection Website

The Garbage Collection Website is a platform designed to facilitate efficient garbage collection for municipal councils. It allows users to report and track garbage collection incidents, enabling the Green Task Force (GTF) and Colombo Municipal Council (CMC) to manage and prioritize garbage cleanup efforts effectively.

## Project Objective

The primary goal of this project is to enable GTF members to report garbage incidents and allow CMC officials and staff to manage and address these reports.

## Functional Requirements

### User Roles

1. **Green Task Force Members (GTF Members)**

    - Sign up and log in to the system.
    - Report incidents with location, details, and images.
    - View, update, and delete their own reports.

2. **Green Captain**

    - View and manage reported incidents.
    - Approve or reject incidents.
    - Prioritize incidents based on importance.

3. **Collecting Staff**

    - View approved incidents on a map.
    - Access details and importance levels of incidents for collection.

4. **Web Master (Admin)**
    - Create accounts for captains and collecting staff.
    - Post news articles and add garbage collection spots.

### General Users (Non-registered Users)

-   View garbage collection spots on a map.
-   Read news articles posted by the CMC.

## Non-Functional Requirements

-   **Security:** Passwords are encrypted, and all users are authenticated.
-   **Reliability:** Available 24/7 with minimal downtime.
-   **Scalability:** Handles a large number of users with scalable performance.
-   **User-Friendliness:** Compatible with different browsers and devices, with an easy-to-use interface.
-   **Password Management:** Users can reset their passwords.

## Getting Started

### Run Backend

```bash
cd backend
npm instal
npm run dev
```

### Run Frontend

```bash
cd backend
npm install
npm start
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any improvements or feature additions.

## Contact

For any inquiries or feedback, please raise an issue on the GitHub repository.

## Screenshots

### Colecting Places

![Colecting Places](/screenshots/colecting.png)

### Colecting Places Details

![Colecting Places Details](/screenshots/colectingdetails.png)

### Reported Incidents

![Reported Incidents](/screenshots/Reports%20List.png)

### Incident Details

![Incident Details](/screenshots/Reports%20Details.png)

### Create new Report

![Create new Report](/screenshots/report.png)
