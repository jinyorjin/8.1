import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    setUploading(true);

    const storageRef = ref(storage, `images/${encodeURIComponent(file.name)}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");

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
