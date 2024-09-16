import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Input, Button } from "semantic-ui-react";

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filter, setFilter] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const questionsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionsList);
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = async () => {
    if (!newQuestion.title || !newQuestion.description) {
      alert("Title and Description are required");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "questions"), {
        ...newQuestion,
        createdAt: new Date(),
      });
      setQuestions([...questions, { id: docRef.id, ...newQuestion }]);
      setNewQuestion({ title: "", description: "", tags: "" });
      alert("Question added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add question");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions(questions.filter((question) => question.id !== id));
      alert("Question deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
      alert("Failed to delete question");
    }
  };

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Find Question Page</h1>

      <Input
        type="text"
        placeholder="Filter by title"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <div style={{ marginBottom: "20px" }}>
        <Input
          type="text"
          placeholder="Question Title"
          value={newQuestion.title}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, title: e.target.value })
          }
          style={{ marginRight: "10px" }}
        />
        <Input
          type="text"
          placeholder="Description"
          value={newQuestion.description}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, description: e.target.value })
          }
          style={{ marginRight: "10px" }}
        />
        <Input
          type="text"
          placeholder="Tags"
          value={newQuestion.tags}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, tags: e.target.value })
          }
          style={{ marginRight: "10px" }}
        />
        <Button onClick={handleAddQuestion}>Add Question</Button>
      </div>

      <div>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="question-card"
              style={{
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <h3>{question.title}</h3>
              <p>{question.description}</p>
              <p>{question.tags}</p>
              <Button onClick={() => handleDelete(question.id)} color="red">
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p>No questions found</p>
        )}
      </div>
    </div>
  );
};

export default FindQuestionPage;
