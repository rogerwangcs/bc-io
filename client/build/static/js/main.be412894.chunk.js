(this["webpackJsonpbc-io-client"]=this["webpackJsonpbc-io-client"]||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(48),l=n.n(o),i=n(8),c=n(9),u=n(11),s=n(10),m=n(12),p=(n(63),n(29)),d=n(6),h=n(4),f=n(49),b=n.n(f),v=n(5);function g(){var e=Object(h.a)(["\n  div {\n    display: inline-block;\n    background-color: ",";\n    margin: 15px;\n    padding: 15px 50px;\n    border-radius: 50px;\n    p,\n    a {\n      transition: all 100ms ease-out;\n      font-size: 1.5em;\n      color: white;\n    }\n\n    :hover {\n      cursor: pointer;\n      p,\n      a {\n        color: limegreen;\n      }\n    }\n  }\n"]);return g=function(){return e},e}function y(){var e=Object(h.a)(["\n  width: 100vw;\n  height: 100vh;\n  position: absolute;\n  z-index: 0;\n"]);return y=function(){return e},e}function E(){var e=Object(h.a)(["\n  position: relative;\n  z-index: 100;\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n\n  padding-top: 10vh;\n\n  h1 {\n    color: white;\n    font-size: 5em;\n    margin-bottom: 10vh;\n  }\n\n  @media (max-width: 500px) {\n    h1 {\n      font-size: 2.5em;\n      margin: 15px 0px 10vh;\n    }\n  }\n"]);return E=function(){return e},e}var k=v.a.div(E()),x={number:{value:1,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5}},opacity:{value:1,random:!1,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:10,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:1,width:1},move:{enable:!0,speed:6,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"repulse"},onclick:{enable:!1,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}}},j=v.a.div(y()),O=v.a.div(g(),"#2453c9"),S=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).state={},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(j,null,r.a.createElement(b.a,{params:x})),r.a.createElement(k,null,r.a.createElement("h1",null,"BC.IO"),r.a.createElement(O,{onClick:function(){return e.props.history.push("/game")}},r.a.createElement("div",null,r.a.createElement("p",null,"Compete"))),r.a.createElement(O,null,r.a.createElement("div",null,r.a.createElement("a",{href:"https://github.com/rogerwangcs/bc-io",target:"_blank",rel:"noopener noreferrer"},"Source Code")))))}}]),t}(a.Component),w=Object(d.g)(S),z=n(54),C=n.n(z),I=n(55);function P(){var e=Object(h.a)(["\n  width: 100vw;\n  height: 100vh;\n  overflow: hidden;\n\n  h1 {\n    color: white;\n    font-size: 5em;\n    margin: 100px;\n  }\n  h2 {\n    color: white;\n    font-size: 2em;\n    margin: 100px;\n  }\n\n  .input {\n    width: 100px;\n  }\n"]);return P=function(){return e},e}var _=v.a.div(P()),N=function(e){function t(e){var n;Object(i.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).onInput=function(e){e.preventDefault(),n.setState({name:e.target.value})},n.enterGame=function(){n.state.name.length>0?(n.props.joinServer(n.state.name.substring(0,12)),localStorage.setItem("playerName",n.state.name)):alert("Enter a name")};var a="";return null!==localStorage.getItem("playerName")&&(a=localStorage.getItem("playerName")),n.state={name:a},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(_,null,r.a.createElement("h1",null,"Lobby"),this.state.queued?r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Matching with Opponents..."),r.a.createElement("button",{style:{fontSize:"36px"},onClick:function(){e.props.history.push("/")}},"Cancel")):r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{value:this.state.name,onChange:this.onInput,placeholder:"Your name",style:{fontSize:"36px"}}),r.a.createElement("button",{style:{fontSize:"36px"},onClick:function(){return e.enterGame()}},"Play")))}}]),t}(a.Component);function G(){var e=Object(h.a)(["\n  z-index: ",";\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  background-color: ",";\n  border-radius: 25px;\n\n  left: ",";\n  top: ",";\n\n  p {\n    color: white;\n    transform: translate(-50%, -50%);\n    font-size: 12px;\n  }\n"]);return G=function(){return e},e}var J=v.a.div(G(),(function(e){return e.playerZ}),(function(e){return e.color}),(function(e){return e.x+"px"}),(function(e){return e.y+"px"})),B=function(e){var t=e.player,n=t.id===e.localPlayerId?"blue":"lightblue",a=t.id===e.localPlayerId?"2":"0";return r.a.createElement(J,{playerZ:a,color:n,x:t.x,y:t.y},r.a.createElement("p",null,t.name))};function F(){var e=Object(h.a)(["\n  z-index: 10;\n  position: fixed;\n  bottom: 25px;\n  left: 50%;\n  transform: translateX(-50%);\n"]);return F=function(){return e},e}function L(){var e=Object(h.a)(["\n  width: 370px;\n  height: 635px;\n  border: 1px solid black;\n\n  background: rgb(58, 55, 87);\n  background: radial-gradient(\n    circle,\n    rgba(58, 55, 87, 1) 0%,\n    rgba(148, 187, 233, 1) 100%\n  );\n"]);return L=function(){return e},e}var M="https://localhost:"+Object({NODE_ENV:"production",PUBLIC_URL:""}).PORT||!1,U=v.a.div(L()),q=v.a.div(F()),D=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(s.a)(t).call(this,e))).joinServer=function(e){n.setState({socket:C()(M,{query:{name:e}})},(function(){setTimeout((function(){n.activateSockets(e)}),10)}))},n.activateSockets=function(e){n.state.socket.emit("clientGameState"),n.state.socket.on("serverGameState",(function(t){n.setState({gameState:t,localPlayerId:n.state.socket.id,localPlayerName:e})})),n.state.socket.on("updateState",(function(e){n.setState({gameState:e})}))},n.componentWillUnmount=function(){n.state.socket&&n.state.socket.disconnect()},n.handleMove=function(e){var t=e.x,a=e.y;n.state.socket.emit("clientJoy",t,a)},n.handleStop=function(e){n.state.socket.emit("clientStopPlayer",n.state.localPlayerId)},n.state={socket:null,gameState:null,localPlayerId:null,localPlayerName:""},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;if(null==this.state.gameState)return r.a.createElement(N,{joinServer:this.joinServer,setName:this.setName});var t=Object.keys(this.state.gameState.players).map((function(t){return r.a.createElement(B,{key:t,localPlayerId:e.state.localPlayerId,player:e.state.gameState.players[t]})}));return r.a.createElement(U,null,r.a.createElement("div",null,t),r.a.createElement(q,null,r.a.createElement(I.Joystick,{size:125,baseColor:"rgba(150,150,150,0.75)",stickColor:"rgb(230,230,230)",throttle:50,move:this.handleMove,stop:this.handleStop})))}}]),t}(a.Component),R=Object(d.g)(D),T=function(e){function t(e){return Object(i.a)(this,t),Object(u.a)(this,Object(s.a)(t).call(this,e))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/",component:w}),r.a.createElement(d.b,{exact:!0,path:"/game",component:function(){return r.a.createElement(R,{socket:null})}}),r.a.createElement(d.a,{from:"/*",to:"/"}))))}}]),t}(a.Component);l.a.render(r.a.createElement(T,null),document.getElementById("root"))},58:function(e,t,n){e.exports=n(100)},63:function(e,t,n){},96:function(e,t){}},[[58,1,2]]]);
//# sourceMappingURL=main.be412894.chunk.js.map