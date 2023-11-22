import { createContext } from "react";

const DataContext = createContext({});
export const DataContextProvider = DataContext.Provider;
export default DataContext;