import React from 'react';
import ShoeComponent from './ShoeComponent'


/*
    TODO: 
    - Add a search box to this
*/


const ShoeListDisplay = (props) => {

    return (
        <div style={{alignItems : 'center'}}>
            <div style={styles.containerStyle}>    
                <p style={{fontSize : 100}}>Shoe Display</p>
                <ShoeComponent name={'Contigo'} price={20} brand={'Clarks'} size={10}/>
            </div>
        </div>
    );

};

const styles = {

    containerStyle : {
        border : '2px solid black',
        display : 'flex',
        flexDirection : 'column'
    }

};


export default ShoeListDisplay