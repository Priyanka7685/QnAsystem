import { Permission } from "node-appwrite"
import { db, answerCollection } from "../name"
import { databases } from "./config"


export default async function createAnswerCollection() {
    // create coollection
    await databases.createCollection(db, answerCollection, answerCollection, [
        //permissions
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Anwswer collection is created");


    // creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 50, true),

    ])
    console.log("Question Attributes created")

    
        
}