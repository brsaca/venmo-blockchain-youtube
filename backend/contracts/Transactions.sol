// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

contract Transactions {
    // Number of transactions
    uint256 transactionCount;

    // This will be an event thar will be fired when a transaction is made
    event Transfer(address from, address receiver, uint amount, string message, uint timestamp);

    // Struct of the transactions thaat we will be storing on chain
    struct Transaction {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    // Array of transactions
    Transaction[] transactions;

    // Function to add a transaction to the blockchain with our struct
    function addToBlockchain(address payable receiver, uint amount, string memory message) public {
        transactionCount += 1;
        transactions.push(Transaction(msg.sender, receiver, amount, message, block.timestamp));

        // Emit the event we created earlier
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    // Fucntion to get all the transactions
    function getAllTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    // Function to get the number of transactions
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

}