import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button, Carousel} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default class ShippingAddressPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            addressline1: "",
            addressline2: "",
            city: "",
            state: "",
            zip: "",
            country: ""
        }
        this.addressFieldsChanged = this.addressFieldsChanged.bind(this);
        this.addNewAddress = this.addNewAddress.bind(this);
    }

    componentDidMount(){
        axios.get('api/addressbook/')
            .then(response => {
                console.log(response.data);
                var address = []
                response.data.forEach(function (item, index) {
                    address.push(item.address)
                });
                console.log(address)
                this.setState({existingAddresses: address})
        });
    }

    addressFieldsChanged(event){
        switch (event.target.name) {
            case "addressline1":
                this.setState({addressline1: event.target.value})
                break;
            case "addressline2":
                this.setState({addressline2: event.target.value})
                break;
            case "prov":
                this.setState({prov: event.target.value})
                break;
            case "city":
                this.setState({city: event.target.value})
                break;
            case "zip":
                this.setState({zip: event.target.value})
                break;
            case "country": 
                this.setState({country: event.target.value})
                break;
        }
    }

    addNewAddress(){
        var address = this.state.addressline1 + "\n" + this.state.addressline2 + "\n" + this.state.city + "\n" + this.state.prov + "\n" + this.state.zip + "\n" + this.state.country
        console.log(address);
        //TODO: when users are added uid
        var params = {uid: null, address: address, isDefault: false};
        axios.post('api/addressbook/', params)
            .then(response => {
                console.log(response);
                this.props.history.push({
                    pathname: '/selectPayment',
                    data: address // your data array of objects
                  })
        });
    }

    render(){
        var carouselItems = []
        if (this.state.existingAddresses) {
            this.state.existingAddresses.forEach(function(address,index) {
                var v = address.split('\n');
                var lines = [<h5> Address </h5>]
                v.forEach(function(item,idx) {
                    lines.push(<p> {item}</p>)
                });
                lines.push(
                <Link
                to={{
                    pathname: "/selectPayment",
                    data: address
                  }}
                > 
                <Button type="primary" size="large"> Ship to this Address</Button> 
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

                {this.state.existingAddresses && this.state.existingAddresses.length != 0 ?
                <Card
                title="Ship to existing Address"
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
                title="Ship to new Address"
                headStyle={styles.cardHeadingStyle}
                bordered={false}
                >
                    <form>
                    <label>
                        Address Line 1:
                        <input name="addressline1" style={styles.inputFieldStyle} onChange={this.addressFieldsChanged} type="text"/>
                    </label>
                    <br></br>
                    <label>
                        Address Line 2:
                        <input name="addressline2" onChange={this.addressFieldsChanged} style={styles.inputFieldStyle} type="text"/>
                    </label>
                    <br></br>
                    <label>
                        City:
                        <input  name="city" onChange={this.addressFieldsChanged}  style={styles.inputFieldStyle} type="text"/>
                    </label>
                    <br></br>
                    <label>
                        State/Province:
                        <input name= "prov" onChange={this.addressFieldsChanged}  style={styles.inputFieldStyle} type="text"/>
                    </label>
                    <br></br>
                    <label>
                        Zip:
                        <input name= "zip" onChange={this.addressFieldsChanged} style={styles.inputFieldStyle} type="text"/>
                    </label>
                    <br></br>
                    <label>
                        Country:
                        <input name = "country" onChange={this.addressFieldsChanged} style={styles.inputFieldStyle} type="text"/>
                    </label>
                    </form>
                    <Button
                    type="primary"
                    size="large"
                    onClick={this.addNewAddress}
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