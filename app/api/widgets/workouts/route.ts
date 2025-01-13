import clientPromise from '@/utils/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    if (req.method === 'GET') {
        const query  = req.nextUrl.searchParams.get('query')

        const client = await clientPromise;
        const db = client.db('kai_portfolio');
        const collection = db.collection('exercises');

        let match;
        try{
            if(typeof query === 'string'){
                if(query === ''){
                    match = await collection.find().toArray();
                }
                else{
                    match = await collection.find({ type: query }).toArray();
                }
            }
            else{
                match = await collection.find({ type: { $in: query } }).toArray();

            }
            return NextResponse.json(match , {status : 200});
        }
        catch (error) {
            return NextResponse.json(
                { message: `Error finding exercises: ${error}` },
                { status: 405 }
            );
        }
      }
    else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405 }
        );
    }
}

export async function POST(req: NextRequest) {
    if (req.method === 'POST') {
        let exercises  = await req.json();

        exercises = exercises.map(exercise => ({
            ...exercise,
            reps: Number(exercise.reps),
            points: Number(exercise.points)
        }));

        const client = await clientPromise;
        const db = client.db('kai_portfolio');
        const collection = db.collection('exercises');

        let result;

        try{
            if(exercises.length === 1){
                result = await collection.insertOne(exercises[0]);
                console.log(`New exercise inserted with id: ${result.insertedId}`);
            }
            else{
                result = await collection.insertMany(exercises);
                console.log(`New exercise inserted with id: ${result.insertedIds}`);
            }
            return NextResponse.json(result , {status : 200});
        }
        catch (error) {
            return NextResponse.json(
                { message: `Error uploading exercises: ${error}` },
                { status: 405 }
            );
        }
      }
    else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405 }
        );
    }
}