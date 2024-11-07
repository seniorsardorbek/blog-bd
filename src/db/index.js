import mongoose from 'mongoose';



export async function db() {
    return mongoose.connect(`mongodb://localhost:27017/bloging`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((res) => console.log('DB connected succesfully'))
        .catch((err) => console.log('Error connecting'));
}

