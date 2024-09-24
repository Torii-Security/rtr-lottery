use anchor_lang::prelude::*;
use crate::events::LotteryStarted;
use crate::state::{Lottery, LotterySettings};
use crate::constants::{LOTTERY_SEED, LOTTERY_SETTINGS_SEED, MAX_IPFS_URL_LENGTH, MAX_PRIZE_LENGTH};
use crate::errors::LotteryError::{self, InvalidAuthority};

#[derive(Accounts)]
pub struct StartLottery<'info> {
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
        init,
        payer = authority,
        space = 8 + std::mem::size_of::<Lottery>() + 200,
        seeds = [LOTTERY_SEED.as_ref(), &lottery_settings.current_lottery.to_le_bytes()],
        bump
    )]
    pub lottery: Account<'info, Lottery>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn handler(ctx: Context<StartLottery>, prize: String, ipfs_url: String) -> Result<()> {
    let lottery_settings = &mut ctx.accounts.lottery_settings;
    let lottery = &mut ctx.accounts.lottery;

    if ipfs_url.len() > MAX_IPFS_URL_LENGTH {
        return Err(LotteryError::InvalidIpfsUrl.into());
    }

    if prize.len() > MAX_PRIZE_LENGTH {
        return Err(LotteryError::InvalidPrize.into());
    }

    // Initialize the new lottery
    lottery.lottery_number = lottery_settings.current_lottery;
    lottery.prize = prize;
    lottery.ipfs_url = ipfs_url;
    lottery.winner = None;
    lottery.ended = false;
    lottery.current_roll = 0;
    lottery.bump = ctx.bumps.lottery;

    msg!("Lottery {} started with prize: {:?}, and snapshot: {:?}", 
        lottery.lottery_number, 
        lottery.prize.clone(), 
        lottery.ipfs_url.clone()
    );

    emit!(LotteryStarted {
        lottery_number: lottery.lottery_number,
        prize: lottery.prize.clone(),
        ipfs_url: lottery.ipfs_url.clone(),
    });

    Ok(())
}