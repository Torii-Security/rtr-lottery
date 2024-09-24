use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;
use switchboard_on_demand::RandomnessAccountData;
use crate::events::PickWinner as PickWinnerEvent;
use crate::state::{Lottery, LotterySettings, Roll};
use crate::constants::{LOTTERY_SEED, LOTTERY_SETTINGS_SEED, ROLL_SEED};
use crate::errors::LotteryError::{InvalidAuthority, AlreadyEnded, IncorrectRandomness, RollStale, RandomValueAlreadySet};

#[derive(Accounts)]
pub struct PickWinner<'info> {
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
    /// CHECK: The account's data is validated manually within the handler.
    pub randomness_account_data: AccountInfo<'info>,
}

pub fn handler(ctx: Context<PickWinner>) -> Result<()> {
    let clock = Clock::get()?;
    let lottery = &mut ctx.accounts.lottery;
    let roll = &mut ctx.accounts.roll;

    if lottery.ended {
        return Err(AlreadyEnded.into());
    }

    if roll.stale {
        return Err(RollStale.into());
    }
    
    if roll.random_value.is_some() {
        return Err(RandomValueAlreadySet.into());
    }

    if roll.randomness_data_account != ctx.accounts.randomness_account_data.key() {
        return Err(IncorrectRandomness.into());
    }

    // call the switchboard on-demand parse function to get the randomness data
    let randomness_data = RandomnessAccountData::parse(ctx.accounts.randomness_account_data.data.borrow()).unwrap();
    if randomness_data.seed_slot != roll.commit_slot.unwrap() {
        return Err(IncorrectRandomness.into());
    }
    // call the switchboard on-demand get_value function to get the revealed random value
    let revealed_random_value = randomness_data.get_value(&clock)
        .map_err(|_| IncorrectRandomness)?;

    roll.random_value = Some(revealed_random_value);
    roll.roll_time = Some(clock.unix_timestamp);

    msg!("Random value revealed for lottery: {} ({:?}), roll: {}, with random value: {:?}", 
        lottery.lottery_number, 
        lottery.prize, 
        roll.id, 
        revealed_random_value
    );

    emit!(PickWinnerEvent {
        lottery_number: lottery.lottery_number,
        ipfs_url: lottery.ipfs_url.clone(),
        random_value: roll.random_value.unwrap(),
    });

    Ok(())
}