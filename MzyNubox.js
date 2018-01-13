var MzyNubox = function (ntype, ncjpath, ndpspeed, numbstr, disdivid, nbdlx) {
//数字翻牌效果，制作：马政永，版本：v0.01 20180110 QQ：651630318
//使用请保留版权信息，可免费使用。
//ntype【样式代码1-6】, ncjpath【背景图片路径,后面应有“/”】,ndpspeed【翻牌速度】, numbstr【显示数据，可加逗号和小数点】, disdivid【显示层的ID】, nbdlx【小数点及千位分割符的类型：1图片，2字符】
var mzynu_imageurl = ncjpath + "fpmzy" + ntype + ".png";//数字图片的引用路径
var mzynu_box_width = 20;//显示数字图片的宽度
var mzynu_box_hgight = 29;//显示数字图片的高度
var mzynu_pun_size = 25;//小数点及千位分割符的大小
var mzynu_pun_color = '#000000';//小数点及千位分割符的颜色
var mzynu_speed = ndpspeed;//数字翻牌的速度（1-10），越大越慢
switch (ntype) {
case 0:
mzynu_pun_color = '#CFE3F4';
break;
case 1:
mzynu_pun_color = '#FFFFFF';
break;
case 2:
mzynu_pun_color = '#FFFAF3';
break;
case 3:
mzynu_pun_color = '#050101';
break;
case 4:
mzynu_pun_color = '#EBB113';
break;
case 5:
mzynu_pun_color = '#ED7208';
break;
default:
mzynu_pun_color = '#000000';
}
var dbox_tmpstrs = "float: left; position: relative; height:" + mzynu_box_hgight + "px;" +
" width: " + mzynu_box_width + "px; background-image: url(" + mzynu_imageurl + ");" +
" background-repeat: no-repeat; background-position: top;";
var dboxbd_tmpstrs = "float: left; position: relative;" +
" height: " + mzynu_box_hgight + "px; width: " + Math.round(mzynu_box_width / 2) + "px;" +
" text-align: center; font-size: " + mzynu_pun_size + "pt; color: " + mzynu_pun_color + ";" +
" font-weight: bold; vertical-align: bottom;line-height:" + (mzynu_box_hgight - 1) + "px;";
var dboxbd_tmpstrs_dt = "float: left; position: relative; height:" + mzynu_box_hgight + "px;" +
" width: " + Math.round(mzynu_box_width / 2) + "px; background-image: url(" + mzynu_imageurl + ");" +
" background-repeat: no-repeat; background-position: top;";
var d0_tmpstrs = "background-position-x: 0px;background-position-y: 0px;";

this.dh = function (pvi, cv, boxid) {
var dwsz = cv * 6 * mzynu_box_hgight;
dwsz = dwsz + pvi * mzynu_box_hgight;
if (pvi < 6) {
document.getElementById(boxid).style.backgroundPositionY = '-' + dwsz + 'px';
pvi = pvi + 1;
setTimeout("this.dh(" + pvi + "," + cv + ",'" + boxid + "')", mzynu_speed * 60);
}
}

this.ssdh = function (kli, kn, yboxid) {
if (kli <= kn) {
this.dh(0, kli, yboxid);
kli = kli + 1;
setTimeout("this.ssdh(" + kli + "," + kn + ",'" + yboxid + "')", mzynu_speed * 40);
}
}

this.nudh = function (nuv, nuvdivid) {
var nuleng = nuv.toString().length;
var wtxtstr = '';
for (var fi = 0; fi < nuleng; fi++) {
var re = /^[0-9]*$/;
if (re.test(nuv.substr(fi, 1))) {
var tmstr = "mu_" + fi;
wtxtstr = "\<div id='" + tmstr + "' style=\"" + dbox_tmpstrs + d0_tmpstrs + "\" \>\<\/div\>";
document.getElementById(nuvdivid).innerHTML += wtxtstr;
var ttst = Number(nuv.substr(fi, 1));
for (var ssi = 0; ssi <= ttst; ssi++) {
this.ssdh(0, ssi, tmstr);
}
} else {
if (nbdlx < 1) {
wtxtstr = "\<div style=\"" + dboxbd_tmpstrs + "\"\>" + nuv.substr(fi, 1) + "\<\/div\>";
} else {
if (nuv.substr(fi, 1) == ',') {
wtxtstr = "\<div style=\"" + dboxbd_tmpstrs_dt + " background-position-x: 0px;background-position-y: -1769px;\"\>\<\/div\>";
}
if (nuv.substr(fi, 1) == '.') {
wtxtstr = "\<div style=\"" + dboxbd_tmpstrs_dt + " background-position-x: 0px;background-position-y: -1740px;\"\>\<\/div\>";
}
}
document.getElementById(nuvdivid).innerHTML += wtxtstr;
}
}
}

this.nudh(numbstr, disdivid);
};