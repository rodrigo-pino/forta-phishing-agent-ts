# Phishing Detection Agent

## Description

This agent detects possible phishing attacks on ERC-20 compatible tokens.

## Config

The agent exposes three configuration settings:

* `BLOCK_RANGE` in _src/const.ts_ which determines for how long a spender activity is stored on the agent. _(default: 2000)_
* `TIMES_DETECTED` in _src/const.ts_ which determines how many times does an EOA must be detected before firing an alert. _(default: 10)_
* `IGNORE_ADDRESSES` in _src/ignore.ts_ which is a set of all addresses to ignore. _(default: All exchanges listed by Etherscan)_

## Supported Chains

- Ethereum

## Alerts

- **PHISHING-ALERT-1**
  - Fired when a transaction has called `approve` or `increaseAllowance`  methods more than `TIMES_DETECTED` times in a span of `BLOCK_RANGE` blocks.
  - Severity is always set to `"high"` 
  - Type is always set to `"suspicious"` 
  - `metadata`
    * `spenderAddress`:  The alleged attacker address
    * `transactions`: All transaction hashes where suspicious activity was detected
    * `affectedAddress`: All possible victim address for every transaction
    * `contractAddresses`: All contracts that were interacted with for every transaction
    * `amounts`: All of the approved amounts for each transaction

## Test Data

- Run the agent from block`13650638` to `13652198`

