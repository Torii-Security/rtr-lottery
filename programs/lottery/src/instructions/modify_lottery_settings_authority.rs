use anchor_lang::prelude::*;
use crate::events::LotterySettingsAuthorityModified;
use crate::state::LotterySettings;
use crate::constants::LOTTERY_SETTINGS_SEED;
use crate::errors::LotteryError::InvalidAuthority;

#[derive(Accounts)]
pub struct ModifyLotterySettingsAuthority<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub new_authority: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [LOTTERY_SETTINGS_SEED.as_ref()],
        bump = lottery_settings.bump,
        has_one = authority @ InvalidAuthority,
    )]
    pub lottery_settings: Account<'info, LotterySettings>,
}

pub fn handler(ctx: Context<ModifyLotterySettingsAuthority>) -> Result<()> {
    let lottery_settings = &mut ctx.accounts.lottery_settings;
    let new_authority = ctx.accounts.new_authority.key();

    lottery_settings.update_authority(new_authority);

    emit!(LotterySettingsAuthorityModified {
        previous_authority: ctx.accounts.authority.key(),
        new_authority,
    });

    Ok(())
}