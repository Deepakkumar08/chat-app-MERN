import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import Home from "../pages/Home";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../Layouts";
import ForgotPassword from "../pages/ForgotPassword";
const router = createBrowserRouter([
    {
        path : "/",
        element: <App></App>,
        children :[
            {
                path : 'register',
                element : <AuthLayouts><RegisterPage></RegisterPage></AuthLayouts>
            },
            {
                path : 'email',
                element : <AuthLayouts><CheckEmailPage></CheckEmailPage></AuthLayouts>
                },
                
            {
                    path : 'password',
                    element : <AuthLayouts><CheckPasswordPage></CheckPasswordPage></AuthLayouts> 
                    },
                    {
                        path : 'forgotpassword',
                        element : <AuthLayouts><ForgotPassword></ForgotPassword></AuthLayouts> 
                        },       
               {
                    path : "",
                    element: <Home></Home>,
                    children :[
                        {
                            path : ':userId',
                            element : <MessagePage></MessagePage>
                        }
                    ]
               }     
    ]
    }
])
export default router