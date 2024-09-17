Task Management API

This is a simple Task Management API built with Express.js and JSON file storage. It provides endpoints to create, read, update, and delete tasks. The tasks are stored locally in a JSON file (tasks.json), making it lightweight and easy to run without the need for a database.

Features

	•	GET /tasks: Retrieve all tasks.
	•	GET /tasks/:id: Retrieve a specific task by ID.
	•	POST /tasks: Create a new task.
	•	PUT /tasks/:id: Update an existing task by ID.
	•	DELETE /tasks/:id: Delete a task by ID.

Setup

	1.	Clone the repository:
   git clone https://github.com/ltejadavic/task-management-api.git
   
  2.	Install dependencies:
   npm install

	3.	Start the server:
   node index.js

 	4.	The API will be running at http://localhost:3000.

  
  Testing the API

  You can use tools like Postman or curl to test the endpoints. 
  
  Example of creating a task: 
  curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Sample Task","description":"Sample Description"}'
