import { useActiveWallet, useConnect } from "../../../src/";
import txData from "../tx.json";
import { Transaction, TransactionInstruction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
export default function WalletConnect() {
  const { wallet } = useActiveWallet();
  const { connect, disconnect } = useConnect();
  const handleLogin = () => {
    if (wallet?.address) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div>
      <div className="card">
        <p>Wallet Address: {wallet?.address}</p>
        <button onClick={handleLogin}>
          {wallet?.address ? "Disconnect" : "Connect"}
        </button>
      </div>
    </div>
  );
}
