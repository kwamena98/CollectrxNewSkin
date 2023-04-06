import React, { useContext ,useState,useEffect} from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

// import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

// const Input = ({ placeholder, name, type, value, handleChange }) => (
//   <input
//     placeholder={placeholder}
//     type={type}
//     step="0.0001"
//     value={value}
//     onChange={(e) => handleChange(e, name)}
//     className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
//   />
// );



const Welcome = () => {
  const [provider, setProvider] = useState(undefined)
  const [walletKey, setWalletKey] = useState(undefined)

  const sendSolana = async (recipientAddress, amount) => {
    // @ts-ignore
    const { solana } = window
    
    if (!solana) {
      console.error("Phantom wallet is not installed")
      return
    }
  
    if (!walletKey) {
      console.error("Wallet is not connected")
      return
    }
  
    // const connection = new solana.Connection("https://api.mainnet-beta.solana.com", "confirmed")
    const connection = new solana.Connection("https://api.devnet.solana.com");
  
    // Get the public key of the recipient address
    const recipientPublicKey = new solana.PublicKey(recipientAddress)
  
    // Get the current wallet account
    const walletAccount = new solana.PublicKey(walletKey)
  
    // Create a new transaction instruction to transfer Solana tokens
    const transactionInstruction = solana.SystemProgram.transfer({
      fromPubkey: walletAccount,
      toPubkey: recipientPublicKey,
      lamports: amount * 10 ** 9 // Convert the amount to lamports (1 Solana = 10^9 lamports)
    })
  
    // Build the transaction
    const transaction = new solana.Transaction().add(transactionInstruction)
  
    // Sign the transaction with the wallet account
    transaction.feePayer = walletAccount
    const { blockhash } = await connection.getRecentBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.sign(walletAccount)
  
    // Send the transaction to the Solana network
    const signature = await connection.sendTransaction(transaction)
  
    console.log("Transaction signature:", signature)
  }
  


  /**
   * @description gets Phantom provider, if it exists
   */
  const getProvider = () => {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana
      if (provider.isPhantom) return provider
    }
  }

  /**
   * @description prompts user to connect wallet if it exists
   */
  const connectWallet = async () => {
    // @ts-ignore

    const { solana } = window

    if (solana) {
      try {
        const response = await solana.connect()
        console.log("wallet account ", response.publicKey.toString())
        setWalletKey(response.publicKey.toString())
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  }

  /**
   * @description disconnect Phantom wallet
   */
  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window

    if (walletKey && solana) {
      await solana.disconnect()
      setWalletKey(undefined)
    }
  }

  // detect phantom provider exists
  useEffect(() => {
    const provider = getProvider()

    if (provider) setProvider(provider)
    else setProvider(undefined)
  }, [])


  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Upload Your Nft<br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Upvote others' NFTS 
          </p>
   
            {!walletKey ? (
           <button
           type="button"
           onClick={connectWallet}
           className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
         >
           <AiFillPlayCircle className="text-white mr-2" />
           <p className="text-white text-base font-semibold">
             Connect Wallet
           </p>
         </button>
            ):(
              <h1></h1>
            )
      
    }
 
  
         
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                {!walletKey?(<a>Wallet not connected</a>):(<a>{shortenAddress(walletKey)}</a>)}
                 
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Address
                </p>
              </div>
            </div>
            <button onClick={()=>sendSolana("hasdaksdjkasdhkajsd",1)}>Send Sol</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Welcome;
