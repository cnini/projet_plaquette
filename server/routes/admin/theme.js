const express = require('express')

const adminRoutes = express.Router()

const dbo = require('../../db/connection')

const ObjectId = require('mongodb').ObjectId

// Liste des thèmes
adminRoutes.route('/admin/theme').get( (req,res) => {
    let db_cnx = dbo.getDb('theme')

    db_cnx
        .collection('theme')
        .find({})
        .toArray( (err,result) => {
            if (err) throw err
            res.json(result)
        })
})

// Les informations d'un thème
adminRoutes.route('/admin/theme/:id').get( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentTheme = { _id: ObjectId(req.params.id) }
    
    db_cnx.collection('theme').findOne(currentTheme, (err,response) => {
        if (err) throw err
        console.log('1 document displayed')
        res.json(response)
    })
})

// Ajouter un thème
adminRoutes.route('/admin/theme/add').post( (req,res) => {
    let db_cnx = dbo.getDb()

    let newTheme = {
        theme_nom: req.body.theme_nom
    }

    db_cnx.collection('theme').insertOne(newTheme, (err,response) => {
        if (err) throw err
        console.log('1 document added')
        res.json(response)
    })

})

// Modifier un thème
adminRoutes.route('/admin/theme/update/:id').post( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentTheme = { _id: ObjectId(req.params.id) }

    let updatedTheme = {
        $set: {
            theme_nom: req.body.theme_nom
        }
    }

    db_cnx.collection('theme').updateOne(currentTheme,updatedTheme, (err,response) => {
        if (err) throw err
        console.log('1 document updated')
        res.json(response)
    })
    
})

// Supprimer un thème
adminRoutes.route('/admin/theme/delete/:id').delete( (req,res) => {
    let db_cnx = dbo.getDb()
    let currentTheme = { _id: ObjectId(req.params.id) }

    db_cnx.collection('theme').deleteOne(currentTheme, (err,response) => {
        if (err) throw err
        console.log('1 document deleted')
        res.json(response)
    })
})

module.exports = adminRoutes