
function is_ar(c) {
    if (c == undefined) {
        return false;
    }
    if (typeof c != "number") {
        c = c.charCodeAt(0);
    }
    return (c >= 0x0622 && c <= 0x063A)
        || (c >= 0x0641 && c <= 0x064A)
        || (c == 0x066E) || (c == 0x0671)
        || (c == 0x06AA) || (c == 0x06C1)
        || (c == 0x06E4) || (c == 0x0640);
}

function is_tashkeel(c) {
    if (c == undefined) {
        return false;
    }
    if (typeof c != "number") {
        c = c.charCodeAt(0);
    }
    return (c >= 0x0610 && c <= 0x061A) ||
        (c >= 0x064B && c <= 0x065F) ||
        (c == 0x0670)                ||
        (c >= 0x06D6 && c <= 0x06DC) ||
        (c >= 0x06DF && c <= 0x06E8) ||
        (c >= 0x06EA && c <= 0x06ED) ||
        (c >= 0x08D4 && c <= 0x08E1) ||
        (c >= 0x08D4 && c <= 0x08ED) ||
        (c >= 0x08E3 && c <= 0x08FF);
}

function remove_tashkeel(str) {
    let res = "";
    for (let i = 0; i < str.length; ++i) {
        if (!is_tashkeel(str[i])) {
            res += str[i];
        }
    }
    return res;
}

function dotless(str) {
    let res = "";
    for (let i = 0; i < str.length; ++i) {
        switch (str[i]) {
        case "أ":
        case "إ":
        case "آ": res += "ا"; break;
        case "ب":
        case "ت":
        case "ث": res += "ٮ"; break;
        case "ج":
        case "خ": res += "ح"; break;
        case "ذ": res += "د"; break;
        case "ز": res += "ر"; break;
        case "ش": res += "س"; break;
        case "ض": res += "ص"; break;
        case "ظ": res += "ط"; break;
        case "غ": res += "ع"; break;
        case "ف":
        case "ق": res += "ٯ"; break;
        case "ي": res += "ى"; break;
        case "ة": res += "ه"; break;
        case "ن": res += is_ar(str[i + 1]) ? "ٮ" : /*end*/ "ں"; break;
        case "ﻵ":
        case "ﻷ":
        case "ﻻ": res += "لا"; break;
        default:  res += str[i];
        }
    }
    return res;
}

function r(arr) {
    return arr[(Math.random() * arr.length) | 0];
}

