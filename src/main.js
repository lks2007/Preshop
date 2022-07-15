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

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function set_cookie(cookiename, cookievalue, hours) {
    var date = new Date();
    date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
    document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();

}

$(".small").click(function() {
    set_cookie("object", getCookie("object")+"|"+$(this).attr("aria-label"), 24*365);
})