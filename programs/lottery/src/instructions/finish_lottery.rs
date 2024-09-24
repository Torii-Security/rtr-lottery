use anchor_lang::prelude::*;
use crate::events::LotteryFinalized;
use crate::state::{Lottery, LotterySettings, Roll};
use crate::constants::{LOTTERY_SEED, LOTTERY_SETTINGS_SEED, ROLL_SEED};
use crate::errors::LotteryError::{InvalidAuthority, AlreadyEnded, LotteryNotRolled};

#[derive(Accounts)]
pub struct FinishLottery<'info> {
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
        bump = lottery.bump
    )]
    pub lottery: Account<'info, Lottery>,
    #[account(
        seeds = [ROLL_SEED.as_ref(), &lottery.key().as_ref(), &lottery.current_roll.to_le_bytes()],
        bump
    )]
    pub roll: Account<'info, Roll>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(ctx: Context<FinishLottery>) -> Result<()> {
    let lottery = &mut ctx.accounts.lottery;
    let lottery_settings = &mut ctx.accounts.lottery_settings;
    let roll = &mut ctx.accounts.roll;

    if lottery.ended {
        return Err(AlreadyEnded.into());
    }

    if roll.potential_winner.is_none() {
        return Err(LotteryNotRolled.into());
    }

    lottery.ended = true;
    lottery.winner = Some(roll.potential_winner.unwrap());
    lottery_settings.current_lottery += 1;

    msg!("Lottery {} ({:?}) finalized with roll: {} and winner: {:?}", 
        lottery.lottery_number, 
        lottery.prize,
        roll.id, 
        roll.potential_winner.unwrap().to_string()
    );

    emit!(LotteryFinalized {
        lottery_number: lottery.lottery_number,
        winner: lottery.winner.unwrap(),
        prize_id: lottery.prize_id,
    });

    Ok(())
}