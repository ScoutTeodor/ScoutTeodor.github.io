window.addEventListener("load", function () {
    const container = document.getElementById('deadlines');
    console.log(container.offsetLeft)

    class Deadline {
        constructor(task, date) {
            this.task = task;
            this.date = date;
        }
    }

    let deadlines = JSON.parse(localStorage.getItem("deadlines"))
    if (deadlines == null) {
        deadlines = []
    }
    displayDeadlines()
    let taskInput = document.getElementById("task_input");
    let dateInput = document.getElementById("date_input");

    document.getElementById("todo_list").onsubmit = function (event) {
        console.log(taskInput.value, dateInput.value)
        event.preventDefault();
        let task = taskInput.value
        taskInput.value = ''
        let date = dateInput.value
        dateInput.value = ''
        deadlines.push(new Deadline(task, date));
        localStorage.setItem("deadlines", JSON.stringify(deadlines))
        displayDeadlines()
    }


    function displayDeadlines() {
        deadlines.sort(function (t1, t2) {
            if (t1.date < t2.date) {
                return -1
            }
            if (t1.date > t2.date) {
                return 1
            }
            return t1.task.localeCompare(t2.task)

        })
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        deadlines.forEach(function (deadline, i, deadlines) {
            const divElement = document.createElement("div");
            const leftDiv = document.createElement("div");
            const rightDiv = document.createElement("div");
            divElement.appendChild(leftDiv)
            divElement.appendChild(rightDiv)
            const number = document.createElement("p")
            number.innerHTML = i + 1
            const task = document.createElement("p")
            task.innerHTML = deadline.task
            const date = document.createElement("p")
            date.innerHTML = deadline.date
            const button = document.createElement("button")
            button.classList.add("deadline_delete_button")
            button.innerHTML = "X"
            leftDiv.appendChild(number)
            leftDiv.appendChild(task)
            rightDiv.appendChild(date)
            rightDiv.appendChild(button)
            leftDiv.classList.add("deadline_left")
            rightDiv.classList.add("deadline_right")
            task.classList.add("deadline_task")
            date.classList.add("deadline_date")
            divElement.classList.add("deadline")
            number.classList.add("deadline_number")
            button.addEventListener("click", function () {
                deadlines.splice(i, 1);
                localStorage.setItem("deadlines", JSON.stringify(deadlines))
                displayDeadlines()
            })
            container.appendChild(divElement)
        });
    }
})