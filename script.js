let current = 2;
const total = 16;

function showImage() {
  document.getElementById("display").src = `Quran Image/${current}.jpg`;
}

function nextImage() {
  current++;
  if (current > total) current = 2;
  showImage();
}

function prevImage() {
  current--;
  if (current < 2) current = total;
  showImage();
}

function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

function addBookmark() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  if (!bookmarks.includes(current)) {
    bookmarks.push(current);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    loadBookmarks();
  }
}

// تحميل العلامات مع زرار مسح لكل واحدة
function loadBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  let list = document.getElementById("bookmarkList");
  list.innerHTML = "";
  bookmarks.forEach(page => {
    let li = document.createElement("li");
    li.textContent = "Page " + page;

    // عند الضغط على الاسم يفتح الصفحة
    li.onclick = () => {
      current = page;
      showImage();
    };

    // زرار مسح بجانب كل Bookmark
    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = (e) => {
      e.stopPropagation(); // عشان ما يفتحش الصفحة مع المسح
      deleteBookmark(page);
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// مسح Bookmark واحد
function deleteBookmark(page) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks = bookmarks.filter(p => p !== page);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  loadBookmarks();
}

// شاشة البداية
function startApp() {
  let selector = document.getElementById("pageSelector");
  current = parseInt(selector.value);
  document.getElementById("startScreen").style.display = "none";
  document.querySelector(".gallery").style.display = "block";
  document.querySelector(".controls").style.display = "block";
  showImage();
}

window.onload = () => {
  let selector = document.getElementById("pageSelector");
  for (let i = 2; i <= total; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = "Page " + i;
    selector.appendChild(option);
  }
  loadBookmarks();
};
