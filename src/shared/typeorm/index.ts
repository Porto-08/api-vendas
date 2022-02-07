import { createConnection } from "typeorm";

createConnection().then(() => {
    console.log("Connection to database has been established successfully.");
}).catch(err => {
    console.log("TypeORM connection error: ", err);
});