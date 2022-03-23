const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          image:
            "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fchain-link-icon-vector-illustration-white-background-image152617478&psig=AOvVaw1Ly4V4Ym5MC3AF2yWEWhrv&ust=1648139017280000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPDAtrrS3PYCFQAAAAAdAAAAABAS",
          description: "Lorem ipsum",
          price,
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})