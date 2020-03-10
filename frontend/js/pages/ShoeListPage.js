import React from 'react';
import { List, Input, Select, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios'
import { Link } from 'react-router-dom';
import ShoeComponent from '../app/example-app/components/ShoeComponent';

const { Search } = Input;
const { Option } = Select;


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


export default class ShoeListPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            shoeList : [],
            searching : false,
            cart : []
        };

        this.searchHelper = this.searchHelper.bind(this);
        this.addToCart = this.addToCart.bind(this);
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
            console.log(shoes);
            this.setState({ shoeList : shoes, searching : false });
        })
 
    }

    // adds a shoe to the cart and transaction table
    async addToCart(shoe){
        console.log("Addeding shoe with id: " + shoe.sid);

        // returns new array
        var newCart = this.state.cart.concat(shoe);

        this.setState({cart : newCart});


        /* 
            TODO: 
                - Make API call to transaction table here
        
        */

    }

    // When this page loads, call to populate our array of shoes
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

                    <div style={{marginTop : 50}}>

                        <Link to="/cart">
                            <Badge count={this.state.cart.length} showZero>
                                <ShoppingCartOutlined style={{fontSize  : 100}}/>
                            </Badge>
                        </Link>


                    </div>

                    <p style={styles.titleStyle}>Shoe Store</p>

                    {this.state.searching ?
                        <Search addonBefore={searchOptions} style={styles.searchboxStyle} size='large' placeholder="Search" loading onSearch={(value) => { this.searchHelper(value) }} />
                    : 
                        <Search addonBefore={searchOptions} style={styles.searchboxStyle} size='large' placeholder="Search" onSearch={(value) => { this.searchHelper(value) }} />
                    }
                    

                    <List
                        style={styles.listStyle}
                        size="large"
                        grid={{gutter: 16, column: 2}}
                        dataSource={this.state.shoeList}
                        renderItem={ item => {
                            return (
                                <List.Item onClick={(event) => {this.addToCart(item);}}>
                                    <ShoeComponent name={item.name} price={item.price} brand={item.brand} size={item.size} imgSrc={item.image_url}/>
                                </List.Item>
                            );
                        } } 
                        rowKey={shoe => {return shoe.sid;}}              
                        />

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
        width : '1500px'
    }

};