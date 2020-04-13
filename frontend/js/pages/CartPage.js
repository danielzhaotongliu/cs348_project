import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, List, Button} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ShoeComponent from '../app/example-app/components/ShoeComponent';
import LoginStatusComponent from '../app/example-app/components/LoginStatusComponent';


class CartPage extends React.Component {


    /* HELPER FUNCTIONS */

    // deletes item from cart
    deleteItem(event, tidToDel){

        var newTransactions = [...this.state.transactions];

        const findDelIndex = (transaction) => transaction.tid == tidToDel;
        var indexToDel = newTransactions.findIndex(findDelIndex);

        // found a valid index
        if (indexToDel >= 0){
            newTransactions.splice(indexToDel, 1);
        }

        this.setState({transactions : newTransactions},this.updateSubTotal);

        axios.delete("api/transaction/" + tidToDel)
            .then(response => {
                console.log(response);
            })
        // this.updateSubTotal()
    }

    updateSubTotal(){
        console.log("update total")
        var total = 0;
        this.state.transactions.forEach(function (item, index) {
             total  += item.shoe.price;
          });
        total = (Math.round(total * 100) / 100).toFixed(2);
        console.log(total)
        console.log(this.state.transactions)
        this.setState({numberOfItems : this.state.transactions.length, cartTotal : total});
    }

    constructor(props){
        super(props);

        this.state = {
            // maps tids -> shoe objects
            transactions : [],
            cartTotal: 0.00,
            numberOfItems: 0
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.updateSubTotal = this.updateSubTotal.bind(this);
    }

    // When this page loads, call populate our array of shoes
    componentDidMount() {

        // maps tid -> sid
        var idMap = new Map();
        // array of Objects(tid -> shoe objects)
        var newTransactionArr = [];

        // populate sids
        // TODO: This is wrong. we need to get transactions with no date
        axios.get('api/transaction/cart', { params : {uid : this.props.uid} })
            .then(response => {

                response.data.forEach(transaction => {
                    idMap.set(transaction.tid, transaction.sid);
                });

                idMap.forEach((shoeid, key, map) => {

                    const paramObj = {sid : shoeid};

                    axios.get('api/shoe/', { params : paramObj })
                        .then(response => {

                            var objToPush = {tid : key, shoe : response.data[0]};
                            console.log("here")
                            console.log(objToPush)
                            newTransactionArr.push(objToPush);
                            this.setState({transactions : newTransactionArr});
                            this.updateSubTotal();
                        })
                });
        });
    }

    render(){
        return (
            <div style={styles.containerStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to="/store">
                        <Button
                            style={styles.backButtonStyle}
                            size="large"
                            >
                            <LeftOutlined />
                            Store
                        </Button>
                    </Link>
                    <LoginStatusComponent />
                </div>

                <Card
                    title="My Cart"
                    headStyle={styles.cardHeadingStyle}
                    bordered={false}
                >   
                    {this.state.numberOfItems && this.state.numberOfItems != 0 ?
                    <Card
                    >   
                        <h1>Subtotal ({this.state.numberOfItems} item(s)): ${this.state.cartTotal}</h1>
                        <Link to="/selectAddress">
                            <Button
                            type="primary"
                            size="large"
                            style={{width : "150px"}}
                            >
                            Checkout
                            </Button>
                        </Link>
                    </Card>
                    : null}
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
                                        onClick={(event) => {this.deleteItem(event, transaction.tid)}}
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
        fontSize : 35
    },

    listItemStyle : {
        display: "flex",
        width: "80%",
        alignItems: 'center',
        justifyContent : 'space-between'
    }
};

const mapStateToProps = (state) => {
    return {
      uid: state.customer.uid,
    };
};

export default connect(mapStateToProps)(CartPage);