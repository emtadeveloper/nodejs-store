const {MongoClient} = require("mongodb");
const DB_URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(DB_URL);

const DB_Name = "storeDB";

client.connect();

const db = client.db(DB_Name);

const userCollection = db.collection("users");
const categoriesCollection = db.collection("categories");

userCollection
    .find({})
    .toArray()
    .then(res => {
        console.log(res);
    });

// const result = userCollection.insertMany([
//     {
//         first_name: "emad",
//         last_name: "ta",
//         username: "emta",
//         mobile: "09154144503",
//         email: "emta@gmail.com",
//         password: "123456",
//         otp: {code: 0, expiresIn: 0},
//         bills: [],
//         discount: 0,
//         brithday: "1376/09/06",
//         Roles: ["user"],
//     },
//     {
//         first_name: "ali",
//         last_name: "ta",
//         username: "alita",
//         mobile: "09150494986",
//         email: "alita@gmail.com",
//         password: "123456",
//         otp: {code: 0, expiresIn: 0},
//         bills: [],
//         discount: 0,
//         brithday: "1381/09/03",
//         Roles: ["user"],
//     },
// ]);

const resultCategory = categoriesCollection.insertMany([
    {
        title: "webDeveloper",
        parent: "",
    },
]);
