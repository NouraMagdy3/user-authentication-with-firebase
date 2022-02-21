import {
  signInWithPopup,
  GoogleAuthProvider,
  query,
  addDoc,
  collection,
  getDocs,
  where,
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "./index";

//signInWithGoogle function
// google auth provider
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user, "usss");
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return err.message;
  }
};

//logInWithEmailAndPassword function
export const logInWithEmailAndPassword = async (email, password) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log(data, "loggedData");
  } catch (err) {
    console.error(err);
    alert(err.message);
    return err.message;
  }
};

//registerWithEmailAndPassword function
export const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  photo
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user, "usssReg");
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      photo: photo || "",
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
    return err.message;
  }
};

//sendPasswordReset function
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
    return err.message;
  }
};

//logOut function
export const logout = () => {
  signOut(auth);
};
