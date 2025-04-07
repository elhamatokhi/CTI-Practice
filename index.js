import express from "express";
const app = express();
const PORT = 3000;

app.all("/", (req, res) => {
  const method = req.method;
  let statusCode;
  let message = `HTTP Method: ${method}`;

  switch (method) {
    case "GET":
      statusCode = 200; // OK
      break;
    case "POST":
      statusCode = 201; // Created
      break;
    case "PUT":
      statusCode = 200; // OK
      break;
    case "DELETE":
      statusCode = 204; // Deleted
      break;
    case "PATCH":
      statusCode = 200; // OK
      break;
    case "OPTIONS":
      statusCode = 204; // Deleted
      break;
    default:
      statusCode = 405; // Method Not Allowed
      message = ` Method ${method} not allowed`;
  }

  res.status(statusCode).send({ method, statusCode, message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
