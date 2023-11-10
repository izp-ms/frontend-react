import React, { useState } from "react";
import styles from "./styles.module.scss";



function ImageBlob(){
  const [imgs, setImgs] = useState<string | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImgs(data.result as string);
    });
    data.readAsDataURL(e.target.files![0]);
  };
 
  
  
return(
    
    <div className={styles.container}>
      {imgs ?(
              <img alt="" src={imgs} className={styles.img} />
            ):(
              <div  className={styles.img} />
            )}
       

      <label className={styles.custom_file_upload}>
        <input type="file" accept="image/png, image/jpeg" onChange={handleChange} />
        Pick photo
      </label>
      
    </div>
  )
}
export default ImageBlob;
