import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../utils/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = JSON.parse(req.body);

        const client = await clientPromise;
        const db = client.db('kai_portfolio');
        const collection = db.collection('users');
        
        // Find the user
        const user = await collection.findOne({ username : username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        // Check the password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        //sets the Set-Cookie header for the response objeect which can be checked by nextjs middleware
        res.setHeader('Set-Cookie', `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`);

        // Send back the token
        return res.status(200).json({ token });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}