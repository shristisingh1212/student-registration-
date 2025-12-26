
        // Load saved student data from localStorage
        window.onload = function() {
            const savedData = JSON.parse(localStorage.getItem('students')) || [];
            savedData.forEach(function(student) {
                addStudentToTable(student);
            });
        };

        document.getElementById("studentForm").addEventListener("submit", function(e) {
            e.preventDefault();

            const name = document.getElementById("studentName").value;
            const id = document.getElementById("studentID").value;
            const className = document.getElementById("class").value;
            const rollNumber = document.getElementById("rollNumber").value;
            const email = document.getElementById("email").value;
            const contact = document.getElementById("contact").value;

            const student = { name, id, className, rollNumber, email, contact };

            // Add student to table and localStorage
            addStudentToTable(student);
            saveStudentToLocalStorage(student);

            this.reset();
        });

        function addStudentToTable(student) {
            const table = document.getElementById("studentData");
            const row = table.insertRow();

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.className}</td>
                <td>${student.rollNumber}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editRow(this)">Edit</button>
                    <button onclick="deleteRow(this)">Delete</button>
                </td>
            `;
        }

        function saveStudentToLocalStorage(student) {
            const savedData = JSON.parse(localStorage.getItem('students')) || [];
            savedData.push(student);
            localStorage.setItem('students', JSON.stringify(savedData));
        }

        function deleteRow(btn) {
            const row = btn.parentNode.parentNode;
            const table = document.getElementById("studentData");
            const rowIndex = row.rowIndex - 1; // Correct index for deletion
            row.remove();

            // Remove from localStorage
            const savedData = JSON.parse(localStorage.getItem('students')) || [];
            savedData.splice(rowIndex, 1);
            localStorage.setItem('students', JSON.stringify(savedData));
        }

        function editRow(btn) {
            const row = btn.parentNode.parentNode;
            const cells = row.querySelectorAll("td");

            const name = prompt("Enter new name", cells[0].innerText);
            const id = prompt("Enter new ID", cells[1].innerText);
            const className = prompt("Enter new Class", cells[2].innerText);
            const rollNumber = prompt("Enter new Roll Number", cells[3].innerText);
            const email = prompt("Enter new email", cells[4].innerText);
            const contact = prompt("Enter new contact", cells[5].innerText);

            if (name && id && className && rollNumber && email && contact) {
                cells[0].innerText = name;
                cells[1].innerText = id;
                cells[2].innerText = className;
                cells[3].innerText = rollNumber;
                cells[4].innerText = email;
                cells[5].innerText = contact;

                // Update in localStorage
                const savedData = JSON.parse(localStorage.getItem('students')) || [];
                const rowIndex = row.rowIndex - 1;
                savedData[rowIndex] = { name, id, className, rollNumber, email, contact };
                localStorage.setItem('students', JSON.stringify(savedData));
            }
        }
    