import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
    state = {
        city: "",
        humidity: "",
        pressure: "",
        temp: "",
        temp_max: "",
        temp_min: "",
        showData: false,
        error: false,
        message: ""
    };
    handleInputChange = e => {
        const city = e.target.value;
        this.setState({
            city
        });
    };
    handleWeatherData = e => {
        e.preventDefault();
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                    this.state.city
                }&appid=b09d20d51e53671bd6231a53a0d23a0d`
            )
            .then(res => {
                const data = res.data.main;
                this.setState({
                    humidity: data.humidity,
                    pressure: data.pressure,
                    temp: data.temp,
                    temp_max: data.temp_max,
                    temp_min: data.temp_min,
                    showData: true
                });
            })
            .catch(error => {
                console.log("Error getting data: ", error.response);
                this.setState({
                    error: true,
                    message: error.response.data.message,
                    showData: false
                });
            });
    };
    render() {
        const {
            humidity,
            pressure,
            temp,
            temp_max,
            temp_min,
            showData,
            error,
            message
        } = this.state;
        return (
            <div>
                <form action="">
                    <input type="text" value={this.state.city} onChange={this.handleInputChange} />
                    <button onClick={this.handleWeatherData}>Get Weather Data</button>
                </form>
                {showData && (
                    <table>
                        <thead>
                            <tr>
                                <th>Pressure</th>
                                <th>Humidity</th>
                                <th>Temperature</th>
                                <th>Maximum Temperature</th>
                                <th>Minimum Temperature</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{pressure}</td>
                                <td>{humidity}</td>
                                <td>{temp}</td>
                                <td>{temp_max}</td>
                                <td>{temp_min}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
                {error && <h4>{message}</h4>}
            </div>
        );
    }
}
