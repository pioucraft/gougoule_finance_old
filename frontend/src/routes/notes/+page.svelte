<div id="wrapper">
    <div id="leftBar">
        {#if currentLocation}
            <button id="leftBar-back" class="leftBar-item" on:click={() => [currentFilesAndFolders, currentLocation] = expandFolder(currentLocation.split("/").slice(0, -1).join("/"), filesAndFolders)}> &#60; {currentLocation}</button>
        {/if}
        
        {#each currentFilesAndFolders as file}
            
            {#if file.endsWith(".html")}
                <button id="leftBar-filesAndFolders-{file}" class="leftBar-item">{file.split(".html")[0]}</button>
            {:else}
                <button on:click={() => [currentFilesAndFolders, currentLocation] = expandFolder(file, filesAndFolders)} id="leftBar-filesAndFolders-{file}" class="leftBar-item leftBar-folder">{file}</button>
            {/if}
        {/each}
    </div>
    <div id="editor" style="background-color: aqua;"></div>
</div>

<script>
    import { expandFolder } from "./script"

    var filesAndFolders = ["test.html", "test", "test/index.html", "test/folder", "test/folder/2.html", "test/folder/anotherFolder", "test/folder/anotherFolder/yeatAnotherFolder", "test/folder/anotherFolder/yeatAnotherFolder/hi.html"]
    var currentFilesAndFolders = filesAndFolders.filter(file =>!file.includes("/"))
    var currentLocation = ""
    /*
    <p>
        TODO :
        <br>
        add leftBar 
        <br>
        add javascript to fetch items on leftBar
        <br>
        add editor
        <br>
        add javascript to fetch content of a file

    </p>
    */
</script>

<style>
    @import "./style.css";
</style>