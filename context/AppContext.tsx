import React, {
  useEffect,
  useMemo,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface ChildrenProp {
  children: React.ReactNode;
}

interface Values {
  scrolled: boolean;
  activeNav: string;
  showMessageModal: boolean;
  setShowMessageModal: Dispatch<SetStateAction<boolean>>;
  setActiveNav: Dispatch<SetStateAction<string>>;
}

export const ApplicationContext = createContext<Values | null>(null);

function AppContext({ children }: ChildrenProp) {
  const [activeNav, setActiveNav] = useState<string>("Home");
  const [showMessageModal, setShowMessageModal] = useState<boolean>(true);

  // INITIALIZE A STATE TO TRACK IF THE PAGE IS SCROLLED
  const [scrolled, setScrolled] = useState<boolean>(false);

  // HANDLE THE SCROLL EVENT. CHANGE VARIABLES WHEN SCROLLED
  const handleScroll = () => {
    if (window.scrollY >= 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  // ATTACH THE FUNCTION TO THE SCROLL EVENT LISTENER ON MOUNT
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  // SET THE VALUES
  const values = useMemo(() => {
    const items: Values = {
      scrolled,
      activeNav,
      showMessageModal,
      setShowMessageModal,
      setActiveNav,
    };
    return items;
  }, [activeNav, scrolled, showMessageModal]);

  return (
    <ApplicationContext.Provider value={values}>
      {children}
    </ApplicationContext.Provider>
  );
}

export default AppContext;
