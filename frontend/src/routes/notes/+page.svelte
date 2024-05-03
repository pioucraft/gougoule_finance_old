<div id="wrapper">
    <div id="leftBar">
        {#if currentLocation}
            <button id="leftBar-back" class="leftBar-item" on:click={() => [currentFilesAndFolders, currentLocation] = expandFolder(currentLocation.split("/").slice(0, -1).join("/"), filesAndFolders)}> ← {currentLocation}/</button>
            <span style="height: 1rem;"></span>
        {/if}
        
        
        {#each currentFilesAndFolders as file}
            
            {#if !file.endsWith(".html")}
            <button on:click={() => [currentFilesAndFolders, currentLocation] = expandFolder(file, filesAndFolders)} id="leftBar-filesAndFolders-{file}" class="leftBar-item leftBar-folder">{file.split("/")[file.split("/").length-1]}/</button>
            {/if}
        {/each}
        {#each currentFilesAndFolders as file}
            
            {#if file.endsWith(".html")}
                <button id="leftBar-filesAndFolders-{file}" class="leftBar-item">{file.split(".html")[0].split("/")[file.split("/").length-1]}</button>
            {/if}
        {/each}
        <div id="leftBar-buttons">
            <button id="leftBar-buttons-newFolderButton" class="leftBar-item">Create new folder</button>
            <button id="leftBar-buttons-newNoteButton" class="leftBar-item">Create new note</button>
        </div>
        
    </div>
    <div id="editor"></div>
</div>

<script>
    import { onMount } from "svelte";
    import { expandFolder, makeData } from "./script"

    var filesAndFolders = ["test.html", "test", "test/index.html", "test/folder", "test/folder/2.html", "test/folder/anotherFolder", "test/folder/anotherFolder/⭐ yeatAnotherFolder", "test/folder/anotherFolder/⭐ yeatAnotherFolder/hi.html"]
    var currentFilesAndFolders = filesAndFolders.filter(file =>!file.includes("/"))
    var currentLocation = ""

    var url = import.meta.env.VITE_BACKEND_URL
    onMount(async () => {
        filesAndFolders = await makeData(url)
        currentFilesAndFolders = filesAndFolders.filter(file =>!file.includes("/"))
    })
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