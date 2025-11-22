import fs from 'fs';
import path from 'path';

interface Address {
    street: string;
    addressLine2?: string;  // Optional second address line
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone?: string;  // Added phone number field
    createdAt: string;
    favorites: string[];
    address?: Address;
}

// Path to JSON file for persistent storage
const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

// Ensure data directory exists
function ensureDataDirectory() {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

// Load users from JSON file
function loadUsers(): User[] {
    try {
        ensureDataDirectory();
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error loading users:', error);
    }
    return [];
}

// Save users to JSON file
function saveUsers(users: User[]) {
    try {
        ensureDataDirectory();
        fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
        console.log('✅ Users saved to file');
    } catch (error) {
        console.error('❌ Error saving users:', error);
    }
}

// Load users on module initialization
let users: User[] = loadUsers();
console.log(`📁 Loaded ${users.length} users from storage`);

// Find user by email
export function findUserByEmail(email: string) {
    users = loadUsers(); // Reload to get latest data
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

// Add new user
export function addUser(user: User) {
    users = loadUsers(); // Reload to get latest data
    users.push(user);
    saveUsers(users); // Save to file immediately
    console.log(`✅ User added: ${user.email}`);
}

// Find user by ID
export function findUserById(userId: string) {
    users = loadUsers(); // Reload to get latest data
    return users.find(user => user.id === userId);
}

// Update user data
export function updateUser(userId: string, updatedData: any) {
    users = loadUsers(); // Reload to get latest data
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex !== -1) {
        // Merge existing user data with updates
        users[userIndex] = {
            ...users[userIndex],
            ...updatedData
        };
        saveUsers(users); // Save to file immediately
        console.log(`✅ User updated: ${users[userIndex].email}`);
        return users[userIndex];
    }
    
    console.log(`❌ User not found: ${userId}`);
    return null;
}