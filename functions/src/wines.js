import dbConnect from "./dbConnect.js";


export function getAllWines (req,res){
  const db = dbConnect()
  db.collection ('wines').get()
  .then(collection => {
      const albumsArr = collection.docs.map(doc => {
         return {...doc.data(), albumId: doc.id}
              
          
      })
      res.send(winesArr)
  })
  .catch(err => res.status(500).send({success:false, message: (err)}))
}

export function createNewWines(req, res){
  const db= dbConnect()
  db.collection('wines').add(req.body)
  .then(doc => res.status(201).send({success: true, message: 'Wines created:'}))
.catch(err => res.status(500).send({success: false, message: err}))
}