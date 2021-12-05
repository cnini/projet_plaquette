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

// Les informations d'un cours
adminRoutes.route('/admin/cours/r/cours/:id').get( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentCours = { _id: ObjectId(req.params.id) }
    
    db_cnx.collection('cours').findOne(currentCours, (err,response) => {
        if (err) throw err
        console.log('1 document displayed')
        res.json(response)
    })
})

// Ajouter un cours
adminRoutes.route('/admin/cours/add').post( (req,res) => {
    let db_cnx = dbo.getDb()

    let newCours = {
        nom: req.body.nom,
        annee: req.body.annee,
        semestre: req.body.semestre,
        duree: req.body.duree,
        theme: req.body.theme,
        credits_ccsn: req.body.credits_ccsn,
        credits_dad: req.body.credits_dad,
    }

    db_cnx.collection('cours').insertOne(newCours, (err,response) => {
        if (err) throw err
        console.log('1 document added')
        res.json(response)
    })

})

// Modifier un cours
adminRoutes.route('/admin/cours/u/cours/:id').put( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentCours = { _id: ObjectId(req.params.id) }

    let updatedCours = {
        $set: {
            nom: req.body.nom,
            annee: req.body.annee,
            semestre: req.body.semestre,
            duree: req.body.duree,
            theme: req.body.theme,
            credits_ccsn: req.body.credits_ccsn,
            credits_dad: req.body.credits_dad,
        }
    }

    db_cnx.collection('cours').updateOne(currentCours,updatedCours, (err,response) => {
        if (err) throw err
        console.log('1 document updated')
        res.json(response)
    })
    
})

// Supprimer un cours
adminRoutes.route('/admin/cours/d/cours/:id').delete( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentCours = { _id: ObjectId(req.params.id) }

    db_cnx.collection('cours').deleteOne(currentCours, (err,response) => {
        if (err) throw err
        console.log('1 document deleted')
        res.json(response)
    })
})

module.exports = adminRoutes