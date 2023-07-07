import { getStorage, setStorage } from "./api.js";

let todoContainer = document.querySelector("ul.doto-container");
//edit task
export const editTask = async()=>{
     
    const btns = document.querySelectorAll(".doto-edit");
    let states =  await getStorage();
     Array.from(btns).forEach((btn)=>{
            btn.addEventListener("click", (e)=>{
            e.preventDefault();
            let inputs = states.filter((x)=>x.id == btn.id)[0];
            document.querySelector(".input").value = inputs.input;
            document.querySelector(".input").id= `${inputs.id}`;
            })
     });
     document.querySelector(".edit").addEventListener("click",(e)=>{
        e.preventDefault();
        const data ={
            id: document.querySelector(".input").id,
            input: document.querySelector(".input").value
        }
        if(data.id != 0 && data.input !=" "){
            todoContainer.replaceChildren();
            displayData(data);
            document.querySelector(".input").id="";
            document.querySelector(".input").value="";
        }
    
})

}
//end edit task

//delete task
export const deleteTask=()=>{
   
    const btns = document.querySelectorAll(".doto-delete");
    
    Array.from(btns).forEach((btn)=>{
        //console.log(btn);
       btn.addEventListener("click",async()=>{
        let states = await getStorage();
        //console.log(btn);
        const inputs = states.filter((x)=> btn.id!=x.id);
        
        setStorage(inputs);
      //  console.log(inputs);
        todoContainer.replaceChildren();
        displayContainer(inputs);
       })
       
    })
}

export const displayContainer=(datas)=>{

    datas.forEach((x)=>{
        todoContainer.innerHTML +=`<li id="listes">
        <p>${x.input}</p>
        <div>
            <button class="doto-edit"  id=${x.id}>Edit</button>
            <button class="doto-delete btn" id=${x.id}>Delete</button>
        </div>
    </li>`
    });
}
 export const displayData = async(data)=>{
    let states = await getStorage();
    const inputs = states.filter((x)=>x.id != data.id);
    inputs.unshift(data);
    setStorage(inputs);
    displayContainer(inputs);
         }
// end display tasks
//display tasks

export const main = async()=>{
    const states = await getStorage();
    if(states.length !==0){
        displayContainer(states);
    }
    const todoForm = document.querySelector(".doto-form");
        todoForm.addEventListener("submit",(e)=>{
        e.preventDefault();
    })
    document.querySelector(".submit").addEventListener("click",async(e)=>{
        e.preventDefault();
        if(document.querySelector(".input").value !== ""){
            const data ={
                id: Math.random(),
                input: document.querySelector(".input").value
            }
            todoContainer.replaceChildren();
            await displayData(data);
         }
         document.querySelector(".input").value = "";
    });
    
   await editTask();
   deleteTask();
    //todoContainer.addEventListener("loader")
    todoContainer.addEventListener("click",async()=>{
       await editTask();
        deleteTask();
    })
}
