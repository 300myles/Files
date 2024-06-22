import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error () {
  const error = useRouteError();
  
  return (
    <div className = "empty" >
      <h2>{error.message}</h2> 
    </div>
  );
}