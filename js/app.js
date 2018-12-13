if ('serviceWorker' in navigator) {

    navigator.serviceWorker
      .register('./service-worker.js', { scope: './' })
      .then(function(registration) {
        console.log("Service Worker Registered");
      })
      .catch(function(err) {
        console.log("Service Worker Failed to Register", err);
      })
  
  }

(function login(LoginForm) {
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
  
    var req = new XMLHttpRequest();
    req.open("POST", "http://127.0.0.1:8000/login/", true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.withCredentials = true;
    req.onreadystatechange = function() {
      if (req.readyState == XMLHttpRequest.DONE) {
        if (req.status == 200) {        
          document.getElementById("log_form").style.display = 'none';
          document.getElementById("logged_user").style.display = 'block';
          document.getElementById("logged_user").textContent = document.getElementById("username").value;
          document.getElementById("logout_button").style.display = 'block';
          hide_error();
        } 
        else if (req.status == 401) {
          document.getElementById('error_text').textContent = "User/password is incorrect";
          document.getElementById('error').style.display="";
        }
      }
    }
    req.send(JSON.stringify({username: user, password: pass}));
  }) () ; 

 ( function() {
    var txtApiData = document.getElementById( "txtApiData" );
    var users = { };
    var selectedUsers = [];
    var xhttp = new XMLHttpRequest();
    var url = "http://danielwiz.pythonanywhere.com/Listas/";

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.responseText;
            txtApiData.style.color = "black";
            txtApiData.innerHTML = data;
            listas = JSON.parse( data );
            console.log( listas );
            for( let i in listas.results ) {
                displayUser( listas.results[ i ], i );
            }
        } else {
            txtApiData.style.color = "red";
            txtApiData.innerHTML = data;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

    var displayUser =  function( lista, i  ){
        var usersContainer = document.getElementById( "usersContainer" );
        var userContainer = document.createElement( "div" );
        var nameContainer = document.createElement( "p" );
        var emailContainer = document.createElement( "p" );
        if( selectedUsers[ i ] ){
            userContainer.className = "userContainer pink";
        } else {
            userContainer.className = "userContainer";
        }
        userContainer.addEventListener( "click", function( mouse ) {
            if( !this.selected ) {
                userContainer.className = "userContainer pink";
                this.selected = true;
                selectedUsers[ i ] = true;
                saveData( "selectedUsers", selectedUsers );
            } else {
                userContainer.className = "userContainer";
                this.selected = false;
                selectedUsers[ i ] = false;
                saveData( "selectedUsers", selectedUsers );
            }
            console.log("selected");
        } );
        console.log( lista )
        nameContainer.innerHTML = "<b>Nombre: </b>" + lista.NombreLista;
        emailContainer.innerHTML = "<b>Dirección: </b>" + lista.Estado;
        // Add childs
        userContainer.appendChild( nameContainer );
        userContainer.appendChild( emailContainer );
        // Add to page
        usersContainer.appendChild( userContainer );
    }

    var saveData = function( key, data ) {
        var toSave = JSON.stringify( data );
        localStorage.setItem( key, toSave );
    }

})();