import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import ShoeComponent from '../app/example-app/components/ShoeComponent';


/* 
    TODO:
        - Add 'Back to store' button with functionality
        - Add functionality to query the database to pull out a shoe
        - Add the cart to the page with correct items
        - Add 'add to cart' functionality
        - Add 'add review' functionality
        - Show review ratings

        - show laoding spinner (maybe)
*/

export default class ShoePage extends React.Component {

    /* HELPER FUNCTIONS */

    // adds a shoe to the cart and transaction table
    async addToCart(){

        console.log("About to add shoe with sid: " + this.state.shoeId);

        var params = {sid : this.state.shoeId};
        axios.post('api/transaction/', params);

    }

    // When this page loads
    componentDidMount() {

        var paramObj = {sid : 1};

        if (this.props.sid){
            paramObj.sid = this.props.sid;
        }

        // populate shoe
        axios.get('api/shoe/', { params : paramObj} )
            .then(response => {

                const shoes = response.data;

                this.setState({shoeId : shoes[0].sid, shoe: shoes[0]});
        });

    }

    constructor(props){
        super(props);
        this.state = {
            shoeId : 2,
            shoe : {}
        };

    }

    render() {
        return (
        <div style={styles.rootContainerStyle}>
            
            <Link to="/store">
                    <Button
                        style={styles.backButtonStyle}
                        size="large"
                        >
                        <LeftOutlined />
                        Store
                    </Button>
            </Link>

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
                        <p>RATING GOES HERE</p>
                        <p>ADD REVIEW GOES HERE</p>
                    </div>

                    <Button
                    style={{margin : 20}}
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
        width : 125,
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

}