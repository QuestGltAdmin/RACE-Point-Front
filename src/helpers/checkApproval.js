import Web3 from "web3";
import Tokens from "../JSON/TokenListMainnet.json";
import RaceTokens from "../JSON/RaceTokenList.json";
import Chains from "../JSON/Chain.json";
import abi from "../ABI/ERC20ABI.json";
let chainList = Chains.Chains;

const TokensList = Tokens.tokens;
const RaceTokenList = RaceTokens.tokens;

export const getUsdtAndUsdcBalance = async (
  chainid,
  currency,
  wallet,
  cointype
) => {
  let chainData = chainList.filter((contract) => contract.chainId == chainid);
  chainData = chainData[0];

  let address = TokensList.filter(
    (token) => token.currency == currency && token.symbol == cointype
  );
  address = address[0];
  let tokenAddress = address.address;

  let vaultAddress = RaceTokenList.filter(
    (token) => token.chainId == chainid
  );
  vaultAddress = vaultAddress[0];
  let _vaultAddress = vaultAddress.address;

  let web3connect = new Web3(new Web3.providers.HttpProvider(chainData.rpc));
  tokenAddress = web3connect.utils.toChecksumAddress(tokenAddress);
  const usdtContract = new web3connect.eth.Contract(abi, tokenAddress);
  let allowance = await usdtContract.methods.allowance(wallet,_vaultAddress).call();
  
  let decimals = await usdtContract.methods.decimals().call();
  
  allowance = (allowance / (10**decimals));

  return allowance;
};
