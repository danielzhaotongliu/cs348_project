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


const searchOptions = (
    <Select defaultValue="Brand" style={{ width: 80 }}>
        <Option value="Brand">Brand</Option>
        <Option value="Name">Name</Option>
        <Option value="Size">Size</Option>
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
        console.log(value);

        this.setState({searching : true})

        axios.get('api/shoe', { params : {brand : value}})
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
        })

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
        width : 500,
        margin : 50
    }, 

    listItemStyle : {
        padding : 20,
        margin : 10
    }

};