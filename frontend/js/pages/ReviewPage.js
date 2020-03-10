import React, { useState } from 'react';
import axios from 'axios';
import { Card, List, Button, TextArea, Form} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

export default class ReviewPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {value: 'Review goes here', rating: 0};
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeRating = this.changeRating.bind(this);
    }

    handleSubmit(event) {
        alert('A Review was submitted: ' + this.state.value + this.state.rating);

        //TODO: make api call
        event.preventDefault();
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
                <img alt="example" src={tempImageUrl} style={styles.imageStyle}/>
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

const tempImageUrl = "https://www.famousfootwear.ca//productimages/shoes_ib709394.jpg?preset=results"

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