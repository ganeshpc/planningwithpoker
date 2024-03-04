import { initializeApp } from 'firebase/app';
import {
  connectStorageEmulator,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

import {
  addDoc,
  collection,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

initializeApp(firebaseConfig);

const storage = getStorage();

const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 444);
connectStorageEmulator(storage, 'localhost', 9199);

const usersCollection = collection(db, 'users');
const gamesCollection = collection(db, 'games');

export const getUser = async (userId) => {
  if (!userId) {
    throw new Error('Invalid userId');
  }

  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (e) {
    console.error(e);
    throw new Error('Error fetching user from firestore');
  }
};

export const updateUser = async (userId, user) => {
  if (!userId || !user) {
    throw new Error('Invalid userId or user');
  }

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, user);
    return { ...user, id: userId };
  } catch (e) {
    console.log(`Error updating user: ${user.name}`);
    throw new Error(`Error updating user: ${user.name}`);
  }
};

export const createUser = async (user) => {
  if (!user || !user.name) {
    throw new Error('Invalid user');
  }
  try {
    const userRef = await addDoc(usersCollection, {
      name: user.name,
    });
    return { ...user, id: userRef.id };
  } catch (e) {
    console.error(e);
    throw new Error('Error creating user in firestore');
  }
};

/**
 *
 * @param {Object} game
 * @returns created game
 */
export const createGame = async (game) => {
  if (!game || !game.name) {
    throw new Error('Invalid game name');
  }
  if (!game || !game.createdBy) {
    throw new Error('Invalid createdBy field');
  }
  if (!game || !game.cards) {
    throw new Error('Invalid cards');
  }

  try {
    // Default values
    if (!game.players) {
      game.players = [];
    }

    //TODO: make it configurable
    game.currentRound = {};
    game.currentRound.votes = {};
    game.currentRound.votesRevealed = false;
    game.currentRound.voteAverage = 0;

    const gameRef = await addDoc(gamesCollection, game);
    return { id: gameRef.id, ...game };
  } catch (e) {
    console.error(e);
    throw new Error('Error creating game in firestore');
  }
};

export const getGame = async (gameId) => {
  if (!gameId) {
    throw new Error('Invalid game id');
  }

  try {
    const gameRef = doc(db, 'games', gameId);
    const gameDoc = await getDoc(gameRef);
    if (gameDoc.exists()) {
      return { id: gameDoc.id, ...gameDoc.data() };
    }
    return null;
  } catch (e) {
    console.error(e);
    throw new Error('Error fetching game from firestore');
  }
};

export const attachGameListener = (gameId, onGameUpdate) => {
  if (!gameId) {
    throw new Error('Invalid game id');
  }

  try {
    const gameRef = doc(db, 'games', gameId);

    const unsubscribeGameListener = onSnapshot(gameRef, (gameDoc) => {
      const id = gameDoc.id;
      const game = gameDoc.data();
      onGameUpdate({ ...game, id });
    });

    return unsubscribeGameListener;
  } catch (e) {
    throw new Error(`Failed to attach listener on game: ${gameId}`);
  }
};

export const updateGame = async (game) => {
  const gameRef = doc(db, 'games', game.id);
  await updateDoc(gameRef, game);
};

export const addPlayerToGame = async (gameId, playerId, playerName, playerProfilePicture) => {
  if (!gameId || !playerId || !playerName) {
    throw new Error('Invalid parameters');
  }

  try {
    const gameRef = doc(db, 'games', gameId);
    const gameDoc = (await getDoc(gameRef)).data();

    gameDoc.players = gameDoc.players ? gameDoc.players : [];
    const currentPlayer = gameDoc.players.find(
      (player) => player.id === playerId,
    );

    if (currentPlayer === undefined) {
      const newPlayers = [
        ...gameDoc.players,
        { id: playerId, name: playerName, profilePicture: playerProfilePicture },
      ];
      await updateDoc(gameRef, { players: newPlayers });

      // player was added
      return true;
    } else {

    }

    // player was not added
    return false;
  } catch (e) {
    throw new Error(
      `Failed to update game with the current players: ${gameId}`,
    );
  }
};

export const uploadImage = async (userId, imageFile) => {
  const inputImageNameParts = imageFile.name.split('.');
  const imageExtension = inputImageNameParts[inputImageNameParts.length - 1];

  const newImageFileName = `${userId}.${imageExtension}`;
  const imageStorageRef = ref(storage, `images/${newImageFileName}`);

  const snapshot = await uploadBytes(imageStorageRef, imageFile);

  return snapshot;
};

export const getImageUrl = async (imageName) => {
  const imageStorageRef = ref(storage, `images/${imageName}`);

  try {
    const url = await getDownloadURL(imageStorageRef);
    return url;
  } catch (e) {
    return null;
  }
};
