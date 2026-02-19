const BASE_URL = "http://localhost:4200";

/* ================================
   Fetch All Exams
================================ */
export const fetchExams = async () => {
  const response = await fetch(`${BASE_URL}/exams`);
  if (!response.ok) {
    throw new Error("Failed to fetch exams");
  }
  return await response.json();
};

/* ================================
   Fetch All Questions
================================ */
export const fetchQuestions = async () => {
  const response = await fetch(`${BASE_URL}/questions`);
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return await response.json();
};

/* ================================
   Get Questions By Category
================================ */
export const fetchExamByCategory = async (category) => {
  const res = await fetch(
    `${BASE_URL}/exams?category=${encodeURIComponent(
      category
    )}&status=published`
  );

  const data = await res.json();
  return data[0];
};

export const fetchQuestionsByExamId = async (examId) => {
  const res = await fetch(
    `${BASE_URL}/questions?examId=${examId}`
  );

  return await res.json();
};