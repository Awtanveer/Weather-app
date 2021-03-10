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
		this.setState({dailytarr:["null","null","null","null","null","null","null"]});
		this.setState({dailywsarr:["null","null","null","null","null","null","null"]});
		this.setState({dailywdarr:["null","null","null","null","null","null","null"]});
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
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
		var url = "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly&appid=d6f78e072487f24bf48750fd7a0f66d2";
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
	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
					<div class={ style.city }>{ this.state.speed }</div>
					<div class={ style.city }>{ this.state.degree }</div>
					<div class={ style.city }>{this.degdirec(this.state.degree)}</div>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
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
	parseResponse2 = (parsed_json) => {
		var dailytemp = [];
		var dailyspeed = [];
		var dailydegree = [];
		
		for (let index = 0; index < 7; index++) {
			dailytemp.push(parsed_json['daily'][i]['temp']['day']);
			dailyspeed.push(parsed_json['daily'][i]['wind_speed']);
			dailydegree.push(parsed_json['daily'][i]['wind_degree']);
		}

		// set states for fields so they could be rendered later on
		this.setState({
			dailytarr : dailytemp,
			dailywsarr : dailyspeed,
			dailywdarr : dailydegree
		});      
	}
}
