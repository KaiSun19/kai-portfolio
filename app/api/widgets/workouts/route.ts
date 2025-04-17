import clientPromise from '@/utils/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    if (req.method === 'GET') {
        let query  = req.nextUrl.searchParams.get('query')
        const client = await clientPromise;
        const db = client.db('kai_portfolio');


        if(query?.includes('workout_log')){
            const collection = db.collection('weighted_exercise_log');
            query = query.replace('workout_log', '');
            let match;
            try{
                if(query === ''){
                    match = await collection.find().limit(10).toArray();
                }
                else if(query.includes('[')){
                    query = JSON.parse(query);
                    match = await collection.find({ type: { $in: query } }).limit(10).toArray();
                }
                else{
                    match = await collection.find({ type: query }).limit(10).toArray();
                }

                return NextResponse.json(match , {status : 200});
            }
            catch (error) {
                return NextResponse.json(
                    { message: `Error finding weighted workout logs: ${error}` },
                    { status: 405 }
                );
            }
        }
        else{
            const collection = db.collection('exercises');
            if(typeof query === 'string' && query?.length > 0){
                query = JSON.parse(query);
            }
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
        let data  = await req.json();


        const client = await clientPromise;
        const db = client.db('kai_portfolio');

        if (Object.keys(data).length === 2 && Object.keys(data).every(key => ['type', 'sets'].includes(key))) {
            try{
                const collection = db.collection('weighted_exercise_log');
                const result = collection.insertOne({
                    timestamp : new Date(),
                    ...data
                })
                console.log(`New log inserted with id: ${result.insertedId}`);

                return NextResponse.json(result , {status : 200});
            }

            catch (error) {
                return NextResponse.json(
                    { message: `Error uploading log: ${error}` },
                    { status: 405 }
                );
            }
        }
        else{
            let exercises = data.map(exercise => ({
                ...exercise,
                reps: Number(exercise.reps),
                points: Number(exercise.points)
            }));

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


      }
    else {
        return NextResponse.json(
            { message: `Method ${req.method} Not Allowed` },
            { status: 405 }
        );
    }
}