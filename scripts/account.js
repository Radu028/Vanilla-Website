document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('../jsons/account.json')
    .then((response) => {
      if (!response.ok || response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data[username] && data[username] === password) {
        localStorage.setItem('loggedInUser', username);
        updateInterface(username);
      } else {
        alert('Nume de utilizator sau parolă incorectă');
      }
    })
    .catch((error) => console.error('Eroare la încărcarea fișierului JSON:', error));
});

function updateInterface(username) {
  document.body.innerHTML = `
    <header id="account">
      <h1>Contul tău</h1>
    </header>
    
    <nav class="navbar">
      <div class="dropdown">
        <a class="page" href="./home.html">Acasă</a>
      </div>
      <div class="dropdown">
        <a class="page" href="gallery.html">Galerie</a>
      </div>
      <div class="dropdown">
        <a class="page" href="./about.html">Despre</a>
        <div class="dropdown-content">
          <a href="about.html#scottish-fold">Scottish Fold</a>
          <a href="about.html#british-shorthair">British Shorthair</a>
          <a href="about.html#siamese">Siameza</a>
          <a href="about.html#persian">Persana</a>
          <a href="about.html#maine-coon">Maine Coon</a>
          <a href="about.html#bengal">Bengaleza</a>
          <a href="about.html#russian-blue">Rusa Albastră</a>
          <a href="about.html#ragdoll">Ragdoll</a>
          <a href="about.html#norwegian">Norvegiana de Pădure</a>
          <a href="about.html#burmese">Burmese</a>
        </div>
      </div>
      <div class="dropdown">
        <a class="page" href="./care.html">Îngrijire</a>
      </div>
      <div class="dropdown">
        <a class="page active" href="#account">Cont</a>
      </div>
    </nav>
    
    <main>
      <h2>Bine ai venit, ${username}!</h2>
      <p>Detalii despre contul tău...</p>
    </main>
    
    <footer>
      <p>&copy; 2024 Despre pisici</p>
      <p>Acest proiect a fost făcut de Popa Radu-Stefan</p>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', function () {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    updateInterface(loggedInUser);
  }
});
