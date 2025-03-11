// Function to gather data from the current page
function gatherPageData() {
    const data = {
        email: "",
        education: [],
        skills: [],
        projects: [],
        workExperience: [],
        about: "",
        goals: []
    };

    // Email (from footer or About Me)
    const emailLink = document.querySelector("footer a[href^='mailto:']") || document.querySelector(".intro-text a[href^='mailto:']");
    if (emailLink) data.email = emailLink.textContent;

    // Education (from Resume or Experience)
    const educationSections = document.querySelectorAll(".resume-section h3:contains('Education') ~ div, .completed-courses table");
    educationSections.forEach(section => {
        if (section.tagName === "DIV") {
            const items = section.querySelectorAll("h4, p");
            items.forEach(item => data.education.push(item.textContent.trim()));
        } else if (section.tagName === "TABLE") {
            const rows = section.querySelectorAll("tr:not(.header)");
            rows.forEach(row => {
                const cells = row.querySelectorAll("td");
                if (cells.length) data.education.push(`${cells[0].textContent} - ${cells[1].textContent} (${cells[2].textContent})`);
            });
        }
    });

    // Skills (from Resume or Experience)
    const skillsSections = document.querySelectorAll(".resume-section h3:contains('Skills') ~ ul, .technical-skills ul");
    skillsSections.forEach(ul => {
        ul.querySelectorAll("li").forEach(li => data.skills.push(li.textContent.trim()));
    });

    // Projects (from Projects or Resume)
    const projectSections = document.querySelectorAll(".project, .resume-section h3:contains('Projects') ~ div");
    projectSections.forEach(project => {
        const title = project.querySelector("h2, h4")?.textContent || "Project";
        const desc = project.querySelector("p")?.textContent || "";
        const link = project.querySelector("a")?.outerHTML || "";
        data.projects.push(`${title}: ${desc} ${link}`);
    });

    // Work Experience (from Resume or Experience)
    const workSections = document.querySelectorAll(".resume-section h3:contains('Work Experience') ~ div");
    workSections.forEach(work => {
        const title = work.querySelector("h4")?.textContent || "";
        const details = work.querySelector("p")?.textContent || "";
        const tasks = Array.from(work.querySelectorAll("ul li")).map(li => li.textContent).join("; ");
        data.workExperience.push(`${title} - ${details}${tasks ? " - " + tasks : ""}`);
    });

    // About (from About Me or Home)
    const aboutText = document.querySelector(".intro-text")?.textContent || document.querySelector(".passion p")?.textContent || "";
    data.about = aboutText.split("\n").filter(line => line.trim()).join(" ");

    // Goals (from About Me)
    const goalsList = document.querySelector(".career-goals ul");
    if (goalsList) {
        goalsList.querySelectorAll("li").forEach(li => data.goals.push(li.textContent.trim()));
    }

    return data;
}

// Custom :contains selector workaround (since :contains isn’t native)
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
document.querySelectorAll = (function(originalQuerySelectorAll) {
    return function(selector) {
        if (selector.includes(":contains")) {
            const [baseSelector, containsText] = selector.split(":contains('");
            const text = containsText.slice(0, -2); // Remove ')'
            const elements = document.querySelectorAll(baseSelector || "*");
            return Array.from(elements).filter(el => el.textContent.includes(text));
        }
        return originalQuerySelectorAll.call(document, selector);
    };
})(document.querySelectorAll);

// Toggle Chatbot Visibility
document.addEventListener("DOMContentLoaded", () => {
    const chatbotContainer = document.querySelector(".chatbot-container");
    const toggleButton = document.createElement("button");
    toggleButton.className = "chatbot-open";
    toggleButton.textContent = "💬";
    document.body.appendChild(toggleButton);

    const pageData = gatherPageData(); // Gather data on load

    toggleButton.addEventListener("click", () => {
        chatbotContainer.style.display = "block";
        toggleButton.style.display = "none";
    });

    document.querySelector(".chatbot-toggle").addEventListener("click", () => {
        chatbotContainer.style.display = "none";
        toggleButton.style.display = "block";
    });

    // Send Message Function
    window.sendMessage = function() {
        const input = document.getElementById("chatbotInput");
        const message = input.value.trim().toLowerCase();
        const messagesDiv = document.getElementById("chatbotMessages");

        if (message) {
            const userMsg = document.createElement("p");
            userMsg.className = "user-message";
            userMsg.textContent = message;
            messagesDiv.appendChild(userMsg);

            const botMsg = document.createElement("p");
            botMsg.className = "bot-message";
            botMsg.innerHTML = getBotResponse(message, pageData);
            messagesDiv.appendChild(botMsg);

            input.value = "";
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    };

    // Enter key support
    document.getElementById("chatbotInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});

// Handle User Queries
function getBotResponse(message, data) {
    message = message.toLowerCase();

    if (/skill(s)?|abilities|expertise|what.*ulises.*good.*at/i.test(message)) {
        return data.skills.length ? "Here are Ulises's skills:<br>" + data.skills.map(skill => `- ${skill}`).join("<br>") : "No skills found on this page.";
    } else if (/resume|cv|background|show.*resume/i.test(message)) {
        return `
            <strong>Education:</strong><br>${data.education.length ? data.education.map(item => `- ${item}`).join("<br>") : "No education info available."}<br><br>
            <strong>Work Experience:</strong><br>${data.workExperience.length ? data.workExperience.map(item => `- ${item}`).join("<br>") : "No work experience info available."}<br><br>
            <strong>Skills:</strong><br>${data.skills.length ? data.skills.map(skill => `- ${skill}`).join("<br>") : "No skills info available."}<br><br>
            <strong>Projects:</strong><br>${data.projects.length ? data.projects.map(item => `- ${item}`).join("<br>") : "No projects info available."}<br>
        `;
    } else if (/email|contact|how.*reach.*ulises/i.test(message)) {
        return data.email ? `You can reach Ulises at: <a href="mailto:${data.email}">${data.email}</a>` : "No email found on this page.";
    } else if (/education|school|studies|what.*ulises.*study/i.test(message)) {
        return data.education.length ? "Here’s Ulises's education:<br>" + data.education.map(item => `- ${item}`).join("<br>") : "No education info found on this page.";
    } else if (/project(s)?|work.*done|what.*ulises.*build/i.test(message)) {
        return data.projects.length ? "Here are Ulises's projects:<br>" + data.projects.map(item => `- ${item}`).join("<br>") : "No projects found on this page.";
    } else if (/work|experience|job(s)?|what.*ulises.*do/i.test(message)) {
        return data.workExperience.length ? "Here’s Ulises's work experience:<br>" + data.workExperience.map(item => `- ${item}`).join("<br>") : "No work experience found on this page.";
    } else if (/about|who.*ulises|tell.*about.*ulises/i.test(message)) {
        return data.about ? data.about : "No about info found on this page.";
    } else if (/goal(s)?|plan(s)?|what.*ulises.*want/i.test(message)) {
        return data.goals.length ? "Here are Ulises's goals:<br>" + data.goals.map(item => `- ${item}`).join("<br>") : "No goals found on this page.";
    } else {
        return "I can answer about Ulises's skills, resume, email, education, projects, work, about, or goals. Try asking 'skills?', 'email?', or 'show me resume'!";
    }
}