function randomize(str) {
    let start, mid, end;
    let res = "";
    for (let i = 0; i < str.length; ++i) {
        start = !is_ar(str[i - 1]);
        end   = !is_ar(str[i + 1]);
        mid   = !start && !end;

        switch (str[i]) {
        case "ا": res += end ? r(["ا", "ﺎ"]) : r(["ا", "ﺍ"]); break;
        case "ب": res += end ? r(["ب", "ﺏ", "ﺐ"]) : r(["ب", "ﺒ", "ﺑ"]); break;
        case "ت": res += end ? r(["ت", "ﺕ", "ﺖ"]) : r(["ت", "ﺘ", "ﺗ"]); break;
        case "ث": res += end ? r(["ث", "ﺙ", "ﺚ"]) : r(["ث", "ﺜ", "ﺛ"]); break;
        case "ج": res += end ? r(["ج", "ﺝ", "ﺞ"]) : r(["ج", "ﺠ", "ﺟ"]); break;
        case "ح": res += end ? r(["ح", "ﺡ", "ﺢ"]) : r(["ح", "ﺤ", "ﺣ"]); break;
        case "خ": res += end ? r(["خ", "ﺥ", "ﺦ"]) : r(["خ", "ﺨ", "ﺧ"]); break;
        case "د": res += r(["د", "ﺩ", "ﺪ"]); break;
        case "ذ": res += r(["ذ", "ﺫ", "ﺬ"]); break;
        case "ر": res += r(["ر", "ﺭ", "ﺮ"]); break;
        case "ز": res += r(["ز", "ﺯ", "ﺰ"]); break;
        case "س": res += end ? r(["س", "ﺱ", "ﺲ"]) : r(["س", "ﺴ", "ﺳ"]); break;
        case "ش": res += end ? r(["ش", "ﺵ", "ﺶ"]) : r(["ش", "ﺸ", "ﺷ"]); break;
        case "ص": res += end ? r(["ص", "ﺹ", "ﺺ"]) : r(["ص", "ﺼ", "ﺻ"]); break;
        case "ض": res += end ? r(["ض", "ﺽ", "ﺾ"]) : r(["ض", "ﻀ", "ﺿ"]); break;
        case "ط": res += r(["ط", "ﻁ", "ﻂ", "ﻄ", "ﻃ"]); break;
        case "ظ": res += r(["ظ", "ﻅ", "ﻆ", "ﻈ", "ﻇ"]); break;
        case "ع": res += start ? r(["ع", "ﻋ"]) : end ? r(["ع", "ﻊ", "؏"]) :
                mid ? r(["ع", "ﻌ"]) : r(["ع", "ﻉ", "؏"]); break;
        case "غ": res += start ? r(["غ", "ﻏ"]) : end ? r(["غ", "ﻎ"]) :
                mid ? r(["غ", "ﻐ"]) : r(["غ", "ﻍ"]); break;
        case "ف": res += end ? r(["ف", "ﻑ", "ﻒ"]) : r(["ف", "ﻔ", "ﻓ"]); break;
        case "ق": res += end ? r(["ق", "ﻕ", "ﻖ"]) : r(["ق", "ﻘ", "ﻗ"]); break;
        case "ك": res += end ? r(["ك", "ﻙ", "ﻚ", "ک", "ڪ"]) : r(["ك", "ﻜ", "ﻛ", "ک"]); break;
        case "ل": res += start ? r(["ﻠ", "ﻟ"]) : end ? r(["ل", "ﻝ", "ﻞ"]) :
                mid ? r(["ﻠ", "ﻟ"]) : r(["ل", "ﻝ", "ﻞ"]); break;
        case "م": res += end ? r(["م", "ﻡ", "ﻢ"]) : r(["م", "ﻤ", "ﻣ"]); break;
        case "ن": res += end ? r(["ن", "ﻥ", "ﻦ"]) : r(["ن", "ﻨ", "ﻧ"]); break;
        case "ه": res += start ? r(["ه", "ﻫ"]) : end ? r(["ﻪ"]) :
                mid ? r(["ه", "ﻬ", "ﻫ"]) : r(["ه", "ﻩ"]); break;
        case "و": res += r(["و", "ﻭ", "ﻮ"]); break;
        case "ي": res += end ? r(["ي", "ﻱ", "ﻲ"]) : r(["ي", "ﻴ", "ﻳ"]); break;
        case "ة": res += r(["ة", "ﺓ", "ﺔ"]); break;
        case "ى": res += mid || start ? r(["ٮ"]) : r(["ى", "ﻯ", "ﻰ", "ۍ"]);  break;
        case "ٯ": res += "ٯ"; break;
        case "ڡ": res += "ڡ"; break;
        case "ٮ": res += "ٮ"; break;
        case "ں": res += r(["ں", "ﮞ", "ﮟ"]); break;
        case "ﻵ":
        case "ﻷ":
        case "ﻻ": res += "لا"; break;
        default:  res += str[i];
        }
    }
    return res;
}

function tatweel(str) {
    // Not after: ا د ذ ر ز و ء
    // Not before: ء
    const allowed = "جحخهعغفقثصضطكمنتبيسشظئـ";
    let res = "";
    for (let i = 0; i < str.length; ++i) {
        res += str[i];
        if (allowed.includes(str[i]) && is_ar(str[i + 1])) {
            for (let _ = 0; _ < (Math.random() * 10) | 0; ++_) {
                res += "ـ";
            }
        }
    }
    return res;
}

