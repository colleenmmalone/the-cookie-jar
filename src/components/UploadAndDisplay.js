import React, { useState } from "react";
import axios from 'axios';

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h1>Upload and Display Images using React Hooks</h1>
      {selectedImage && (
        <div>
        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        
        <br />
        {/*<button onClick={()=>fileUploadHandler(selectedImage)}>Submit</button>*/}
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />
     
      <br /> 
      <input
        type="file"
        name="myImage"
        onChange={(event) => {

          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
          console.log(selectedImage.name);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;

/*this is not working right!!
function fileUploadHandler(selectedImage) {
    const fd = new FormData();
    fd.append('image', selectedImage, selectedImage.name)
        .then(console.log(fd))
        .save('./pictures/', fd)
        .then(res =>{
            console.log(res);
        })
}
*/