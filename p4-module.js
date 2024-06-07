// Import initial static data
const { data } = require("./p4-data.js");

// Export functions - hoisted
module.exports = {
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  addQuestionAnswer, // Extra credit
  updateQuestionAnswer, // Extra credit
  deleteQuestionAnswer, // Extra credit
};

function pluck(array, key) {
  return array.map((item) => item[key]);
}

function getQuestions() {
  /*
  // Manual method
  const questions = [];
  for (const qa of data) {
    questions.push(qa.question);
  }

  return questions;
  */
  // ES5 technique
  return pluck(data, "question");
}

function getAnswers() {
  return pluck(data, "answer");
}

function getQuestionsAnswers() {
  // This method will return a copy of the original data, which is then
  // subject to modification
  // return data;
  // Use the following technique with the current data to accomplish
  // a deep clone
  return data.map((item) => {
    return { ...item };
  });
}

function getQuestion(number = "") {
  // Prepare default response object
  const response = {
    error: "",
    question: "",
    number: "",
  };

  // Validate question number
  if (!Number.isInteger(number)) {
    response.error = "Question number must be an integer";
  } else if (number < 1) {
    response.error = "Question number must be >= 1";
  } else if (number > data.length) {
    response.error = `Question number must be less than the number of questions (${data.length})`;
  } else {
    // Get question for response
    index = number - 1;
    response.number = number;
    response.question = data[index].question;
  }

  return response;
}

function getAnswer(number = "") {
  // Prepare default response object
  const response = {
    error: "",
    answer: "",
    number: "",
  };

  // Validate answer number
  if (!Number.isInteger(number)) {
    response.error = "Answer number must be an integer";
  } else if (number < 1) {
    response.error = "Answer number must be >= 1";
  } else if (number > data.length) {
    response.error = `Answer number must be less than the number of questions (${data.length})`;
  } else {
    // Get answer for response
    index = number - 1;
    response.number = number;
    response.answer = data[index].answer;
  }

  return response;
}

function getQuestionAnswer(number = "") {
  // Get question and answer objects
  const question = getQuestion(number);
  const answer = getAnswer(number);

  // Validate question/answer objects
  if (question.error.length !== 0) {
    // Question error
    return question;
  } else if (answer.error.length !== 0) {
    // Answer error
    return answer;
  } else {
    // Both valid, combine into a response object
    return { ...question, answer: answer.answer };
  }
}

// Extra credit
function addQuestionAnswer(info = {}) {
  // Deconstruct to local variables with defaults if missing
  const { question = "", answer = "" } = info;

  // Prepare default response object
  const response = {
    error: "",
    message: "",
    number: -1,
  };

  // Validate/process object and object properties
  if (typeof info !== "object") {
    response.error = "Object with question and answer properties required";
  } else if (question.length === 0) {
    response.error = "Object question property required";
  } else if (answer.length === 0) {
    response.error = "Object answer property required";
  } else {
    // Add question/answer, and update response
    data.push({ question, answer });
    response.message = "Question added";
    response.number = data.length;
  }

  return response;
}

function updateQuestionAnswer(info = {}) {
  // Deconstruct to local variables with defaults if missing
  const { number = "", question = "", answer = "" } = info;

  // Prepare default response object
  const response = {
    error: "",
    message: "",
    number: "",
  };

  // Validate/process object and object properties
  if (typeof info !== "object") {
    response.error = "Object with question and answer properties required";
  } else if (question.length === 0 && answer.length === 0) {
    response.error = "Object question property or answer property required";
  } else if (!Number.isInteger(number)) {
    response.error = "Object number property must be a valid integer";
  } else {
    // Validate/process properties
    const index = parseInt(number) - 1;
    if (!Number.isInteger(number)) {
      response.error = "Question/answer number must be an integer";
    } else if (number < 1) {
      response.error = "Question/answer number must be >= 1";
    } else if (number > data.length) {
      response.error = `Question/answer number must be less than the number of questions (${data.length})`;
    } else {
      // Update question/answer, and update response
      const index = parseInt(number) - 1;
      data[index].question = question;
      data[index].answer = answer;
      response.message = `Question ${number} updated`;
      response.number = number;
    }
  }

  return response;
}

function deleteQuestionAnswer(number) {
  // Prepare default response object
  const response = {
    error: "",
    message: "",
    number: "",
  };

  // Validate number
  if (!Number.isInteger(number)) {
    response.error = "Question/answer number must be an integer";
  } else if (number < 1) {
    response.error = "Question/answer number must be >= 1";
  } else if (number > data.length) {
    response.error = `Question/answer number must be less than the number of questions (${data.length})`;
  } else {
    // Delete question/answer, update response
    const index = parseInt(number) - 1;
    data.splice(index, 1);
    response.message = `Question ${number} deleted`;
    response.number = number;
  }

  return response;
}

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
  console.log(`\n** Testing ${category} **`);
  console.log("-------------------------------");
  for (const o of args) {
    console.log(`-> ${category}${o.d}:`);
    console.log(o.f);
  }
}

// Set a constant to true to test the appropriate function
const testGetQs = false;
const testGetAs = false;
const testGetQsAs = false;
const testGetQ = false;
const testGetA = false;
const testGetQA = false;
const testAdd = false;      // Extra credit
const testUpdate = false;   // Extra credit
const testDelete = true;   // Extra credit

// getQuestions()
if (testGetQs) {
  testing("getQuestions", { d: "()", f: getQuestions() });
}

// getAnswers()
if (testGetAs) {
  testing("getAnswers", { d: "()", f: getAnswers() });
}

// getQuestionsAnswers()
if (testGetQsAs) {
  testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
}

// getQuestion()
if (testGetQ) {
  testing(
    "getQuestion",
    { d: "()", f: getQuestion() },      // Extra credit: +1
    { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
    { d: "(1)", f: getQuestion(1) },
    { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
  );
}

// getAnswer()
if (testGetA) {
  testing(
    "getAnswer",
    { d: "()", f: getAnswer() },        // Extra credit: +1
    { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
    { d: "(1)", f: getAnswer(1) },
    { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
  );
}

// getQuestionAnswer()
if (testGetQA) {
  testing(
    "getQuestionAnswer",
    { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
    { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
    { d: "(1)", f: getQuestionAnswer(1) },
    { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
  );
}

// Extra credit
// addQuestionAnswer()
if (testAdd) {
  testing(
    "addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: "Q4", answer: "A4" }),
    }
  );
}

// updateQuestionAnswer()
if (testUpdate) {
  testing(
    "updateQuestionAnswer",
    { d: "()", f: updateQuestionAnswer() },
    { d: "({})", f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
    {
      d: '(question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }),
    },
    {
      d: '(number: 1, question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }),
    }
  );
  console.log(data);
}

// deleteQuestionAnswer()
if (testDelete) {
  testing(
    "deleteQuestionAnswer",
    { d: "()", f: deleteQuestionAnswer() },
    { d: "(0)", f: deleteQuestionAnswer(0) },
    { d: "(1)", f: deleteQuestionAnswer(1) },
    { d: "(0)", f: deleteQuestionAnswer(4) }
  );
  console.log(data);
}
