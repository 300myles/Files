import { redirect } from "react-router-dom";

export async function auth (request) {
  const pathName = new URL(request.url).pathname
  const loggedin = localStorage.getItem("loggedIn");
  //console.log(request)
  
  if (!loggedin) {
    throw redirect(`/index.html?pathname=${pathName}&message=You must login first`);
  }
  return null
}

 export async function verifyUser (loginFormData) {
  const userDetail = {
    user: {
      id: "161106", 
      username: "Visitor", 
      email: "visitor@mmiri.com", 
      password: "VisitCode042"
    }, 
    token: "greatest of all time"
  }
  
  const { email, password } = userDetail.user;
  let data;
  
  const userEmail = loginFormData.email;
  const userPassword = loginFormData.password;
  
  if (userEmail === email && userPassword === password) {
      data = loginFormData;
    } else if (userEmail === '' && userPassword === '') {
      throw new Error ("please input login details")
    } else if (userEmail !== email || userPassword !== password) {
      throw new Error ("Invalid email or password")
    }
    
    
  return new Promise (resolve => {
    setTimeout(resolve, 500, data)
  })
 }
 
 export const Empty = () => {
   return (
      <div className="empty">
          <h2>Movies not found</h2>
      </div>
    )
 }
