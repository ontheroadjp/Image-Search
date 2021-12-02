/*
  *  Method: Color.info(RGB/16)
  *  return object | false
  *   object is 6item:
  *   '16'
  *   complementary16
  *   reversal16
  *   rgb
  *   complementaryRgb
  *   reversalRgb
  *
  *  Create 2014.11.16 Takenori Kawakami
  *
  *  Repair 2014.11.22 Takenori Kawakami
  *  add " v = v.toLowerCase(); " in getRgb function
  *
  *  Typo 2015.12.13 Takenori Kawakami
  *  from 'Kawaakmi' to 'Kawakami'
  *
  */
var ary_color, color = {};
ary_color =[[0,"00"],[1,"01"],[2,"02"],[3,"03"],[4,"04"],[5,"05"],[6,"06"],[7,"07"],[8,"08"],[9,"09"],[10,"0a"],[11,"0b"],[12,"0c"],[13,"0d"],[14,"0e"],[15,"0f"],[16,"10"],[17,"11"],[18,"12"],[19,"13"],[20,"14"],[21,"15"],[22,"16"],[23,"17"],[24,"18"],[25,"19"],[26,"1a"],[27,"1b"],[28,"1c"],[29,"1d"],[30,"1e"],[31,"1f"],[32,"20"],[33,"21"],[34,"22"],[35,"23"],[36,"24"],[37,"25"],[38,"26"],[39,"27"],[40,"28"],[41,"29"],[42,"2a"],[43,"2b"],[44,"2c"],[45,"2d"],[46,"2e"],[47,"2f"],[48,"30"],[49,"31"],[50,"32"],[51,"33"],[52,"34"],[53,"35"],[54,"36"],[55,"37"],[56,"38"],[57,"39"],[58,"3a"],[59,"3b"],[60,"3c"],[61,"3d"],[62,"3e"],[63,"3f"],[64,"40"],[65,"41"],[66,"42"],[67,"43"],[68,"44"],[69,"45"],[70,"46"],[71,"47"],[72,"48"],[73,"49"],[74,"4a"],[75,"4b"],[76,"4c"],[77,"4d"],[78,"4e"],[79,"4f"],[80,"50"],[81,"51"],[82,"52"],[83,"53"],[84,"54"],[85,"55"],[86,"56"],[87,"57"],[88,"58"],[89,"59"],[90,"5a"],[91,"5b"],[92,"5c"],[93,"5d"],[94,"5e"],[95,"5f"],[96,"60"],[97,"61"],[98,"62"],[99,"63"],[100,"64"],[101,"65"],[102,"66"],[103,"67"],[104,"68"],[105,"69"],[106,"6a"],[107,"6b"],[108,"6c"],[109,"6d"],[110,"6e"],[111,"6f"],[112,"70"],[113,"71"],[114,"72"],[115,"73"],[116,"74"],[117,"75"],[118,"76"],[119,"77"],[120,"78"],[121,"79"],[122,"7a"],[123,"7b"],[124,"7c"],[125,"7d"],[126,"7e"],[127,"7f"],[128,"80"],[129,"81"],[130,"82"],[131,"83"],[132,"84"],[133,"85"],[134,"86"],[135,"87"],[136,"88"],[137,"89"],[138,"8a"],[139,"8b"],[140,"8c"],[141,"8d"],[142,"8e"],[143,"8f"],[144,"90"],[145,"91"],[146,"92"],[147,"93"],[148,"94"],[149,"95"],[150,"96"],[151,"97"],[152,"98"],[153,"99"],[154,"9a"],[155,"9b"],[156,"9c"],[157,"9d"],[158,"9e"],[159,"9f"],[160,"a0"],[161,"a1"],[162,"a2"],[163,"a3"],[164,"a4"],[165,"a5"],[166,"a6"],[167,"a7"],[168,"a8"],[169,"a9"],[170,"aa"],[171,"ab"],[172,"ac"],[173,"ad"],[174,"ae"],[175,"af"],[176,"b0"],[177,"b1"],[178,"b2"],[179,"b3"],[180,"b4"],[181,"b5"],[182,"b6"],[183,"b7"],[184,"b8"],[185,"b9"],[186,"ba"],[187,"bb"],[188,"bc"],[189,"bd"],[190,"be"],[191,"bf"],[192,"c0"],[193,"c1"],[194,"c2"],[195,"c3"],[196,"c4"],[197,"c5"],[198,"c6"],[199,"c7"],[200,"c8"],[201,"c9"],[202,"ca"],[203,"cb"],[204,"cc"],[205,"cd"],[206,"ce"],[207,"cf"],[208,"d0"],[209,"d1"],[210,"d2"],[211,"d3"],[212,"d4"],[213,"d5"],[214,"d6"],[215,"d7"],[216,"d8"],[217,"d9"],[218,"da"],[219,"db"],[220,"dc"],[221,"dd"],[222,"de"],[223,"df"],[224,"e0"],[225,"e1"],[226,"e2"],[227,"e3"],[228,"e4"],[229,"e5"],[230,"e6"],[231,"e7"],[232,"e8"],[233,"e9"],[234,"ea"],[235,"eb"],[236,"ec"],[237,"ed"],[238,"ee"],[239,"ef"],[240,"f0"],[241,"f1"],[242,"f2"],[243,"f3"],[244,"f4"],[245,"f5"],[246,"f6"],[247,"f7"],[248,"f8"],[249,"f9"],[250,"fa"],[251,"fb"],[252,"fc"],[253,"fd"],[254,"fe"],[255,"ff"]];

