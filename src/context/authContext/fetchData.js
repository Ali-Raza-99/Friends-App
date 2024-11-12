import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const db = getFirestore();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const queryCollection = collection(db, 'your-collection-name');
          const querySnapshot = await getDocs(queryCollection);
          const fetchedData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(fetchedData);
        } catch (error) {
          console.error("Error fetching Firestore data:", error);
        }
      };
  
      fetchData();
    }, [db]);
  
    return (
      <FirestoreContext.Provider value={data}>
        {children}
      </FirestoreContext.Provider>
    );
  };