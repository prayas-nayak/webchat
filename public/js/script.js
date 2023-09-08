
let sendBtn=document.getElementById("sendMessage");
let textInput=document.getElementById("inputMessage");
let hero=document.getElementById("hero");


// Function to scroll to the bottom of the div
function scrollToBottom() {
    hero.scrollTop = hero.scrollHeight;
}

// Create a MutationObserver to watch for changes in the div's content
const observer = new MutationObserver(scrollToBottom);

// Configure the observer to watch for child list changes (i.e., new content added)
const observerConfig = { childList: true };

// Start observing the div
observer.observe(hero, observerConfig);

//................................Socket.....................................
const socket=io();
var name = prompt("Enter your name", 'user');

// Convert the input name to lowercase for case-insensitive matching
var lowercaseName = name.toLowerCase();

// Define an array of valid names
var validNames = ["prayas", "admin"];

if (validNames.includes(lowercaseName)) {
    var pass = prompt("Enter Admin password");
    if (pass === "Prayas@2558") {
        socket.emit("userJoined", name);
    }
}

socket.on("fromServerThatNewUserJoined",(newUserName)=>{
    let joinedDiv=document.createElement("div");
    joinedDiv.classList.add("joined-message")
    joinedDiv.textContent=`${newUserName} joined this chart`;
    hero.appendChild(joinedDiv);
})


sendBtn.addEventListener("click",()=>{
    let msg=textInput.value;
    if (msg !=""){
        messageObj={sender:name,message:msg};
        socket.emit('messageFromClient',messageObj);
        textInput.value="";

        let div=document.createElement("div");
        div.classList.add("you-message")
        div.textContent="you :"+msg;
        hero.appendChild(div);
    }
})

window.addEventListener("keypress",(e)=>{
    if (e.key=="Enter"){
        let msg=textInput.value;
        console.log(e.key);
        if (msg !=""){
            messageObj={sender:name,message:msg}
            socket.emit('messageFromClient',messageObj);
            textInput.value="";

            let div=document.createElement("div");
            div.classList.add("you-message")
            div.textContent="you :"+msg;
            hero.appendChild(div)
        }
    }
})

socket.on("messageFromServer",(finalMessage)=>{
    console.log(finalMessage);
    let div=document.createElement("div");
    div.classList.add("other-message")
    div.textContent=`${finalMessage.sender} : ${finalMessage.message}`;
    hero.appendChild(div);
    
})



//.......................Mode.............................

// let dark=document.getElementById("dark");
// let light=document.getElementById("light");

// dark.addEventListener("click",()=>{

//     document.body.style.color="white";
//     document.body.style.backgroundColor="black";


//     textInput.style.color="white";
//     textInput.style.backgroundColor="black";

//     sendBtn.style.color="white";
//     sendBtn.style.backgroundColor="black";

// })

// light.addEventListener("click",()=>{
//     document.body.style.color="black";
//     document.body.style.backgroundColor="white";

//     textInput.style.color="black";
//     textInput.style.backgroundColor="white";

//     sendBtn.style.color="black";
//     sendBtn.style.backgroundColor="white";
// })