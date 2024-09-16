import React, { useState } from "react";
import { Form, Input, TextArea } from "semantic-ui-react";
import Addimage from "./Addimage";
import { db } from "./firebase"; // firebase.js에서 가져오기
import { collection, addDoc } from "firebase/firestore";
import "./App.css";

const QuestionArticle = ({ postType }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");

  // Firestore에 질문 추가 함수
  const handleAddQuestion = async () => {
    try {
      await addDoc(collection(db, "questions"), {
        title,
        description,
        tags,
        createdAt: new Date(),
      });
      console.log("Question added!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Form 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    if (postType === "question") {
      handleAddQuestion(); // Firestore에 질문 저장
    } else if (postType === "article") {
      console.log({
        title,
        abstract,
        articleText,
        tags,
      });
      // Firestore에 기사 저장 로직 추가
    }
  };

  return (
    <div>
      <h2>{postType === "question" ? "Question" : "Article"}</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Field className="form-field-horizontal label">
          <label>Title</label>
          <Input
            placeholder={
              postType === "question"
                ? "Start with your question with how, what, why, etc"
                : "Enter a descriptive title"
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1 }}
          />
        </Form.Field>

        {postType === "question" && (
          <>
            <Form.Field>
              <label>Describe your problem</label>
              <TextArea
                placeholder="Provide a detailed description of your problem"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: "200px" }}
              />
            </Form.Field>
            <Form.Field className="form-field-horizontal label">
              <label>Tags</label>
              <Input
                placeholder="Enter up to 3 tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Field>
          </>
        )}

        {postType === "article" && (
          <>
            <Addimage />
            <Form.Field>
              <label>Abstract</label>
              <TextArea
                placeholder="Enter a 1-paragraph abstract"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                style={{ height: "150px" }}
              />
            </Form.Field>
            <Form.Field>
              <label>Article Text</label>
              <TextArea
                placeholder="Enter article text"
                value={articleText}
                onChange={(e) => setArticleText(e.target.value)}
                style={{ height: "300px" }}
              />
            </Form.Field>
            <Form.Field className="form-field-horizontal label">
              <label> Tags </label>
              <Input
                placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Field>
          </>
        )}

        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    </div>
  );
};

export default QuestionArticle;
