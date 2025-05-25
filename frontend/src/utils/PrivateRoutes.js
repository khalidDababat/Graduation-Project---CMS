
import { createContext,useContext,useState , useEffect } from "react"; 

const AuthContext =createContext(); 

 export const AuthProvider = ({children}) =>{
    
    const [user ,setUser] = useState(null);  // user = {username ="Admin"}
    
    useEffect(() =>{
      const storedUser =localStorage.getItem("user"); 
      if(storedUser){
          setUser(JSON.parse(storedUser));   
      }
    },[])


    const login = (userData) =>{
         localStorage.setItem("user",JSON.stringify(userData));
         setUser(userData);  
    }
    const logOut =() =>{
        localStorage.removeItem("user");
        setUser(null); 
             
    };  

    return (
          <AuthContext.Provider  value={{user ,login ,logOut}}>
                {children}          
          </AuthContext.Provider>

    );

};
export const useAuth = () => useContext(AuthContext); 