class Color {

  chgType(v, isTo16) {
    var val, to, from;
    to = (isTo16)? 1: 0;
    from = (isTo16)? 0: 1;

    for (var i in ary_color) {
      if (ary_color[i][from] == v) {
        val = ary_color[i][to];
        break;
      }
    }
    return val;
  }

  getRgb(v) {
    var val, valRGB, r, g, b, v1, v2, v3;
    if (v && 'string' == typeof v) {
      v = v.toLowerCase();
      switch (v.length) {
        case 3:
        case 4:
          r = v.substr(-3, 1);
          g = v.substr(-2, 1);
          b = v.substr(-1, 1);
          v = '#' + r + r + g + g + b + b;
          r = chgType(r + r);
          g = chgType(g + g);
          b = chgType(b + b);
          break;
        case 6:
          v = '#' + v;
        case 7:
          r = chgType(v.substr(-6, 2));
          g = chgType(v.substr(-4, 2));
          b = chgType(v.substr(-2, 2));
          break;
        default:
          valRGB = v.split(',');
          v1 = chgType(valRGB[0], true);
          v2 = chgType(valRGB[1], true);
          v3 = chgType(valRGB[2], true);

        if (valRGB.length == 3 && v1 && v2 && v3) {
          val ={
            '16': '#' + v1 + v2 + v3,
            rgb: v
          };
        }
      }
      if ('number' == typeof r && 'number' == typeof g && 'number' == typeof b) {
        val ={
          '16': v,
          rgb: r + ',' + g + ',' + b
        };
      }
    }
    return val;
  }

  getComplementary(r, g, b) {
    var max_num = Math.max(r, g, b),
          min_num =  Math.min(r, g, b);
          complement = max_num + min_num;

    return getRgb('' + (complement - r) + ',' + (complement - g) + ',' + (complement - b));
  }

  getReversal(r, g, b) {
    return getRgb('' + (255 - r) + ',' + (255 - g) + ',' + (255 - b));
  }

  color.info = function(v) {
    var val = getRgb(v), valRGB, complementary,reversal ;

    if (val && val.rgb) {
      valRGB = val.rgb.split(',');
      complementary = getComplementary(valRGB[0], valRGB[1], valRGB[2]);
      if (complementary) {
        val.complementary16 = complementary['16'];
        val.complementaryRgb = complementary['rgb'];
      }
      reversal = getReversal(valRGB[0], valRGB[1], valRGB[2]);
      if (reversal) {
        val.reversal16 = reversal['16'];
        val.reversalRgb = reversal['rgb'];
      }
    }
    return val;
  }
  return color;
}

export default new Color
