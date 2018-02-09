import React from 'react';
import Griddle from 'griddle-react';

export default class Map extends React.Component {
	constructor(props){
		super(props)

		this.onClick = this.onClick.bind(this);
		this.state = (
			{
				cities: []
			}
		);
	}

	onClick(e){
			// let defined variables within the object's scope
			// lat and lon is splitting the world in half
			// lat is -90 degrees up and 90 down; -90 to 90
			// lon is 180 left and 180 right; 1 to 360
			// center of map is 0,0
			// multi-line variable declaration
			let img = e.target,
				point = {x:e.offsetX, y:e.offsetY}, // offsetX,Y are a css3 feature
				totalHorizontal = 360, //degrees;
				totalHeight = 180, // degrees
				latSize = img.height/totalHeight,
				lonSize = img.width/totalHorizontal,
				lat, lon,
				r = 1; //range of 1 degree


			// old school way of getting point without css3
			if(!point.x){
				point = {	x:e.pageX - e.target.offsetLeft,
									y:e.pageY - e.target.offsetTop};
			}

			// make image scale with lat/lon
			// get the y from the point
			// subtract out half the height to get the middle of image
			// divide by latSize

			lat = (point.y - (img.height/2)) / -latSize; 	// flip direction to make positive into neg, vice versa
			lon = (point.x - (img.width/2)) / lonSize;
			console.log(lat, lon);

			var ws = `http://api.geonames.org/citiesJSON?formatted=true&north=${lat+r}&south=${lat-r}&east=${lon+r}&west=${lon-r}&lang=en&username=geek&style=full`;

			console.log(ws);

			// web service GET request with native
			var xhr = new XMLHttpRequest();
					xhr.open('GET', ws);
					xhr.onload = () => {
						// 'this' of the onclick of map
						if(xhr.status === 200) {
							this.setState({
								cities: JSON.parse(xhr.responseText).geonames
							})
							console.log(xhr.responseText);
						}else{
							// ERROR
						}
					};
					xhr.send();
	}

	render() {
		return (
			<div>
				<img onClick={this.onClick} src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Earthmap1000x500compac.jpg" />

				{/* griddle builds in a grid for display*/}
				<Griddle results={this.state.cities}/>
			</div>
		)
	}
}
