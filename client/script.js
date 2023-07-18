const baseUrl = "https://crud-backend-fckh.onrender.com/api";

let myData;

//Get the data by hitting API
const getData = () => {
    fetch(`${baseUrl}/get`)
        .then(res => res.json())
        .then(data => {
            myData = [...data];
            const taskBody = document.getElementById("task-body");
            taskBody.innerHTML = "";
            data.map(item => {
                taskBody.innerHTML += `
                <div>
                    <p>${item.task}</p>
                    <div id="icons">
                        <i onClick="handleEdit(event)" id=${item._id} class="fa-solid fa-pen-to-square green"></i>
                        <i onClick="handleDelete(event)" id=${item._id} class="fa-solid fa-trash red"></i>
                    </div>
                </div>
            `
            })
        })
}
getData();

//Append task by hitting POST request
const addTask = (e) => {
    e.preventDefault();
    const input = document.getElementById('input-task');
    const newData = input.value;

    fetch(`${baseUrl}/save`, {
        method: 'POST',
        body: JSON.stringify({ task: newData }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(() => {
            input.value = '';
            getData();
        });
}

//Deleting task by hitting DELETE request
const handleDelete = (e) => {
    const deleteId = e.target.id;

    const deleteUrl = `${baseUrl}/delete/${deleteId}`;

    fetch(deleteUrl, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            getData();
        });
}

//Edit functionality to get the data of task and show it to the input section
let myId;
const handleEdit = (e) => {
    myId = e.target.id;
    myData.forEach(data => {
        if (e.target.id === data._id) {
            document.getElementById('input-task').value = data.task;
            document.querySelector('.add').classList.add("hide");
            document.querySelector('.edit').classList.remove("hide");
        }
    })

}

//Edit the task by hitting PUT request
const editTask = (e) => {
    console.log(e)
    const input = document.getElementById('input-task');
    const updatedData = input.value;
    const updateUrl = `${baseUrl}/update/${myId}`;

    fetch(updateUrl, {
        method: 'PUT',
        body: JSON.stringify({ task: updatedData }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(() => {
            input.value = '';
            document.querySelector('.add').classList.remove("hide");
            document.querySelector('.edit').classList.add("hide");
            getData();
        });
}

