import { useInView } from "framer-motion";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ApplicationContext } from "../context/AppContext";

function useObserver(pageName: string) {
  const context = useContext(ApplicationContext);

  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      context?.setActiveNav(pageName);
    }
  }, [ref, isInView, context, pageName]);

  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return { ref };
}

export default useObserver;
