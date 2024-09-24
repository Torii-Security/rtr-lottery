use anchor_lang::prelude::*;
use crate::events::SetRollWinner as SetRollWinnerEvent;
use crate::state::{Lottery, LotterySettings, Roll};
use crate::constants::{LOTTERY_SEED, LOTTERY_SETTINGS_SEED, ROLL_SEED};
use crate::errors::LotteryError::{InvalidAuthority, RollStale, WinnerAlreadyPicked};

#[derive(Accounts)]
pub struct SetRollWinner<'info> {
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
        seeds = [LOTTERY_SEED.as_ref(), &lottery.lottery_number.to_le_bytes()],
        bump = lottery.bump,
    )]
    pub lottery: Account<'info, Lottery>,
    #[account(
        mut,
        seeds = [ROLL_SEED.as_ref(), &lottery.key().as_ref(), &lottery.current_roll.to_le_bytes()],
        bump
    )]
    pub roll: Account<'info, Roll>,
}

pub fn handler(ctx: Context<SetRollWinner>, winner: Pubkey) -> Result<()> {
    let lottery = &mut ctx.accounts.lottery;
    let roll = &mut ctx.accounts.roll;

    if roll.stale {
        return Err(RollStale.into());
    }

    if roll.potential_winner.is_some() {
        return Err(WinnerAlreadyPicked.into());
    }

    roll.potential_winner = Some(winner);
    msg!("Lottery winner set. Lottery: {} ({:?}), roll: {}, potential winner: {:?}", 
        lottery.lottery_number, 
        lottery.prize, 
        roll.id, 
        winner.to_string()
    );

    emit!(SetRollWinnerEvent {
        lottery_number: lottery.lottery_number,
        roll_id: roll.id,
        potential_winner: winner,
    });

    Ok(())
}