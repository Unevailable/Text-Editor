import { openDB } from 'idb';

const initdb = async () => {
  const dbName = 'jate';
  const dbVersion = 1;

  try {
    const db = await openDB(dbName, dbVersion, {
      upgrade(database) {
        if (database.objectStoreNames.contains(dbName)) {
          console.log(`${dbName} database already exists`);
          return;
        }
        database.createObjectStore(dbName, { keyPath: 'id', autoIncrement: false });
        console.log(`${dbName} database created`);
      },
    });
    return db;
  } catch (error) {
    console.error('Error initializing the database:', error);
    throw error;
  }
};

export const putDb = async (content) => {
  console.log('PUT to the database');
  const dbName = 'jate';

  try {
    const jateDb = await openDB(dbName, 1);
    const tx = jateDb.transaction(dbName, 'readwrite');
    const store = tx.objectStore(dbName);
    const request = store.put({ id: 1, jate: content });
    const result = await request;
    console.log('Data saved to the database', result);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

export const getDb = async () => {
  console.log('GET from the database');
  const dbName = 'jate';

  try {
    const jateDb = await openDB(dbName, 1);
    const tx = jateDb.transaction(dbName, 'readonly');
    const store = tx.objectStore(dbName);
    const request = store.get(1);
    const result = await request;
    console.log('result.value', result);

    if (typeof result !== 'undefined') {
      return result.jate;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return null;
  }
};

// Initialize the database
initdb();

const sampleContent = 'This is a different sample content';
putDb(sampleContent); // Add content to the database

getDb(); // Retrieve content from the database
