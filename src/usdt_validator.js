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
                return ETHValidator.isValidAddress(address, currency);
            } else if (opts.chainType === 'omni' || opts.coinChainName === 'Bitcoin') {
                return BTCValidator.isValidAddress(
                    address,
                    currency,
                    { networkType: opts.networkType}
                );
            } else if (opts.chainType === 'trc20' || opts.coinChainName === 'Tron') {
                return TronValidator.isValidAddress(
                    address,
                    currency,
                    { networkType: opts.networkType}
                );
            } else {
                return checkAllValidators(address, currency, opts);
            }
        }
        return checkAllValidators(address, currency, opts);
    }
};
