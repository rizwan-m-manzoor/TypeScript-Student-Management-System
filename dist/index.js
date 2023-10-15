import inquirer from 'inquirer';
class Student {
    constructor(name) {
        this.studentID = (10000 + Student.studentCount).toString();
        this.name = name;
        this.enrolledCourses = [];
        this.balance = 0;
        Student.studentCount++;
    }
    enroll(course) {
        this.enrolledCourses.push(course);
        console.log(`${this.getName()} has enrolled in ${course}.`);
    }
    viewBalance() {
        console.log(`${this.getName()}'s balance: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`${this.getName()} has paid $${amount} towards tuition.`);
    }
    showStatus() {
        console.log(`Student ID: ${this.getStudentID()}`);
        console.log(`Name: ${this.getName()}`);
        console.log(`Enrolled Courses: ${this.enrolledCourses.join(', ')}`);
        console.log(`Balance: $${this.balance}`);
    }
    getStudentID() {
        return this.studentID;
    }
    getName() {
        return this.name;
    }
}
Student.studentCount = 0;
const students = [];
function createStudent() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the student name:',
        },
    ])
        .then((answers) => {
        const student = new Student(answers.name);
        students.push(student);
        console.log(`Student ${student.getStudentID()} with name ${student.getName()} created.`);
        showMainMenu();
    });
}
function showMainMenu() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an action:',
            choices: ['Enroll in Course', 'View Balance', 'Pay Tuition', 'Show Status', 'Create Student', 'Exit'],
        },
    ])
        .then((answers) => {
        switch (answers.action) {
            case 'Enroll in Course':
                enrollStudent();
                break;
            case 'View Balance':
                viewBalance();
                break;
            case 'Pay Tuition':
                payTuition();
                break;
            case 'Show Status':
                showStudentStatus();
                break;
            case 'Create Student':
                createStudent();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit(0);
                break;
        }
    });
}
function enrollStudent() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'studentID',
            message: 'Enter the student ID:',
        },
        {
            type: 'input',
            name: 'course',
            message: 'Enter the course name:',
        },
    ])
        .then((answers) => {
        const student = students.find((s) => s.getStudentID() === answers.studentID);
        if (student) {
            student.enroll(answers.course);
            showMainMenu();
        }
        else {
            console.log('Student not found. Please enter a valid student ID.');
            enrollStudent();
        }
    });
}
function viewBalance() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'studentID',
            message: 'Enter the student ID:',
        },
    ])
        .then((answers) => {
        const student = students.find((s) => s.getStudentID() === answers.studentID);
        if (student) {
            student.viewBalance();
            showMainMenu();
        }
        else {
            console.log('Student not found. Please enter a valid student ID.');
            viewBalance();
        }
    });
}
function payTuition() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'studentID',
            message: 'Enter the student ID:',
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount to pay:',
        },
    ])
        .then((answers) => {
        const student = students.find((s) => s.getStudentID() === answers.studentID);
        if (student) {
            const amount = parseFloat(answers.amount);
            if (!isNaN(amount)) {
                student.payTuition(amount);
                showMainMenu();
            }
            else {
                console.log('Invalid amount. Please enter a valid numeric amount.');
                payTuition();
            }
        }
        else {
            console.log('Student not found. Please enter a valid student ID.');
            payTuition();
        }
    });
}
function showStudentStatus() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'studentID',
            message: 'Enter the student ID:',
        },
    ])
        .then((answers) => {
        const student = students.find((s) => s.getStudentID() === answers.studentID);
        if (student) {
            student.showStatus();
            showMainMenu();
        }
        else {
            console.log('Student not found. Please enter a valid student ID.');
            showStudentStatus();
        }
    });
}
console.log('Welcome to the Student Management System!');
showMainMenu();
