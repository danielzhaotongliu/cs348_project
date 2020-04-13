import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, List, Button} from 'antd';
import ShoeComponent from './ShoeComponent';





class OrderHistoryComponent extends React.Component {

    // constructor
    constructor(props) {
        super(props);
        this.state = {
            // maps tids -> shoe objects
            orders : []
        }
    }

    // When this page loads, call populate our array of shoes
    componentDidMount() {

        // maps tid -> sid
        var idMap = new Map();
        // array of Objects(tid -> shoe objects)
        var newOrderArr = [];

        // populate sids
        axios.get('api/transaction/history', { params : {uid : this.props.uid} })
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
                            newOrderArr.push(objToPush);
                            this.setState({orders : newOrderArr});
                        })
                });
        });


    }


    // render
    render(){

        return (
            <div>
                <p style={{fontSize : 25}}>Order History</p>

                <List
                        style={styles.listStyle}
                        grid={{column : 1}}
                        dataSource={this.state.orders}
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
            </div>
        );
    }



}

const styles = {

    cardHeadingStyle : {
        fontSize : 35
    },

    listItemStyle : {
        display: "flex",
        alignItems: 'center',
        justifyContent : 'space-between'
    }
};

const mapStateToProps = (state) => {
    return {
      uid: state.customer.uid,
    };
  };


export default connect(mapStateToProps)(OrderHistoryComponent);