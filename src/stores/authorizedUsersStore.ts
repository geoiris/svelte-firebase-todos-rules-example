import { db } from '$lib/firebase';
import { collection, deleteDoc, doc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { writable } from 'svelte/store'

const authorizedUsersCollection = collection(db, 'authorizedUsers');

const createauthorizedUsersStore = () => {
  const { subscribe, set } = writable([]);

  const fetchauthorizedUsers = async () => {
    const querySnapshot = await getDocs(authorizedUsersCollection);
    const authorizedUsers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return authorizedUsers;
  };

  const fetchauthorizedUsersDocIds = async () => {
    const querySnapshot = await getDocs(authorizedUsersCollection);
    const authorizedUsers = querySnapshot.docs.map(doc => (doc.id));
    return authorizedUsers;
  };

  const addauthorizedUser = async authorizedUser => {
    await setDoc(doc(authorizedUsersCollection, authorizedUser), {});
  };

  const deleteauthorizedUser = async id => {
    await deleteDoc(doc(authorizedUsersCollection, id));
  };

  const unsubscribe = onSnapshot(authorizedUsersCollection, snapshot => {
    const authorizedUsers = snapshot.docs.map(doc => ({  id: doc.id, ...doc.data() }));
    set(authorizedUsers);
  });
  
  return {
    subscribe,
    addauthorizedUser,
    deleteauthorizedUser,
    fetchauthorizedUsers,
    fetchauthorizedUsersDocIds
  };
};

const authorizedUsersStore = createauthorizedUsersStore();
export default authorizedUsersStore;
