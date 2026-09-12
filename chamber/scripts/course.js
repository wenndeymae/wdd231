const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];


const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");
const filterButtons = document.querySelectorAll(".filter-button");


function displayCourses(courseArray) {

    courseList.innerHTML = "";

    courseArray.forEach((course) => {

        const courseCard = document.createElement("article");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>

            <p>${course.title}</p>

            <p>
                <strong>Credits:</strong>
                ${course.credits}
            </p>

            ${
                course.completed
                    ? '<p class="status">✓ Completed</p>'
                    : '<p>Not Completed</p>'
            }
        `;

        courseList.appendChild(courseCard);
    });


    /* Calculate credits dynamically */
    const credits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}


function filterCourses(filter) {

    if (filter === "all") {
        displayCourses(courses);
        return;
    }

    const filteredCourses = courses.filter(
        (course) => course.subject === filter
    );

    displayCourses(filteredCourses);
}


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        filterCourses(button.dataset.filter);
    });

});


/* Display all courses when the page loads */
displayCourses(courses);