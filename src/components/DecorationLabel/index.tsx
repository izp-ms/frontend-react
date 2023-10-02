 import { Button } from "@mui/material";
 import { ReactElement } from "react";

interface Props {
  content: string|ReactElement;
  imgSource?: string;
  //color: string;
  width?: string;
  
}
//export const DecorationLabel = () => {
//   return (
//     <div/>
//   );
//   }
 export const DecorationLabel = (props: Props) => {
   const { content, width } = props;
  return (
    <>
     {typeof content==="string" ? (
      <div
        style={{
          position: "relative",
          zIndex: "100",
          fontSize:"64px",
          fontWeight: "400",
          width: "max-content",
          border: "solid red 1px"
        }}
        >
          {content}

      <div
        style={{background: "#8DCFDE",
          borderRadius:"20px",
          width:"100%",
          height:"50%",
          position: "absolute",
          zIndex: "-100",
          top: "60%",
          right: "1rem"

        }}/>

      </div>
     ) :(
      
      <div
        style={{
          position: "relative",
          zIndex: "100",
          fontSize:"64px",
          fontWeight: "400",
          width: "max-content",
          border: "solid red 1px"
        }}
      >
       {/* <img src={img}/> */}

        <div
        style={{background: "#8DCFDE",
          borderRadius:"20px",
          width:"100%",
          height:"100%",
          position: "absolute",
          zIndex: "-100",
          top: "1rem",
          right: "1rem"
        }}/>

        </div>
      )}
    </>
  );
  





  // return (
  //   <>
  //   {width ? (
  //     <div
  //     style={{
  //       borderRadius:"50px",
  //       width:width}}
  //     >
  //       {content}
  //     </div>
  //   ) : (
      
  //   )}
  // </>
        
      
//   );
};