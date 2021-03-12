// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		this.setState({dailyTArr:["null","null","null","null","null","null","null"]});
		this.setState({dailyWSArr:["null","null","null","null","null","null","null"]});
		this.setState({dailyWDArr:["null","null","null","null","null","null","null"]});
		this.setState({dailyIArr:["null","null","null","null","null","null","null"]});
		this.setState({future: false});
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		this.setState({future:true});
		this.fetchWeatherData2();
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=d6f78e072487f24bf48750fd7a0f66d2";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	//a call to fetch future weather data
	fetchWeatherData2 = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly&units=metric&appid=d6f78e072487f24bf48750fd7a0f66d2";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse2,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	//Calculates direction from degree obtained via api
	//needs bounds to be fixed
	degdirec = (degree) => {
		if(degree<22.5 && degree>337.5){
			return "N";
		}
		else if(degree>=22.5 && degree<67.5){
			return "NE"
		}
		else if(degree>67.5 && degree<112.5){
			return "E"
		}
		else if(degree>=112.5 && degree<157.5){
			return "SE"
		}
		else if(degree>157.5 && degree<202.5){
			return "S"
		}
		else if(degree>=202.5 && degree<247.5){
			return "SW"
		}
		else if(degree>247.5 && degree<292.5){
			return "W"
		}
		else if(degree>=292.5 && degree<337.5){
			return "NW"
		}
		
	}

	degdirec2 = (dailyWDArr) => {
		if(dailyWDArr<22.5 && dailyWDArr>337.5){
			return "N";
		}
		else if(dailyWDArr>=22.5 && dailyWDArr<67.5){
			return "NE"
		}
		else if(dailyWDArr>67.5 && dailyWDArr<112.5){
			return "E"
		}
		else if(dailyWDArr>=112.5 && dailyWDArr<157.5){
			return "SE"
		}
		else if(dailyWDArr>157.5 && dailyWDArr<202.5){
			return "S"
		}
		else if(dailyWDArr>=202.5 && dailyWDArr<247.5){
			return "SW"
		}
		else if(dailyWDArr>247.5 && dailyWDArr<292.5){
			return "W"
		}
		else if(dailyWDArr>=292.5 && dailyWDArr<337.5){
			return "NW"
		}
		
	}

	//creates table for weather in upcoming days
	ShowFuture = () => {
		return(
			<div>
			
				<table>
					<tr>
						<td>
							Day
						</td>
						<td>
							Temperature
						</td>
						<td>
							
						</td>
						<td>
							Wind Speed
						</td>
						<td>
							Wind Direction
						</td>
					</tr>
					<tr>
						<td>
							Day 1
						</td>
						<td>
							{this.state.dailyTArr[1]}
						</td>
						<td>
							<img src = {this.state.dailyIArr[1]}/>
						</td>
						<td>
							{this.state.dailyWSArr[1]}m/s
							
						</td>
						<td>
							{this.degdirec2(this.state.dailyWDArr[1])}
						</td>
					</tr>
					<tr>
						<td>
							Day 2
						</td>
						<td>
							{this.state.dailyTArr[2]}
						</td>
						<td>
							<img src = {this.state.dailyIArr[2]}> </img>
						</td>
						<td>
							{this.state.dailyWSArr[2]}
						</td>
						<td>
							{this.degdirec2(this.state.dailyWDArr[2])}
						</td>
					</tr>
					<tr>
						<td>
							Day 3
						</td>
						<td>
							{this.state.dailyTArr[3]}
						</td>
						<td>
							<img src = {this.state.dailyIArr[3]}/>
						</td>
						<td>
							{this.state.dailyWSArr[3]}
						</td>
						<td>
							{this.degdirec2(this.state.dailyWDArr[3])}
						</td>
					</tr>
					<tr>
						<td>
							Day 4
						</td>
						<td>
							{this.state.dailyTArr[4]}
						</td>
						<td>
							<img src = {this.state.dailyIArr[4]}/>		
						</td>
						<td>
							{this.state.dailyWSArr[4]}
						</td>
						<td>
							{this.degdirec2(this.state.dailyWDArr[4])}
						</td>
					</tr>
					<tr>
						<td>
							Day 5
						</td>
						<td>
							{this.state.dailyTArr[5]}
						</td>
						<td>
							<img src = {this.state.dailyIArr[5]}/>
						</td>
						<td>
							{this.state.dailyWSArr[5]}
						</td>
						<td>
							{this.degdirec2(this.state.dailyWDArr[5])}
						</td>
					</tr>
				</table>
			</div>
		);
	}
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		const futuretable = this.ShowFuture();
		var iconLink = this.state.dailyIArr[0];
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div>{this.state.display ? null:<img src={iconLink}></img>}</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<div class={ style.city }>{ this.state.speed }</div>
					<div class={ style.city }>{this.degdirec(this.state.degree)}</div>
				</div>
				<div class={ style.details }></div>
				<div>
					{this.state.future? futuretable:null}
				</div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
				
			</div>
			//function below shows actual degree. 
			//<div class={ style.city }>{ this.state.degree }</div> 
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = parsed_json['main']['temp'];
		var conditions = parsed_json['weather']['0']['description'];
		var windspeed = parsed_json['wind']['speed'];
		var winddeg = parsed_json['wind']['deg'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			speed : windspeed,
			degree : winddeg
		});      
	}

	//gets future data from another api different to api fetching current data
	parseResponse2 = (parsed_json) => {
		var dailyTemp = [];
		var dailySpeed = [];
		var dailyDegree = [];
		var dailyIcon = [];
		var dailyIconLink=[];
		
		for (let i = 0; i < 7; i++) {
			dailyTemp.push(parsed_json['daily'][i]['temp']['day']);
			dailySpeed.push(parsed_json['daily'][i]['wind_speed']);
		 	dailyDegree.push(parsed_json['daily'][i]['wind_deg']);
			dailyIcon.push(parsed_json['daily'][i]['weather']['0']['icon']);
			dailyIconLink.push("http://openweathermap.org/img/wn/"+dailyIcon[i]+"@2x.png");
		}

		// set states for fields so they could be rendered later on
		this.setState({
			dailyTArr : dailyTemp,
			dailyWSArr : dailySpeed,
			dailyWDArr : dailyDegree,
			dailyIArr :  dailyIconLink,

		});      
	}
}
