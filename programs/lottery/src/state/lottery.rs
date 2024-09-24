use anchor_lang::prelude::*;
use crate::constants::{MAX_IPFS_URL_LENGTH, MAX_PRIZE_LENGTH};

#[account]
#[derive(InitSpace)]
pub struct Lottery {
    pub lottery_number: u64,
    pub prize_id: u64,
    pub winner: Option<Pubkey>,
    pub winning_roll: Option<Pubkey>,
    pub current_roll: u64,
    pub last_roll_time: Option<i64>,
    pub ended: bool,
    pub rolled: bool,
    pub bump: u8,
    #[max_len(MAX_IPFS_URL_LENGTH)]
    pub ipfs_url: String,
    #[max_len(MAX_PRIZE_LENGTH)]
    pub prize: String,
}