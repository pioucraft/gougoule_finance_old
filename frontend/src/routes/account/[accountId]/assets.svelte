<div class="assets">
    <p class="text-2xl font-semibold">Assets :</p>
    <div id="assets-graph" class="w-full">
      {#each assets as asset}
        <div style="width: {asset[1]}%;" class="assets-{assets.indexOf(asset)} asset"><p>{asset[0]}</p></div>
      {/each}
    </div>

    <div class="assets-hover">
      <ul>
        {#each portfolio as asset}
          <li>{asset[0].split(":")[0]} : {asset[1].toFixed(2)} USD</li>
        {/each}
      </ul>
    </div>
</div>

<script>
    export let assets
    export let portfolio
</script>