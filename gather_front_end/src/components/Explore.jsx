import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

let baseURL = ''

if(process.env.NODE_ENV === 'development') {
	baseURL = 'http://localhost:3003'
} else {
	baseURL = 'your heroku backend url here'
}



export default class Explore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            City: '',
            State: '',
            Activity: ''
        }
    }

    getCities() {
        axios.get(baseURL + '/cities')
        .then(data => {
            console.log(data)
            this.setState({ cities: data.data})
        })
    }

    // randomCities(cities) {
    //     let randomCity = cities[Math.floor(Math.random() * cities.length)];
    //     return randdomCity
    // }

    
    render() {
        return (
            <div>
                <h3>Gather Here: </h3>
                <h3>City: {this.state.City}</h3>
                <h3>State: {this.state.State}</h3>
                <h3>Activity: {this.state.Activity}</h3>
            </div>
        )
    }
};