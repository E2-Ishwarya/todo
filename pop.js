document.getElementById('addNew').addEventListener('click',function()
{
 document.querySelector('.pop').style.display="flex";
});

document.querySelector('.close').addEventListener('click',function()
{
 document.querySelector('.pop').style.display="none";
});
let textInput=document.getElementById("textInput");
let phoneInput=document.getElementById("phoneInput");
let mailInput=document.getElementById("mailInput");
let msg=document.getElementById("msg");
let form=document.getElementById("form");
let tasks=document.getElementById("tasks");
    form.addEventListener("submit",function(e)
        {
          e.preventDefault();
          formvalidate();
        }
    );
let formvalidate=function()
{
    if(textInput.value ==="" || phoneInput.value ==="" || mailInput.value ==="")
    {
     console.log("failure");
     msg.innerHTML="*All fields should be filled";
    }
    else
    {
        console.log("success");
        msg.innerHTML=" ";
        acceptData();
        document.querySelector('.pop').style.display="none";
    }
};

let data=[];
let acceptData= function()
{
    data.push(
        {
        name: textInput.value,
        phone: phoneInput.value,
        mail: mailInput.value,
    });
    localStorage.setItem("data",JSON.stringify(data)) ;
    console.log(data);
    createTasks();
};  
let createTasks=function()
{
    tasks.innerHTML="";
    //x-obj y-index 
    data.map( (x,y) =>
    {
      return (tasks.innerHTML+=`
      <div id=${y}>
      <span>${x.name}</span>
      <p>${x.phone}</p>
      <p>${x.mail}</p>
      <span class="options">
          <i onclick="editTask(this)"class="fa-solid fa-pen-to-square"></i>
          <i onclick="deleteForm(this);createTasks()"  class="fa-solid fa-trash-can"></i>
      </span>
    </div>
    `);
    });
 resetForm();
};
let deleteForm=function(e)
{
   e.parentElement.parentElement.remove();
   data.splice(e.parentElement.parentElement.id,1);
   localStorage.setItem("data",JSON.stringify(data));
   console.log(data);
}
let editTask=function(e)
{
  let selectedTask=e.parentElement.parentElement;
  textInput.value=selectedTask.children[0].innerHTML;
  phoneInput.value=selectedTask.children[1].innerHTML;
  mailInput.value=selectedTask.children[2].innerHTML;
  document.querySelector('.pop').style.display="flex";
   deleteForm(e);
   // selectedTask.remove();
}
let resetForm=function()
{
    textInput.value="";
    phoneInput.value="";
    mailInput.value="";
};
//immediate invoke functional expression
(()=>
    {
    data=JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
    }
)();