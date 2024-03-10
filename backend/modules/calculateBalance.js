import { DBClient } from "./db"

export async function calculateBalance() {
    
}

async function calculateBalanceHistory() {

}

async function fetchQuotes() {
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
            console.log((await DBClient.query("SELECT * FROM converter WHERE symbol = $1 AND type = 'c';", [symbol])).rows[0])
            await DBClient.query("UPDATE converter SET price = $1 WHERE symbol = $2 AND type = 'c';", [crypto.price, symbol])
            console.log((await DBClient.query("SELECT * FROM converter WHERE symbol = $1 AND type = 'c';", [symbol])).rows[0])
        }
    }

    //update forex prices

    await calculateBalance()
    await calculateBalanceHistory()
}

await fetchQuotes()

setInterval(() => {
    fetchQuotes()
}, 1000*60*60*6);
