const express = require('express')

const adminRoutes = express.Router()

const dbo = require('../../db/connection')

const ObjectId = require('mongodb').ObjectId

// Liste des cours
adminRoutes.route('/admin/cours').get( (req,res) => {
    let db_cnx = dbo.getDb('cours')

    db_cnx
        .collection('cours')
        .find({})
        .toArray( (err,result) => {
            if (err) throw err
            res.json(result)
        })
})

// Les informations d'un thème
adminRoutes.route('/admin/cours/:id').get( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentCours = { _id: ObjectId(req.params.id) }
    
    db_cnx.collection('cours').findOne(currentCours, (err,response) => {
        if (err) throw err
        console.log('1 document displayed')
        res.json(response)
    })
})

// Ajouter un thème
adminRoutes.route('/admin/cours/add').post( (req,res) => {
    let db_cnx = dbo.getDb()

    let newCours = {
        cours_code: req.body.cours_code,
        cours_old_code: req.body.cours_old_code,
        cours_nom: req.body.cours_nom,
        cours_credits: req.body.cours_credits,
        cours_semestre: req.body.cours_semestre,
        cours_duree: req.body.cours_duree
    }

    db_cnx.collection('cours').insertOne(newCours, (err,response) => {
        if (err) throw err
        console.log('1 document added')
        res.json(response)
    })

})

// Modifier un thème
adminRoutes.route('/admin/cours/update/:id').post( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentCours = { _id: ObjectId(req.params.id) }

    let updatedCours = {
        $set: {
            cours_code: req.body.cours_code,
            cours_old_code: req.body.cours_old_code,
            cours_nom: req.body.cours_nom,
            cours_credits: req.body.cours_credits,
            cours_semestre: req.body.cours_semestre,
            cours_duree: req.body.cours_duree
        }
    }

    db_cnx.collection('ue').updateOne(currentCours,updatedCours, (err,response) => {
        if (err) throw err
        console.log('1 document updated')
        res.json(response)
    })
    
})

module.exports = adminRoutes