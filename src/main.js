$(".form-check-input").change(function() {
    if(this.checked){
        $(this).parent().children("label").css({"font-weight": "bold"})
    }else{
        $(this).parent().children("label").css({"font-weight": "400"})
    }
})

$(".object-text").keypress(function(e){
    var location = $(".object-text").val()
    if ( e.which == 13 ) {
        window.location.href = 'https://172.22.2.15/?search='+location
    }
})

$(".choice").click(function() {
    $(".active").removeClass("active")
    $(this).addClass("active")
})

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
      toString(res)
    })
    return res
  }

function set_cookie(cookiename, cookievalue, hours) {
    var date = new Date();
    date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
    document.cookie = cookiename + "=" + cookievalue + "; expires = " + date.toGMTString();
}
try {
    var result = getCookie("object").split("|").length;
    if(getCookie("object") === ""){
        $(".round").text("0")
    }else{
        $(".round").text(result)
    }
} catch (error) {
    $(".round").text("0")
}

$(".small").click(function() {
    try {
        if(getCookie("object").split("|").length === 0 || getCookie("object") === ""){
            var result = getCookie("object").split("|").length;
            set_cookie("object", $(this).attr("aria-label"), 24*365);
        }else{
            var result = getCookie("object").split("|").length;
            set_cookie("object", getCookie("object")+"|"+$(this).attr("aria-label"), 24*365);
        }
    } catch (error) {
        set_cookie("object", $(this).attr("aria-label"), 24*365);
    }
    var result = getCookie("object").split("|").length;

    $(".round").text(result)
    location.reload()
})

if($(".fa-shopping-bag").length){
    var b = 0;
    $(".fa-shopping-bag").click(function() {
        if(a === 1){
            $(".moda").remove()
            a = 0;
        }

        if(b === 0){
            fetch('/api/', {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                credentials: 'include',
                body: 'cookie='+getCookie("object")
            })
            .then(response => response.json())
            .then(json => {
                $("body").append(`<div class="modab"></div>`)
                var totalPrice = 0;
                    for (let index = 0; index < Object.keys(json).length; index++) {
                            $('.modab').append(`
                                <div class="block__">
                                    <div class="under_block">
                                        <img src="/static/assets/`+json[index]["img"]+`" alt="" class="img__minimize">
                                        <div class="block__mini">
                                            <p class="f-s">`+json[index]["name"]+`</p>
                                            <p class="price__">€ `+json[index]["price"]+`</p>
                                        </div>
                                    </div>
                                    <div class="under_block">
                                        <i class="far fa-trash" price="`+json[index]["price"]+`" aria-label="`+json[index]["id"]+`"></i>
                                    </div>
                                </div>
                            `)
                        totalPrice += parseInt(json[index]["price"])      
                    }
                    console.log(totalPrice)
                    $(".modab").append(`
                        <div class="block__" style="justify-content: center;">
                            <a href="/validate/">See all</a>
                        </div>
                        <div class="block__ pp">
                            Total price: <b class='bold'>€ `+totalPrice+`</b>
                        </div>
                    `)
                    $(".fa-trash").click(function() {
                        var cookie = getCookie("object").split("|")
                        const index = cookie.indexOf($(this).attr("aria-label"));
                        if (index > -1) {
                            cookie.splice(index, 1);
                        }
                        totalPrice -= parseInt($(this).attr("price"))
                        $(".pp").html("Total price: <b class='bold'>€ "+totalPrice+"</b>")
                        var cookieConcate = cookie.join("|")
                        set_cookie("object", cookieConcate)
                        $(this).parent().parent().remove()
                        $(".round").text($(".round").text()-1)
                    })
            })
            b = 1;
        }else{
            $(".modab").remove()
            b = 0;
        }
    })
}

if($(".profile").length){
    var a = 0;
    $(".profile").click(function() {
        if(b === 1){
            $(".modab").remove()
            b = 0;
        }

        if(a === 0){
            $("body").append(`
                <div class="moda">
                    <img class="btn-3 mr-0" src="https://icebeal.herokuapp.com/api/identicon/lksdev.svg" />
                    <p class="name">lksdev</p>
                    <p class="email">lukas.soigneux@gmail.com</p>
                    <a class="b-box" href="/account/">
                        <div class="box__">
                            <i class="fas fa-cog"></i>
                            <p>Account Settings</p>
                        </div>
                    </a>
                    <a class="b-box" href="/logout/">
                        <div class="box__">
                            <i class="fas fa-arrow-right"></i>
                            <p>Logout</p>
                        </div>
                    </a>
                </div>
            `)
            a = 1;
        }else{
            $(".moda").remove()
            a = 0;
        }
    })
}