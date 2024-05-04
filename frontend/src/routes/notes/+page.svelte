<div id="wrapper">
    {#if showFolders || isDesktop}
        <div id="leftBar">
        
            {#if currentLocation}
                <button use:dropzone id="leftBar-back" class="leftBar-item" on:click={() => [currentFilesAndFolders, currentLocation, opened] = expandFolder(currentLocation.split("/").slice(0, -1).join("/"), filesAndFolders)}> ← {currentLocation}/</button>
                <span style="height: 1rem;"></span>
            {/if}
            
            
            {#each currentFilesAndFolders as file}
                
                {#if !file.endsWith(".md")}
                <button use:dropzone use:draggable={file} on:click={() => [currentFilesAndFolders, currentLocation, opened] = expandFolder(file, filesAndFolders)} id="leftBar-filesAndFolders-{file}" class="leftBar-item leftBar-folder">{file.split("/")[file.split("/").length-1]}/</button>
                {/if}
            {/each}
            {#each currentFilesAndFolders as file}
                
                {#if file.endsWith(".md")}
                    <button use:draggable={file} on:click={async () => [openedNoteContent, lastSavedNoteContent , opened, showFolders] = await openNote(url, file, showFolders)} id="leftBar-filesAndFolders-{file}" class="leftBar-item">{file.split(".md")[0].split("/")[file.split("/").length-1]}</button>
                {/if}
            {/each}
            <div id="leftBar-buttons">
                <button id="leftBar-buttons-newFolderButton" class="leftBar-item" on:click={async () => [filesAndFolders, currentFilesAndFolders] = await createNewFolder(url, currentLocation)}>Create new folder</button>
                <button id="leftBar-buttons-newNoteButton" class="leftBar-item" on:click={async () => [filesAndFolders, currentFilesAndFolders] = await createNewNote(url, currentLocation)}>Create new note</button>
            </div>
        
        </div>
    {/if}
    <div id="editor">
        <div id="editor-top">
            {#if !isDesktop}
                <button on:click={() => showFolders = !showFolders} id="editor-top-directories">
                    {#if showFolders}
                        Hide folders
                    {:else}
                        Show folders
                    {/if}
                </button>
            {/if}
            <p id="editor-top-path">/{opened}</p>
        </div>
        
        <div id="editor-title">
            <h1 id="editor-title-title">{opened.split("/")[opened.split("/").length-1].split(".md")[0]}</h1>
            {#if opened}
                <button id="editor-title-edit" on:click={async () => [filesAndFolders, currentFilesAndFolders, location, opened] = await editNote(url, opened)}><svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
                <button id="editor-title-delete" on:click={async () => { if(confirm("Are you sure ?")) [filesAndFolders, currentFilesAndFolders, location, opened] = await deleteNote(url, opened)}}><svg data-slot="icon" aria-hidden="true" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
            {/if}
            {#if opened.endsWith(".md")}
                <button id="editor-title-modifyOrView" on:click={() => editingNote = editOrNoteANote(editingNote)}>
                    {#if editingNote}
                        Show
                    {:else}
                       Edit 
                    {/if}
                </button>
                {#if openedNoteContent == lastSavedNoteContent}
                    <p>Saved</p>
                {:else}
                    <p>Not saved</p>
                {/if}
                
            {/if}
        </div>
        {#if opened.endsWith(".md")}
            {#if editingNote}
            <textarea on:input={textAreaResize} bind:value={openedNoteContent} id="editor-editor"></textarea>
            {:else}
                <div>
                    {@html converter.makeHtml(openedNoteContent)}
                </div>
            {/if}
        {/if}
    </div>
</div>


<script>
    import { onMount } from "svelte";
    import showdown from "showdown"

    import { createNewFolder, createNewNote, expandFolder, makeData, editNote, deleteNote, openNote, textAreaResize, saveNote, editOrNoteANote } from "./script"
    import { draggable, dropzone } from "./dnd"

    var filesAndFolders = []
    var currentFilesAndFolders = [""]
    var currentLocation = ""
    var opened = ""

    var openedNoteContent = ""
    var lastSavedNoteContent = openedNoteContent
    
    var editingNote = true
    var showFolders = true
    var isDesktop = true

    const converter = new showdown.Converter({"tasklists": true, "strikethrough": true, "simplifiedautolink": true, "tables": true})

    setInterval(async () => {
        if(lastSavedNoteContent != openedNoteContent && opened.endsWith(".md")){
            lastSavedNoteContent = await saveNote(url, opened, openedNoteContent)
        }
    }, 2*1000);

    var url = import.meta.env.VITE_BACKEND_URL
    onMount(async () => {
        filesAndFolders = await makeData(url)
        currentFilesAndFolders = filesAndFolders.filter(file =>!file.includes("/"))
        isDesktop = window.innerHeight < window.innerWidth
    })
    
</script>

<style>
    @import "./style.css";
</style>