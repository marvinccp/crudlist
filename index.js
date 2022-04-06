let formInfo;
console.log(formInfo);
let id = ''
console.log(id)
//localStorage.clear();


const getCrudData = () => {
    let arr = JSON.parse(localStorage.getItem("crud"));
    return arr;
};


const createData = () => {
    document.getElementById("message").textContent = "";

    let inputName = document.getElementById("name").value;
    let inputLastName = document.getElementById("LastName").value;
    let userPhone = document.getElementById("phone").value;

    let message = document.getElementById("message");

    if (!inputName || !inputLastName || !userPhone) {
      message.setAttribute("class", "red-message");
      message.textContent = "Debes llenar todos los espacios";
    } else {
      if (id === "") {
        let data = [
          {
            name: inputName,
            lastName: inputLastName,
            phone: userPhone
          },
        ];
        let arr = getCrudData();
        console.log(arr);

        if (!arr) {
            localStorage.setItem("crud", JSON.stringify(data));
        } else {
            formInfo = {
              name: inputName,
              lastName: inputLastName,
              phone: userPhone,
            };
            arr.push(formInfo);
            localStorage.setItem("crud", JSON.stringify(arr));
        }
        document.getElementById("name").value = "";
        document.getElementById("LastName").value = "";
        document.getElementById("phone").value = "";
        
        if (inputName || inputLastName) {
          message.setAttribute("class", "green-message");
            message.textContent = "Added";
            setTimeout(() => {
                message.textContent = "";
            }, 2500);
        }
    } else{
      let arr = getCrudData();
      arr[id].name = inputName
      arr[id].lastName = inputLastName;
      arr[id].phone = userPhone;
      localStorage.setItem("crud", JSON.stringify(arr));
      console.log("si hay id");
      message.textContent = `Updated id: ${"00" + (id + 1)}`;
      message.setAttribute('class', 'orange-message')
      setTimeout(() => {
        message.textContent = "";
        location.reload();
      }, 1500);
      document.getElementById("name").value = "";
      document.getElementById("LastName").value = "";
      document.getElementById("phone").value = "";
      
    }
}
selectData();
}

document.getElementById("submit")
.addEventListener("click", createData);

function selectData (){
    let arr = getCrudData();
    console.log(arr);
    if(arr !== null){
        
        let html = ''
        let serialNumber = 1
        arr.map((user, i) => {

            
            html += `<tr class='create'>
            <td>${'00' + serialNumber}</td>
            <td>${user.name}</td>
            <td>${user.lastName}</td>
            <td>${user.phone}</td>
            <td>
            <a  
            onclick='editData(${i})'
            ><button class='edit'>Edit</button></a></td>    

            <td>
            <a 
            onclick='deleteData(${i})
            '>
            <button class='delete' id='deleteData'>Delete</button></a></td>  

            </tr>`;
            serialNumber++;
        })

        document.getElementById('root').innerHTML = html
    }
}

  selectData();

  const deleteData = (i) =>{

    
      let arr = getCrudData()
        arr.splice(i, 1)
        localStorage.setItem("crud", JSON.stringify(arr));
        selectData();

      message.setAttribute("class", "red-message");
      message.textContent = `Deleted id: ${"00" + (i + 1)}`;
      setTimeout(() => {
        message.textContent = "";
        location.reload();
      }, 2500);
       
  }


  const editData = (i) =>{

      id = i;
      let arr = getCrudData();
      console.log(arr);
      document.getElementById("name").value = arr[i].name
      document.getElementById("LastName").value = arr[i].lastName
      document.getElementById("phone").value = arr[i].phone
      console.log(id)
      
    }
  
