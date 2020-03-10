import React, { useState } from 'react';
import axios from 'axios';
import { Card, List, Button} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ShoeComponent from '../app/example-app/components/ShoeComponent';


/*
    TODO:
        - add a button to go back to main shoe store page

*/


export default class CartPage extends React.Component {


    /* HELPER FUNCTIONS */

    // deletes item from cart
    deleteItem(event, shoe){

        var newShoeArr = [...this.state.shoes];
        var shoeToDelIndex = newShoeArr.indexOf(shoe);

        if (shoeToDelIndex != -1){
            newShoeArr.splice(shoeToDelIndex, 1);
            this.setState({shoes : newShoeArr});
        }

        /*
            TODO:
                - The delete API call will be made here to delete from database
        */

    }



    constructor(props){
        super(props);

        this.state = {
            shoes : []
        };

        this.deleteItem = this.deleteItem.bind(this);
    }

    // When this page loads, call populate our array of shoes
    componentDidMount() {

        var sids = [];
        var shoeArr = [];

        // populate sids
        axios.get('api/transaction/')
            .then(response => {

                response.data.forEach(shoe => {
                    if (shoe.sid !== null){
                        sids.push(shoe.sid);
                    }
                });

                sids.forEach(id => {

                    const paramObj = {sid : id};

                    axios.get('api/shoe/', { params : paramObj })
                        .then(response => {
                            shoeArr.push(response.data[0])
                            this.setState({shoes : shoeArr});
                        })

               });



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
                    title="My Cart"
                    headStyle={styles.cardHeadingStyle}
                    bordered={false}
                >
                    <List
                        style={styles.listStyle}
                        grid={{column : 1}}
                        dataSource={this.state.shoes}
                        renderItem={ shoe => {
                            return (
                                <List.Item>
                                    <div style={styles.listItemStyle}>
                                        <ShoeComponent
                                        name={shoe.name}
                                        price={shoe.price}
                                        brand={shoe.brand}
                                        size={shoe.size}
                                        imgSrc={shoe.image_url} />

                                        <Button
                                        type="primary"
                                        danger
                                        onClick={(event) => {this.deleteItem(event, shoe)}}
                                        style={{marginRight : "100px"}}>
                                        Remove from Cart</Button>
                                    </div>
                                </List.Item>
                            );
                        } }

                        rowKey= {item => {
                            return item.sid;
                        }}
                        
                        />

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

    cardHeadingStyle : {
        fontSize : 100
    },

    listItemStyle : {
        display: "flex",
        alignItems: 'center',
        justifyContent : 'space-between'
    }

};