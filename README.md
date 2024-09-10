# Validation Server (Version 2.0) - Frontend

This repository contains the frontend code for the Urban Institute's [Safe Data Technologies](https://www.urban.org/projects/safe-data-technologies) Validation Server Version 2.0 prototype. 

## Quick Links
- [Technical White Paper](https://www.urban.org/research/publication/privacy-preserving-validation-server-version-2) 
- [Staging URL](https://sdt-validation-server.urban.org) 

## Related Repositories

- [validation-server-v2-api](https://github.com/UrbanInstitute/validation-server-v2-api): Django REST API for the validation server version 2.0 prototype
- [validation-server-v2-backend](https://github.com/UrbanInstitute/validation-server-v2-backend): Backend for the validation server version 2.0 prototype
- [validation-server-v2-infrastructure](https://github.com/UrbanInstitute/validation-server-v2-infrastructure): CloudFormation stack for the API and frontend infrastructure of the validation server version 2.0 prototype

## API Documentation
- [Swagger](https://sdt-validation-server.urban.org/api/docs/): Description of the endpoints, methods, and data schemas
- [Demo](https://github.com/UrbanInstitute/validation-server-v2-api/blob/main/api-demo.ipynb): Python code demonstrating how to interact with the API (e.g. to authenticate, submit jobs, list jobs, get results, refine results, get budget, etc.)

### Overview
​
The API is structured around several main resources:
​
- **Budget**:
  - Retrieve, create, update, and delete budget data through endpoints like `/api/budget/budget/`, `/api/budget/budget/{id}/`.
    ​
- **Job**:
  - Manage jobs, runs, and related actions such as refining and releasing through endpoints like `/api/job/jobs/`, `/api/job/jobs/{jobs_pk}/runs/`, `/api/job/jobs/{jobs_pk}/runs/{run_id}/`.
    ​
- **Schema**:
  - Access the schema of the API through `/api/schema/`.
    ​
- **Users**:
  - Handle user authentication through endpoints like `/api/users/login/`, `/api/users/logout/`, `/api/users/logoutall/`.
    ​
    The API also defines several data schemas including `Budget`, `Job`, `JobDetail`, `JobScript`, `Run`, `RunDetail`, and user related schemas.
    ​

### Authorization

The API provides a three-step authorization workflow:

1. **Basic Authentication** (`basicAuth`):

   - Initiate access with your username and password. This is typically the starting point of the authorization workflow which returns a session ID cookie upon successful authentication.

2. **Cookie Authentication** (`cookieAuth`):
   - Utilize the session ID cookie obtained from Basic Authentication for subsequent API calls.
3. **Token Authentication** (`knoxTokenAuth`):
   - For enhanced security and scalability, token-based authentication is available. Acquire a token and use it in the header of your requests.

## Local development

The repository contains two different applications that can run:

1. **Storybook**
   - Development server allows the UI components of the application to be viewed and modified through prop controls.
2. **React Application**
   - The actual React application that will serve as the frontend for the validation server.

To start with either application, set up the development environment:

- Clone the repo: `git clone git@github.com:UrbanInstitute/validation-server-v2-frontend.git`
- Install dependencies: `npm install`

Choose your development path below to run the application or Storybook server.

### Storybook

To develop the components separate from the React app, start the Storybook server:

- `npm run storybook`

This will start the server on port `6006`.
Navigate to [http://localhost:6006](http://localhost:6006) to view the components and stories.

### React Application

To run the React application locally, run `npm run dev` in the command line. 

## Deployment

To run the application using development environment files, run `docker-compose -f docker-compose.dev.yml up`. This will build and spin up the staging container.

To run the application using staging environment files, run `docker-compose -f docker-compose.staging.yml up`. This will build and spin up the staging container.

Similarly, to run with production environment variables, run `docker-compose up`.

## Tech Stack

### User Experience

For the most part, waiting times are minimal, so loading indicators are displayed using `React-Query` parameters from `useQuery` (i.e. `isFetching` or `isFetched`) or the waiting time is so long that it makes more sense to direct the user to the main dashboard page.
However, the transition between step 2 (review & refine) and step 3 (release) is short enough that it is not beneficial to transition to the dashboard, then force the user to return to step 3 after refining the values.
Here, there is a _5_ second delay.
This is located in [`src/routes/Dashboard.tsx`](src/routes/Dashboard.tsx) in the `handleCloseFeedback` function. 

Steps are defined by the `STEPS` constant in [`src/lib/constants.ts`](src/lib/constants.ts).
As of initial release, they are `SUBMIT`, `REVIEW_AND_REFINE`, and `RELEASE`.

`SUBMIT` step is where the user will upload the `R` script and name the script.
Once the script is submitted, the user is taken to the main dashboard and a notification will be populated mentioning that the script was accepted and is in progress.

The `REVIEW_AND_REFINE` step is where the user will modify the epsilon values.
Submitting the changed epsilon values will trigger a new run and after a short wait will direct the user to the `RELEASE` step.
If no changes are made to epsilon, the user can navigate from `REVIEW_AND_REFINE` directly to `RELEASE`.

In the `RELEASE` step, the user can select the models to release.
Upon submission of the models, the user is directed to the dashboard.

### Notifications

Notifications are a client-side only feature.
This means that notifications will only behave as expected when a user logs into the application using the same browser.
In order to not overflow the initial sign-in from a new browser, the `NotificationProvider` will "initialize" the notifications with the first time that the application was logged into on the browser based on the local storage database using `RxDB`.

To continue to refresh and determine if there are any new notifications, the list of jobs & runs refreshes based on the environment variable `VITE_JOB_REFRESH_RATE`.
This value is in milliseconds, so setting it to `30000` will be _30_ seconds.
To disable refetch (and therefore automatic periodic notifications) set `VITE_JOB_REFRESH_RATE` to `0` or remove from the environment file.

Notifications can be disabled by setting `VITE_FEATURE_NOTIFICATIONS=false` in the environment files.

### Storybook

To learn more about Storybook and development using it, go to [Storybook's Documents](https://storybook.js.org/docs/react/writing-stories/introduction). 

## Contact

This work is developed by [Graphicacy](https://graphicacy.com/) and the Urban Institute. For questions, reach out to: validationserver@urban.org. 