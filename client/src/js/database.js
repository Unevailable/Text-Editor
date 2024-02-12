import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    
    // Adding current timestamp as the id for the content
    const timestamp = Date.now();
    await store.put({ id: timestamp, content });
    
    await tx.done;
    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    
    // Retrieving all content from the database
    const content = await store.getAll();
    
    await tx.done;
    console.log('Content retrieved from the database:', content);
    return content;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return null;
  }
};

initdb(); // Initialize the database

const sampleContent = 'This is a sample content';
putDb(sampleContent); // Add content to the database

getDb(); // Retrieve all content from the database
