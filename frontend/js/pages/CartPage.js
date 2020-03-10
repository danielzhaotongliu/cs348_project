import React, { useState } from 'react';
import { Card, List, Button} from 'antd';
import ShoeComponent from '../app/example-app/components/ShoeComponent';
import axios from 'axios';

/*
    TODO:
        - add a button to go back to main shoe store page

*/


export default class CartPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            shoes : []
        };

        this.deleteItem = this.deleteItem.bind(this);
    }

    // When this page loads, call populate our array of shoes
    componentDidMount() {

        axios.get('api/shoe/')
            .then(response => {

                this.setState({ shoes : response.data });
        });

    }

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

    render(){
        return (
            <div style={styles.containerStyle}>
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

    cardHeadingStyle : {
        fontSize : 100
    },

    listItemStyle : {
        display: "flex",
        alignItems: 'center',
        justifyContent : 'space-between'
    }

};