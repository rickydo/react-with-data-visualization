import React from 'react';

export default class Map extends React.Component {

	onClick(e){
			// let defined variables within the object's scope
			let img = e.target,
				point = {x:e.offsetX, y:e.offsetY}; // offsetX,Y are a css3 feature

			// old school way of getting point without css3
			if(!point.x){
				point = {	x:e.pageX - e.target.offsetLeft,
									y:e.pageY - e.target.offsetTop};
			}
			console.log(point);
	}

	render() {
		return <img onClick={this.onClick} src="https://upload.wikimedia.org/wikipedia/commons/c/c4/Earthmap1000x500compac.jpg" />;
	}
}
