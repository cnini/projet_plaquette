const express = require('express')

const adminRoutes = express.Router()

const dbo = require('../db/connection')

const ObjectId = require('mongodb').ObjectId

// Liste des UE
adminRoutes.route('/admin/ue').get( (req,res) => {
    let db_cnx = dbo.getDb()

    db_cnx
        .collection('ue')
        .find({})
        .toArray( (err,result) => {
            if (err) throw err
            res.json(result)
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
        res.json(response)
    })

})

module.exports = adminRoutes