import { Permission } from "node-appwrite"
import { db, questionCollection } from "../name"
import { databases } from "./config"


export default async function createQuestionCollection() {
    // create coollection
    await databases.createCollection(db, questionCollection, questionCollection, [
        //permissions
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Question collection is created");


    // creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
    ])
    console.log("Question Attributes created")

    // create indexes  
        // there might be problem in creating indexes so we need to create them manually
    
    // await Promise.all([
    //     databases.createIndex(
    //         db, questionCollection,"title",IndexType.Fulltext, ["title"], ['asc']
    //     ),
    //     databases.createIndex(
    //         db, questionCollection,"content",IndexType.Fulltext, ["content"], ['asc']
    //     ),
    // ])
        
}