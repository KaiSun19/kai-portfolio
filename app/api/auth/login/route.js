import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '@/utils/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
    if (req.method === 'POST') {
        const { username, password } = await req.json();

        const client = await clientPromise;
        const db = client.db('kai_portfolio');
        const collection = db.collection('users');
        
        // Find the user
        const user = await collection.findOne({ username : username });
        if (!user) {
            return NextResponse.json({ message: 'Invalid username' }, {status : 401});
        }

        // Check the password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, {status : 401});
        }
        // Create a JWT
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        const response = NextResponse.json({ token },{status : 200});

        response.cookies.set('authToken', token , {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 24 hours
        })

        return response;

    } else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405 }
        );
    }
}