import { web3 } from "./Web3Helper";
import { toast } from "react-toastify";
import { config, getAccountDetail, getNetworkDetail } from "./web3Model";
import Web3 from "web3";
import { signMessage } from "@wagmi/core";

export const generateSignature = async (data) => {
  if (data.type === "walletConnect") {
    try {
      let network = await getNetworkDetail();
      const web3connect = new Web3(
        new Web3.providers.HttpProvider(network.chain.rpcUrls.default.http[0])
      );

      let msg1 = "To ensure the security of your account, please sign this message to log in. Rest assured, this won't initiate any blockchain transactions or incur fees.";
      let _config = config();

      const accounts = await getAccountDetail();
      let selectedAccount = accounts.selectedAccount;
      const from_account = web3connect.utils.toChecksumAddress(selectedAccount);

      let signatures = await signMessage(_config, {
        account: from_account,
        message: msg1,
      });

      if (signatures) {
        return {
          signatures: signatures,
          message: msg1,
        };
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      toast.error("Failed");
      setTimeout(() => {
        // window.location.reload();
      }, 3000);
      // console.log(error);
      throw error;
    }
  } else {
    try {
      const web3connect = await web3(data.type);

      let from = await web3connect.eth.getAccounts();
      const from_account = web3connect.utils.toChecksumAddress(from[0]);

      let msg = web3connect.utils.utf8ToHex("To ensure the security of your account, please sign this message to log in. Rest assured, this won't initiate any blockchain transactions or incur fees.");

      let signatures = await web3connect.currentProvider.request({
        method: "personal_sign",
        params: [msg, from_account],
      });

      if (signatures) {
        return {
          signatures: signatures,
          message: msg,
        };
      } else {
        toast.error("failed");
        return false;
      }
    } catch (error) {
      toast.error("Failed");
      setTimeout(() => {
        // window.location.reload();
      }, 3000);
      // console.log(error);
    }
  }
};
