import { web3 } from "./Web3Helper";
import { toast } from "react-toastify";
import swapperABI from "../ABI/SWAPPERABI.json";
import Tokens from "../JSON/TokenListMainnet.json";
import RaceTokens from "../JSON/RaceTokenList.json";
import RaceSwapper from "../JSON/RaceSwapperList.json";
import { config, getAccountDetail, getNetworkDetail } from "./web3Model";
import Web3 from "web3";
import { sendTransaction } from "@wagmi/core";

const TokensList = Tokens.tokens;
const RaceTokensList = RaceTokens.tokens;
const RaceSwapperList = RaceSwapper.contracts;

export const withdrawVault = async (data) => {
    console.log(data,"data");

    let address = RaceTokensList.filter((token) => token.chainId == data.chainId);
    address = address[0];
    let vaultAddress = address.address;
    // let vaultAddress = "0xE7415da7F204CaB3F550bF0598B7F3461d5A3655";
    
    let swapperAddress = RaceSwapperList.filter((token) => token.chainId == data.chainId);
    swapperAddress = swapperAddress[0];
    let swapperContractAddress = swapperAddress.address;
    // let swapperContractAddress = "0x3988513793bCE39f0167064A9F7fC3617FaF35AB";
    

    let token = TokensList.filter(
        (token) => token.currency == data.currency && token.symbol == data.cointype
      );
    token = token[0];
    let AssetAddress = token.address;
    // let AssetAddress = "0x4200000000000000000000000000000000000006";

    const abi = swapperABI;

    let expextedAmount = 0;

    if (data.type === "walletConnect") {
        let network = await getNetworkDetail();
        let web3connect = new Web3( 
            new Web3.providers.HttpProvider(network.chain.rpcUrls.default.http[0])
        );

        const accounts = await getAccountDetail();
        let selectedAccount = accounts.selectedAccount;
        const chainId = accounts.chainId;

        const caddress = web3connect.utils.toChecksumAddress(swapperContractAddress);
        let swapperContract = new web3connect.eth.Contract(abi, caddress);

        let tokenAmount = web3connect.utils.toWei(data.amount.toString(), "ether");

        let Data = swapperContract.methods 
        .withdraw(vaultAddress,tokenAmount,AssetAddress,expextedAmount)
        .encodeABI();
 
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
        const coinBalance = web3connect.eth.getBalance(from_account);

        if (from_account.toLowerCase() !== data.userAddress.toLowerCase()) {
            toast.warn("Wrong account address");
            // _switch();
            return false;
        }
        let tx;
        try {
            let estimates_gas = await web3connect.eth.estimateGas({
                from: from_account,
                to: caddress,
                data: Data,
            });

            let gasLimit = web3connect.utils.toHex(estimates_gas * 2);
            let gasPrice_bal = await web3connect.eth.getGasPrice();
            let gasPrice = web3connect.utils.toHex(gasPrice_bal);
            let totalGas = parseInt(gasPrice * gasLimit);
            if (coinBalance < totalGas) {
                toast.warn("Insufficient fund for gas fees")
                return false;
            }
            tx = {
                from: from_account,
                to: caddress,
                nonce: nonce,
                gas: gasLimit,
                data: Data,
            };
            let _config = config();
            let hash = await sendTransaction(_config, tx);
            const ids = toast.loading(
                "Please Check your Wallet for any Pending Transaction"
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
                return transactionReceipt;
            } else {
                toast.update(ids, {
                    render: "Transaction Reverted",
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                });
                // window.location.reload();
            }
        } catch (error) {
            console.log(error);
            toast.error("Transaction Reverted");
            setTimeout(() => {
                // window.location.reload();
            }, 3000);
            throw error;
        }
    } else {
        try {
            const web3connect = await web3(data.type);
            
            const accounts = await web3connect.eth.getAccounts();
            
            let selectedAccount = accounts[0];
            
            const caddress = web3connect.utils.toChecksumAddress(swapperContractAddress);
            let swapperContract = new web3connect.eth.Contract(abi, caddress);
            
            let tokenAmount = web3connect.utils.toWei(data.amount.toString(), "ether");
            let Data = swapperContract.methods 
            .withdraw(vaultAddress,tokenAmount,AssetAddress,expextedAmount)
            .encodeABI();
            console.log("here");

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
            const coinBalance = web3connect.eth.getBalance(from_account);
            if (from_account.toLowerCase() !== data.userAddress.toLowerCase()) {
                toast.warn("Wrong account address");
                // _switch();
                return false;
            }
            let tx;
            let estimates_gas = await web3connect.eth.estimateGas({
                from: from_account,
                to: caddress,
                data: Data,
            });

            let gasLimit = web3connect.utils.toHex(estimates_gas * 2);
            let gasPrice_bal = await web3connect.eth.getGasPrice();
            let gasPrice = web3connect.utils.toHex(gasPrice_bal);

            let totalGas = parseInt(gasPrice * gasLimit);
            if (coinBalance < totalGas) {
                toast.warn("Insufficient fund for gas fees")
                return false;
            }

            tx = {
                from: from_account,
                to: caddress,
                nonce: nonce,
                gasPrice: gasPrice,
                gasLimit: gasLimit,
                data: Data,
            };

            let recipt;

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
                            recipt = transactionReceipt;
                            await sleep(expectedBlockTime);
                        }
                        if (transactionReceipt.status) {
                            toast.update(ids, {
                                render: "Transaction Success",
                                type: "success",
                                isLoading: false,
                                autoClose: 1000,
                            });
                            recipt = transactionReceipt;
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
                            //   window.location.reload();
                        }
                    })();
                } else {
                    toast.error("Transaction Reverted");
                    //   window.location.reload();
                }
            });
            return recipt;
        } catch (error) {
            toast.error("Transaction Reverted");
            setTimeout(() => {
                // window.location.reload();
            }, 3000);
        }
    }
};
