import { ethers } from "ethers"; // Import ethers.js
import Web3 from "web3";

export const resolveENSName = async (address) => {
    try {
        const provider = new ethers.providers.Web3Provider(
            new Web3.providers.HttpProvider(
                "https://mainnet.infura.io/v3/41e0714609d84b088e97155fe8849958"
            )
        );
        let ensName = await provider.lookupAddress(address);
        //   setENSName(ensName || "ENS name not found");
        // console.log(ensName);
        return ensName;
    } catch (error) {
        console.error("Error resolving ENS name:", error);
        //   setENSName("ENS name not found");
    }
};