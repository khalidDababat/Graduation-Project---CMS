import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { useAuth } from "../utils/PrivateRoutes";
const MagicLoginHandler = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const role = searchParams.get("role");
  const navigate = useNavigate();
  // const { login } = useAuth();
         
  console.log("ttttttttt token :::",token) ;



  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (!res.ok) {
          throw new Error("Failed to verify token");
        }

        const data = await res.json();
        
      //  console.log("sssss data ", data);
       // data.token =token; 
     
      
       

        
        if (data.user.role === "admin")
            navigate(`/ResetPasswordAdmin` ,{
             state:{
              token: data.token,
              role: data.user.role,
              userId: data.user.id,
             }
            });
            
        else if (data.user.role === "employee") 
          navigate(`/ResetPasswordAdmin` ,{
            state:{
             token: data.token,
             role: data.user.role,
             userId: data.user.userId,
            }
           });
          
        // else navigate("/");



      } catch (error) {
        console.log("Magic login failed:", error);
        navigate("/");
      }
    };

    if (token) {
      verifyToken();
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  return <p className="text-center mt-5">...جاري التحقق من الدخول</p>;
};

export default MagicLoginHandler;
