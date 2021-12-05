const express = require('express')

const adminRoutes = express.Router()

const dbo = require('../../db/connection')

const ObjectId = require('mongodb').ObjectId

// Liste des compétences
adminRoutes.route('/admin/competences').get( (req,res) => {
    let db_cnx = dbo.getDb('competence')

    db_cnx
        .collection('competence')
        .find({})
        .toArray( (err,result) => {
            if (err) throw err
            res.json(result)
        })
})

// Les informations d'une compétence
adminRoutes.route('/admin/competences/r/competence/:id').get( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentCompetence = { _id: ObjectId(req.params.id) }
    
    db_cnx.collection('competence').findOne(currentCompetence, (err,response) => {
        if (err) throw err
        console.log('1 document displayed')
        res.json(response)
    })
})

// Ajouter un thème
adminRoutes.route('/admin/competences/add').post( (req,res) => {
    let db_cnx = dbo.getDb()

    let newCompetence = {
        annee: req.body.annee,
        libelle: req.body.libelle,
        theme: req.body.theme
    }

    db_cnx.collection('competence').insertOne(newCompetence, (err,response) => {
        if (err) throw err
        console.log('1 document added')
        res.json(response)
    })

})

// Modifier une compétence
adminRoutes.route('/admin/competences/u/competence/:id').put( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentCompetence = { _id: ObjectId(req.params.id) }

    let updatedCompetence = {
        $set: {
            annee: req.body.annee,
            libelle: req.body.libelle,
            theme: req.body.theme
        }
    }

    db_cnx.collection('competence').updateOne(currentCompetence,updatedCompetence, (err,response) => {
        if (err) throw err
        console.log('1 document updated')
        res.json(response)
    })
    
})

// Supprimer une compétence
adminRoutes.route('/admin/competences/d/competence/:id').delete( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentCompetence = { _id: ObjectId(req.params.id) }

    db_cnx.collection('competence').deleteOne(currentCompetence, (err,response) => {
        if (err) throw err
        console.log('1 document deleted')
        res.json(response)
    })
})

module.exports = adminRoutes