import dbConnect from "./dbConnect.js";


export function getAllWines (req,res){
  const db = dbConnect()
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