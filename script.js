"use strict"

window.addEventListener('DOMContentLoaded', () => {
  const url = 'https://api.github.com/users/',
        form = document.querySelector('form'),
        nameInput = document.querySelector('.name-input'),
        avatarBox = document.querySelector('.avatar-box'),
        dataBox = document.querySelector('.data-box');


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clear();
    getProfileByName();
  });

  async function getProfileByName() {
    let username = nameInput.value;
    try {
      const response = await fetch(url + username);
      if (response.ok) {
        const user = await response.json();
        console.log(user);
        getAvatar();
        getData();
        return user;

        function getAvatar() {
          const avatar = document.createElement('img');
          avatar.src = user.avatar_url;
          avatar.alt = 'pic';
          avatar.classList.add('avatar')
          avatarBox.append(avatar);
        }

        function getData() {
          const name = document.createElement('h1'),
                table = document.createElement('div');
          name.textContent = user.name ? user.name:'No name'
          table.classList.add('table');
          dataBox.append(name, table);

          makeRow('login', user.login);
          makeRow('bio', user.bio);
          makeRow('company', user.company);
          makeRow('location', user.location);
          makeRow('followers', user.followers);
          makeRow('following', user.following);
          makeRow('public repos', user.public_repos);
          makeRow('created', user.created_at.split('T')[0]);
          makeRow('url', user.html_url);

          function makeRow(rowTitle, rowData) {
            const row = document.createElement('div'),
                  titleCell = document.createElement('div'),
                  dataCell = document.createElement('div');


            row.classList.add('table-row');
            titleCell.classList.add('title-cell');
            titleCell.textContent = rowTitle;
            dataCell.classList.add('data-cell');
            if (rowTitle !== 'url') {
              dataCell.textContent = (rowData) ? rowData:'-';
            } else {
              dataCell.innerHTML = `<a href=${rowData}>${rowData}</a>`;
            }
            row.append(titleCell, dataCell);
            table.append(row);
          }
        }
      } else {
        if (response.status == 404) {
          alert(`User not found. Try another user.`);
        } else{
          alert(`${response.statusText}: ${response.status}`);
        }
      }
    } catch (error) {
      alert(`${error.message}`);
    } finally {
      form.reset();
    }
  }

  function clear() {
    if (avatarBox.childNodes.length > 1) {
      avatarBox.childNodes[1].remove();
    };

    if (dataBox.childNodes.length > 1) {
      for (let i = 0; i < 2; i++) {
       dataBox.childNodes[1].remove();
       console.log(dataBox.childNodes);
     }
    }
  }
})
