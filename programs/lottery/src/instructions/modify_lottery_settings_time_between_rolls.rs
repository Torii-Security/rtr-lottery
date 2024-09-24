use anchor_lang::prelude::*;
use crate::events::LotterySettingsTimeBetweenRollsModified;
use crate::state::LotterySettings;
use crate::constants::LOTTERY_SETTINGS_SEED;
use crate::errors::LotteryError::InvalidAuthority;

#[derive(Accounts)]
pub struct ModifyLotterySettingsTimeBetweenRolls<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [LOTTERY_SETTINGS_SEED.as_ref()],
        bump = lottery_settings.bump,
        has_one = authority @ InvalidAuthority,
    )]
    pub lottery_settings: Account<'info, LotterySettings>,
}

pub fn handler(ctx: Context<ModifyLotterySettingsTimeBetweenRolls>, time_between_rolls: i64) -> Result<()> {
    let lottery_settings = &mut ctx.accounts.lottery_settings;
    lottery_settings.update_time_between_rolls(time_between_rolls);

    emit!(LotterySettingsTimeBetweenRollsModified {
        previous_time_between_rolls: lottery_settings.time_between_rolls,
        new_time_between_rolls: lottery_settings.time_between_rolls,
    });

    Ok(())
}