const mongoose = require('mongoose');
const cities = require('./cities')
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedhelpers')

const dbUrl = process.env.DB_URL;

mongoose.connect('mongodb+srv://FirstGuy:4QGrJHKjWUiRmF0K@cluster0.qs0pv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
    console.log('database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  
const picsArray = [
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1629286423/YelpCamp/au0e9gqjarcnxyho7bcm.jpg',
    filename: 'YelpCamp/au0e9gqjarcnxyho7bcm'
  },
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1629286423/YelpCamp/v2p7yyi8ux4pdrillccb.jpg',
    filename: 'YelpCamp/v2p7yyi8ux4pdrillccb'
  },
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1629286423/YelpCamp/vcuqbqmdrwd3jkujqcps.jpg',
    filename: 'YelpCamp/vcuqbqmdrwd3jkujqcps'
  },
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1629286423/YelpCamp/i2q4cs8w6kpkpa8bjti8.jpg',
    filename: 'YelpCamp/i2q4cs8w6kpkpa8bjti8'
  },
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1629286421/YelpCamp/piv22ncknr8q0u8tzhkk.jpg',
    filename: 'YelpCamp/piv22ncknr8q0u8tzhkk'
  },
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1629286421/YelpCamp/tshgdqh9mfwsii6vi0zm.jpg',
    filename: 'YelpCamp/tshgdqh9mfwsii6vi0zm'
  },
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1629282734/YelpCamp/yo07i0vnyzz64vjbgsmx.jpg',
    filename: 'YelpCamp/yo07i0vnyzz64vjbgsmx'
  },
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1629282734/YelpCamp/fw2fwmzwjuj57iqqpx88.jpg',
    filename: 'YelpCamp/fw2fwmzwjuj57iqqpx88'
  },
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1628966096/YelpCamp/io7lnz8cfmouvnhss4lt.jpg',
    filename: 'YelpCamp/io7lnz8cfmouvnhss4lt'
  },
  {
    url: 'https://res.cloudinary.com/gagagaga/image/upload/v1628972848/YelpCamp/tpswwvd5sxppcmbdd3em.jpg',
    filename: 'YelpCamp/tpswwvd5sxppcmbdd3em'
  }
  ]
  
    
  for (let i = 0; i < 350; i++){
    const images = [];
    images.push(picsArray[Math.floor(Math.random() * 10)], picsArray[Math.floor(Math.random() * 10)], picsArray[Math.floor(Math.random() * 10)])

        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50) + 10;
        const camp = new Campground({
            author: '611cf533200b6b001657cefe',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis similique, aut odio perferendis quasi optio quia architecto possimus harum? Voluptate aliquid praesentium dicta esse suscipit, autem saepe nesciunt facere dolore!',
          price,
          geometry: {
            type: 'Point',
            coordinates:
            [cities[random1000].longitude,
            cities[random1000].latitude]
          },
            images: images
        });
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})

