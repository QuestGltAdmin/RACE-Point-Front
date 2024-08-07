import Web3 from "web3";
import ManagerContracts from "../JSON/RaceManagerList.json";
import RaceTokens from "../JSON/RaceTokenList.json";
import Tokens from "../JSON/TokenListMainnet.json";
import Chains from "../JSON/Chain.json";
import Managerabi from "../ABI/MANAGERABI.json";
import vaultabi from "../ABI/VAULTABI.json";

const chainList = Chains.Chains;
const ManagerContractsList = ManagerContracts.contracts;
const RaceTokensList = RaceTokens.tokens;
const TokensList = Tokens.tokens;



export const getWithdrawPricedetails = async (data) => {
    let chainData = chainList.filter((contract) => contract.chainId == data.chainId);
    chainData = chainData[0];

    let token = TokensList.filter(
        (token) => token.currency == data.currency && token.symbol == data.cointype
    );
    token = token[0];
    let depositAssetAddress = token.address;

    let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));

    let address = RaceTokensList.filter((token) => token.chainId == data.chainId);
    address = address[0];
    let vaultAddress = address.address;
    // let vaultAddress = "0xE7415da7F204CaB3F550bF0598B7F3461d5A3655";
    const vaultContract = new web3connect.eth.Contract(vaultabi, vaultAddress);
    let raceTokenPrice = await vaultContract.methods.tokenPrice().call();

    let contractAddress = ManagerContractsList.filter(
        (token) => token.chainId == data.chainId
    );
    contractAddress = contractAddress[0];
    let managerAddress = contractAddress.address;
    // let managerAddress = "0x47F9373029a18f7FE2a3c49CF9bEc8E169Ec3eed"
    managerAddress = web3connect.utils.toChecksumAddress(managerAddress);

    const managerContract = new web3connect.eth.Contract(Managerabi, managerAddress);

    let amt = "0x" + parseInt(1 * 10 ** token.decimals).toString(16);
    let assetPrice = await managerContract.methods.assetValue(depositAssetAddress, amt).call();
    assetPrice = assetPrice / 10 ** 18;

  
    let obj = {
        raceTokenPrice: raceTokenPrice / 10 ** 18,
        AssetInOnePoint: (raceTokenPrice / assetPrice) / 10 ** 18
    }
    // console.log(obj, "obj------------------------");
    return obj;
};













// let withdrawValue = amtRaceTokenIndollar / assetPrice;
// let withdrawValueInDollar = amtRaceTokenIndollar;

// assetPrice : assetPrice,
// withdrawValue : withdrawValue,
// minwithdrawValue : withdrawValue - ((withdrawValue * 1)/100),
// withdrawValueInDollar : withdrawValueInDollar,


// let TotalFundValue = await managerContract.methods.totalFundValue().call();
// TotalFundValue = TotalFundValue / 10 ** 18;
// let FundComposition = await managerContract.methods.getFundComposition().call();

// console.log(TotalFundValue, "TotalFundValue");
// console.log(FundComposition, "FundComposition1",);
// console.log(FundComposition.assets, "FundComposition", FundComposition.assets.length);

// let allList = [];
// for (let i = 0; i < FundComposition.assets.length; i++) {
//     try {


//         let balance = FundComposition.balances[i];
//         let rate = FundComposition.rates[i];
//         let assetvalue = parseInt(balance) * (parseInt(rate) / 10 ** 18);
//         let assetContract = new web3connect.eth.Contract(ERCabi, FundComposition.assets[i][0]);
//         let assetDecimal = await assetContract.methods.decimals().call();
//         let assetSymbol = await assetContract.methods.symbol().call();
//         let assetPercentage = ((assetvalue / 10 ** assetDecimal) / TotalFundValue) * 100;

//         let amountForuser = (amtTokenIndollar * assetPercentage) / 100;
//         let amountOfAssetForuser = amountForuser / (parseInt(rate) / 10 ** 18);
//         let obj = {
//             asset: FundComposition.assets[i][0],
//             assetSymbol: assetSymbol,
//             assetPrice: rate,
//             assetvalueIndollar: assetvalue / 10 ** assetDecimal,
//             assetPercentage: assetPercentage,
//             amountForuser: amountForuser,
//             amountOfAssetForuser: amountOfAssetForuser
//         }
//         if(obj.amountOfAssetForuser > 0){
//             allList.push(obj);
//         }
//         console.log(obj);
//     } catch (err) {
//         console.log(err);
//     }
// }