use anchor_lang::prelude::*;
#[error_code]
pub enum LotteryError {
    #[msg("Cannot cancel rolled lottery")]
    CannotCancelRolledLottery,

    #[msg("Invalid authority")]
    InvalidAuthority,

    #[msg("Invalid prize mint")]
    InvalidPrizeMint,

    #[msg("Lottery already ended")]
    AlreadyEnded,

    #[msg("Randomness already revealed")]
    RandomnessAlreadyRevealed,

    #[msg("Lottery not rolled")]
    LotteryNotRolled,

    #[msg("Incorrect randomness")]
    IncorrectRandomness,

    #[msg("Lottery rolled")]
    LotteryRolled,

    #[msg("Roll not started")]
    RollNotStarted,

    #[msg("Not enough time between rolls")]
    NotEnoughTimeBetweenRolls,

    #[msg("Roll stale")]
    RollStale,

    #[msg("Winner already picked")]
    WinnerAlreadyPicked,

    #[msg("Invalid ipfs url")]
    InvalidIpfsUrl,

    #[msg("Invalid prize")]
    InvalidPrize,

    #[msg("Random value already set")]
    RandomValueAlreadySet,
}