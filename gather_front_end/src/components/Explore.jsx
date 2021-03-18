import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


export default class Explore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            someRandomCity: '',
        }
    }


    componentDidMount(){
        this.randomCities(this.props.cities)
        
    }

    randomCities(cities) {
        console.log(cities)
        let randomCity = cities[Math.floor(Math.random() * cities.length)];
        console.log(randomCity)
        this.setState({
            someRandomCity: randomCity
        })
    }

    
    
    render() {
        return (
            <div>
                <h3>Gather Here: </h3>
                <p>City: {this.state.someRandomCity.City} </p> 
                <p>State: {this.state.someRandomCity.State} </p>
                <p>Activity: {this.state.someRandomCity.Activity} </p>

            </div>
        )
    }
};