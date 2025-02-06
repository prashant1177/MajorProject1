const mongoose = require("mongoose");
const Listing = require("./models/listing"); // Ensure your schema is in models/listing.js

const seedListings = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/travel", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

        // **Delete all previous listings**
        await Listing.deleteMany({});
        console.log("Deleted all previous listings");

        // **List of new listings**
        const listings = [
            {
                _id: new mongoose.Types.ObjectId("67a47caa1df2accba3d5b4a9"),
                title: "Gratitude Eco-Homestay",
                description: "A serene eco-friendly homestay perfect for nature lovers and peaceful retreats.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 25000,
                location: "Dahuli",
                capacity: 5,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
            {
                title: "Mountain View Cabin",
                description: "Cozy wooden cabin in the mountains with breathtaking views and a warm fireplace.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 18000,
                location: "Manali",
                capacity: 4,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
            {
                title: "Seaside Bliss Retreat",
                description: "Luxury beachfront villa with private pool and access to a secluded beach.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 35000,
                location: "Goa",
                capacity: 6,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
            {
                title: "Jungle Treehouse",
                description: "Stay in a beautifully crafted treehouse deep in the jungle, away from the city rush.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 22000,
                location: "Meghalaya",
                capacity: 3,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
            {
                title: "Royal Palace Stay",
                description: "Live like royalty in this heritage palace with exquisite architecture and history.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 45000,
                location: "Jaipur",
                capacity: 10,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
            {
                title: "Desert Safari Camp",
                description: "Experience the beauty of the desert in a luxurious tent with bonfire nights.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 15000,
                location: "Jaisalmer",
                capacity: 4,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
            {
                title: "Riverside Wooden Cottage",
                description: "Peaceful riverside stay with fresh air and lush green surroundings.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 20000,
                location: "Rishikesh",
                capacity: 5,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
            {
                title: "Snow Peak Chalet",
                description: "A charming chalet with a fireplace and a view of snow-capped mountains.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 30000,
                location: "Gulmarg",
                capacity: 6,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
            {
                title: "Floating Houseboat",
                description: "Stay on a luxurious houseboat with mesmerizing backwater views.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 28000,
                location: "Kerala",
                capacity: 5,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
            {
                title: "Himalayan Zen Retreat",
                description: "Find your inner peace in this yoga retreat surrounded by the Himalayas.",
                image: "https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg",
                price: 27000,
                location: "Dharamshala",
                capacity: 8,
                reviews: [],
                owner: new mongoose.Types.ObjectId("67a31685692f0faafe2019a5"),
            },
        ];

        // **Insert listings**
        await Listing.insertMany(listings);
        console.log("10 new listings added successfully");

        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
    }
};

seedListings();
