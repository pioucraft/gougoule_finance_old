import { DBClient } from "./db"

export async function calculateBalance() {
    // try for each
    let generalBalance = 0;
    let accountsBalance = {}
    let transactions = (await DBClient.query("SELECT * FROM transactions")).rows;
    for(let transaction of transactions) {
        let converter = (await DBClient.query("SELECT * FROM converter WHERE symbol = $1 AND type = $2", [transaction.symbol, transaction.type])).rows[0]
        let amountInUsd = ((transaction.amount*1_000_000_000) * converter.price)/1_000_000_000;
        generalBalance += amountInUsd;
        if(accountsBalance[transaction.accountid]) accountsBalance[transaction.accountid] += amountInUsd;
        else accountsBalance[transaction.accountid] = amountInUsd;
    }
    console.log("GENERAL BALANCE: ", generalBalance)
    console.log("ACCOUNTS BALANCE: ", accountsBalance)

    await DBClient.query(`DELETE FROM balancehistory
    WHERE DATE(date) = CURRENT_DATE;`)

    await DBClient.query(`INSERT INTO balancehistory 
    (balance, isnotaccount)
    VALUES ($1, true)`, [generalBalance])

    for(let account of Object.entries(accountsBalance)) {
        console.log(account)
        await DBClient.query(`INSERT INTO balancehistory 
        (balance, accountid, isnotaccount)
        VALUES ($1, $2, false)`, [account[1], Number(account[0])])

        await DBClient.query(`UPDATE accounts SET balance = $1 WHERE id = $2`, [account[1], Number(account[0])])
    }
}

async function fetchQuotes() {
    console.log("STARTING TO UPDATE STOCKS PRICES")
    //update stocks prices
    let stocks = await (await fetch(`https://financialmodelingprep.com/api/v3/stock/list?apikey=${process.env.FINANCIAL_MODELING_PREP_API}`)).json()
    let listOfOwnedStocks = (await DBClient.query("SELECT * FROM converter WHERE currency IS NOT NULL AND type = 's';")).rows.map(x => x["symbol"])
    for(let i=0;i<stocks.length;i++) {
        let stock = stocks[i]
        if(listOfOwnedStocks.includes(stock["symbol"])) {
            await DBClient.query("UPDATE converter SET price = $1 WHERE symbol = $2 AND type = 's';", [stock["price"], stock["symbol"]])
        }
    }

    //update crypto prices
    let cryptos = await (await fetch("https://api.binance.com/api/v3/ticker/price")).json()
    for(let i=0;i<cryptos.length;i++) {
        let crypto = cryptos[i]
        if(crypto.symbol.endsWith("USDT")) {
            let symbol = crypto.symbol.split("USDT")[0]
            await DBClient.query("UPDATE converter SET price = $1 WHERE symbol = $2 AND type = 'c';", [crypto.price, symbol])
        }
    }

    //update forex prices

    let forexes = Object.entries((await (await fetch("https://api.exchangerate-api.com/v4/latest/USD")).json())["rates"])
    for(let i=0;i<forexes.length;i++) {
        let forex = forexes[i]
        await DBClient.query("UPDATE converter SET price = $1 WHERE symbol = $2 AND type = 'f'", [forex[1], forex[0]])
    }

    await calculateBalance()
    console.log("FINISHED UPDATING STOCKS PRICES")
}

//await fetchQuotes()
await calculateBalance()

setInterval(() => {
    fetchQuotes()
}, 1000*60*60*6);