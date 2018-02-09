import React from "react";

export default class App extends React.Component {
	render() {
		var isSmart = this.props.smart? "He is smart" : "He is not smart";
		return (
			<div>
				<h1>{this.props.name}</h1>
				<p>He is at least {this.props.age} years old.</p>
				<p>{isSmart}</p>
			</div>

		)
	}
}