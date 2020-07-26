const request = require('request')

const forecast = (latitude , longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6555ea698084b0e3ea67dbc49421fefd&query='+ latitude + ',' + longitude +'&units=m'
    
    request({url , json: true} , (error , {body} = {}) => {
        if(error){
            callback('No Access to Weather Api', undefined)
        }else if(body.error){
            callback('Cannot find location', undefined)
        }else{
            const currentTemp = body.current.temperature
            const feelsLike = body.current.feelslike
            callback(undefined, body.current.weather_descriptions[0] + ' it is currently ' + currentTemp + ' But it feels like ' + feelsLike)
        }
    })
}

module.exports = forecast