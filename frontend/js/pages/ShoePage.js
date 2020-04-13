import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Badge } from 'antd';
import { LeftOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import StarRatings from 'react-star-ratings';
import ShoeComponent from '../app/example-app/components/ShoeComponent';
import LoginStatusComponent from '../app/example-app/components/LoginStatusComponent';

class ShoePage extends React.Component {

    /* HELPER FUNCTIONS */

    // adds a shoe to the cart and transaction table
    async addToCart(){

        // only add to the cart (and transaction) if the uid is not null
        if (this.props.uid){
            var params = {sid : shoe.sid, uid : this.props.uid};
            axios.post('api/transaction/', params);

            var newCartCount = this.state.cartCount + 1;
            this.setState({cartCount : newCartCount});

        }

    }

    // When this page loads
    componentDidMount() {

        var paramObj = {sid : this.state.shoeId};

        if (this.props.sid){
            paramObj.sid = this.props.sid;
        }

        // populate shoe
        axios.get('api/shoe/', { params : paramObj} )
            .then(response => {
                const shoes = response.data;
                this.setState({shoeId : shoes[0].sid, shoe: shoes[0]});
        });


        // get cart count
        axios.get('api/transaction/cart', { params : {uid : this.props.uid} })
            .then(response => {
                const transactions = response.data; // array
                this.setState({cartCount : transactions.length})
        });
   

        // populate rating
        axios.get('api/review/', {params : paramObj})
            .then(response => {
                const reviews = response.data; // array

                var total = 0;
                var count = 0;
                var i;
                for(i in reviews){
                    total += reviews[i].rating;
                    count += 1;
                }

                var average = 0; 

                if (count > 0){
                    average = total / count;
                }



                console.log("average: " + average);
                this.setState({rating : average});

        });


    }

    constructor(props){
        super(props);
        this.state = {
            shoeId : props.location.state.shoeId,
            shoe : {},
            cartCount : 0,
            rating : 0
        };

        console.log("State in constructor: " + this.state);

    }

    render() {
        return (
        <div style={styles.rootContainerStyle}>
            
            <div style={{display : 'flex', justifyContent : 'space-between'}}>
                <Link to="/store">
                        <Button
                            style={styles.backButtonStyle}
                            size="large"
                            >
                            <LeftOutlined />
                            Store
                        </Button>
                </Link>

                <div style={{padding : 20, marginRight : 25, display : 'flex'}}>
                    <Link to="/cart">
                        <Badge count={this.state.cartCount} showZero>
                            <ShoppingCartOutlined style={{fontSize  : 100}}/>
                        </Badge>
                    </Link>

                    <Link to="/user">
                        <UserOutlined style={{fontSize  : 100, marginLeft: 30}}/>
                    </Link>
                    <div style={{marginLeft : 10}}>
                                <LoginStatusComponent />
                    </div>
                </div>
            </div>

            <div style={styles.innerContainerStyle}>

                <div style={styles.shoeContainerStyle}>
                    <ShoeComponent 
                    name={this.state.shoe.name}
                    price={this.state.shoe.price}
                    brand={this.state.shoe.brand}
                    size={this.state.shoe.size}
                    imgSrc={this.state.shoe.image_url}/>

                </div>

                <div style={styles.functionStyle}>
                    <div style={{
                        display : 'flex',
                        flexDirection : 'column'
                    }}>
                        <StarRatings 
                        rating={this.state.rating}
                        starRatedColor="red"
                        numberOfStars={5}
                        name='rating'
                        />

                        <Link
                        to={{
                            pathname : '/review',
                            state : {
                                shoeId : this.state.shoeId
                            }
                        }}
                        style={{display : 'flex', justifyContent : 'center'}}>
                            <Button style={{margin : 30}}>Add Review</Button>
                        </Link>
                    </div>

                    <Button
                    style={{margin : 20}}
                    type='primary'
                    onClick={() => {this.addToCart();}}>
                        Add to cart
                    </Button>
                </div>

            </div>

        </div>
        );
    }
}


const styles = {

    rootContainerStyle : {
        display : 'flex',
        flexDirection : 'column'
    },

    innerContainerStyle : {        
        display : 'flex',
        
    },

    backButtonStyle : {

        margin : 25,
        height : 75,
        width : 110,
        display : 'flex',
        alignItems : 'center'

    },

    shoeContainerStyle : {
        width : '50%',
        flex : 1
    },

    functionStyle : {
        display : 'flex',
        flexDirection : 'column',
        flex : 1,
        justifyContent : 'space-around',
        alignItems : 'center'
    }

};

const mapStateToProps = (state) => {
    return {
      uid: state.customer.uid,
    };
};

export default connect(mapStateToProps)(ShoePage);