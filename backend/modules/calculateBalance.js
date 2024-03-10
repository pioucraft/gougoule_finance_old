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

    //update forex prices

    await calculateBalance()
    await calculateBalanceHistory()
}

await fetchQuotes()

setInterval(() => {
    fetchQuotes()
}, 1000*60*60*6);
