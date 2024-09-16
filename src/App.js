import React, { useState } from "react";
import "./App.css";
import NewPost from "./NewPost";
import QuestionArticle from "./QuestionArticle";
import { Container, Form, Radio, Button } from "semantic-ui-react";
import Header2 from "./Header2";
import CustomButton from "./CustomButton";
import Addimage from "./Addimage";
import "semantic-ui-css/semantic.min.css";
import FindQuestionPage from "./FindQuestion";

function App() {
  const [postType, setPostType] = useState("article");

  const handlePostTypeChange = (e, { value }) => setPostType(value);

  return (
    <Container>
      <NewPost /> <FindQuestionPage></FindQuestionPage>
      <Form>
        <Radio
          label="Question"
          name="postType"
          value="question"
          checked={postType === "question"}
          onChange={handlePostTypeChange}
        />
        <Radio
          label="Article"
          name="postType"
          value="article"
          checked={postType === "article"}
          onChange={handlePostTypeChange}
        />

        <Header2 />
        <QuestionArticle postType={postType} />
        <br />
        <Form.Field className="form-button">
          <CustomButton />
        </Form.Field>
      </Form>
    </Container>
  );
}

export default App;
