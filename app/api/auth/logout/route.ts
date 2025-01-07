import type {NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export function POST(req : NextApiRequest) {
    
    if(req.method === 'POST'){
        const {authToken} = req.cookies;
        if(authToken){
            const response = NextResponse.json({ message: 'Auth Cookie deleted'}, { status : 200});
            response.cookies.set('authToken', '' , {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge:0
            });

            return response;
        }
        else{
            return NextResponse.json({message : 'Auth Cookie does not exist'});
        }
    }
    else{
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405 }
        );
    }
}