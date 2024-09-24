import { RtrStaking } from '../IDL/rtr_staking';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { PublicKey, Keypair, Connection } from '@solana/web3.js';
import idl from '../IDL/rtr_staking.json';

function getRewardsToClaim(userAccount: any, stakingPoolAccount: any, timestamp: number) {
    const SCALE_FACTOR = BigInt(1_000_000_000_000_000);
    const currentTime = BigInt(timestamp);
    const lastUpdatedTime = BigInt(stakingPoolAccount.lastUpdatedTime);
    const endTime = BigInt(stakingPoolAccount.endTime);

    // Calculate the time elapsed, capped at the end time
    const timeElapsed = currentTime > endTime
        ? endTime - lastUpdatedTime
        : currentTime - lastUpdatedTime;

    if (timeElapsed <= BigInt(0) || stakingPoolAccount.totalStaked === BigInt(0)) {
        return userAccount.pendingReward;
    }

    const rewardDuration = BigInt(stakingPoolAccount.endTime - stakingPoolAccount.startTime);
    const totalRewards = BigInt(stakingPoolAccount.totalRewards);
    const accumulatedReward = BigInt(stakingPoolAccount.accumulatedReward);
    const userBalance = BigInt(userAccount.balance);
    const userAccumulatedReward = BigInt(userAccount.accumulatedReward);

    // Calculate new accumulated reward
    const newAccumulatedReward = accumulatedReward +
        (timeElapsed * totalRewards * SCALE_FACTOR) / (rewardDuration * BigInt(stakingPoolAccount.totalStaked));

    // Calculate new pending reward
    const newPendingReward = (userBalance * (newAccumulatedReward - userAccumulatedReward)) / SCALE_FACTOR;

    return BigInt(userAccount.pendingReward) + newPendingReward;
}

export const getSnapshot = async (program: Program<RtrStaking>) => {
    const [stakingPool, stakingPoolBump] = await PublicKey.findProgramAddress(
        [Buffer.from("staking_pool")],
        program.programId
    )

    const stakingPoolData = await program.account.stakingPool.fetch(stakingPool);
    const stakers = await program.account.userStakingPosition.all();

    const totalStakerFromPool = BigInt(stakingPoolData.totalStaked.toString());

    // Get the current timestamp
    const currentSlot = await program.provider.connection.getSlot();
    const currentTimestamp = await program.provider.connection.getBlockTime(currentSlot);

    if (!currentTimestamp) {
        throw new Error("Failed to get current timestamp");
    }

    console.log(`Current timestamp: ${currentTimestamp}`);

    let totalInPool = BigInt(0);
    let totalStakedCheck = BigInt(0);
    let stakersData = {};

    for (const staker of stakers) {
        const rewards = getRewardsToClaim(staker.account, stakingPoolData, currentTimestamp);
        const userAmount = rewards + BigInt(staker.account.balance.toNumber());
        if (userAmount == BigInt(0)) {
            continue;
        }
        totalStakedCheck += BigInt(staker.account.balance.toNumber());
        totalInPool += BigInt(userAmount);
        const stakerKey = staker.account.authority.toString();
        // @ts-ignore
        stakersData[stakerKey] = userAmount.toString();
    }

    if (totalStakedCheck !== totalStakerFromPool) {
        console.log("Total staked check is not equal to total staker from pool");
        console.log("Total staked check:", totalStakedCheck);
        console.log("Total staker from pool:", totalStakerFromPool);
        throw new Error("Total staked check is not equal to total staker from pool");
    }

    const snapshot = {
        totalInPool: totalInPool.toString(),
        stakers: stakersData,
        slot: currentSlot,
        timestamp: currentTimestamp,
        stakingProgram: program.programId.toString()
    }
    return snapshot;
}

(async () => {
    // Provide your own RPC endpoint
    const RPC_ENDPOINT = "";
    const MockWallet = {
        signTransaction: () => Promise.reject(),
        signAllTransactions: () => Promise.reject(),
        publicKey: Keypair.generate().publicKey,
    }
    const connection = new Connection(RPC_ENDPOINT, 'confirmed');
    const provider = new AnchorProvider(connection, MockWallet, {})
    const program = new Program(idl as RtrStaking, provider) as Program<RtrStaking>;
    const snapshot = await getSnapshot(program);
    console.log(snapshot);
})();