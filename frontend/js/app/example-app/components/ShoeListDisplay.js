import React from 'react';
import ShoeComponent from './ShoeComponent';
import { List, Input } from 'antd';

const { Search } = Input


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


export default class ShoeListDisplay extends React.Component {


    render() {

        return (
            <div style={styles.rootContainerStyle}>
                <div style={styles.containerStyle}>    
                    <p style={styles.titleStyle}>Shoe Store</p>

                    <Search style={styles.searchboxStyle} size='large' placeholder="Search store" onSearch={(value) => console.log(value)} />

                    <List
                        grid={{column: 2 }}>

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

    }

};

const styles = {

    rootContainerStyle : {
        display : 'flex',
        justifyContent : 'center'
    },

    containerStyle : {
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center'
    },

    titleStyle : {
        fontSize : 100, 
        textAlign : 'center'
    },

    searchboxStyle : {
        width : 500
    }, 

    listItemStyle : {
        padding : 20,
        margin : 10
    }

};