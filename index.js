document.getElementById("fetchBtn").addEventListener("click", function () {
    let user = document.getElementById("username").value.trim();
    if (user === "") {
        alert("Please enter a valid GitHub username!");
        return;
    }

    const reqUrl = `https://api.github.com/users/${user}`;
    fetch(reqUrl)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                alert("User not found!");
                return;
            }
            
            document.getElementById("card").style.display = "block";
            document.getElementById("img").style.backgroundImage = `url('${data.avatar_url}')`;
            document.getElementById("name").textContent = data.name || "No Name Available";
            document.getElementById("bio").textContent = data.bio || "No Bio Available";
            document.getElementById("followers").textContent = data.followers;
            document.getElementById("repoCount").textContent = data.public_repos;

            fetch(data.repos_url)
                .then(response => response.json())
                .then(repos => {
                    let repoList = document.getElementById("repoList");
                    repoList.innerHTML = "<h3>Repositories:</h3>";
                    repos.slice(0, 5).forEach(repo => {
                        let repoLink = document.createElement("a");
                        repoLink.href = repo.html_url;
                        repoLink.target = "_blank";
                        repoLink.textContent = repo.name;
                        repoList.appendChild(repoLink);
                    });
                });
        })
        .catch(error => console.error("Error fetching data:", error));
});