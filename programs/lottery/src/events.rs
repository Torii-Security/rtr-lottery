use anchor_lang::prelude::*;

#[event]
pub struct LotteryInitialized {
    pub authority: Pubkey,
}

#[event]
pub struct LotterySettingsAuthorityModified {
    pub previous_authority: Pubkey,
    pub new_authority: Pubkey,
}

#[event]
pub struct LotteryStarted {
    pub lottery_number: u64,
    pub prize: String,
    pub ipfs_url: String,
}

#[event]
pub struct LoterryRoll {
    pub lottery_number: u64,
    pub commit_slot: u64,
}

#[event]
pub struct PickWinner {
    pub lottery_number: u64,
    pub ipfs_url: String,
    pub random_value: [u8; 32],
}

#[event]
pub struct LotteryFinalized {
    pub lottery_number: u64,
    pub winner: Pubkey,
    pub prize_id: u64,
}

#[event]
pub struct LotteryCanceled {
    pub lottery_number: u64,
}

#[event]
pub struct LotterySettingsTimeBetweenRollsModified {
    pub previous_time_between_rolls: i64,
    pub new_time_between_rolls: i64,
}

#[event]
pub struct PrepareNextRoll {
    pub lottery_number: u64,
    pub roll_id: u64,
}

#[event]
pub struct SetRollWinner {
    pub lottery_number: u64,
    pub roll_id: u64,
    pub potential_winner: Pubkey,
}

#[event]
pub struct LotteryCancelled {
    pub lottery_number: u64,
}



