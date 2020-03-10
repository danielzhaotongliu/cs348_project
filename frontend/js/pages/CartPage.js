import React, { useState } from 'react';
import { Card, List, Button} from 'antd';
import ShoeComponent from '../app/example-app/components/ShoeComponent';
import axios from 'axios';




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

    // deletes item from list
    deleteItem(event, item){

        var newShoeArr = [...this.state.shoes];
        var shoeToDelIndex = newShoeArr.indexOf(item);

        if (shoeToDelIndex != -1){
            newShoeArr.splice(shoeToDelIndex, 1);
            this.setState({shoes : newShoeArr});
        }

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
                        renderItem={ item => {
                            return (
                                <List.Item>
                                    <div style={styles.listItemStyle}>
                                        <ShoeComponent name={item.name} price={item.price} brand={item.brand} size={item.size} imgSrc={item.image_url} />
                                        <Button type="primary" danger onClick={(event) => {this.deleteItem(event, item)}}>Remove from Cart</Button>
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
        width : '1250px',
        alignItems: 'center',
        justifyContent : 'space-between'
    }

};