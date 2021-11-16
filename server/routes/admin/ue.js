const express = require('express')

const adminRoutes = express.Router()

const dbo = require('../../db/connection')

const ObjectId = require('mongodb').ObjectId

// Liste des UE
adminRoutes.route('/admin/ue').get( (req,res) => {
    let db_cnx = dbo.getDb('ue')

    db_cnx
        .collection('ue')
        .find({})
        .toArray( (err,result) => {
            if (err) throw err
            res.json(result)
        })
})

// Les informations d'une UE
adminRoutes.route('/admin/ue/:id').get( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentUe = { _id: ObjectId(req.params.id) }
    
    db_cnx.collection('ue').findOne(currentUe, (err,response) => {
        if (err) throw err
        console.log('1 document displayed')
        res.json(response)
    })
})

// Ajouter une UE
adminRoutes.route('/admin/ue/add').post( (req,res) => {
    let db_cnx = dbo.getDb()

    let newUE = {
        ue_code: req.body.ue_code,
        ue_categorie: req.body.ue_categorie,
        class_id: req.body.class_id
    }

    db_cnx.collection('ue').insertOne(newUE, (err,response) => {
        if (err) throw err
        console.log('1 document added')
        res.json(response)
    })

})

// Modifier une UE
adminRoutes.route('/admin/ue/update/:id').post( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentUe = { _id: ObjectId(req.params.id) }

    let updatedUe = {
        $set: {
            ue_code: req.body.ue_code,
            ue_categorie: req.body.ue_categorie,
            class_id: req.body.class_id
        }
    }

    db_cnx.collection('ue').updateOne(currentUe,updatedUe, (err,response) => {
        if (err) throw err
        console.log('1 document updated')
        res.json(response)
    })
    
})

// Supprimer une UE
adminRoutes.route('/admin/ue/delete/:id').delete( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentUe = { _id: ObjectId(req.params.id) }

    db_cnx.collection('ue').deleteOne(currentUe, (err,response) => {
        if (err) throw err
        console.log('1 document deleted')
        res.json(response)
    })
})

module.exports = adminRoutes