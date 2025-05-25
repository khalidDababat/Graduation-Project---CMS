

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./PrivateRoutes.js";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (user?.id) {
        const res = await fetch(`http://localhost:5000/api/employees/${user.id}`);
        const data = await res.json(); 
        setEmployee(data[0]); 
      } 
    };
    fetchEmployee();
  }, [user]);

  return (
    <EmployeeContext.Provider value={{employee}}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
