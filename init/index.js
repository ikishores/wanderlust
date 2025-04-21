// const mongoose=require('mongoose');
// const initdata=require('./data.js');

// const listing=require('../models/listing.js')

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
// main().then(()=>{
//     console.log("Connected to MongoDB");
// }).catch((err)=>{
//     console.log(err);
// });

// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//     await listing.deleteMany({});
//     initdata.data = initdata.data.map((obj) => ({
//         ...obj,
//         image: obj.image.url, // 👈 pull out the URL from the object
//         owner: "6800e4335771244286bab77c"
//     }));
    
//     await listing.insertMany(initdata.data);
//     console.log("Data was initialized");
// };

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to MongoDB");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    const data = initData.data.map((obj) => ({
        ...obj,
        owner: new mongoose.Types.ObjectId("6800e510ec9d986b38388642") // 👈 Correct ID
      }));
      
     // 👀 See the modified data

    await Listing.insertMany(data);
    console.log("Data was initialized");
  } catch (err) {
    console.log(err);
  }
};
initDB();