<style>
    #addTransaction {
        width: 100%;
        padding: 2%;
        padding-left: 4%;
    }

    #addTransaction-name {
        width: 100%;
    }

    #addTransaction-name-text {
        margin-top: 0;
    }

    #addTransaction-name-input {
        width: calc(100% - 1rem);
        height: 4rem;
        background-color: transparent;
        border-radius: 1.5rem;
        border: 2px solid;
        outline: none;
        font-size: x-large;
        padding-left: 1rem;
        align-items: center;
    }

    #addTransaction-amount-inputs {
        width: 100%;
        height: 4rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
    }

    #addTransaction-amount-inputs * {
        background-color: transparent;
        border-radius: 1.5rem;
        border: 2px solid;
        outline: none;
        font-size: x-large;
        padding-left: 1rem;
        align-items: center;
    }

    #addTransaction-date {
        height: 4em;
        width: 100%;
    }

    #addTransaction-date-input {
        background-color: transparent;
        border-radius: 1.5rem;
        border: 2px solid;
        outline: none;
        font-size: x-large;
        padding-left: 1rem;
        align-items: center;
        width: calc(100% - 1rem);
        height: 100%;
    }

    #addTransactionbutton {
        width: 100%;
        height: 4rem;
        font-size: x-large;
        margin-top: 5rem;
    }

</style>

<div id="addTransaction">
    <div id="addTransaction-name">
        <h2 id="addTransaction-name-text">Name of the transaction : </h2>
        <input type="text" id="addTransaction-name-input">
    </div>

    <div id="addTransaction-amount">
        <h2 id="addTransaction-amount-text">Amount and symbol : </h2>
        <div id="addTransaction-amount-inputs">
            <input type="number" id="addTransaction-amount-amount">
            <select type="text" id="addTransaction-amount-type">
                <option value="f">Fiat</option>
                <option value="s">Stock</option>
                <option value="c">Cryptocurrency</option>
            </select>
            <input type="text" id="addTransaction-amount-symbol">
        </div>
    </div>

    <div id="addTransaction-date">
        <h2 id="addTransaction-date-text">Date (keep empty for today) : </h2>
        <input type="date" id="addTransaction-date-input">
    </div>

    <button class="buttonWithShadow" id="addTransactionbutton">Add a transaction !</button>
</div>