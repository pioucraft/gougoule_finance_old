<script>

</script>

<style>
    #accounts {
        gap: 4%;
        padding: 2%;
        padding-left: 4%;        
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-gap: 1rem;
        align-items: stretch;
    }

    .accounts-accountCard {
        box-shadow: 0 0 20px rgb(174, 174, 174);
        border-radius: 1.5rem;
        height: 5em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-right: 1em;
        padding-left: 1em;
    }

    .accounts-accountCard-balances {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        margin-top: 1em;
    }

    .accounts-accountCard-balancePreferedCurrency {
        color: gray;
        font-weight: 100;
    }

    @media (max-width: 60em) {
        #accounts {
            grid-template-columns: auto;
        }
    }
</style>

<div id="accounts">
    <div class="accounts-accountCard">
        <h2 class="accounts-accountCard-title">Account 1</h2>
        <div class="accounts-accountCard-balances">
            <h3 class="accounts-accountCard-balance">143.56$</h3>
            <h4 class="accounts-accountCard-balancePreferedCurrency">125.36 CHF</h4>
        </div>
    </div>
    <div class="accounts-accountCard">
        <h2 class="accounts-accountCard-title">Account 1</h2>
        <div class="accounts-accountCard-balances">
            <h3 class="accounts-accountCard-balance">143.56$</h3>
            <h4 class="accounts-accountCard-balancePreferedCurrency">125.36 CHF</h4>
        </div>
        
    </div>
    
</div>