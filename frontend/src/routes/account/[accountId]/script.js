import { getCookie } from 'svelte-cookie';
import axios from 'axios';

export async function createData(data, url) {
    //fetch the data and asign it
    let dataFetched = await fetchData(data, url)

    let balanceHistory = dataFetched.balanceHistory
    let defaultCurrency = dataFetched.defaultCurrency
    let listOfTransactions = dataFetched.listOfTransactions
    let fetchedAccounts = dataFetched.fetchedAccounts

    // make some other things
    let accounts = makeAccounts(fetchedAccounts)
    let transactions = makeTransactions(listOfTransactions)

    let balanceHistoryArray = balanceHistory.reverse().sort((a, b) => new Date(b.date) - new Date(a.date))

    let balance = "$"+balanceHistoryArray[0].balance.toFixed(2)
    let balanceInLocalCurrency = `${(balanceHistoryArray[0].balance * defaultCurrency.price).toFixed(2)} ${defaultCurrency.defaultcurrency}`

    let profit = makeProfit(balanceHistoryArray)
    let profitColor = Number(profit.split("(")[1].split("$")[0]) < 0 ? "red" : "green"
    

    let portfolio = Object.entries(JSON.parse(balanceHistoryArray[0].portfolio))
    let assets = makeAssets(portfolio, balanceHistoryArray)

    return {balanceHistoryArray, transactions, portfolio, assets, profit, profitColor, balance, balanceInLocalCurrency, accounts}
}

async function fetchData(data, url) {
    let password = getCookie("password")
    let email = getCookie("email")
    let fetchBody = JSON.stringify({"email": email, "password": password})

    if(data.accountId != "main") {
        fetchBody = JSON.stringify({"email": email, "password": password, "account": data.accountId})
    }
    
    let balanceHistory = (await axios.post(`${url}/api/getBalanceHistory`, fetchBody)).data
    let defaultCurrency = (await axios.post(`${url}/api/defaultCurrency`, fetchBody)).data
    let listOfTransactions = (await axios.post(`${url}/api/getTransactions`, fetchBody)).data
    let fetchedAccounts = (await axios.post(`${url}/api/getAccounts`, fetchBody)).data

    return {balanceHistory, defaultCurrency, listOfTransactions, fetchedAccounts}
}

function makeAccounts(fetchedAccounts) {
    let accounts = {}

    fetchedAccounts.forEach(fetchedAccount => {
        accounts[fetchedAccount.id] = fetchedAccount.name
    })

    return accounts
}

function makeTransactions(listOfTransactions) {
    let transactions = []
    let listOfTransactionsDates = []

    listOfTransactions = listOfTransactions.sort((a, b) => (b.id - a.id))

    listOfTransactions.forEach(transaction => {
        let date = new Date(transaction.date).toDateString()
        if(!listOfTransactionsDates.includes(date)) {
            listOfTransactionsDates.push(date)
            transactions.push([date, []])
        }
        transactions[listOfTransactionsDates.indexOf(date)][1].push(transaction)
    })
    return transactions
}

function makeProfit(balanceHistoryArray) {
    let profit = ""
    try {
        let balanceDiference = (balanceHistoryArray[0].balance - balanceHistoryArray[1].balance).toFixed(2)
        let profitPercentage = ((balanceDiference / balanceHistoryArray[0].balance) * 100).toFixed(2)

        profit = `(${balanceDiference}$; ${profitPercentage}%)`
    }
    catch(err) {

    }

    return profit
}

function makeAssets(portfolio, balanceHistoryArray) {
    let assets = [["Other", 0]]
    for(let asset of portfolio) {
        if(asset[1]/balanceHistoryArray[0].balance*100 < 10) {
          assets[0][1] += asset[1]/balanceHistoryArray[0].balance*100
        }
        else {
          assets.push([asset[0].split(":")[0], asset[1]/balanceHistoryArray[0].balance*100])
        }
        
    }
    assets = assets.sort((a, b) => b[1] - a[1])
    return assets
}