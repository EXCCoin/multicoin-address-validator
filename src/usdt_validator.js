var BTCValidator = require('./bitcoin_validator');
var ETHValidator = require('./ethereum_validator');
var TronValidator = require('./tron_validator');

function checkAllValidators(address, currency, networkType) {
    return (
        BTCValidator.isValidAddress(address, currency, {networkType})
        || ETHValidator.isValidAddress(address, currency)
        || TronValidator.isValidAddress(address, currency, {networkType})
    );
}

module.exports = {
    isValidAddress: function (address, currency, opts) {
        if (opts) {
            if (opts.chainType === 'erc20' || opts.coinChainName === 'Ethereum') {
                return {
                    chainType: opts.chainType,
                    cond: `opts.chainType === 'erc20' || opts.coinChainName === 'Ethereum'`,
                    condResult: [opts.chainType === 'erc20', opts.coinChainName === 'Ethereum'],
                    result: ETHValidator.isValidAddress(address, currency),
                    params: [address,
                        currency]
                }
                return ETHValidator.isValidAddress(address, currency);
            } else if (opts.chainType === 'omni' || opts.coinChainName === 'Bitcoin') {
                return {
                    chainType: opts.chainType,
                    cond: `opts.chainType === 'omni' || opts.coinChainName === 'Bitcoin'`,
                    condResult: [opts.chainType === 'omni', opts.coinChainName === 'Bitcoin'],
                    result: BTCValidator.isValidAddress(
                        address,
                        currency,
                        { networkType: opts.networkType}
                    ),
                    params: [address,
                        currency,
                        { networkType: opts.networkType}]
                }
                return BTCValidator.isValidAddress(
                    address,
                    currency,
                    { networkType: opts.networkType}
                );
            } else if (opts.chainType === 'trc20' || opts.coinChainName === 'Tron') {
                return {
                    chainType: opts.chainType,
                    cond: `opts.chainType === 'trc20' || opts.coinChainName === 'Tron'`,
                    condResult: [opts.chainType === 'trc20', opts.coinChainName === 'Tron'],
                    result: TronValidator.isValidAddress(
                        address,
                        currency,
                        { networkType: opts.networkType}
                    ),
                    params: [address,
                        currency,
                        { networkType: opts.networkType}]
                }
                return TronValidator.isValidAddress(
                    address,
                    currency,
                    { networkType: opts.networkType}
                );
            } else {
                return {
                    chainType: opts.chainType,
                    cond: `else`,
                    condResult: [opts.chainType === 'trc20', opts.coinChainName === 'Tron'],
                }
                return checkAllValidators(address, currency, opts);
            }
        }
        return checkAllValidators(address, currency, opts);
    }
};
