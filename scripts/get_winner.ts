import { RtrLottery } from '../IDL/rtr_lottery';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { PublicKey, Keypair, Connection } from '@solana/web3.js';
import idl from '../IDL/rtr_lottery.json';

type Snapshot = {
    totalInPool: string;
    stakers: {
        [address: string]: string;
    };
};

export const getWinner = async (randomValue: any, snapshot: string) => {
    const file = await fetch(snapshot);
    const snapshotData = await file.json() as Snapshot;

    console.log("Snapshot data:", snapshotData);
    console.log("Snapshot data:", snapshotData);
    console.log("Random value:", randomValue);
    let cumulativeWeight = BigInt(0);
    const first8Bytes = randomValue.slice(0, 8);
    const randomBigInt = BigInt(
        '0x' + 
        first8Bytes
          .reverse() // Reverse for little-endian
          .reduce((str: any, byte: any) => str + byte.toString(16).padStart(2, '0'), '')
      );
    const winningNumber = randomBigInt % BigInt(snapshotData.totalInPool);

    console.log("Winning number:", winningNumber);
    console.log("Total in pool:", snapshotData.totalInPool);

    let winner;
    for (const [staker, value] of Object.entries(snapshotData.stakers)) {
        // @ts-ignore
        cumulativeWeight += BigInt(value);
        if (cumulativeWeight > winningNumber) {
            winner = staker;
            break;
        }
    }

    return winner;
}

(async () => {
    // Replace with lottery id
   const LOTTERY_ID = 1;
   // Provide your own RPC endpoint
   const RPC_ENDPOINT = "";

   const MockWallet = {
    signTransaction: () => Promise.reject(),
    signAllTransactions: () => Promise.reject(),
    publicKey: Keypair.generate().publicKey,
  }
    const connection = new Connection(RPC_ENDPOINT, 'confirmed');
    const provider = new AnchorProvider(connection, MockWallet, {})
    const program = new Program(idl as RtrLottery, provider) as Program<RtrLottery>;

    const lotteries = await program.account.lottery.all();

    console.log("Lotteries:", lotteries);

    const targetLottery = lotteries.find(lottery => lottery.account.lotteryNumber.toNumber() === LOTTERY_ID);

    if (!targetLottery) {
        console.error(`Lottery with ID ${LOTTERY_ID} not found.`);
        return;
    }

    if (!targetLottery.account.rolled) {
        console.error(`Lottery with ID ${LOTTERY_ID} has not been rolled.`);
        return;
    }

    const [currentRollPK] = await PublicKey.findProgramAddress(
        //@ts-ignore
        [Buffer.from("roll"), targetLottery.publicKey.toBuffer(), targetLottery.account.currentRoll.toArray("le", 8)],
        program.programId
    );

    const currentRoll = await program.account.roll.fetch(currentRollPK);

    const winner = await getWinner(currentRoll.randomValue, targetLottery.account.ipfsUrl);

    console.log("Winner:", winner);
})();