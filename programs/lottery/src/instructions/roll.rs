use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;
use switchboard_on_demand::RandomnessAccountData;
use crate::events::LoterryRoll;
use crate::state::{Lottery, LotterySettings, Roll as RollState};
use crate::constants::{LOTTERY_SEED, LOTTERY_SETTINGS_SEED, ROLL_SEED};
use crate::errors::LotteryError::{InvalidAuthority, AlreadyEnded, RandomnessAlreadyRevealed};

#[derive(Accounts)]
pub struct Roll<'info> {
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
        init,
        payer = authority,
        space = 8 + std::mem::size_of::<Roll>(),
        seeds = [ROLL_SEED.as_ref(), &lottery.key().as_ref(), &lottery.current_roll.to_le_bytes()],
        bump
    )]
    pub roll: Account<'info, RollState>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
    /// CHECK: The account's data is validated manually within the handler.
    pub randomness_account_data: AccountInfo<'info>,
}

pub fn handler(ctx: Context<Roll>) -> Result<()> {
    let clock = Clock::get()?;
    let lottery = &mut ctx.accounts.lottery;
    let roll = &mut ctx.accounts.roll;

    if lottery.ended {
        return Err(AlreadyEnded.into());
    }

    let randomness_data = RandomnessAccountData::parse(ctx.accounts.randomness_account_data.data.borrow()).unwrap();
    if randomness_data.seed_slot != clock.slot - 1 {
        return Err(RandomnessAlreadyRevealed.into());
    }

    roll.id = lottery.current_roll;
    roll.lottery = lottery.key();
    roll.randomness_data_account = ctx.accounts.randomness_account_data.key();
    roll.commit_slot = Some(randomness_data.seed_slot);
    lottery.rolled = true;

    msg!("Lottery rolled, lottery: {}, with prize: {:?}, roll: {}", 
        lottery.lottery_number, 
        lottery.prize, 
        roll.id
    );

    emit!(LoterryRoll {
        lottery_number: lottery.lottery_number,
        commit_slot: roll.commit_slot.unwrap(),
    });

    Ok(())
}