// logar
let btnLogar = document.getElementById("btn-logar")
btnLogar.addEventListener("click", login)

function login(){
    let user_name = document.getElementById("idUser").value
    localStorage.setItem("user_name", user_name)
    window.location.href = "/"
}

// cadastrar