import React from 'react';
import ShoeComponent from './ShoeComponent';
import { List, Input, Select } from 'antd';
import axios from 'axios'

const { Search } = Input;
const { Option } = Select;


/*
    TODO: 
    - Search functionality

*/

var searchBy = "brand";

function setSearchOption(value){
    searchBy = value;
    console.log(searchBy);
}

const searchOptions = (
    <Select defaultValue="Brand" style={{ width: 80 }} onChange={setSearchOption}>
        <Option value="brand">Brand</Option>
        <Option value="name">Name</Option>
        <Option value="size">Size</Option>
    </Select>
);


export default class ShoeListDisplay extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            shoeList : [],
            searching : false
        };

        this.searchHelper = this.searchHelper.bind(this);
    }

    // calls api to search with parameters
    async searchHelper(value) {

        this.setState({searching : true})

        var paramObj = {};

        switch(searchBy){
            case "brand":
                paramObj = {brand : value};
                break;
            case "size":
                paramObj = {size : value};
                break;
            case "name":
                paramObj = {name : value};
                break;
        };

        axios.get('api/shoe', { params : paramObj})
            .then(response => {
            const shoes = response.data;
            this.setState({ shoeList : shoes, searching : false });
        })
 
    }

    // When this page loads, call populate our array of shoes
    componentDidMount() {

        axios.get('api/shoe/')
            .then(response => {
            const shoes = response.data;
            this.setState({ shoeList : shoes });
        });

    }

    render() {

        return (
            <div style={styles.rootContainerStyle}>
                <div style={styles.containerStyle}>

                    <p style={styles.titleStyle}>Shoe Store</p>

                    {this.state.searching ?
                        <Search addonBefore={searchOptions} style={styles.searchboxStyle} size='large' placeholder="Search" loading onSearch={(value) => { this.searchHelper(value) }} />
                    : 
                        <Search addonBefore={searchOptions} style={styles.searchboxStyle} size='large' placeholder="Search" onSearch={(value) => { this.searchHelper(value) }} />
                    }
                    

                    <List
                        style={styles.listStyle}
                        size="large"
                        grid={{gutter: 16, column: 1}}
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
        width : 500,
        margin : 50
    }, 

    listStyle : {
        width : "60%"
    }

};