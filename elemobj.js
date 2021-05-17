/* Copyright 2021 Naheel Azawy.  All rights reserved.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// `args` can be "properties" or the "content"
// "properties" include properties of the element and optionally the "content"
// "content" can be an element, html string, or an array of any of both
// "con" is like "content" but preferred for inline cases
function $elem(tag, args, con) {
    function pushstuff(parent, stuff) {
        let children;
        if (Array.isArray(stuff)) {
            children = stuff;
        } else {
            children = [stuff];
        }
        for (let child of children) {
            if (typeof child == "string") {
                parent.innerHTML += child;
            } else if (child instanceof Element) {
                parent.appendChild(child);
            } else {
                throw new Error("Unknown child type");
            }
        }
    }

    let elem = document.createElement(tag);

    if (args) {
        try {
            // assume args are the content
            pushstuff(elem, args);
        } catch (e) {
            // assume args are the properties
            if (e.message == "Unknown child type") {
                // extract special props
                let content = args.content;
                let style = args.style;
                let run = args.run;
                delete args.content;
                delete args.style;
                
                for (let prop in args) {
                    elem[prop] = args[prop];
                }

                if (content) {
                    pushstuff(elem, content);
                }

                if (con) {
                    pushstuff(elem, con);
                }

                if (style) {
                    if (typeof style == "object") {
                        Object.assign(elem.style, style);
                    } else {
                        elem.style = style;
                    }
                }

                if (run) {
                    run(elem);
                }
            } else {
                throw e;
            }
        }
    }
    return elem;
}

function $get(q) {
    if (q[0] == '#') {
        return document.getElementById(q.substring(1));
    } else if (q[0] == '.') {
        return document.getElementsByClassName(q.substring(1));
    } else {
        return document.getElementsByTagName(q);
    }
}

// https://www.w3schools.com/TAGs/
const $a = (args, con) => $elem("a", args, con);
const $abbr = (args, con) => $elem("abbr", args, con);
const $acronym = (args, con) => $elem("acronym", args, con);
const $address = (args, con) => $elem("address", args, con);
const $applet = (args, con) => $elem("applet", args, con);
const $area = (args, con) => $elem("area", args, con);
const $article = (args, con) => $elem("article", args, con);
const $aside = (args, con) => $elem("aside", args, con);
const $audio = (args, con) => $elem("audio", args, con);
const $b = (args, con) => $elem("b", args, con);
const $base = (args, con) => $elem("base", args, con);
const $basefont = (args, con) => $elem("basefont", args, con);
const $bdi = (args, con) => $elem("bdi", args, con);
const $bdo = (args, con) => $elem("bdo", args, con);
const $big = (args, con) => $elem("big", args, con);
const $blockquote = (args, con) => $elem("blockquote", args, con);
const $body = (args, con) => $elem("body", args, con);
const $br = (args, con) => $elem("br", args, con);
const $button = (args, con) => $elem("button", args, con);
const $canvas = (args, con) => $elem("canvas", args, con);
const $caption = (args, con) => $elem("caption", args, con);
const $center = (args, con) => $elem("center", args, con);
const $cite = (args, con) => $elem("cite", args, con);
const $code = (args, con) => $elem("code", args, con);
const $col = (args, con) => $elem("col", args, con);
const $colgroup = (args, con) => $elem("colgroup", args, con);
const $data = (args, con) => $elem("data", args, con);
const $datalist = (args, con) => $elem("datalist", args, con);
const $dd = (args, con) => $elem("dd", args, con);
const $del = (args, con) => $elem("del", args, con);
const $details = (args, con) => $elem("details", args, con);
const $dfn = (args, con) => $elem("dfn", args, con);
const $dialog = (args, con) => $elem("dialog", args, con);
const $dir = (args, con) => $elem("dir", args, con);
const $div = (args, con) => $elem("div", args, con);
const $dl = (args, con) => $elem("dl", args, con);
const $dt = (args, con) => $elem("dt", args, con);
const $em = (args, con) => $elem("em", args, con);
const $embed = (args, con) => $elem("embed", args, con);
const $fieldset = (args, con) => $elem("fieldset", args, con);
const $figcaption = (args, con) => $elem("figcaption", args, con);
const $figure = (args, con) => $elem("figure", args, con);
const $font = (args, con) => $elem("font", args, con);
const $footer = (args, con) => $elem("footer", args, con);
const $form = (args, con) => $elem("form", args, con);
const $frame = (args, con) => $elem("frame", args, con);
const $frameset = (args, con) => $elem("frameset", args, con);
const $h1 = (args, con) => $elem("h1", args, con);
const $h2 = (args, con) => $elem("h2", args, con);
const $h3 = (args, con) => $elem("h3", args, con);
const $h4 = (args, con) => $elem("h4", args, con);
const $h5 = (args, con) => $elem("h5", args, con);
const $h6 = (args, con) => $elem("h6", args, con);
const $head = (args, con) => $elem("head", args, con);
const $header = (args, con) => $elem("header", args, con);
const $hr = (args, con) => $elem("hr", args, con);
const $html = (args, con) => $elem("html", args, con);
const $i = (args, con) => $elem("i", args, con);
const $iframe = (args, con) => $elem("iframe", args, con);
const $img = (args, con) => $elem("img", args, con);
const $input = (args, con) => $elem("input", args, con);
const $ins = (args, con) => $elem("ins", args, con);
const $kbd = (args, con) => $elem("kbd", args, con);
const $label = (args, con) => $elem("label", args, con);
const $legend = (args, con) => $elem("legend", args, con);
const $li = (args, con) => $elem("li", args, con);
const $link = (args, con) => $elem("link", args, con);
const $main = (args, con) => $elem("main", args, con);
const $map = (args, con) => $elem("map", args, con);
const $mark = (args, con) => $elem("mark", args, con);
const $meta = (args, con) => $elem("meta", args, con);
const $meter = (args, con) => $elem("meter", args, con);
const $nav = (args, con) => $elem("nav", args, con);
const $noframes = (args, con) => $elem("noframes", args, con);
const $object = (args, con) => $elem("object", args, con);
const $ol = (args, con) => $elem("ol", args, con);
const $optgroup = (args, con) => $elem("optgroup", args, con);
const $option = (args, con) => $elem("option", args, con);
const $output = (args, con) => $elem("output", args, con);
const $p = (args, con) => $elem("p", args, con);
const $param = (args, con) => $elem("param", args, con);
const $picture = (args, con) => $elem("picture", args, con);
const $pre = (args, con) => $elem("pre", args, con);
const $progress = (args, con) => $elem("progress", args, con);
const $q = (args, con) => $elem("q", args, con);
const $rp = (args, con) => $elem("rp", args, con);
const $rt = (args, con) => $elem("rt", args, con);
const $ruby = (args, con) => $elem("ruby", args, con);
const $s = (args, con) => $elem("s", args, con);
const $samp = (args, con) => $elem("samp", args, con);
const $script = (args, con) => $elem("script", args, con);
const $section = (args, con) => $elem("section", args, con);
const $select = (args, con) => $elem("select", args, con);
const $small = (args, con) => $elem("small", args, con);
const $source = (args, con) => $elem("source", args, con);
const $span = (args, con) => $elem("span", args, con);
const $strike = (args, con) => $elem("strike", args, con);
const $strong = (args, con) => $elem("strong", args, con);
const $style = (args, con) => $elem("style", args, con);
const $sub = (args, con) => $elem("sub", args, con);
const $summary = (args, con) => $elem("summary", args, con);
const $sup = (args, con) => $elem("sup", args, con);
const $svg = (args, con) => $elem("svg", args, con);
const $table = (args, con) => $elem("table", args, con);
const $tbody = (args, con) => $elem("tbody", args, con);
const $td = (args, con) => $elem("td", args, con);
const $template = (args, con) => $elem("template", args, con);
const $textarea = (args, con) => $elem("textarea", args, con);
const $tfoot = (args, con) => $elem("tfoot", args, con);
const $th = (args, con) => $elem("th", args, con);
const $thead = (args, con) => $elem("thead", args, con);
const $time = (args, con) => $elem("time", args, con);
const $title = (args, con) => $elem("title", args, con);
const $tr = (args, con) => $elem("tr", args, con);
const $track = (args, con) => $elem("track", args, con);
const $tt = (args, con) => $elem("tt", args, con);
const $u = (args, con) => $elem("u", args, con);
const $ul = (args, con) => $elem("ul", args, con);
const $var = (args, con) => $elem("var", args, con);
const $video = (args, con) => $elem("video", args, con);
const $wbr = (args, con) => $elem("wbr", args, con);
