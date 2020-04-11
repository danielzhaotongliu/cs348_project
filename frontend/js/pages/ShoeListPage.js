import React from 'react';
import { List, Input, Select, Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { axiosInstance } from "../axiosApi"; 
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
    <Select defaultValue="Brand" style={{ width: 100}} onChange={setSearchOption}>
        <Option value="brand">Brand</Option>
        <Option value="name">Name</Option>
        <Option value="size">Size</Option>
    </Select>
);


export default class ShoeListPage extends React.Component {


    /* HELPER FUNCTIONS */

    // calls shoe api to search with parameters
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

        axiosInstance.get('api/shoe/', { params : paramObj})
            .then(response => {
            const shoes = response.data;
            console.log(shoes);
            this.setState({ shoeList : shoes, searching : false });
        })
 
    }

    // adds a shoe to the cart and transaction table
    async addToCart(shoe){

        console.log("About to add shoe with sid: " + shoe.sid);

        var params = { sid : shoe.sid};
        axiosInstance.post('api/transaction/', params);

        var newCartCount = this.state.cartCount + 1;
        this.setState({cartCount : newCartCount});

    }


    constructor(props){
        super(props);
        this.state = {
            shoeList : [],
            searching : false,
            cartCount : 0,
            trendingShoes : []
        };

        this.searchHelper = this.searchHelper.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    // When this page loads
    componentDidMount() {

        // populate array of shoes
        axiosInstance.get('api/shoe/')
            .then(response => {
            const shoes = response.data;
            this.setState({ shoeList : shoes });
        });

        // call the get method
        axiosInstance.get('api/transaction/')
            .then(response => {
                const transactions = response.data; // array
                this.setState({cartCount : transactions.length})
        });

        // populate trending shoes
        axiosInstance.get('api/shoe/get_popular')
            .then(response => {
                const trending = response.data;
                console.log(trending);
                this.setState({trendingShoes : trending});
        });

    }

    render() {

        return (
            <div style={styles.rootContainerStyle}>
                <div style={styles.containerStyle}>

                    <div style={{display : 'flex', justifyContent : 'space-between'}}>

                        <p style={styles.titleStyle}>Shoe Store</p>

                        <div style={{marginTop : 50}}>

                            <Link to="/cart">
                                <Badge count={this.state.cartCount} showZero>
                                    <ShoppingCartOutlined style={{fontSize  : 100}}/>
                                </Badge>
                            </Link>


                        </div>
                    </div>

                    <p style={{fontSize : 50, alignSelf : 'center'}}>Trending</p>

                    <List
                        style={styles.listStyle}
                        size="large"
                        grid={{column: 2}}
                        dataSource={this.state.trendingShoes}
                        renderItem={ item => {
                            return (
                                <List.Item style={styles.listItemStyle} >

                                    <Link to={{
                                            pathname : '/shoe',
                                            state : {
                                                shoeId : item.sid
                                            }
                                        }}>

                                        <ShoeComponent
                                        name={item.name}
                                        price={item.price}
                                        brand={item.brand}
                                        size={item.size}
                                        imgSrc={item.image_url}/>

                                    </Link>

                                    <div style={styles.buttonRowStyle}>
                                        <Link to={{
                                            pathname : '/review',
                                            state : {
                                                shoeId : item.sid
                                            }
                                        }}>
                                            <Button style={{margin : 20}}>Add Review</Button>
                                        </Link>
                                        <Button type='primary' style={{margin : 20}} onClick={(event) => {this.addToCart(item);}}>Add to cart</Button>
                                    </div>
                                </List.Item>
                            );
                        } }
                        rowKey={shoe => {return shoe.sid;}}   
                        />


                    {this.state.searching ?
                        <Search addonBefore={searchOptions} style={styles.searchboxStyle} size='large' placeholder="Search Store" loading onSearch={(value) => { this.searchHelper(value) }} />
                    : 
                        <Search addonBefore={searchOptions} style={styles.searchboxStyle} size='large' placeholder="Search Store" onSearch={(value) => { this.searchHelper(value) }} />
                    }
                    

                    <List
                        style={styles.listStyle}
                        size="large"
                        grid={{column: 1}}
                        dataSource={this.state.shoeList}
                        renderItem={ item => {
                            return (
                                <List.Item style={styles.listItemStyle} >
                                    <div >
                                        <Link to={{
                                                pathname : '/shoe',
                                                state : {
                                                    shoeId : item.sid
                                                }
                                            }}>

                                            <ShoeComponent
                                            name={item.name}
                                            price={item.price}
                                            brand={item.brand}
                                            size={item.size}
                                            imgSrc={item.image_url}/>

                                        </Link>

                                    </div>

                                    <div style={styles.buttonRowStyle}>
                                        <Link to={{
                                            pathname : '/review',
                                            state : {
                                                shoeId : item.sid
                                            }
                                        }}>
                                            <Button style={{margin : 20}}>Add Review</Button>
                                        </Link>
                                        <Button type='primary' style={{margin : 20}} onClick={(event) => {this.addToCart(item);}}>Add to cart</Button>
                                    </div>
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
        flexDirection : 'column'
    },

    titleStyle : {
        fontSize : 100, 
        textAlign : 'center'
    },

    searchboxStyle : {
        width : 500,
        margin : 50,
        alignSelf : 'center'
    }, 

    listStyle : {
        width : 1600,
        alignSelf : 'center'
    },

    listItemStyle : {
        display : 'flex',
        flexDirection : 'column'
    },

    buttonRowStyle : {
        display : 'flex',
        justifyContent : 'space-between',
        width : '50%'
    }

};
