import mongoose from 'mongoose';
import AuthorModel from '../ducks/author/author.model';

interface TInput {
    db: string;
}
export default ({ db }: TInput) => {
    const connect = () => {
        mongoose
            .connect(db, { useNewUrlParser: true })
            .then(async () => {
                await initDummyAuhtors();
                return console.info(`Successfully connected to ${db}`);
            })
            .catch(error => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            });
    };

    connect();

    mongoose.connection.on('disconnected', connect);
};

async function initDummyAuhtors() {
    if (process.env.INSERT_AUTHORS_AT_STARTUP) {
        const result = await AuthorModel.find({});
        if (!result || result.length === 0) {
            return await [
                'Brisa Carrizo',
                'Viviana Redondo',
                'Wanda Carrizo',
                'Emy Carrizo',
                'Kiki Carrizo',
                'Mika Carrizo',
            ].map(async author => {
                const store = await AuthorModel.create({
                    title: author,
                    created_at: new Date().toISOString(),
                    is_active: true,
                });
                return store;
            });
        }
    }
}
