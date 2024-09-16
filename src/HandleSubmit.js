const handleSubmit = async (event) => {
  event.preventDefault(); // 기본 폼 제출 동작을 방지합니다.

  // 유효성 검사
  if (!title || !tags || (postType === "question" && !description)) {
    alert("Please fill out all required fields.");
    return;
  }

  try {
    // 질문 또는 기사 데이터 Firestore에 저장
    if (postType === "question") {
      await addDoc(collection(db, "questions"), {
        title,
        description,
        tags,
        createdAt: new Date(),
      });
    } else if (postType === "article") {
      await addDoc(collection(db, "articles"), {
        title,
        abstract,
        articleText,
        tags,
        createdAt: new Date(),
      });
    }

    alert("Post submitted successfully!");
    // 폼 초기화 (원한다면)
    setTitle("");
    setDescription("");
    setTags("");
    setAbstract("");
    setArticleText("");
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error submitting post. Please try again.");
  }
};
