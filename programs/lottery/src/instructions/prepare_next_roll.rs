use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;
use crate::events::PrepareNextRoll as PrepareNextRollEvent;
use crate::state::{Lottery, LotterySettings, Roll as RollState};
use crate::constants::{LOTTERY_SEED, LOTTERY_SETTINGS_SEED, ROLL_SEED};
use crate::errors::LotteryError::{InvalidAuthority, AlreadyEnded, NotEnoughTimeBetweenRolls, RollNotStarted};

#[derive(Accounts)]
pub struct PrepareNextRoll<'info> {
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
    pub roll: Account<'info, RollState>,
}

pub fn handler(ctx: Context<PrepareNextRoll>) -> Result<()> {
    let clock = Clock::get()?;
    let lottery_settings = &mut ctx.accounts.lottery_settings;
    let lottery = &mut ctx.accounts.lottery;
    let roll = &mut ctx.accounts.roll;

    if lottery.ended {
        return Err(AlreadyEnded.into());
    }

    if roll.roll_time.is_none() || roll.potential_winner.is_none() {
        return Err(RollNotStarted.into());
    }

    if roll.roll_time.unwrap() + lottery_settings.time_between_rolls > clock.unix_timestamp {
        return Err(NotEnoughTimeBetweenRolls.into());
    }

    lottery.current_roll += 1;
    roll.stale = true;

    msg!("Lottery {} ({:?}), preparing next roll, winner cannot be contacted {:?}", 
        lottery.lottery_number, 
        lottery.prize, 
        roll.potential_winner.unwrap().to_string()
    );

    emit!(PrepareNextRollEvent {
        lottery_number: lottery.lottery_number,
        roll_id: roll.id,
    });

    Ok(())
}