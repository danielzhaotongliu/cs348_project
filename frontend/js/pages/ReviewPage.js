import React, { useState } from 'react';
import axios from 'axios';
import { Card, List, Button, TextArea, Form} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

export default class ReviewPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: 'Enter review',
            rating: 0,
            imageUrl : "https://www.famousfootwear.ca//productimages/shoes_ib709394.jpg?preset=results",
            shoeId : 1
            };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeRating = this.changeRating.bind(this);
    }


    componentDidMount(){

        if (this.props.location.state){
            console.log(this.props.location.state.shoeId);
            this.setState({shoeId : this.props.location.state.shoeId});
        }
        
        const paramObj = {sid : this.props.location.state.shoeId};

        // get this shoe's rating
        axios.get('api/review/' , {params : paramObj})
            .then(response => {
                var review = response.data[0];

                console.log(review);

                if (review){
                    this.setState({rating : review.rating});
                    this.setState({value : review.comment});
                }

        });

        // get this shoe's image
        axios.get('api/shoe/' , {params : paramObj})
            .then(response => {
                var shoe = response.data[0];

                this.setState({imageUrl : shoe.image_url})

        });

        
    }

    handleSubmit(event) {

        console.log("about to post for shoe with shoeID: " + this.state.shoeId);

        var params = {
            rating : this.state.rating,
            sid : this.state.shoeId,
            comment : this.state.value,
            uid : null
        };

        axios.post('api/review/', params)
        .then(response => {
            console.log(response);
        });
        
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    changeRating( newRating, name ) {
        console.log(newRating)
        this.setState({
          rating: newRating
        });
      }

    render(){
        return (
            <div style={styles.containerStyle}>

                <Link to="/store">
                    <Button
                        style={styles.backButtonStyle}
                        size="large"
                        >
                        <LeftOutlined />
                        To Store
                    </Button>
                </Link>

                <Card
                    title="Review Your Purchase"
                    headStyle={styles.cardHeadingStyle}
                    bordered={false}
                >
                <img alt="example" src={this.state.imageUrl} style={styles.imageStyle}/>
                <form onSubmit={this.handleSubmit} >
                    <StarRatings 
                        rating={this.state.rating}
                        starRatedColor="red"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name='rating'
                    />
                    <textarea value={this.state.value}  onChange={this.handleChange} style={styles.textAreaStyle}/>
                    <input type="submit" value="Submit" />
                </form>
                </Card>
            </div>
        );
    }

};

const styles = {

    containerStyle : {

    },

    backButtonStyle : {

        margin : 25,
        height : 75,
        width : 125,
        display : 'flex',
        alignItems : 'center'

    },

    textAreaStyle : {
        height: 200,
        width: 400
    },

    cardHeadingStyle : {
        fontSize : 100
    },

    cardStyle : {
        width : '150',
        padding : 50
        
    },

    listItemStyle : {
        display: "flex",
        alignItems: 'center',
        justifyContent : 'space-between'
    }

};