import Web3 from "web3";
import Tokens from "../JSON/RaceTokenList.json";
import Chains from "../JSON/Chain.json";
import abi from "../ABI/VAULTABI.json";
let chainList = Chains.Chains;

const TokensList = Tokens.tokens;

export const getRaceBalance = async (chainid, wallet) => {
  let chainData = chainList.filter((contract) => contract.chainId == chainid);
  chainData = chainData[0];

  let address = TokensList.filter((token) => token.chainId === chainid);
  address = address[0];
  let tokenAddress = address.address;

  let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));

  tokenAddress = web3connect.utils.toChecksumAddress(tokenAddress);
  
  const RaceContract = new web3connect.eth.Contract(abi, tokenAddress);
  let balance = await RaceContract.methods.balanceOf(wallet).call();

  let decimals = await RaceContract.methods.decimals().call();
  
  balance = (balance / (10**decimals));

  console.log(balance, "balanaaa");
  // localStorage.setItem('walletbalance', walletbalance);

  return balance;
};

