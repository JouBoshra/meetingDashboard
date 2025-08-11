import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const COLLECTION_NAME = "comments";

// Add a new comment
export const addComment = async ({ author, text, sectionId }) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      author,
      text,
      sectionId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Subscribe to comments for a given section with immediate clear and error handling
export const subscribeToSectionComments = (
  sectionId,
  callback,
  errorCallback
) => {
  // Immediately clear loading spinner
  callback([]);

  const q = query(
    collection(db, COLLECTION_NAME),
    where("sectionId", "==", sectionId),
    orderBy("createdAt", "desc")
  );

  // Subscribe with data and error handlers
  return onSnapshot(
    q,
    (querySnapshot) => {
      const comments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(comments);
    },
    (error) => {
      console.error("Error in comments subscription:", error);
      if (typeof errorCallback === "function") {
        errorCallback(error);
      } else {
        callback([]); // fallback clear
      }
    }
  );
};

// Update an existing comment
export const updateComment = async (commentId, updateData) => {
  try {
    const commentRef = doc(db, COLLECTION_NAME, commentId);
    await updateDoc(commentRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    const commentRef = doc(db, COLLECTION_NAME, commentId);
    await deleteDoc(commentRef);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
