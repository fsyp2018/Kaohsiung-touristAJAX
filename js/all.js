var xhr = new XMLHttpRequest();
xhr.open('get', '../json/data.json', true)
xhr.send(null)
xhr.onload = function () {
    var data = JSON.parse(xhr.responseText);
    var regselect = document.getElementById("regionId");
    var totitle = document.querySelector('.totitle')
    var buttonClass = document.querySelectorAll('.buttonClass')
    var datalen = data.length;
    //把需要的值抓出來
    var datanorp = new Array;
    for (i = 0; i < datalen; i++) {
        datanorp.push(data[i].Zone);
    }
    //把重複去掉
    var result = datanorp.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
    });
    //代進下拉式選單
    for (i = 0; i < result.length; i++) {
        var str = document.createElement('option');
        str.textContent = result[i];
        regselect.appendChild(str);
    }
    for (i = 0; i < buttonClass.length; i++) {
        buttonClass[i].addEventListener('click', getData, false)
    };
    regselect.addEventListener('change', getData, false);
    function getData(e) {
        var select = e.target.value;
        var el = document.querySelector('.attractions');
        var elstr = '';
        for (i = 0; i < datalen; i++) {
            if (select == data[i].Zone) {
                var content =
                    '<div class="card">'
                    + '<div class="catop" style="background-image: url(' + data[i].Picture1 + ')">'
                    + '<div class="catitle">' + data[i].Name + '</div><div class="caarea">' + data[i].Zone + '</div>'
                    + '</div>'
                    + '<div class="opentat">'
                    + '<p><img src="img/icons_clock.png" alt=""> ' + data[i].Opentime + '</p><br>'
                    + '<p><img src="img/icons_pin.png" alt=""> ' + data[i].Add + '</p><br>'
                    + '<p><img src="img/icons_phone.png" alt=""> ' + data[i].Tel + '</p>'
                    + '</div>'
                    + '<div class="cabottom">'
                    + '<p><img src="img/icons_tag.png" alt="">免費參觀</p>'
                    + '</div>'
                    + '</div>'
                elstr += content;
            }
        }
        el.innerHTML = elstr;
        totitle.textContent = select;
    }

};