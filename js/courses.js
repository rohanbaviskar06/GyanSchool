/**
 * ====================================================================
 * GYANSCHOOL - COURSES DATA FILE
 * ====================================================================
 * To ADD a new course: Copy any course object below and paste it into
 * the `courses` array. Update the fields and save the file.
 *
 * Fields:
 *   title      - Course title
 *   badge      - Price label e.g. "FREE", "$49", "₹999"
 *   image      - Path to course image (put the image in images/ folder)
 *   rating     - Number from 0 to 5 (supports 0.5 increments)
 *   ratingText - Text shown next to stars e.g. "(4.8)"
 *   lessons    - Number of lessons
 *   students   - Student count string e.g. "5k+"
 *   description- Short course description
 *   enrollUrl  - URL to redirect when "Enroll in LMS" is clicked
 * ====================================================================
 */

const courses = [
    {
        title: "Full Stack Web Development",
        badge: "FREE",
        image: "images/course_webdev_1773472270126.png",
        rating: 4.5,
        ratingText: "(4.8)",
        lessons: 24,
        students: "5k+",
        description: "Master frontend and backend technologies including HTML, CSS, JavaScript, React, and Node.js. Build scalable web applications.",
        enrollUrl: "#"
    },
    {
        title: "Data Science & Applied AI",
        badge: "$49",
        image: "images/course_data_1773472285631.png",
        rating: 5,
        ratingText: "(5.0)",
        lessons: 32,
        students: "3k+",
        description: "Dive deep into Python, Machine Learning, Data Visualization, and Neural Networks. Become a highly sought-after data professional.",
        enrollUrl: "#"
    },
    {
        title: "UI/UX Design Masterclass",
        badge: "$39",
        image: "images/course_design_1773472300478.png",
        rating: 4,
        ratingText: "(4.2)",
        lessons: 18,
        students: "8k+",
        description: "Learn design thinking, wireframing, prototyping, and modern UI aesthetics using Figma and industry-standard tools.",
        enrollUrl: "#"
    },

    // ---- ADD NEW COURSES BELOW THIS LINE ----
    // {
    //     title: "Your New Course Title",
    //     badge: "$99",
    //     image: "images/your_course_image.png",
    //     rating: 4.5,
    //     ratingText: "(4.5)",
    //     lessons: 20,
    //     students: "1k+",
    //     description: "Short description of the course.",
    //     enrollUrl: "https://your-lms-link.com/course"
    // },
];

// ====================================================================
// RENDERING ENGINE — DO NOT MODIFY BELOW THIS LINE
// ====================================================================

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else if (rating >= i - 0.5) {
            stars += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            stars += '<i class="fa-regular fa-star"></i>';
        }
    }
    return stars;
}

function renderCourses() {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    const delays = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3'];

    courses.forEach((course, index) => {
        const delay = delays[index % delays.length];
        const card = document.createElement('div');
        card.className = `course-card reveal ${delay}`;
        card.innerHTML = `
            <div class="course-img">
                <span class="course-badge">${course.badge}</span>
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-content">
                <div class="course-rating" style="color: var(--accent-color); font-size: 0.875rem; margin-bottom: 0.5rem;">
                    ${renderStars(course.rating)}
                    <span style="color: var(--text-muted); margin-left: 0.5rem;">${course.ratingText}</span>
                </div>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span><i class="fa-solid fa-book-open"></i> ${course.lessons} Lessons</span>
                    <span><i class="fa-solid fa-user-graduate"></i> ${course.students} Students</span>
                </div>
                <a href="${course.enrollUrl}" class="btn btn-outline" style="margin-top: auto;">Enroll in LMS</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', renderCourses);
