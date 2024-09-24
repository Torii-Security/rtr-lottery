use anchor_lang::prelude::*;
use crate::events::LotteryInitialized;
use crate::state::LotterySettings;
use crate::constants::LOTTERY_SETTINGS_SEED;

#[derive(Accounts)]
pub struct InitializeLotterySettings<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        space =  8 + std::mem::size_of::<LotterySettings>(),
        seeds = [LOTTERY_SETTINGS_SEED.as_ref()],
        bump
    )]
    pub lottery_settings: Account<'info, LotterySettings>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitializeLotterySettings>, time_between_rolls: i64) -> Result<()> {
    let lottery_settings = &mut ctx.accounts.lottery_settings;
    lottery_settings.authority = ctx.accounts.authority.key();
    lottery_settings.current_lottery = 0;
    lottery_settings.time_between_rolls = time_between_rolls;
    lottery_settings.bump = ctx.bumps.lottery_settings;

    emit!(LotteryInitialized {
        authority: lottery_settings.authority,
    });

    Ok(())
}