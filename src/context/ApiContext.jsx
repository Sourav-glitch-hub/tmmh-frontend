import { createContext, useContext, useState } from "react";
import api from "../services/api";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <ApiContext.Provider value={{ products, loading, getProducts }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
