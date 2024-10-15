import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import webtoonRoutes from './routes/webtoon.js';
import favoriteRoutes from './routes/fav.js';
// Initialize dotenv for environment variables
import Webtoon from './models/Webtoon.js';
dotenv.config();

const app = express();
const port = process.env.port || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const webtoons = [
    {
        "title": "Hello Baby",
        "creator": "Enjelicious",
        "genre": "Romance",
        "description": "Gwen, a kind young woman with a tragic past, meets Arthur on a cruise. Their fates intertwine when Gwen runs away after a brief encounter, leading to a legal battle years later over their child.",
        "thumbnail": 'https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123040-750x375.webp',
        "detailedDescription": "Hello Baby delves into the complexities of love and family. Gwen and Arthur's brief encounter turns into a lifelong challenge as they confront their pasts and the responsibilities of parenthood.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123040-750x375.webp",
        "comments": [
            { "user": "Alice", "comment": "An emotional rollercoaster!" },
            { "user": "Bob", "comment": "Loved the character development!" }
        ]
    },
    {
        "title": "The Alpha King’s Claim",
        "creator": "JMFelic",
        "genre": "Romance",
        "description": "Serena finds herself transported to a realm of werewolves after touching a painting. She ends up in the bed of the Alpha King Aero, who despises women.",
        "thumbnail": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123400-750x375.webp",
        "detailedDescription": "This story follows Serena as she navigates the dangerous world of werewolves, discovering her own strength and the complexities of love.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123400-750x375.webp",
        "comments": [
            { "user": "Chloe", "comment": "Such an exciting story!" },
            { "user": "David", "comment": "Can't wait for the next chapter!" }
        ]
    },
    {
        "title": "Bitten Contract",
        "creator": "Sungeun",
        "genre": "Romance",
        "description": "Chae-i, an actress struggling with headaches, is bitten by Ijun, a vampire. She discovers that his bite alleviates her pain, leading to a contractual relationship.",
        "thumbnail": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123842-750x375.webp",
        "detailedDescription": "Bitten Contract explores the unconventional relationship between Chae-i and Ijun as they confront their pasts and their feelings for each other.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-123842-750x375.webp",
        "comments": [
            { "user": "Emma", "comment": "Intriguing plot twist!" },
            { "user": "Ryan", "comment": "Loved the chemistry between the leads!" }
        ]
    },
    {
       
        "title": "Tricked into Becoming the Heroine’s Stepmother",
        "creator": "Hariheen",
        "genre": "Fantasy",
        "description": "Daisy wakes up in the novel she wrote after her death. Her life becomes complicated when she is arrested for helping a friend, and she navigates the challenges of her new reality.",
        "thumbnail": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-125252-750x375.webp",
        "detailedDescription": "This webtoon takes you on a fantastical journey as Daisy tries to rewrite her fate and manage her new life as a stepmother in her own story.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-125252-750x375.webp",
        "comments": [
            { "user": "Laura", "comment": "Such a unique concept!" },
            { "user": "Tom", "comment": "I love the character design!" }
        ]
    },
    {
        
        "title": "The Guy Upstairs",
        "creator": "Hanza Art",
        "genre": "Thriller",
        "description": "Rosy, an orphan, discovers a dead body in her apartment building while investigating strange noises from above. The mystery unfolds as she uncovers dark secrets.",
        "thumbnail": "https://animemangatoon.com/wp-content/uploads/2024/08/Screenshot-2024-05-28-192655-e1723318535608-750x375.png",
        "detailedDescription": "The Guy Upstairs is a thrilling mystery that keeps readers on the edge of their seats as Rosy unravels the secrets of her apartment building.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/08/Screenshot-2024-05-28-192655-e1723318535608-750x375.png",
        "comments": [
            { "user": "Jake", "comment": "Gripping from start to finish!" },
            { "user": "Sophia", "comment": "The suspense is unreal!" }
        ]
    },
    {
        
        "title": "The Runaway",
        "creator": "Domi, Nokdu",
        "genre": "Romance",
        "description": "Jian, a fashion industry worker, unexpectedly reunites with her former flame in Paris, navigating office tension and new relationships amidst personal upheaval.",
        "thumbnail": "https://animemangatoon.com/wp-content/uploads/2024/08/Screenshot-2024-08-11-011235-750x375.png",
        "detailedDescription": "The Runaway explores themes of love and ambition in the glamorous yet cutthroat fashion world.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/08/Screenshot-2024-08-11-011235-750x375.png",
        "comments": [
            { "user": "Mia", "comment": "I can't get enough of this story!" },
            { "user": "Alex", "comment": "Beautiful art and storytelling!" }
        ]
    },
    {
     
        "title": "Your Smile Is A Trap",
        "creator": "Aengo",
        "genre": "Romance",
        "description": "Kiyo, an ex-idol trainee, tries to live a normal life while judging others by appearances. He learns about acceptance and love through his relationship with Lily.",
        "thumbnail": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-132459-750x375.webp",
        "detailedDescription": "This webtoon addresses societal pressures and the journey toward self-acceptance and love.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-132459-750x375.webp",
        "comments": [
            { "user": "Nina", "comment": "A heartwarming story!" },
            { "user": "Luke", "comment": "The character development is fantastic!" }
        ]
    },
    {
        
        "title": "There Must Be Happy Endings",
        "creator": "Jaerim, Bulsa, Flada",
        "genre": "Romance",
        "description": "Yeonu gets a second chance at life after her husband Seonjae's death, vowing to change the past and save him from his secrets.",
        "thumbnail": "https://example.com/happy-endings-thumbnail.jpg",
        "detailedDescription": "This touching story explores themes of love, regret, and the desire for redemption.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-133040-1024x512.webp",
        "comments": [
            { "user": "Elena", "comment": "A beautiful story about love!" },
            { "user": "Mark", "comment": "I cried reading this!" }
        ]
    },
    {
       
        "title": "Seasons of Blossom",
        "creator": "HONGDUCK, NEMONE",
        "genre": "Romance",
        "description": "A series of interconnected stories across four seasons, focusing on themes of school bullying and the impact it has on young lives.",
        "thumbnail": "https://example.com/seasons-blossom-thumbnail.jpg",
        "detailedDescription": "Seasons of Blossom poignantly portrays the trials and triumphs of adolescence through a unique storytelling approach.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-133857-750x375.webp",
        "comments": [
            { "user": "Oliver", "comment": "This series is so relatable!" },
            { "user": "Lily", "comment": "I love the art style!" }
        ]
    },
    {
        
        "title": "Romance 101",
        "creator": "Namsoo",
        "genre": "Romance",
        "description": "Bareum, an organized student, struggles with her love life and decides to shake things up by joining a programming club, leading to unexpected challenges.",
        "thumbnail": "https://example.com/romance-101-thumbnail.jpg",
        "detailedDescription": "Romance 101 offers a light-hearted yet insightful look at the intersection of love and academic life.",
        "image": "https://animemangatoon.com/wp-content/uploads/2024/09/Screenshot-2024-09-16-134227-750x375.webp",
        "comments": [
            { "user": "Zoe", "comment": "A fun and entertaining read!" },
            { "user": "Ben", "comment": "I can relate to Bareum's struggles!" }
        ]
    }
];


// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async() => {
    console.log('MongoDB connected');
   //await Webtoon.insertMany(webtoons);
        console.log("Webtoons data inserted");
}).catch((err) => {
    console.log('Failed to connect to MongoDB:', err.message);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/webtoons', webtoonRoutes);
app.use('/api/favorites', favoriteRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
