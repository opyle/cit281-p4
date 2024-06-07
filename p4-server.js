const fastify = require("fastify")();
const {
  getQuestion,
  getAnswer,
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  addQuestionAnswer,      // Extra credit
  updateQuestionAnswer,   // Extra credit
  deleteQuestionAnswer    // Extra credit
} = require("./p4-module.js");

fastify.get("/cit/question", (request, reply) => {
  // Return response
  reply
    .code(200)
    .header("Content-Type", "text/json; charset=utf-8")
    .send({ error: "", statusCode: 200, questions: getQuestions() });
});

fastify.get("/cit/question/:number", (request, reply) => {
  // Extract question number using deconstruction
  let { number = "" } = request.params;

  // Setup default response object
  const response = {
    error: "",
    statusCode: 200,
    question: "",
    number: "",
  };

  // Process request
  if (number === "") {
    // Question number was not specified
    response.error = "Number route parameter required";
    response.statusCode = 404;
  } else {
    // Valid route parameter, convert to number
    number = parseInt(number);

    // Get question
    const questionInfo = getQuestion(number);

    // Check response
    if (questionInfo.error.length > 0) {
      // Error getting question
      response.error = questionInfo.error;
      response.statusCode = 404;
    } else {
      // Valid question found and returned
      response.question = questionInfo.question;
      response.number = number;
    }
  }

  // Return response
  reply
    .code(response.statusCode)
    .header("Content-Type", "text/json; charset=utf-8")
    .send(response);
});

fastify.get("/cit/answer", (request, reply) => {
  // Return response
  reply
    .code(200)
    .header("Content-Type", "text/json; charset=utf-8")
    .send({ error: "", statusCode: 200, answers: getAnswers() });
});

fastify.get("/cit/answer/:number", (request, reply) => {
  // Extract answer number using deconstruction
  let { number = "" } = request.params;

  // Setup default response object
  const response = {
    error: "",
    statusCode: 200,
    answer: "",
    number: "",
  };

  // Process request
  if (number === "") {
    // Answer number was not specified
    response.error = "Number route parameter required";
    response.statusCode = 404;
  } else {
    // Valid route parameter, convert to number
    number = parseInt(number);

    // Get answer
    const answerInfo = getAnswer(number);

    // Check response
    if (answerInfo.error.length > 0) {
      // Error getting answer
      response.error = answerInfo.error;
      response.statusCode = 404;
    } else {
      // Valid answer found and returned
      response.answer = answerInfo.answer;
      response.number = number;
    }
  }

  // Return response
  reply
    .code(response.statusCode)
    .header("Content-Type", "text/json; charset=utf-8")
    .send(response);
});

fastify.get("/cit/questionanswer/:number", (request, reply) => {
  // Extract question/answer number using deconstruction
  let { number = "" } = request.params;

  // Setup default response object
  const response = {
    error: "",
    statusCode: 200,
    question: "",
    answer: "",
    number: "",
  };

  // Process request
  if (number === "") {
    // Answer number was not specified
    response.error = "Number route parameter required";
    response.statusCode = 404;
  } else {
    // Valid route parameter, convert to number
    number = parseInt(number);

    // Get answer
    const answerInfo = getAnswer(number);

    // Check response
    if (answerInfo.error.length > 0) {
      // Error getting answer
      response.error = answerInfo.error;
      response.statusCode = 404;
    } else {
      // Valid answer found and returned
      response.answer = answerInfo.answer;
      response.number = number;
    }
  }

  // Return response
  reply
    .code(response.statusCode)
    .header("Content-Type", "text/json; charset=utf-8")
    .send(response);
});

fastify.get("/cit/questionanswer", (request, reply) => {
  // Return response
  reply.code(200).header("Content-Type", "text/json; charset=utf-8").send({
    error: "",
    statusCode: 200,
    questions_answers: getQuestionsAnswers(),
  });
});

// Handle unmatched routes
fastify.get("*", (request, reply) => {
  reply
    .code(404)
    .header("Content-Type", "text/json; charset=utf-8")
    .send({ error: "Route not found", statusCode: 404 });
});

// Extra credit routes post, put, and delete
fastify.post("/cit/question", (request, reply) => {
  // Setup default response object
  const response = {
    error: "",
    statusCode: 201,
    number: "",
  };

  // Get/handle question/answer add
  const qa = addQuestionAnswer(request.body);
  if (qa.error.length > 0) {
    // Handle error
    response.statusCode = 409;
    response.error = qa.error;
  } else {
    // Handle valid add
    response.number = qa.number;
  }

  // Return response
  reply
    .code(response.statusCode)
    .header("Content-Type", "text/json; charset=utf-8")
    .send(response);
});

fastify.put("/cit/question/:number", (request, reply) => {
  // Decontruct to get question number
  let { number = "" } = request.params;

  // Setup default response object
  const response = {
    error: "",
    statusCode: 200,
    number: "",
  };

  // Process request
  if (number === "") {
    // Question number was not specified
    response.error = "Number route parameter required";
    response.statusCode = 404;
  } else {
    // Valid route parameter, convert to number
    number = parseInt(number);

    // Get/handle question/answer update
    const qa = updateQuestionAnswer({number, ...request.body});
    if (qa.error.length > 0) {
      // Handle error
      response.statusCode = 409;
      response.error = qa.error;
    } else {
      // Handle valid update
      response.number = qa.number;
    }
  }
  // Return response
  reply
    .code(response.statusCode)
    .header("Content-Type", "text/json; charset=utf-8")
    .send(response);
});

fastify.delete("/cit/question/:number", (request, reply) => {
  // Decontruct to get question number
  let { number = "" } = request.params;

  // Setup default response object
  const response = {
    error: "",
    statusCode: 200,
    number: "",
  };

  // Process request
  if (number === "") {
    // Question number was not specified
    response.error = "Number route parameter required";
    response.statusCode = 404;
  } else {
    // Valid route parameter, convert to number
    number = parseInt(number);

    // Get/handle question/answer delete
    const qa = deleteQuestionAnswer(number);
    if (qa.error.length > 0) {
      // Handle error
      response.statusCode = 409;
      response.error = qa.error;
    } else {
      // Handle valid update
      response.number = qa.number;
    }
  }
  // Return response
  reply
    .code(response.statusCode)
    .header("Content-Type", "text/json; charset=utf-8")
    .send(response);
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
