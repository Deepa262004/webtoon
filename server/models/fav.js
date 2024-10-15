 // models/Favorite.js
import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for user references
    required: true,
    ref: 'User' // Reference to the User model
  },
  webtoonId: {
    type: String,
    required: true
  }
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);
export default Favorite;
