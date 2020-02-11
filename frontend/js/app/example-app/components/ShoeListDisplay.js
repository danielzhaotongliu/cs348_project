import React from 'react';
import ShoeComponent from './ShoeComponent';
import { List, Input } from 'antd';
import axios from 'axios'

const { Search } = Input


/*
    TODO: 
    - Search functionality

*/



export default class ShoeListDisplay extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            shoeList : []
        };
    }

    // When this page loads, call populate our array of shoes
    componentDidMount() {

        axios.get('api/shoe/')
            .then(response => {
            const shoes = response.data;
            this.setState({ shoeList : shoes });
        })

    }

    render() {

        console.log(this.state.shoeList);

        return (
            <div style={styles.rootContainerStyle}>
                <div style={styles.containerStyle}>

                    <p style={styles.titleStyle}>Shoe Store</p>

                    <Search style={styles.searchboxStyle} size='large' placeholder="Search store" onSearch={(value) => { console.log(value); }} />

                    <List
                        grid={{column: 2 }}
                        dataSource={this.state.shoeList}
                        renderItem={ item => {

                            return (
                                <List.Item>
                                    <ShoeComponent name={item.name} price={item.price} brand={item.brand} size={item.size} imgSrc={item.image_url}/>
                                </List.Item>
                            );

                        } } />

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