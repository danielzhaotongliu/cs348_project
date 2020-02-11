import React from 'react';
import ShoeComponent from './ShoeComponent';
import { List } from 'antd';


/*
    TODO: 
    - Add a search box to this
    - Have a List of ShoeComponents instead of one
    - Install axios
    - Fix up workflow of the app
        - first, axios calls the api to populate a data array
        - then in render Item, we get the data from an array into the component
        - question: how do we now to stop iterating --> pop from array? 
*/


const ShoeListDisplay = (props) => {

    return (
        <div style={styles.rootContainerStyle}>
            <div style={styles.containerStyle}>    
                <p style={{fontSize : 100, textAlign : 'center'}}>Shoe Store</p>

                <List
                    grid={{column: 2 }}
                >
                    <List.Item style={styles.listItemStyle}><ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/></List.Item>
                    <List.Item style={styles.listItemStyle}><ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/></List.Item>
                    <List.Item style={styles.listItemStyle}><ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/></List.Item>
                    <List.Item style={styles.listItemStyle}><ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/></List.Item>
                    <List.Item style={styles.listItemStyle}><ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/></List.Item>
                    <List.Item style={styles.listItemStyle}><ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/></List.Item>
                    <List.Item style={styles.listItemStyle}><ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/></List.Item>
                    <List.Item style={styles.listItemStyle}><ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/></List.Item>

                </List>

            </div>
        </div>
    );

};

const styles = {

    rootContainerStyle : {
        display : 'flex',
        justifyContent : 'center'
    },

    containerStyle : {
        display : 'flex',
        flexDirection : 'column'
    },

    listItemStyle : {
        padding : 20,
        margin : 10
    }

};


export default ShoeListDisplay