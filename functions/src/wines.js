import dbConnect from "./dbConnect.js";
import admin from "firebase-admin";
import * as secrets from "../secrets.js";

admin.initializeApp({
credential: admin.credential.cert(secrets)
})



export function getAllWines (req,res){
  const db = dbConnect()``
  db.collection ('wines').get()
  .then(collection => {
      const winesArr = collection.docs.map(doc => {
         return {...doc.data(), wineId: doc.id}
              
          
      })
      res.send(winesArr)
  })
  .catch(err => res.status(500).send({success:false, message: "Failed to retrieve wines from the database"}))
}

export function createNewWines(req, res){
  const db= dbConnect()
  db.collection('wines').add(req.body)
  .then(doc => res.status(201).send({success: true, message: 'Wines created:'}))
.catch(err => res.status(500).send({success: false, message: err}))
}

export async function deleteWines(req, res) {
  try {
    const { wineId } = req.params;
    const db = admin.firestore();

    // Get the wine document reference
    const wineRef = db.collection("wines").doc(wineId);

    // Delete the document
    await wineRef.delete();

    res.status(202).json({ message: "Wine deleted" });
  } catch (error) {
    console.error("Error deleting wine:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
