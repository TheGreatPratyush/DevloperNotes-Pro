function handleCreateFolder(){
    let folderName = prompt()
    if (folderName==null){
        return
    }

    const newFolder ={
        id : Date.now(),
        name : folderName,
        files : []

    }

    appData.folders.push(newFolder)
}

function renderFolders() {

    let folderList = document.getElementById("folderList");

    folderList.innerHTML = "";

    for (let i = 0; i < appData.folders.length; i++) {

        const folderDiv = document.createElement("div");

        folderDiv.textContent = appData.folders[i].name;

        folderDiv.style.padding = "6px";
        folderDiv.style.cursor = "pointer";

        folderList.appendChild(folderDiv);
    }
}


let appData = {
    folders : []
}
const createFolderBtn = document.querySelector(".createfolder")

createFolderBtn.addEventListener("click",handleCreateFolder)
