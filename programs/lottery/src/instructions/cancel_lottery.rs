use anchor_lang::prelude::*;
use crate::events::LotteryCancelled;
use crate::state::{Lottery, LotterySettings};
use crate::constants::{LOTTERY_SEED, LOTTERY_SETTINGS_SEED};
use crate::errors::LotteryError::{CannotCancelRolledLottery, InvalidAuthority};

#[derive(Accounts)]
pub struct CancelLottery<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [LOTTERY_SETTINGS_SEED.as_ref()],
        bump = lottery_settings.bump,
        has_one = authority @ InvalidAuthority,
    )]
    pub lottery_settings: Account<'info, LotterySettings>,
    #[account(
        mut,
        seeds = [LOTTERY_SEED.as_ref(), &lottery_settings.current_lottery.to_le_bytes()],
        close = authority,
        bump
    )]
    pub lottery: Account<'info, Lottery>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(ctx: Context<CancelLottery>) -> Result<()> {
    let lottery = &mut ctx.accounts.lottery;

    if lottery.rolled {
        return Err(CannotCancelRolledLottery.into());
    }

    emit!(LotteryCancelled {
        lottery_number: lottery.lottery_number,
    });

    Ok(())
}