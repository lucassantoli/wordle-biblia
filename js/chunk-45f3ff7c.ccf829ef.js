(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45f3ff7c"],{"0836":function(e,t,s){"use strict";var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"guess"},[t("div",{staticClass:"guess-inputs"},[e._l(e.guessValue.options,(function(s,n){return t("my-option",{key:n,attrs:{option:s,disabled:e.hasGuessed},on:{click:e.handleSelect}})})),t("div",{staticClass:"buttons"},[0!=e.currGame&&e.hasGuessed&&!e.isEndless?t("main-icon-button",{staticClass:"button button-aux",attrs:{color:"primary",icon:"mdi-arrow-left"},on:{click:e.handlePrev}}):e._e(),t("main-button",{staticClass:"button button-guess",attrs:{color:e.getColorButton,result:e.result},on:{click:e.handleGuess}},[e._v(" "+e._s(e.getContentButton)+" ")]),4==e.currGame&&e.hasGuessed&&!e.isEndless?t("main-icon-button",{staticClass:"button button-aux",attrs:{color:"primary",icon:"mdi-share-variant"},on:{click:e.handleShare}}):e._e(),4!=e.currGame&&e.hasGuessed&&!e.isEndless?t("main-icon-button",{staticClass:"button button-aux",attrs:{color:"primary",icon:"mdi-arrow-right"},on:{click:e.handleNext}}):e._e(),e.hasGuessed&&e.isEndless?t("main-icon-button",{staticClass:"button button-aux",attrs:{color:"primary",icon:"mdi-reload"},on:{click:e.handleReload}}):e._e()],1)],2)])},a=[],i=s("19c1"),o=s("3bc0"),u=function(){var e=this,t=e._self._c;return t("div",{class:["my-option",e.option.selected&&"selected",e.option.isCorrect&&"right-answer",e.disabled&&"disabled"],on:{click:e.handleClick}},[t(o["a"],[e._v("mdi-text")]),t("span",[e._v(e._s(e.option.ref))])],1)},l=[],r={name:"MyOption",props:{option:Object,disabled:Boolean},methods:{handleClick:function(){this.disabled||this.$emit("click",this.option)}}},c=r,d=(s("805a"),s("8619")),h=Object(d["a"])(c,u,l,!1,null,null,null),m=h.exports,b=s("1f81"),p={name:"Guess",components:{MainButton:i["a"],MyOption:m,MainIconButton:b["a"]},data:()=>({hasGuessed:!1,result:null}),props:{daysAfter:Number,currGame:Number,value:Object,isEndless:Boolean},methods:{generateNumbers(e){return[...Array(e).keys()]},handleSelect(e){this.guessValue.options.forEach(t=>{t.ref===e.ref?t.selected=!0:t.selected=!1})},handleGuess(){let e=this.guessValue.options.find(e=>e.selected);void 0!=e&&(this.hasGuessed=!0,this.result=e.isCorrect,this.guessValue.hasGuessed||(this.guessValue.guess=e.index,this.guessValue.hasGuessed=!0,this.guessValue.correct=e.isCorrect,this.$emit("hasGuessed",!0),4==this.currGame&&this.$emit("gameEnded",!0)))},handleReload(){window.location.reload()},handleShare:function(e){this.$emit("shareGame",e)},handleNext:function(e){this.$emit("nextGame",e)},handlePrev:function(e){this.$emit("prevGame",e)}},computed:{guessValue:{get:function(){return this.value},set:function(e){this.$emit("input",e)}},getColorButton:function(){return null==this.result?"primary":1==this.result?"success":"error"},getContentButton:function(){return null==this.result?"ADIVINHAR":1==this.result?"CORRETO":"ERRADO"}},mounted(){this.guessValue.hasGuessed&&this.handleGuess()},created(){this.previousGuess&&this.handleGuess()}},f=p,g=(s("31f9"),Object(d["a"])(f,n,a,!1,null,null,null));t["a"]=g.exports},"26c8":function(e,t,s){},"31f9":function(e,t,s){"use strict";s("e82c")},"805a":function(e,t,s){"use strict";s("26c8")},d9a8:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"home"},[t("my-header",{attrs:{isEndless:""}}),t("div",{staticClass:"game"},[t("div",{staticClass:"currGame"},[t("quote",{attrs:{verse:e.game.verse}}),t("span",{staticClass:"title"},[e._v(" Em qual versículo da bíblia podemos encontrar o texto acima? ")]),t("guess",{attrs:{isEndless:""},model:{value:e.game,callback:function(t){e.game=t},expression:"game"}})],1)])],1)},a=[],i=(s("a047"),s("0544")),o=s("0836"),u=s("9839"),l=s("eb2b"),r=s("a790"),c={name:"Infinite",components:{MyHeader:u["a"],Quote:i["a"],Guess:o["a"]},data:()=>({previousTime:null,bible:l["a"],dayVerse:l["b"],index:null,game:{verse:null,options:[]}}),created(){let e=Math.floor(31103*Math.random()+2);this.index=this.dayVerse[e],this.game.verse=Object(r["a"])(this.index,this.bible,!0);let t=[this.game.verse],s=0;while(t.length<5&&s++<31104){let e=Math.floor(31103*Math.random()+2),s=Object(r["a"])(e,this.bible,!1),n=void 0!=t.find(e=>e.index==s.index);n||t.push(s)}t=Object(r["e"])(t),this.game.options=t}},d=c,h=s("8619"),m=Object(h["a"])(d,n,a,!1,null,null,null);t["default"]=m.exports},e82c:function(e,t,s){}}]);
//# sourceMappingURL=chunk-45f3ff7c.ccf829ef.js.map