function handleCreateFolder(){
    let folderName = prompt("Enter folder name:")
    if (folderName==null){
        return
    }

    const newFolder ={
        id : Date.now(),
        name : folderName,
        files : []

    }

    appData.folders.push(newFolder)
    renderFolders()
}

function renderFolders() {

    // this is one of the most confusing function that is what i am felling while creating at this point 
    // because this is one of the function which is changed every time earlier we were rendring only folder now added. files rendring 

    const createFileBtn = document.getElementById("createFileBtn");
    // what is happening i am selecting the button 
    // we have appData object which has one array of objects storing all folders 
    if (appData.folders.length > 0) {
        createFileBtn.style.display = "block";
    } else {
        createFileBtn.style.display = "none";
    }
    // when even atleast one folder is created show the add file button 

    let folderList = document.getElementById("folderList");

    // selecting the div inside where all the info would be shown in the ui
    // always rendring from complete 0
    folderList.innerHTML = "";

    // looping over the all the folders so that we can show name of each folder on ui
    for (let i = 0; i < appData.folders.length; i++) {
        const folder = appData.folders[i]

        // folder is an object which has id name files as key
        const folderDiv = document.createElement("div");
        // created a div whose content is folder name 

        folderDiv.textContent = folder.name;
        // styling
        folderDiv.style.padding = "6px";
        folderDiv.style.cursor = "pointer";
        // now this is the logic of selecting the folder sice i am looping over so checcking for each wheater this is 
        // folder i have selected if yes then background changes a bit to show selected effect 
        if (folder.id===currentFolderId){
            folderDiv.style.backgroundColor="#37373d";
        }

        folderDiv.addEventListener("click",function(){
            currentFolderId=folder.id
            renderFolders()
        })
        folderList.appendChild(folderDiv);

// this is to show file name if this is the folder which i have selected then show all its files name
        if (folder.id == currentFolderId){
            for (let j= 0 ; j<folder.files.length ; j++){
                const file = folder.files[j];
                const fileDiv = document.createElement("div");
                fileDiv.textContent = "📄 " + file.name;
                fileDiv.style.padding = "6px 20px";
                fileDiv.style.cursor = "pointer";
                fileDiv.style.fontSize = "14px";
                fileDiv.style.color = "#cbd5e1";
                folderList.appendChild(fileDiv);
            }
        }

    }
}



function handleFileCreation(){
    if (currentFolderId==null){
        alert("Please Select a Folder or Create New")
        return
    }
    let fileName = prompt("Enter File Name")
    if (!fileName) return;

    const folder = appData.folders.find((f)=>{
        return f.id==currentFolderId
    })

    const newFile = {
        id : Date.now(),
        name : fileName,
        versions : []
    }

    folder.files.push(newFile)

    renderFolders()
}
// what does this function is doing is just simple first to create file you must have selected somefolder else alert 
// once selected the folder ask for filename again same errro handling then appdata is object inseide which i have folders array 
// that array is array of objects i want to get object whose id is same as current folder id. hence used a higher order fucntion find 
// created a newFile object and pushing that object in files array inside the object which is inside the array is inside appData









let currentFolderId = null

let appData = {
    folders : []
}
const createFolderBtn = document.querySelector(".createfolder")

createFolderBtn.addEventListener("click",handleCreateFolder)


document.getElementById("createFileBtn").addEventListener("click",handleFileCreation);