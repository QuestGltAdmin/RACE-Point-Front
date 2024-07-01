import Web3 from "web3";
import Tokens from "../JSON/TokenListMainnet.json";
import ManagerContracts from "../JSON/RaceManagerList.json";
import Chains from "../JSON/Chain.json";
import abi from "../ABI/MANAGERABI.json";
let chainList = Chains.Chains;

const TokensList = Tokens.tokens;
const ManagerContractsList = ManagerContracts.contracts;

export const getUsdtAndUsdcPrice = async (
    chainid,
    currency,
    cointype,
    amount
) => {
    let chainData = chainList.filter((contract) => contract.chainId == chainid);
    chainData = chainData[0];
    let address = TokensList.filter(
        (token) => token.currency == currency && token.symbol == cointype
    );
    console.log(address, "address");
    address = address[0];
    let tokenAddress = address.address;

    let contractAddress = ManagerContractsList.filter(
        (token) => token.chainId == chainid);
    
    contractAddress = contractAddress[0];
    let managerContractAddress = contractAddress.address;

    let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));
    managerContractAddress = web3connect.utils.toChecksumAddress(managerContractAddress);

    const managerContract = new web3connect.eth.Contract(abi, managerContractAddress);
    let priceInDollar = await managerContract.methods.assetValue(tokenAddress,amount).call();

    priceInDollar = (priceInDollar / (10 ** 18));

    return priceInDollar;
};
