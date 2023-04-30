var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const email = this.parentNode.parentNode.childNodes[3].innerText
        const profession = this.parentNode.parentNode.childNodes[5].innerText
        const date = this.parentNode.parentNode.childNodes[7].innerText
        const time = this.parentNode.parentNode.childNodes[9].innerText
        const connect = parseFloat(this.parentNode.parentNode.childNodes[11].innerText)
        fetch('info', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'email': email,
            'profession': profession,
            'connect': connect,
            'date': date,
            'time': time
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const email = this.parentNode.parentNode.childNodes[3].innerText
        fetch('/info', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'email': email
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
