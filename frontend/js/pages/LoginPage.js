import React, { useState } from 'react';
import axios from 'axios';

// TODO:
// - login form
// - passing token to global state
// - redirect to login when token expired (server returns 401 error). This shouldn't be a problem because I set token expiration to 30 minutes
// - logout page

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: ''
        };
        
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // get this shoe's rating
        // axios.get('api/review/' , {params : paramObj})
        //     .then(response => {
        //         var review = response.data[0];

        //         console.log(review);

        //         if (review){
        //             this.setState({rating : review.rating});
        //             this.setState({value : review.comment});
        //         }

        // });
    }

    render() {
      return (
        <div>
          <h2>Login page</h2>
        </div>
      )
    }
};
