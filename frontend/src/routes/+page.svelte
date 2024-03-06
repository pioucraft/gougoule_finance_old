<input type="file" id="file_input" webkitdirectory="" directory="" />
<div id="list_of_files"></div>
<button on:click={test}>w</button>

<script>
    function test() {
        let listOfFiles = document.getElementById("file_input").files
        console.log(listOfFiles[0])
    }
    
</script>