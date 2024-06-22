import React from "react";
import { 
  useLoaderData, 
  useActionData, 
  Form, 
  useNavigation, 
  redirect
} from "react-router-dom";
import { verifyUser } from "./components/utilities.js"

export function loader ({ request }) {
  const message = new URL(request.url).searchParams.get("message") 
  const pathName = new URL(request.url).searchParams.get("pathname")
  const params = {pathName, message}
  return params
}

export async function action ({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathName = new URL(request.url).searchParams.get("pathname") || "/";
  try {
    await verifyUser({email, password});
    localStorage.setItem("loggedIn", true);
    alert("Login successfull ✅");
    return redirect(pathName);
  } catch(err) {
    return err.message
  }
}



const Login = () =>  {
  
  let { pathName, message } = useLoaderData();
  let error = useActionData();
  
  const navigation = useNavigation();
  
  
  if (message) {
    error = null
  } else if (error) {
  message = null
  }
  

  
  return (
    <div className="login-page">
      <div className="login-logo">
        <h1 className="logo">
          MovieLand
        </h1>
          
        <div className="exit-container">
          <img 
            className="exit-icon" src="./images/reject.png" 
            alt="close"
          />
        </div>
      </div>
        
      <div className="login-body">
        
        <div className="login-header">
          Sign In to your account
        </div>
        
        
        {message && 
          <div className="login-error">
            {message}
          </div>
        }
        
        {error && 
          <div className="login-error">
            {error}
          </div>
        }
      
        <Form 
          method="post"
          className="login-form"
        >
          <div className="login-details">
            <input 
              name="email"
              className="login-email"
              type="email"
              defaultValue="visitor@mmiri.com"
              placeholder="Username or Email"
            />
              
            <input 
              name="password"
              className="login-password"
              type="password"
              defaultValue="VisitCode042"
              placeholder="password"
            />
          </div>
            
          <button
            type="submit"
            className="login-button"
            disabled = { navigation.state === "submitting" }
            className = "login-button"
          >
            {navigation.state === "submitting" ? "Signing In..." : "Sign In"}
          </button>
            
          <div className="login-extras">
            <div>
              <input 
                className="login-remember" 
                name="remember" 
                type="checkbox" 
              />
              <label 
                className="remember-text" 
                htmlFor="remember"
              >
                Remember me
              </label>
            </div>
            
          </div>
        </Form>
          
      </div>
    </div>
  );
}

export default Login;