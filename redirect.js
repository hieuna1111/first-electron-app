const electron = require('electron');
const ipc = electron.ipcRenderer;

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('searchForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const searchValue = document.getElementById('gsearch').value;

    console.log('Search query:', searchValue);
    ipc.send('search', searchValue);
  });
});
