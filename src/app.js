const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and view location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directories to serve
app.use(express.static(publicDirectoryPath))

app.get('' , (rep, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nikhil Naik'
    })
})

app.get('/about' , (rep, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nikhil Naik'
    })
})

app.get('/help' , (req, res) => {
    res.render('help', {
        message: 'Helping You Help yourself',
        title : 'help',
        name: 'Nikhil Naik'
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude , longitude , location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location,
                forecast: forecastdata,
                address: req.query.address
            })
        }) 
    })
    
   
})

app.get('/products' , (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a Search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
    
    
    
})

app.get('/help/*',(req,res) => {
    res.render('404' , {
        title: '404',
       errorMessage:  'Help Article Not found',
       name: 'Nikhil Naik'
    })
})

app.get('*' , (req, res) => {
    res.render('404' , {
        title: '404',
        errorMessage:  '404! Page Not Found',
        name: 'Nikhil Naik'
     })

})

app.listen(3000, () => {
    console.log('Server is UP on port 3000')
})