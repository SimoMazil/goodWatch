import React, { Component } from 'react'

class Details extends Component {
  componentWillMount(props) {
    console.log(this.props);
  }

  render() {
    return (
      <h1>Details</h1>
    );
  }
}

export default Details;
