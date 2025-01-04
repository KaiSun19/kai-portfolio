import type {NextApiRequest, NextApiResponse } from 'next';

export default function handler(req : NextApiRequest, res: NextApiResponse) {
    
    if(req.method === 'POST'){
        const {authToken} = req.cookies;
        if(authToken){
            res.setHeader('Set-Cookie', 'authToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
            res.status(200).json({ message: 'Auth Cookie deleted'})
        }
        else{
            return res.status(400).end('Auth Cookie does not exist');
        }
    }
    else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}