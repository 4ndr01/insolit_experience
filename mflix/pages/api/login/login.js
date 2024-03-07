import connectMongoDB from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
export default async function handler(req, res) {
    const bcrypt = require('bcryptjs');

    if (req.method === 'POST') {
        const { email, password } = await req.body;

        const {db} = await connectMongoDB();
        const collection = db.collection('users');

        const user  =await collection.findOne({email});

        if(!user){
            res.status(401).json({message: 'Invalid credentials'});

        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){
            res.status(200).json({message: 'Login successful'});


    }else {
        res.status(401).json({message: 'Invalid credentials'});
    }
}
else{
    res.status(405).end();
}
}