import { db } from "../services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import Alert from "@mui/material/Alert";
import { useCallback, useEffect, useState } from "react";

export const useFirestore = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    let timer;

    if (alertMessage && alertType) {
      timer = setTimeout(() => {
        setAlertMessage(null);
        setAlertType(null);
      }, 3000); // Change the duration as needed (in milliseconds)
    }

    return () => {
      clearTimeout(timer);
    };
  }, [alertMessage, alertType]);

  const addDocument = async (collectionName, watchlistData) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collectionName), watchlistData);
    console.log("Document written with ID: ", docRef.id);
  };

  const addToWatchlist = async (userId, dataId, watchlistData) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        setAlertType("warning");
        setAlertMessage("This item is already in your watchlist.");
        return false;
      }
      await setDoc(
        doc(db, "users", userId, "watchlist", dataId),
        watchlistData
      );

      setAlertType("success");
      setAlertMessage("Added to watchlist.");
    } catch (error) {
      console.log(error, "Error adding document");
      setAlertType("error");
      setAlertMessage("An error occured.");
    }
  };

  const checkIfInWatchlist = async (userId, dataId) => {
    if (userId === undefined || dataId === undefined) {
      return false;
    }
    const docRef = doc(
      db,
      "users",
      userId.toString(),
      "watchlist",
      dataId.toString()
    );

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromWatchlist = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(db, "users", userId.toString(), "watchlist", dataId.toString())
      );
      setAlertType("success");
      setAlertMessage("Removed from watchlist");
    } catch (error) {
      setAlertType("error");
      setAlertMessage("An error occured.");
      console.log(error, "Error while deleting doc.");
    }
  };

  const getWatchlist = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return data;
  }, []);

  return {
    addDocument,
    addToWatchlist,
    checkIfInWatchlist,
    removeFromWatchlist,
    getWatchlist,
    alertComponent: alertMessage && alertType && (
      <Alert
        severity={alertType}
        style={{
          position: "absolute",
          bottom: "10px",
        }}
        variant="filled"
      >
        {alertMessage}
      </Alert>
    ),
  };
};
