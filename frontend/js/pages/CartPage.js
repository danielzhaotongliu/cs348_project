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
            // maps tids -> shoe objects
            transactions : []
        };

        this.deleteItem = this.deleteItem.bind(this);
    }

    // When this page loads, call populate our array of shoes
    componentDidMount() {

        // maps tid -> sid
        var idMap = new Map();
        // array of Objects(tid -> shoe objects)
        var newTransactionArr = [];

        // populate sids
        axios.get('api/transaction/')
            .then(response => {

                response.data.forEach(transaction => {
                    console.log(transaction.tid);
                    idMap.set(transaction.tid, transaction.sid);
                });

                idMap.forEach((shoeid, key, map) => {

                    const paramObj = {sid : shoeid};

                    axios.get('api/shoe/', { params : paramObj })
                        .then(response => {

                            var objToPush = {tid : key, shoe : response.data[0]};
                            newTransactionArr.push(objToPush);
                            this.setState({transactions : newTransactionArr});
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
                        dataSource={this.state.transactions}
                        renderItem={ transaction => {
                            return (
                                <List.Item>
                                    <div style={styles.listItemStyle}>
                                        <ShoeComponent
                                        name={transaction.shoe.name}
                                        price={transaction.shoe.price}
                                        brand={transaction.shoe.brand}
                                        size={transaction.shoe.size}
                                        imgSrc={transaction.shoe.image_url} />

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