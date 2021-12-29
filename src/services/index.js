import axios from 'axios'

let test = 'oj'

let Service = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
})    // variabla za komunikaciju s backend-om


let ActivityCards = {
    getAll() {
        return Service.get('/activities')
    }
}


let Activities = {
    getAll() {
        return Service.get('/activities')
    }
}

let Sessions = {
    getAll() {
        return Service.get('/sessions')
    }
}


export { test, Service, ActivityCards, Activities, Sessions }