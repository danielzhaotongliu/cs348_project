import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Carousel, Select, List} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ShoeComponent from '../app/example-app/components/ShoeComponent';

class ReviewTransactionPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            transactions : [],
            cartTotal: 0.00
        }
        console.log(this.props.location.data)
        this.updateSubTotal = this.updateSubTotal.bind(this);
        this.finalPurchase = this.finalPurchase.bind(this);
    }

    componentDidMount(){

        // maps tid -> sid
        var idMap = new Map();
        // array of Objects(tid -> shoe objects)
        var newTransactionArr = [];

        // populate sids
        axios.get('api/transaction/', { params : {uid : this.props.uid} })
            .then(response => {
                console.log(response)
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

    updateSubTotal(){
        console.log("update total")
        var total = 0;
        this.state.transactions.forEach(function (item, index) {
             total  += item.shoe.price;
          });
        total = (Math.round(total * 100) / 100).toFixed(2);
        this.setState({numberOfItems : this.state.transactions.length, cartTotal : total});
    }

    finalPurchase(){
        var params = {uid: this.props.uid, cardNumber: this.props.location.data.paymentMethod.cardNumber, cardType: this.props.location.data.paymentMethod.cardType, address: this.props.location.data.address};
        console.log(params)
        axios.post('api/transaction/purchase/', params)
            .then(response => {
                console.log(response);
                this.props.history.push({
                    pathname: '/reviewTransaction',
                    data: {address: this.props.location.data, paymentMethod: {cardNumber: this.state.cardNumber, cardType: this.state.cardType }}
                  })
        });
    }

    render(){
        var address = this.props.location.data.address.split("\n")
        var addressLines = [<h5> Shipping address </h5>]
        address.forEach(function(item,idx) {
            addressLines.push(<p> {item}</p>)
        });
        var cardLines = [];
        cardLines.push(<h5> Card Number: </h5>)
        cardLines.push(<p> {this.props.location.data.paymentMethod.cardNumber}</p>)
        cardLines.push(<h5> Card Type: </h5>)
        cardLines.push(<p> {this.props.location.data.paymentMethod.cardType}</p>)
        var addressCard = <div style={{float : 'left'}}> {addressLines} </div>;
        var paymentCard = <div style= {{float : 'left', marginLeft: 80}}> {cardLines} </div>

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
                title="Review order"
                bordered={false}
                headStyle={styles.cardHeadingStyle}
                >
                    {addressCard}
                    {paymentCard}
                    <div style={{background: "#E8E8E8", borderRadius: '7px', float: "left", marginLeft: 80, textAlign: "center", padding: 10}}>
                        <h5>Subtotal: {this.state.cartTotal}</h5>
                        <h5>Total: {(this.state.cartTotal*1.13).toFixed(2)}</h5>
                        <Button onClick={this.finalPurchase} type="primary">Place order </Button>
                    </div>
                </Card>

                <Card
                title="Items"
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
        height : 50,
        width : 125,
        display : 'flex',
        alignItems : 'center'

    },

    cardHeadingStyle : {
        fontSize : 40
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

export default connect(mapStateToProps)(ReviewTransactionPage);