use anchor_lang::prelude::*;

#[account]
pub struct Roll {
    pub id: u64,
    pub stale: bool,
    pub lottery: Pubkey,
    pub commit_slot: Option<u64>,
    pub roll_time: Option<i64>,
    pub potential_winner: Option<Pubkey>,
    pub randomness_data_account: Pubkey,
    pub random_value: Option<[u8; 32]>,
}