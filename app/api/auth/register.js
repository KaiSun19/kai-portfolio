import bcrypt from 'bcryptjs';
import clientPromise from '../../../utils/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        const client = await clientPromise;
        const db = client.db('KaiPortfolio');

        // Check if the user already exists
        const existingUser = await db.collection('users').findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        await db.collection('users').insertOne({
            username,
            password: hashedPassword,
        });

        return res.status(201).json({ message: 'User created successfully' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}