import React, { useState } from "react";
import { Form, Input, TextArea } from "semantic-ui-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase"; // Firestore 설정 파일 import
import Addimage from "./Addimage";
import "./App.css";
import FindQuestionPage from "./FindQuestion";

const QuestionArticle = ({ postType }) => {
  // 상태 정의
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [loading, setLoading] = useState(false); // 로딩 상태

  // Form 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    // 필수 필드 유효성 검사
    if (!title || !tags || (postType === "question" && !description)) {
      alert("Please fill out all required fields.");
      return;
    }
    <FindQuestionPage></FindQuestionPage>;

    setLoading(true); // 로딩 상태 활성화

    try {
      if (postType === "question") {
        // Firestore에 질문 저장
        await addDoc(collection(db, "questions"), {
          title,
          description,
          tags,
          createdAt: new Date(),
        });
        alert("Question posted successfully!");
      } else if (postType === "article") {
        // Firestore에 기사 저장
        await addDoc(collection(db, "articles"), {
          title,
          abstract,
          articleText,
          tags,
          createdAt: new Date(),
        });
        alert("Article posted successfully!");
      }

      // 폼 제출 후 입력 필드 초기화
      setTitle("");
      setDescription("");
      setTags("");
      setAbstract("");
      setArticleText("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("There was an error posting your content. Please try again.");
    }

    setLoading(false); // 로딩 상태 비활성화
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

        <Form.Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Form.Button>
      </Form>
    </div>
  );
};

export default QuestionArticle;
