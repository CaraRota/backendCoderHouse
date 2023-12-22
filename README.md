## How to run the project
In order to run the project, you will need to run the following command in the backend folder:

npm run dev

This will run the backend in port 3000.

Then, you will need to run the following command in the frontend folder:

npm run dev

This will run the frontend in port 5173.

## General information

Frontend: http://localhost:5173/
Backend: http://localhost:3000/

If you are going to run the frontend in a different port; please make sure to adjust the CORS config accordingly in your backend.
Also please remember that all the API calls are made to the backend, so if you are going to run the frontend in a different port, you will need to change the API calls in the frontend to the new port.

## How to run the tests
In order to run the tests, you will need to run the following command in the backend folder:

npm run testProducts
npm run testCarts
npm run testSession
