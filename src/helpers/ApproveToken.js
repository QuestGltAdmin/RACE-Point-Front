import { web3 } from "./Web3Helper";
import { toast } from "react-toastify";
import TokenABI from "../ABI/ERC20ABI.json";
import Tokens from "../JSON/TokenListMainnet.json";
import RaceTokens from "../JSON/RaceTokenList.json";
import { getAccountDetail, getNetworkDetail } from "./web3Model";
import Web3 from "web3";
import { sendTransaction } from "@wagmi/core";

const TokensList = Tokens.tokens;
const RaceTokensList = RaceTokens.tokens;

export const approveERC20 = async (data) => {

  let token = TokensList.filter(
    (token) => token.currency == data?.currency && token.symbol == data?.cointype
  );
  token = token[0];

  let vaultAddress = RaceTokensList.filter((token) => token.chainId == data.chainId);
  vaultAddress = address[0];
  let address = vaultAddress.address;
  const abi = TokenABI;
  
  if (data.type === "walletConnect") {
    let network = await getNetworkDetail();
    let web3connect = new Web3(
      new Web3.providers.HttpProvider(network.chain.rpcUrls.default.http[0])
    );   
    // const web3connect = await web3();

    const accounts = await getAccountDetail();
    let selectedAccount = accounts.selectedAccount;
    const chainId = accounts.chainId;

    let amt = data.amount + data.amount * 0.0001;

    let amountIn =
      "0x" + parseInt(amt * 10 ** token.decimals).toString(16);

    const caddress = web3connect.utils.toChecksumAddress(address);
    const tokenAddress = web3connect.utils.toChecksumAddress(token.address);

    const nonce = await web3connect.eth.getTransactionCount(
      selectedAccount,
      "latest"
    ); //get latest nonce

    if (chainId !== data.chainId) {
      toast.warn("Wrong Network");
      // _switch();
      return false;
    }

    const from_account = web3connect.utils.toChecksumAddress(selectedAccount);

    let ercContract = new web3connect.eth.Contract(abi, tokenAddress);

    let Data = ercContract.methods.approve(caddress, amountIn).encodeABI();

    let estimates_gas = await web3connect.eth.estimateGas({
      from: from_account,
      to: tokenAddress,
      data: Data,
    });

    let gasLimit = web3connect.utils.toHex(parseInt(estimates_gas) * 2);
    let gasPrice_bal = await web3connect.eth.getGasPrice();
    let gasPrice = web3connect.utils.toHex(parseInt(gasPrice_bal));

    let tx = {
      from: from_account,
      to: tokenAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      data: Data,
    };

    let hash = await sendTransaction(tx);
    const ids = toast.loading(
      "Please Check your Metamask for any Pending Transaction"
    );
    // toast.success('Wait For transaction to Success')
    // show modal
    const expectedBlockTime = 1000; // 1sec
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    let transactionReceipt = null;
    while (transactionReceipt == null) {
      // Waiting expectedBlockTime until the transaction is mined
      transactionReceipt = await web3connect.eth.getTransactionReceipt(
        hash.hash
      );
      await sleep(expectedBlockTime);
    }

    if (transactionReceipt.status) {
      toast.update(ids, {
        render: "Transaction Success",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      return true;
    } else {
      toast.update(ids, {
        render: "Transaction Reverted",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      window.location.reload();
    }
  } else {
    const web3connect = await web3(data.type);

    const accounts = await web3connect.eth.getAccounts();

    let selectedAccount = accounts[0];
    let amt = data.amount + data.amount * 0.001;

    let amountIn =
      "0x" + parseInt(amt * 10 ** token.decimals).toString(16);

    const caddress = web3connect.utils.toChecksumAddress(address);
    const tokenAddress = web3connect.utils.toChecksumAddress(token.address); 

    const nonce = await web3connect.eth.getTransactionCount(
      selectedAccount,
      "latest"
    ); //get latest nonce

    const chainId = await web3connect.eth.getChainId();

    if (chainId !== data.chainId) {
      toast.warn("Wrong Network");
      // _switch();
      return false;
    }

    const from_account = web3connect.utils.toChecksumAddress(selectedAccount);

    let ercContract = new web3connect.eth.Contract(abi, tokenAddress);

    let Data = ercContract.methods.approve(caddress, amountIn).encodeABI();

    let estimates_gas = await web3connect.eth.estimateGas({
      from: from_account,
      to: tokenAddress,
      data: Data,
    });
    
    let gasLimit = web3connect.utils.toHex(parseInt(estimates_gas) * 2);
    let gasPrice_bal = await web3connect.eth.getGasPrice();
    let gasPrice = web3connect.utils.toHex(parseInt(gasPrice_bal));

    let tx = {
      from: from_account,
      to: tokenAddress,
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: gasLimit,
      data: Data,
    };

    await web3connect.eth.sendTransaction(tx, function (err, hash) {
      if (!err) {
        const ids = toast.loading(
          "Please Check your Metamask for any Pending Transaction"
        );
        // toast.success('Please Wait Till Your Transaction is Success')
        const expectedBlockTime = 1000; // 1sec

        const sleep = (milliseconds) => {
          return new Promise((resolve) => setTimeout(resolve, milliseconds));
        };
        (async function () {
          let transactionReceipt = null;
          while (transactionReceipt == null) {
            // Waiting expectedBlockTime until the transaction is mined
            transactionReceipt = await web3connect.eth.getTransactionReceipt(
              hash
            );
            await sleep(expectedBlockTime);
          }
          if (transactionReceipt.status) {
            toast.update(ids, {
              render: "Transaction Success",
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
            return true;
            // toast.success('Transaction Success')
          } else {
            toast.update(ids, {
              render: "Transaction Reverted",
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
            // toast.error('Transaction Reverted');
            window.location.reload();
          }
        })();
      } else {
        toast.error("Transaction Reverted");
        window.location.reload();
      }
    });
    return true;
  }
};