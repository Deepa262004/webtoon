import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    comment: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true } // Automatically create ObjectId for comments
}, { _id: false }); // Prevent Mongoose from automatically creating a new _id field

const webtoonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    detailedDescription: { type: String },
    image: { type: String },
    comments: [commentSchema],
}, { timestamps: true });

const Webtoon = mongoose.model('Webtoon', webtoonSchema);

export default Webtoon;
