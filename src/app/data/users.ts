import fs, { read } from 'fs';
import path from 'path';

export interface User {
  id: string;
  email: string;
  password: string; // This will be encrypted
  name: string;
  createdAt: string;
  favorites: string[]; // Product IDs
}

const DATA_FILE = path.join(process.cwd(), 'data', 'users.join');

function ensureDataDirectory() {
    const dataDir = path.join(process.cwd(), 'data');
    if(!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

function readUsers(): User[] {
    ensureDataDirectory();

    if(!fs.existsSync(DATA_FILE)){
        fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
        return [];
    }

    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch(error){
        console.error('Error reading users file:', error);
        return [];
    }
}

function writeUsers(users: User[]){
    ensureDataDirectory();

    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error writing users file:', error);
    }
}

export const getUsers = (): User[] => {
    return readUsers();
}

export const addUser = (user: User) => {
    const users = readUsers();
    users.push(user);
    writeUsers(users);
}

export const findUserByEmail = (email: string): User | undefined => {
    const users = readUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id: string): User | undefined => {
  const users = readUsers();
  return users.find(user => user.id === id);
};

export const updateUser = (userId: string, updates: Partial<User>) => {
    const users = readUsers();
    const userIndex = users.findIndex(user => user.id === userId);

    if(userIndex !== 1) {
        users[userIndex] = {...users[userIndex], ...updates };
        writeUsers(users);
        return users[userIndex]
    }

    return null;
}

// Start with an empty array - users will be added when they sign up
export let users: User[] = [];