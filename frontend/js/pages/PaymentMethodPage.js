import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Carousel, Select} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

export default class PaymentMethodPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: "",
            cardType: "",
            existingPaymentMethods: []
        }
        console.log(this.props.location)
        this.cardNumberChange = this.cardNumberChange.bind(this);
        this.cardTypeChange = this.cardTypeChange.bind(this);
        this.addNewPaymentMethod = this.addNewPaymentMethod.bind(this);
    }

    componentDidMount(){
        
        axios.get('api/paymentmethod/')
            .then(response => {
                console.log(response.data);
                var address = this.props.location.data;
                response.data.forEach(function(obj,index) {
                    obj.address = address;
                });
                this.setState({existingPaymentMethods: response.data})
        });
    }

    cardNumberChange(event){
        this.setState({cardNumber: event.target.value})
    }

    cardTypeChange(value) {
        this.setState({cardType: value})
    }

    addNewPaymentMethod(){
        //TODO: when users are added uid
        var params = {uid: null, cardNumber: this.state.cardNumber, type: this.state.cardType, isDefault: false};
        console.log(params)
        axios.post('api/paymentmethod/', params)
            .then(response => {
                console.log(response);
                this.props.history.push({
                    pathname: '/reviewTransaction',
                    data: {address: this.props.location.data, paymentMethod: {cardNumber: this.state.cardNumber, cardType: this.state.cardType }}
                  })
        });
    }

    render(){
        var carouselItems = []
        if (this.state.existingPaymentMethods) {
            this.state.existingPaymentMethods.forEach(function(obj,index) {
                var lines = []
                lines.push(<h5> Card Number: </h5>)
                lines.push(<p> {obj.cardNumber}</p>)
                lines.push(<h5> Card Type: </h5>)
                lines.push(<p> {obj.type}</p>)
                lines.push(
                    <Link
                    to={{
                        pathname: "/reviewTransaction",
                        data: {address: obj.address, paymentMethod: {cardNumber: obj.cardNumber, cardType: obj.type }}
                      }}
                    > 
                    <Button type="primary" size="large"> Pay with this method</Button>
                    </Link>)
                carouselItems.push(<div style={{alignItems: 'center', borderRadius: '20px'}}> {lines} </div>)
            });
        }
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

                {this.state.existingPaymentMethods && this.state.existingPaymentMethods.length != 0 ?
                <Card
                title="Pay with existing methods"
                headStyle={styles.cardHeadingStyle}
                bordered={false}
                >
                <Carousel 
                style={styles.carouselStyle}
                >
                {carouselItems}
                </Carousel>
                </Card> : null}

                <Card 
                title="New payment method"
                headStyle={styles.cardHeadingStyle}
                bordered={false}
                >
                    <label>
                        Card Number:
                        <input style={styles.inputFieldStyle} onChange={this.cardNumberChange} type="text"/>
                    </label>
                    <br></br>
                    <label>
                        Card Type:
                    </label>
                    <br></br>
                    <Select defaultValue="" style={{ width: 150, marginBottom: 10 }} onChange={this.cardTypeChange}>
                    <Option value="VISA">VISA</Option>
                    <Option value="MASTERCARD">MASTERCARD</Option>
                    <Option value="AMEX">AMEX</Option>
                    </Select>
                    <br></br>
                    <Button
                    type="primary"
                    size="large"
                    onClick={this.addNewPaymentMethod}
                    >
                    Continue
                    </Button>
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
        height : 55,
        width : 125,
        display : 'flex',
        alignItems : 'center'

    },

    cardHeadingStyle : {
        fontSize : 35
    },

    cardStyle : {
        width : '150',
        padding : 50
        
    },

    inputFieldStyle : {
        width: "100%",
        clear: "both"
    },

    carouselStyle : {
        paddingTop: '25px',
        paddingLeft: '25px',
        paddingBottom: '25px',
        background: "#E8E8E8",
        borderRadius: '7px',
        overflow: "hidden"
    }
};