const fetchBtn = document.getElementById("fetchBtn");
const postList = document.getElementById("postList");

async function fetchPosts() {
  try {
    postList.innerHTML = "<li>Loading...</li>";

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    postList.innerHTML = ""; // Clear previous content

    data.slice(0, 10).forEach(post => {
      const li = document.createElement("li");
      li.textContent = post.title;
      li.className = "bg-gray-100 p-2 rounded";
      postList.appendChild(li);
    });
  } catch (error) {
    postList.innerHTML = "<li class='text-red-500'>Failed to load posts.</li>";
    console.error("Error fetching posts:", error);
  }
}

fetchBtn.addEventListener("click", fetchPosts);
