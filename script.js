const users = [
            { name: "Alice Johnson", title: "UI/UX Designer", avatar: "user1.png" },
            { name: "Michael Brown", title: "Software Engineer", avatar: "user2.png" },
            { name: "Sarah Lee", title: "Marketing Manager", avatar: "user3.png" }
        ];

        // Sample jobs data
        const jobs = [
            { title: "Frontend Developer", company: "Tech Corp", location: "New York, USA" },
            { title: "Data Scientist", company: "AI Solutions", location: "San Francisco, USA" },
            { title: "Marketing Executive", company: "Global Media", location: "London, UK" }
        ];

        // Sample messages and notifications
        const messages = [
            { sender: "Alice Johnson", content: "Hey! Are you available for a project?" },
            { sender: "Michael Brown", content: "Let's connect and collaborate!" }
        ];

        const notifications = [
            { content: "Your job application has been viewed by Tech Corp." },
            { content: "Michael Brown sent you a connection request." }
        ];

        function login() {
            document.getElementById("login-page").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
            loadUserProfile();
        }

        function logout() {
            document.getElementById("login-page").style.display = "block";
            document.getElementById("dashboard").style.display = "none";
        }

        function toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            sidebar.classList.toggle("collapsed");
        }

        function loadUserProfile() {
            const userName = localStorage.getItem("userName") || "John Doe";
            const userEmail = localStorage.getItem("userEmail") || "john.doe@example.com";
            
            document.getElementById("user-name").textContent = userName;
            
            // Check if user-title exists before setting it
            const userTitleElement = document.getElementById("user-title");
            if (userTitleElement) {
                userTitleElement.textContent = localStorage.getItem("userTitle") || "Software Developer";
            }
            
            // Set user email if element exists
            const userEmailElement = document.getElementById("user-email");
            if (userEmailElement) {
                userEmailElement.textContent = userEmail;
            }
        }

        // Load user details on page load
        window.onload = function() {
            loadUserProfile();
            
            // Check if user is already logged in (using sessionStorage)
            const currentUser = sessionStorage.getItem('currentUser');
            if (currentUser) {
                document.getElementById("login-page").style.display = "none";
                document.getElementById("dashboard").style.display = "block";
            }
        };

        function loadPage(page) {
            let content = "";

            if (page === "network") {
                content = `<h2>My Network</h2><div class='network-container'>`;
                users.forEach(user => {
                    content += `
                        <div class='connection-card'>
                            <img src='${user.avatar}' alt='${user.name}'>
                            <h4>${user.name}</h4>
                            <p>${user.title}</p>
                            <button>Add Connection</button>
                        </div>
                    `;
                });
                content += `</div>`;
            } else if (page === "jobs") {
                content = "<h2>Available Jobs</h2><div class='jobs-container'>";
                jobs.forEach(job => {
                    content += `
                        <div class='job-card'>
                            <h3>${job.title}</h3>
                            <p>${job.company} - ${job.location}</p>
                            <button class="apply-button">Apply</button>
                        </div>
                    `;
                });
                content += "</div>";
            } else if (page === "messages") {
                content = "<h2>Messages</h2><div class='messages-container'>";
                messages.forEach(msg => {
                    content += `
                        <div class='message-card'>
                            <p><strong>${msg.sender}:</strong> ${msg.content}</p>
                        </div>
                    `;
                });
                content += "</div>";
            } else if (page === "notifications") {
                content = "<h2>Notifications</h2><div class='notifications-container'>";
                notifications.forEach(notif => {
                    content += `
                        <div class='notification-card'>
                            <p>${notif.content}</p>
                        </div>
                    `;
                });
                content += "</div>";
            } else if (page === "saved-jobs") {
                content = "<h2>Saved Jobs</h2><p>No saved jobs yet.</p>";
            } else if (page === "settings") {
                content = "<h2>Settings</h2><p>Manage your account settings here.</p>";
            }

            document.getElementById("main-content").innerHTML = content;
            toggleSidebar();
        }

        // Edit Profile Functions
        function editProfile() {
            document.getElementById("edit-name").value = localStorage.getItem("userName") || "";
            document.getElementById("edit-title").value = localStorage.getItem("userTitle") || "";
            document.getElementById("edit-email").value = localStorage.getItem("userEmail") || "";
            document.getElementById("edit-phone").value = localStorage.getItem("userPhone") || "";
            document.getElementById("edit-location").value = localStorage.getItem("userLocation") || "";

            document.getElementById("edit-profile-modal").style.display = "block";
        }

        function saveProfile() {
            localStorage.setItem("userName", document.getElementById("edit-name").value);
            localStorage.setItem("userTitle", document.getElementById("edit-title").value);
            localStorage.setItem("userEmail", document.getElementById("edit-email").value);
            localStorage.setItem("userPhone", document.getElementById("edit-phone").value);
            localStorage.setItem("userLocation", document.getElementById("edit-location").value);

            loadUserProfile();
            closeProfileModal();
        }

        function closeProfileModal() {
            document.getElementById("edit-profile-modal").style.display = "none";
        }
