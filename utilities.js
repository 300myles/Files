import { redirect } from "react-router-dom";

export async function auth () {
  const loggedin = true;
  //console.log(request)
  
  if (!loggedin) {
    throw redirect("/login?message=You must login first");
  }
}