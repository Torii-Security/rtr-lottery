/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/rtr_lottery.json`.
 */
export type RtrLottery = {
  "address": "RTR9dcRa944pvid1nNqPQgt5TwvfZDtt5o79YQFSBbM",
  "metadata": {
    "name": "rtrLottery",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "cancelLottery",
      "discriminator": [
        85,
        35,
        29,
        73,
        218,
        192,
        9,
        166
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "lotterySettings"
          ]
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "lottery",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "lottery_settings.current_lottery",
                "account": "lotterySettings"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "finishLottery",
      "discriminator": [
        143,
        196,
        52,
        239,
        22,
        171,
        102,
        91
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "lotterySettings"
          ]
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "lottery",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "lottery.lottery_number",
                "account": "lottery"
              }
            ]
          }
        },
        {
          "name": "roll",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "lottery"
              },
              {
                "kind": "account",
                "path": "lottery.current_roll",
                "account": "lottery"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeLotterySettings",
      "discriminator": [
        50,
        48,
        43,
        90,
        188,
        204,
        77,
        15
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "timeBetweenRolls",
          "type": "i64"
        }
      ]
    },
    {
      "name": "modifyLotterySettingsAuthority",
      "discriminator": [
        58,
        202,
        75,
        195,
        65,
        249,
        132,
        137
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "lotterySettings"
          ]
        },
        {
          "name": "newAuthority"
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "modifyLotterySettingsTimeBetweenRolls",
      "discriminator": [
        185,
        248,
        209,
        190,
        215,
        36,
        41,
        81
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "lotterySettings"
          ]
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "timeBetweenRolls",
          "type": "i64"
        }
      ]
    },
    {
      "name": "pickWinner",
      "discriminator": [
        227,
        62,
        25,
        73,
        132,
        106,
        68,
        96
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "lotterySettings"
          ]
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "lottery",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "lottery.lottery_number",
                "account": "lottery"
              }
            ]
          }
        },
        {
          "name": "roll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "lottery"
              },
              {
                "kind": "account",
                "path": "lottery.current_roll",
                "account": "lottery"
              }
            ]
          }
        },
        {
          "name": "randomnessAccountData"
        }
      ],
      "args": []
    },
    {
      "name": "prepareNextRoll",
      "discriminator": [
        209,
        66,
        140,
        88,
        42,
        234,
        6,
        169
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "lotterySettings"
          ]
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "lottery",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "lottery.lottery_number",
                "account": "lottery"
              }
            ]
          }
        },
        {
          "name": "roll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "lottery"
              },
              {
                "kind": "account",
                "path": "lottery.current_roll",
                "account": "lottery"
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "roll",
      "discriminator": [
        143,
        143,
        93,
        91,
        13,
        254,
        64,
        93
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "lotterySettings"
          ]
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "lottery",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "lottery.lottery_number",
                "account": "lottery"
              }
            ]
          }
        },
        {
          "name": "roll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "lottery"
              },
              {
                "kind": "account",
                "path": "lottery.current_roll",
                "account": "lottery"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "randomnessAccountData"
        }
      ],
      "args": []
    },
    {
      "name": "setRollWinner",
      "discriminator": [
        238,
        47,
        53,
        170,
        93,
        100,
        183,
        25
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "lotterySettings"
          ]
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "lottery",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "lottery.lottery_number",
                "account": "lottery"
              }
            ]
          }
        },
        {
          "name": "roll",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  111,
                  108,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "lottery"
              },
              {
                "kind": "account",
                "path": "lottery.current_roll",
                "account": "lottery"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "winner",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "startLottery",
      "discriminator": [
        147,
        169,
        51,
        138,
        238,
        210,
        131,
        210
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true,
          "relations": [
            "lotterySettings"
          ]
        },
        {
          "name": "lotterySettings",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121,
                  95,
                  115,
                  101,
                  116,
                  116,
                  105,
                  110,
                  103,
                  115
                ]
              }
            ]
          }
        },
        {
          "name": "lottery",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  108,
                  111,
                  116,
                  116,
                  101,
                  114,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "lottery_settings.current_lottery",
                "account": "lotterySettings"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "prize",
          "type": "string"
        },
        {
          "name": "ipfsUrl",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "lottery",
      "discriminator": [
        162,
        182,
        26,
        12,
        164,
        214,
        112,
        3
      ]
    },
    {
      "name": "lotterySettings",
      "discriminator": [
        124,
        156,
        160,
        45,
        173,
        228,
        110,
        214
      ]
    },
    {
      "name": "roll",
      "discriminator": [
        161,
        58,
        48,
        84,
        21,
        66,
        7,
        123
      ]
    }
  ],
  "events": [
    {
      "name": "loterryRoll",
      "discriminator": [
        166,
        177,
        42,
        79,
        249,
        228,
        99,
        152
      ]
    },
    {
      "name": "lotteryCanceled",
      "discriminator": [
        133,
        26,
        202,
        111,
        251,
        117,
        195,
        172
      ]
    },
    {
      "name": "lotteryCancelled",
      "discriminator": [
        106,
        48,
        195,
        83,
        38,
        145,
        61,
        131
      ]
    },
    {
      "name": "lotteryFinalized",
      "discriminator": [
        102,
        31,
        12,
        47,
        182,
        88,
        40,
        184
      ]
    },
    {
      "name": "lotteryInitialized",
      "discriminator": [
        198,
        188,
        153,
        94,
        232,
        47,
        124,
        219
      ]
    },
    {
      "name": "lotterySettingsAuthorityModified",
      "discriminator": [
        22,
        133,
        210,
        137,
        18,
        9,
        149,
        69
      ]
    },
    {
      "name": "lotterySettingsTimeBetweenRollsModified",
      "discriminator": [
        94,
        73,
        215,
        21,
        181,
        173,
        76,
        216
      ]
    },
    {
      "name": "lotteryStarted",
      "discriminator": [
        191,
        235,
        105,
        84,
        209,
        221,
        90,
        107
      ]
    },
    {
      "name": "pickWinner",
      "discriminator": [
        124,
        212,
        118,
        166,
        97,
        196,
        117,
        158
      ]
    },
    {
      "name": "prepareNextRoll",
      "discriminator": [
        64,
        80,
        85,
        33,
        11,
        12,
        98,
        105
      ]
    },
    {
      "name": "setRollWinner",
      "discriminator": [
        169,
        165,
        252,
        78,
        67,
        145,
        116,
        84
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "cannotCancelRolledLottery",
      "msg": "Cannot cancel rolled lottery"
    },
    {
      "code": 6001,
      "name": "invalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6002,
      "name": "invalidPrizeMint",
      "msg": "Invalid prize mint"
    },
    {
      "code": 6003,
      "name": "alreadyEnded",
      "msg": "Lottery already ended"
    },
    {
      "code": 6004,
      "name": "randomnessAlreadyRevealed",
      "msg": "Randomness already revealed"
    },
    {
      "code": 6005,
      "name": "lotteryNotRolled",
      "msg": "Lottery not rolled"
    },
    {
      "code": 6006,
      "name": "incorrectRandomness",
      "msg": "Incorrect randomness"
    },
    {
      "code": 6007,
      "name": "lotteryRolled",
      "msg": "Lottery rolled"
    },
    {
      "code": 6008,
      "name": "rollNotStarted",
      "msg": "Roll not started"
    },
    {
      "code": 6009,
      "name": "notEnoughTimeBetweenRolls",
      "msg": "Not enough time between rolls"
    },
    {
      "code": 6010,
      "name": "rollStale",
      "msg": "Roll stale"
    },
    {
      "code": 6011,
      "name": "winnerAlreadyPicked",
      "msg": "Winner already picked"
    },
    {
      "code": 6012,
      "name": "invalidIpfsUrl",
      "msg": "Invalid ipfs url"
    },
    {
      "code": 6013,
      "name": "invalidPrize",
      "msg": "Invalid prize"
    },
    {
      "code": 6014,
      "name": "randomValueAlreadySet",
      "msg": "Random value already set"
    }
  ],
  "types": [
    {
      "name": "loterryRoll",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNumber",
            "type": "u64"
          },
          {
            "name": "commitSlot",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "lottery",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNumber",
            "type": "u64"
          },
          {
            "name": "prizeId",
            "type": "u64"
          },
          {
            "name": "winner",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "winningRoll",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "currentRoll",
            "type": "u64"
          },
          {
            "name": "lastRollTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "ended",
            "type": "bool"
          },
          {
            "name": "rolled",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "ipfsUrl",
            "type": "string"
          },
          {
            "name": "prize",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "lotteryCanceled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNumber",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "lotteryCancelled",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNumber",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "lotteryFinalized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNumber",
            "type": "u64"
          },
          {
            "name": "winner",
            "type": "pubkey"
          },
          {
            "name": "prizeId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "lotteryInitialized",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "lotterySettings",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "currentLottery",
            "type": "u64"
          },
          {
            "name": "timeBetweenRolls",
            "type": "i64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "lotterySettingsAuthorityModified",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "previousAuthority",
            "type": "pubkey"
          },
          {
            "name": "newAuthority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "lotterySettingsTimeBetweenRollsModified",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "previousTimeBetweenRolls",
            "type": "i64"
          },
          {
            "name": "newTimeBetweenRolls",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "lotteryStarted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNumber",
            "type": "u64"
          },
          {
            "name": "prize",
            "type": "string"
          },
          {
            "name": "ipfsUrl",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "pickWinner",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNumber",
            "type": "u64"
          },
          {
            "name": "ipfsUrl",
            "type": "string"
          },
          {
            "name": "randomValue",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "prepareNextRoll",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNumber",
            "type": "u64"
          },
          {
            "name": "rollId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "roll",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "u64"
          },
          {
            "name": "stale",
            "type": "bool"
          },
          {
            "name": "lottery",
            "type": "pubkey"
          },
          {
            "name": "commitSlot",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "rollTime",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "potentialWinner",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "randomnessDataAccount",
            "type": "pubkey"
          },
          {
            "name": "randomValue",
            "type": {
              "option": {
                "array": [
                  "u8",
                  32
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "setRollWinner",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNumber",
            "type": "u64"
          },
          {
            "name": "rollId",
            "type": "u64"
          },
          {
            "name": "potentialWinner",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
