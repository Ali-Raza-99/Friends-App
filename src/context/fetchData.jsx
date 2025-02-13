import React, { createContext, useContext, useState, useEffect } from 'react';

// import { getFirestore,collection,getDocs } from 'firebase/firestore';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { db } from '../firebase/firebase';

const DataContext = createContext();
// const db = getFirestore()

export const useData = () => useContext(DataContext);


export const FirestoreProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null); 
  const [customLoading, setCustomLoading] = useState(true);

  useEffect(() => {
    // Set up the listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // console.log(user)
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch data only if the user is authenticated
    const fetchData = async () => {
      if (!user) return;

      try {
        const queryCollection = collection(db, 'users');
        const userQuery = query(queryCollection, where('userUid', '==', user.uid));
        const querySnapshot = await getDocs(userQuery);
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(fetchedData);
        console.log(data); 
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      } finally {
        setCustomLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <DataContext.Provider value={{ user,data, customLoading }}>
      {children}
    </DataContext.Provider>
  );
};

