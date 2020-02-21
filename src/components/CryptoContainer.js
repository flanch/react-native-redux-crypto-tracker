import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Stylesheet, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import FetchCoinData from './../Actions/FetchCoinData';
import CoinCard from './CoinCard';

class CryptoContainer  extends Component {
    componentDidMount() {
        this.props.FetchCoinData();
    }

    renderCoinCards() {
        const {crypto} = this.props;
        if(crypto.isFetching === false){
            return crypto.data.data.map((coin) => 
                <CoinCard
                key={coin.id}
                coin_name={coin.name}
                symbol={coin.symbol}
                price_usd={coin.quote.USD.price}
                percent_change_24h={coin.quote.USD.percent_change_24h}
                percent_change_7d={coin.quote.USD.percent_change_7d}
                />
            )
        } else {
            return(crypto.data)
        }
        
    }

    render() {
        const {crypto} = this.props;
        const {contentContainer} = styles;

        if(crypto.isFetching) {
            return(
                <View>
                    <Spinner
                        visible={crypto.isFetching}
                        textContent={"Loading..."}
                        textStyle={{color:"#12aeae"}}
                        animation="fade"
                    />
                </View>
            )
        }

        return (
            <ScrollView contentContainerStyle={contentContainer}>
                {this.renderCoinCards()}
            </ScrollView>

        )
    }
}

const styles = {
    contentContainer: {
        paddingBottom: 100,
        paddingTop: 55
    }
}

function mapStateToProp(state) {
    return {
        crypto: state.crypto
    }
}

export default connect(mapStateToProp, {FetchCoinData})(CryptoContainer)