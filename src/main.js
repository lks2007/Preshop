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
var result = getCookie("object").split("|").length-1;

$(".round").text(result)

$(".small").click(function() {
    set_cookie("object", getCookie("object")+"|"+$(this).attr("aria-label"), 24*365);
    var object = getCookie("object")

    var result = getCookie("object").split("|").length-1;

    $(".round").text(result)
})

if($(".fa-shopping-bag").length){
    var b = 0;
}

if($(".fa-shopping-bag").length){
    var b = 0;
    $(".fa-shopping-bag").click(function() {
        if(a === 1){
            $(".moda").remove()
            a = 0;
        }

        if(b === 0){
            $("body").append(`
                <div class="modab">
                    <div class="block__">
                        <div class="under_block">
                            <img src="/static/assets/sopalin.webp" alt="" class="img__minimize">
                            <div class="block__mini">
                                <p class="f-s">Sopalin</p>
                                <p class="price__">€ 2</p>
                            </div>
                        </div>
                        <div class="under_block">
                            <i class="far fa-trash"></i>
                        </div>
                    </div>
                    <div class="block__">
                        <div class="under_block">
                            <img src="/static/assets/tv.webp" alt="" class="img__minimize">
                            <div class="block__mini">
                                <p class="f-s">TV OLED 4k</p>
                                <p class="price__">€ 1099</p>
                            </div>
                        </div>
                        <div class="under_block">
                            <i class="far fa-trash"></i>
                        </div>
                </div>
            `)
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