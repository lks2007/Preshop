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