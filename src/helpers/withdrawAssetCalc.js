import Web3 from "web3";
import ManagerContracts from "../JSON/RaceManagerList.json";
import Chains from "../JSON/Chain.json";
import abi from "../ABI/MANAGERABI.json";
import ERCabi from "../ABI/ERC20ABI.json";
let chainList = Chains.Chains;

const ManagerContractsList = ManagerContracts.contracts;

export const getwithdrawassetdetails = async () => {
    let chainid = 10;
    let chainData = chainList.filter((contract) => contract.chainId == chainid);
    chainData = chainData[0];
    let amtTokenIndollar = 0.01 * 1;


    // let contractAddress = ManagerContractsList.filter(
    //     (token) => token.chainId == chainid
    // );

    // contractAddress = contractAddress[0];
    // let managerAddress = contractAddress.address;

    let managerAddress = "0x47F9373029a18f7FE2a3c49CF9bEc8E169Ec3eed"

    let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));

    managerAddress = web3connect.utils.toChecksumAddress(managerAddress);

    const managerContract = new web3connect.eth.Contract(abi, managerAddress);
    let TotalFundValue = await managerContract.methods.totalFundValue().call();
    TotalFundValue = TotalFundValue / 10 ** 18;
    let FundComposition = await managerContract.methods.getFundComposition().call();

    console.log(TotalFundValue, "TotalFundValue");
    console.log(FundComposition, "FundComposition1",);
    console.log(FundComposition.assets, "FundComposition", FundComposition.assets.length);

    let allList = [];
    for (let i = 0; i < FundComposition.assets.length; i++) {
        try {


            let balance = FundComposition.balances[i];
            let rate = FundComposition.rates[i];
            let assetvalue = parseInt(balance) * (parseInt(rate) / 10 ** 18);
            let assetContract = new web3connect.eth.Contract(ERCabi, FundComposition.assets[i][0]);
            let assetDecimal = await assetContract.methods.decimals().call();
            let assetSymbol = await assetContract.methods.symbol().call();
            let assetPercentage = ((assetvalue / 10 ** assetDecimal) / TotalFundValue) * 100;

            let amountForuser = (amtTokenIndollar * assetPercentage) / 100;
            let amountOfAssetForuser = amountForuser / (parseInt(rate) / 10 ** 18);
            let obj = {
                asset: FundComposition.assets[i][0],
                assetSymbol: assetSymbol,
                assetPrice: rate,
                assetvalueIndollar: assetvalue / 10 ** assetDecimal,
                assetPercentage: assetPercentage,
                amountForuser: amountForuser,
                amountOfAssetForuser: amountOfAssetForuser
            }
            if(obj.amountOfAssetForuser > 0){
                allList.push(obj);
            }
            console.log(obj);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(allList)
};
