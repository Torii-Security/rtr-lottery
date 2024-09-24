use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod events;
pub mod instructions;
pub mod state;

use instructions::*;
use solana_security_txt::security_txt;

#[cfg(not(feature = "no-entrypoint"))]
security_txt! {
    name: "RTR Lottery",
    project_url: "https://github.com/Torii-Security/rtr-lottery",
    contacts: "email:contact@torii.team",
    policy: "https://github.com/Torii-Security/rtr-lottery/blob/main/SECURITY.md"
}

declare_id!("RTR9dcRa944pvid1nNqPQgt5TwvfZDtt5o79YQFSBbM");

#[program]
pub mod rtr_lottery {
    use super::*;

    pub fn initialize_lottery_settings(ctx: Context<InitializeLotterySettings>, time_between_rolls: i64) -> Result<()> {
        instructions::initialize_lottery_settings::handler(ctx, time_between_rolls)
    }

    pub fn modify_lottery_settings_authority(ctx: Context<ModifyLotterySettingsAuthority>) -> Result<()> {
        instructions::modify_lottery_settings_authority::handler(ctx)
    }

    pub fn modify_lottery_settings_time_between_rolls(ctx: Context<ModifyLotterySettingsTimeBetweenRolls>, time_between_rolls: i64) -> Result<()> {
        instructions::modify_lottery_settings_time_between_rolls::handler(ctx, time_between_rolls)
    }

    pub fn start_lottery(ctx: Context<StartLottery>, prize: String, ipfs_url: String) -> Result<()> {
        instructions::start_lottery::handler(ctx, prize, ipfs_url)
    }

    pub fn cancel_lottery(ctx: Context<CancelLottery>) -> Result<()> {
        instructions::cancel_lottery::handler(ctx)
    }

    pub fn roll(ctx: Context<Roll>) -> Result<()> {
        instructions::roll::handler(ctx)
    }

    pub fn prepare_next_roll(ctx: Context<PrepareNextRoll>) -> Result<()> {
        instructions::prepare_next_roll::handler(ctx)
    }

    pub fn set_roll_winner(ctx: Context<SetRollWinner>, winner: Pubkey) -> Result<()> {
        instructions::set_roll_winner::handler(ctx, winner)
    }

    pub fn pick_winner(ctx: Context<PickWinner>) -> Result<()> {
        instructions::pick_winner::handler(ctx)
    }

    pub fn finish_lottery(ctx: Context<FinishLottery>) -> Result<()> {
        instructions::finish_lottery::handler(ctx)
    }
}