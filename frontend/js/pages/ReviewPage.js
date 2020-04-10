import React, { useState } from 'react';
import axios from 'axios';
import { Card, List, Button, TextArea, Form} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';


/* 
    TODO: 
        - implement a list in reviews
        - query Review table to get reviews to populate
*/

export default class ReviewPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value : 'Enter review',
            rating : 0,
            imageUrl : "https://www.famousfootwear.ca//productimages/shoes_ib709394.jpg?preset=results",
            shoeId : props.location.state.shoeId,
            reviews : []
            };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeRating = this.changeRating.bind(this);
    }


    componentDidMount(){

        console.log("Mounted with "+ this.state.shoeId);
        const paramObj = {sid : this.state.shoeId};

        // get this shoe's reviews
        axios.get('api/review/' , {params : paramObj})
            .then(response => {
                var reviews = response.data;

                console.log(reviews);

                if(reviews.length > 0){
                    // need to calculate average
                    var total = 0;
                    var x;
                    for(x in reviews){
                        total += reviews[x].rating;
                    }
                    var average = total / reviews.length;

                    this.setState({rating : average, reviews : reviews});

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

        event.preventDefault();

        console.log("about to post for shoe with shoeID: " + this.state.shoeId);

        var params = {
            rating : this.state.rating,
            sid : this.state.shoeId,
            comment : this.state.value,
            uid : null  // TODO: Update this when we have users
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

                <div>

                        <div>
                            <p style={styles.reviewsTitleStyle}>Reviews</p>
                        </div>

                        <List
                                // style={styles.listStyle}
                                // size="large"
                                grid={{column: 1}}
                                dataSource={this.state.reviews}
                                renderItem={ item => {
                                    return (
                                        <List.Item style={{padding : 20}}>
                                            <div style={{padding: 20}}>
                                                <StarRatings
                                                    rating={item.rating}
                                                    starRatedColor="red"
                                                    numberOfStars={5}
                                                    name='rating'
                                                />
                                            </div>
                                            <p style={styles.reviewsTextStyle}>{item.comment}</p>
                                        </List.Item>
                                    );
                                } }
                                rowKey={review => {return review.id;}}
                        />

                </div>


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
    },

    reviewsTitleStyle : {
        marginTop : 70,
        marginLeft : 50,
        marginBottom : 30,
        fontSize : 45
    },

    reviewsTextStyle : {
        padding: 20,
        marginLeft: 30,
        fontSize : 20
    }

};