function homoglyphs(str) {
    // https://en.wikipedia.org/wiki/IDN_homograph_attack
    // https://en.wikipedia.org/wiki/List_of_Unicode_characters
    str = str.toLowerCase();
    let res = "";
    for (let i = 0; i < str.length; ++i) {
        switch (str[i]) {
        case "a": res += r(["a", "а", "α"]); break;
        case "b": res += r(["b", "Ъ", "ƅ"]); break;
        case "c": res += r(["c", "с", "ϲ"]); break;
        case "d": res += r(["d", "∂"]); break;
        case "e": res += r(["e", "е"]); break;
        case "f": res += r(["f", "ƒ", "Ғ"]); break;
        case "g": res += r(["g", "ɡ"]); break;
        case "h": res += r(["h", "ћ"]); break;
        case "i": res += r(["i", "і", "ι"]); break;
        case "j": res += r(["j", "ј"]); break;
        case "k": res += r(["k", "κ"]); break;
        case "l": res += r(["l", "I", "І"]); break;
        case "m": res += r(["m", "м"]); break;
        case "n": res += r(["n", "ո"]); break;
        case "o": res += r(["o", "о", "ο", "օ"]); break;
        case "p": res += r(["p", "р", "ρ"]); break;
        case "q": res += r(["q", "ԛ"]); break;
        case "r": res += r(["r", "г"]); break;
        case "s": res += r(["s", "ѕ"]); break;
        case "t": res += r(["t", "т"]); break;
        case "u": res += r(["u", "υ", "ս"]); break;
        case "v": res += r(["v", "ν"]); break;
        case "w": res += r(["w", "ԝ", "ω"]); break;
        case "x": res += r(["x", "х"]); break;
        case "y": res += r(["y", "у"]); break;
        case "z": res += r(["z", "Ζ", "ƶ"]); break;
        default:  res += str[i];
        }
    }
    return res;
}

function process(str) {
    str = remove_tashkeel(str);
    str = tatweel(str);
    str = dotless(str);
    str = randomize(str);
    str = homoglyphs(str);
    return str;
}

// ui ============================

function copy(text) {
    // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
    if (!navigator.clipboard) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
}

let lang = "";

let strings = {};

strings["en"] = {
    title:      "ѕсrαмЪlег",
    enter_text: "Enter text",
    out_text:   "Output text",
    cp:         "Copy",
    src:        "Source code",
};
strings["en"].note = `
The output text includes a randomized characters. <br>
The characters are replaced with various homograph unicode characters. <br>
This program is a free software under the GPL-3 license <br>
Please use for good intentions.
`;

strings["ar"] = {
    title:      "مــشـــــــﻭش",
    enter_text: "أدخل النص",
    out_text:   "النص الناتج",
    cp:         "نسخ",
    src:        "كود المصدر"
};
strings["ar"].note = `
النص الناتج يمثل النص المدخل باستخدام أحرف عشوائية مشابهة و غير منقوطة. <br>
إضافة لذلك، تضاف بعض التطويلات بشكل عشوائي. <br>
هذا البرنامج برنامج حر تحت رخصة جنو العمومية GPL-3 <br>
الرجاء الاستخدام لأغراض حسنة
`;

function _(key) {
    return strings[lang][key];
}

function ui() {
    if (!lang && navigator.languages) {
        lang = navigator.languages.includes("ar") ? "ar" : "en";
    }

    document.title = _("title");
    document.body.innerHTML = "";
    document.body.appendChild($div([
        $h1(_("title")), $hr(),

        $button({id: "en", style: {width: "50%"}}, "English"),
        $button({id: "ar", style: {width: "50%"}}, "عربي"),
        $br(), $br(),

        $div({
            style: {textAlign: lang == "ar" ? "right" : "left"},
            dir: lang == "ar" ? "rtl" : "ltr",
            content: [
                _("enter_text"), $br(),
                $textarea({id: "text_in"}),
                $br(), $br(),
                _("out_text"), $br(),
                $textarea({id: "text_out", disabled: true}),
                $br(), $br(),
                $button({onclick: () => {
                    copy($get("#text_out").value);
                }}, _("cp")),
                $br(), $br(),
                $span(_("note")),
            ]
        }),

        $br(),
        $a({
            href: "https://github.com/Naheel-Azawy/text-entropy",
            style: {float: lang == "ar" ? "left" : "right"}
        }, _("src"))
    ]));

    $get("#ar").onclick = () => {lang = "ar"; ui();};
    $get("#en").onclick = () => {lang = "en"; ui();};
    $get("#text_in").onkeyup = () => {
        $get("#text_out").value = process($get("#text_in").value);
    };
}

ui();
