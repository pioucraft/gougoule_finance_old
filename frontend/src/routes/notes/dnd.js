import { getCookie } from 'svelte-cookie';

import axios from "axios"

export function draggable(node, data) {
    let state = data

    node.draggable = true

    function handle_dragstart(e){
        e.dataTransfer.setData("text/plain", state)
    }

    node.addEventListener('dragstart', handle_dragstart);
    return {
        update(data) {
            state = data
        },
        destroy() {
            node.removeEventListener('dragstart', handle_dragstart)
        }
    }
}


export function dropzone(node, options) {
	let state = {
		dropEffect: 'move',
		dragover_class: 'droppable',
		...options
	};

	function handle_dragenter(e) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.add(state.dragover_class);
	}

	function handle_dragleave(e) {
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
	}

	function handle_dragover(e) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		e.dataTransfer.dropEffect = state.dropEffect;
	}

	function handle_drop(e) {
		e.preventDefault();
		if (!e.dataTransfer) return;
		const data = e.dataTransfer.getData('text/plain');
		if (!(e.target instanceof HTMLElement)) return;
		e.target.classList.remove(state.dragover_class);
        handleFileMove(data, e.target.outerText)
	}

	node.addEventListener('dragenter', handle_dragenter);
	node.addEventListener('dragleave', handle_dragleave);
	node.addEventListener('dragover', handle_dragover);
	node.addEventListener('drop', handle_drop);

	return {
		update(options) {
			state = {
				dropEffect: 'move',
				dragover_class: 'droppable',
				...options
			};
		},

		destroy() {
			node.removeEventListener('dragenter', handle_dragenter);
			node.removeEventListener('dragleave', handle_dragleave);
			node.removeEventListener('dragover', handle_dragover);
			node.removeEventListener('drop', handle_drop);
		}
	};
}

function handleFileMove(original, data) {

    if(data.startsWith("←")) {
		moveFile(original, original.split("/").slice(0, -2).join("/"))
    }
    else {
		moveFile(original, `${original.split("/").slice(0, -1).join("/")}/${data}`)
    }
}

async function moveFile(original, newLocation) {
    let password = getCookie("password")
    let email = getCookie("email")
	let url = import.meta.env.VITE_BACKEND_URL
    let fetchBody = JSON.stringify({"email": email, "password": password, "location": original, "newLocation": newLocation})
	try {
		await axios.post(`${url}/api/moveNote`, fetchBody)
	}
	catch(err) {
		alert("Error")
	}
	
    window.location.reload()
}