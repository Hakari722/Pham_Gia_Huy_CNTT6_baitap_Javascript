let songs = JSON.parse(localStorage.getItem("songs")) || [];
let editId = null;


function saveData() {
    localStorage.setItem("songs", JSON.stringify(songs));
}

function resetForm() {
    document.getElementById("title").value = "";
    document.getElementById("artist").value = "";
    document.getElementById("submitBtn").innerText = "Thêm";
    document.getElementById("formTitle").innerText = " Thêm bài hát";
    editId = null;
}
function renderSongs(list) {
    const table = document.getElementById("songTable");
    table.innerHTML = "";

    list.forEach(song => {
        table.innerHTML += `
            <tr>
                <td>${song.id}</td>
                <td>${song.title}</td>
                <td>${song.artist}</td>
                <td>
                    <button onclick="editSong(${song.id})">Sửa</button>
                    <button onclick="deleteSong(${song.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

function handleSubmit() {
    const title = document.getElementById("title").value.trim();
    const artist = document.getElementById("artist").value.trim();
    if (!title || !artist) {
        alert("Không được để trống!");
        return;
    }
    if (editId === null) {
        const newSong = {
            id: songs.length ? songs[songs.length - 1].id + 1 : 1,
            title,
            artist
        };
        songs.push(newSong);
    } else {
        const index = songs.findIndex(s => s.id === editId);
        songs[index].title = title;
        songs[index].artist = artist;
    }

    saveData();
    resetForm();
    renderSongs(songs);
}
function editSong(id) {
    const song = songs.find(s => s.id === id);
    document.getElementById("title").value = song.title;
    document.getElementById("artist").value = song.artist;
    document.getElementById("submitBtn").innerText = "Cập nhật";
    document.getElementById("formTitle").innerText = " Sửa bài hát";
    editId = id;
}
function deleteSong(id) {
    if (confirm("Bạn có chắc muốn xóa không?")) {
        songs = songs.filter(s => s.id !== id);
        saveData();
        renderSongs(songs);
    }
}
function searchSong() {
    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(keyword)
    );

    renderSongs(filtered);
}
window.onload = function () {
    renderSongs(songs);
};