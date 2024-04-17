/* eslint-disable no-nested-ternary */
import {
  createContext,
  ReactNode,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import {
  AuthContextModel,
  CurrentUser,
} from "../utils/interfaces/AppInterfaces";
import auth from "../app-service/firebase-config";
import Loading from "../components/others/Loading";

interface UserAuthContextProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextModel | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

function UserAuthProvider({ children }: UserAuthContextProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signUpUser = async (email: string, password: string) => {
    await setPersistence(auth, browserSessionPersistence);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = async (email: string, password: string) => {
    await setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    await setPersistence(auth, browserSessionPersistence);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const facebookSignIn = async () => {
    await setPersistence(auth, browserSessionPersistence);
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    setIsLoading(true);
    setCurrentUser(null);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (
        user?.emailVerified ||
        user?.providerData[0].providerId === "facebook.com"
      ) {
        const userInfo: CurrentUser = {
          email: user.email,
          uid: user.uid,
          photoURL: user.photoURL,
          username: user.displayName,
        };
        setIsLoading(false);
        setCurrentUser(userInfo);
      } else {
        signOut(auth);
        setIsLoading(false);
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const values = useMemo(() => {
    const items: AuthContextModel = {
      currentUser,
      signInUser,
      signUpUser,
      googleSignIn,
      facebookSignIn,
    };

    return items;
  }, [currentUser]);

  const key = Object.keys(sessionStorage).find((key) =>
    key.startsWith("firebase:authUser")
  );
  const user = key ? sessionStorage.getItem(key) : null;

  return (
    <AuthContext.Provider value={values}>
      {user && isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export default UserAuthProvider;
