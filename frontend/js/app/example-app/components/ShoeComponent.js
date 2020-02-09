import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row, List } from "antd";
import "antd/dist/antd.css";




/* 
    TODO:
    - make page with a list of ShoeDisplay
    - install axios -- and make the above page make requests to retrieve data
*/

const ShoeComponent = (props) => {

    return (
        <div>
            <Col span={6}>
                <Card 
                    hoverable 
                    title={props.name} 
                    bordered={true} 
                    style={styles.cardStyle}
                    headStyle={{fontSize : 25}}
                    bodyStyle={{display:'flex'}}
                    >
                    <img alt="example" src="https://images-na.ssl-images-amazon.com/images/I/71WDF498N5L._AC_UX695_.jpg" style={styles.coverStyle}/>
                    <List bordered={false} style={styles.listStyle}>                        
                        <List.Item style={styles.listItemStyle}>{props.brand}</List.Item>
                        <List.Item style={styles.listItemStyle}>CDN$ {props.price}</List.Item>
                        <List.Item style={styles.listItemStyle}>Size: {props.size}</List.Item>
                    </List>
                </Card>
            </Col>        
        </div>
    );

};

const styles = {

    cardStyle : {
        width : '150',
        
    },
    coverStyle : {
        width : '50%',
    },
    listStyle : {
        paddingLeft : '20%'
    },
    listItemStyle : {
        fontSize : 20
    }

};


export default ShoeComponent;