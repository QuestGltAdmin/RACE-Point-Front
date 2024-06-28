import Web3 from "web3";
import Tokens from "../JSON/TokenListMainnet.json";
import Chains from "../JSON/Chain.json";
import abi from "../ABI/ERC20ABI.json";
let chainList = Chains.Chains;

const TokensList = Tokens.tokens;

export const getUsdtAndUsdcBalance = async (chainid, chainname, wallet) => {
  console.log(chainid, "chainList");
  console.log(chainname, "chainname");
  let chainData = chainList.filter((contract) => contract.chainId == chainid);
  console.log(chainData, "chainData");
  chainData = chainData[0];
  let address = TokensList.filter((token) => token.name === chainname);
  address = address[0];
  let tokenAddress = address.address;
  let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));
  tokenAddress = web3connect.utils.toChecksumAddress(tokenAddress);
  const usdtContract = new web3connect.eth.Contract(abi, tokenAddress);
  let balance = await usdtContract.methods.balanceOf(wallet).call();
  
  let decimals = await usdtContract.methods.decimals().call();
  
  balance = (balance / (10**decimals));

  console.log(balance, "balanaaa");
  // localStorage.setItem('walletbalance', walletbalance);

  return balance;
};

