const pgPostagens = document.getElementById("content-posts")
const pgPerfil = document.getElementById("content-perfil")
const pgPostEspec = document.getElementById("content-post-espec")


// qd a pagina é carregada ele verifica se a pessoa está logada

window.addEventListener("load", isLoggedIn)

function isLoggedIn(){
    console.log(localStorage.getItem("user_name"))
    if(!localStorage.getItem("user_name"))
         window.location = "login.html"
}

let btnLogout = document.getElementById("btn-logout")
btnLogout.addEventListener("click", (event)=>{
    localStorage.clear()
    window.location = "/"
})


document.getElementById("newpost-select-img").addEventListener("click", ()=>{
    document.getElementById("newpost-select-img-input").click()
})
document.getElementById("newpost-select-img-input").addEventListener("change", (event)=>{

    const arqSelecionado = event.target.files[0]

    if(arqSelecionado){
        const newpostImg = document.getElementById("newpost-img")
        newpostImg.src = URL.createObjectURL(arqSelecionado)
        newpostImg.style.display = "block"
        
    }else{
        console.log("não encontrou nd")
    }

})

// postar 
document.getElementById("newpost-postar").addEventListener("click", novaPostagem)
function novaPostagem(){
    
    const elementoOriginal = document.getElementById("post-01")
    const novopost = elementoOriginal.cloneNode(true)

    const idPost = Math.floor(Math.random()*1000)

    novopost.id = "post-"+ idPost
    
    const autor = novopost.querySelector(".post-head-autor")
    autor.textContent = localStorage.getItem("user_name")

    const conteudo = novopost.querySelector(".post-body-conteudo")
    conteudo.textContent = document.getElementById("newpost-texto").value
    document.getElementById("newpost-texto").value = ""

    const link = novopost.querySelector(".post-link")
    link.id = idPost

    const img = novopost.querySelector(".post-body-img")
    img.src = document.getElementById("newpost-img").src
    document.getElementById("newpost-img").src = ""
    
    pgPostagens.insertBefore(novopost, pgPostagens.firstChild)

    document.getElementById("newpost-close").click()
    trocarPaginaPara(pgPostagens.id)
}
// auxilia na troca da pagina central ativa
function trocarPaginaPara(idPage){
    document.querySelectorAll(".pages").forEach(page=>page.classList.remove("page-ativa"))

    document.getElementById(idPage).classList.add("page-ativa")

    if(idPage != pgPostEspec.id){
        localStorage.removeItem("post_id")
    }
}

// selecionar uma postagem para ver comentários

function detalhesPostagem(idPost){
    trocarPaginaPara(pgPostEspec.id)
    localStorage.setItem("post_id", idPost)

    const elementoOriginal = document.getElementById("post-"+idPost)
    const autor = elementoOriginal.querySelector(".post-head-autor").innerHTML
    const conteudo = elementoOriginal.querySelector(".post-body-conteudo").innerHTML
    const img = elementoOriginal.querySelector(".post-body-img").src

    document.querySelector("#post-espec-autor").innerHTML = autor
    document.querySelector("#post-espec-conteudo").innerHTML = conteudo
    document.querySelector("#post-espec-img").src = img
    

}

// voltando para a tela principal
document.getElementById("btn-home").addEventListener("click", ()=>{
    trocarPaginaPara(pgPostagens.id)
})
document.getElementById("post-espec-voltar").addEventListener("click", ()=>{
    trocarPaginaPara(pgPostagens.id)
})

// NOVA MENSAGEM

function newMsg(){
    const msg = document.getElementById("msg-01")
    const newMsg = msg.cloneNode(true)
    
    const autor = localStorage.getItem("user_name")
    const conteudo = document.getElementById("msg-new").value
    const like = 0
    
    document.getElementById("msg-new").value = ""

    newMsg.querySelector(".msg-autor").innerHTML = autor
    newMsg.querySelector(".msg-conteudo").innerHTML = conteudo
    newMsg.querySelector(".msg-heart").innerHTML = like 

    newMsg.style.display = "block"
    const pai = document.getElementById("post-espec-msg-list")
    pai.insertBefore(newMsg, pai.firstChild)

    const chat = Number(document.getElementById("post-espec-chat").innerHTML)
    document.getElementById("post-espec-chat").innerHTML = chat + 1

}

function likePost(){
    const likes = Number(document.getElementById("post-espec-heart").innerHTML)
    document.getElementById("post-espec-heart").innerHTML = likes + 1
}
