use anchor_lang::prelude::*;

#[account]
pub struct LotterySettings {
    pub authority: Pubkey,
    pub current_lottery: u64,
    pub time_between_rolls: i64,
    pub bump: u8,
}

impl LotterySettings {
    pub fn update_authority(&mut self, new_authority: Pubkey) {
        self.authority = new_authority;
    }

    pub fn update_time_between_rolls(&mut self, new_time_between_rolls: i64) {
        self.time_between_rolls = new_time_between_rolls;
    }
}