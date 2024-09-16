// ImageUpload.js
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Firebase 설정 파일에서 storage 불러오기

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  // 파일 선택 시 파일 상태 업데이트
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Firebase Storage에 파일 업로드
  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    setUploading(true);

    // Storage에서 파일 경로 설정 (images 폴더에 저장)
    const storageRef = ref(storage, `images/${encodeURIComponent(file.name)}`);

    // 파일 업로드
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");

        // 업로드된 파일의 다운로드 URL 가져오기
        getDownloadURL(snapshot.ref).then((url) => {
          setDownloadURL(url);
          setUploading(false);
          alert("Upload successful!");
        });
      })
      .catch((error) => {
        console.error("Upload failed", error);
        setUploading(false);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {downloadURL && (
        <p>
          Download URL: <a href={downloadURL}>{downloadURL}</a>
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
