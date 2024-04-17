import { useContext } from "react";
import { ApplicationContext } from "../context/AppContext";

function useApp() {
  return useContext(ApplicationContext);
}

export default useApp;
