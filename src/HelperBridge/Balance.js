import Web3 from "web3";
import Tokens from "../JSON/TokenListMainnet.json";
import Chains from "../JSON/Chain.json";
import abi from "../ABI/ERC20ABI.json";
import ContractData from "../JSON/ContractBridge.json";
let chainList = Chains.Chains;

export const getERC20Balance = async (data) => {
  console.log("data", data);
  try {
    let chainData = chainList.filter(
      (contract) => contract.chainId == data.chainId
    );
    chainData = chainData[0];

    let depositAddress;
    if (data?.TrxType == "Deposit" && data?.chainId == 11155111) {
      depositAddress = ContractData?.DEPOSITTESTNET;
    }
    if (data?.TrxType == "Deposit" && data?.chainId == 1) {
      depositAddress = ContractData?.DEPOSITMAINNET;
    }
    if (data?.TrxType == "Withdraw" && data?.chainId == 6806) {
      depositAddress = ContractData?.WITHDRAWTESTNET;
    }
    if (data?.TrxType == "Withdraw" && data?.chainId == 6805) {
      depositAddress = ContractData?.WITHDRAWMAINNET;
    }

    console.log("depositAddress" , depositAddress);
    

    let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));
    let tokenAddress = web3connect.utils.toChecksumAddress(data.address);
    const tokenContract = new web3connect.eth.Contract(abi, tokenAddress);
    let balance = await tokenContract.methods
      .balanceOf(data.userAddress)
      .call();

    balance = balance / 10 ** data.decimals;

    let allowance = await tokenContract.methods
      .allowance(data.userAddress, depositAddress)
      .call();

    allowance = allowance / 10 ** data.decimals;
    let obj = {
      balance: balance.toFixed(15),
      allowance: allowance.toFixed(15),
    };

    return obj;
  } catch (err) {
    console.log("err", err);
  }
};

export const getEthBalance = async (data) => {
  let chainData = chainList.filter(
    (contract) => contract.chainId == data.chainId
  );
  chainData = chainData[0];

  let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));

  let balance = await web3connect.eth.getBalance(data.userAddress);

  balance = balance / 10 ** 18;

  return balance;
};
