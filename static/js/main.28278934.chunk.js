(this["webpackJsonpfrozen-lake-dqn"]=this["webpackJsonpfrozen-lake-dqn"]||[]).push([[0],{199:function(e){e.exports=JSON.parse('{"classes":{"S":"bg-start","F":"bg-frozen","H":"bg-hole","G":"bg-goal"},"titles":{"S":"Start","F":"Frozen","H":"Hole","G":"Goal"}}')},200:function(e){e.exports=JSON.parse('{"bufferSize":1500,"gamma":0.9}')},262:function(e){e.exports=JSON.parse('{"step":[{"label":"Epsilon","tooltip":"","props":{"name":"epsilon","id":"epsilon","type":"number","max":1,"min":0,"step":0.1,"placeholder":0}},{"label":"Update","tooltip":"","props":{"name":"updateTarget","id":"updateTarget","type":"checkbox"}},{"label":"Batch Size","tooltip":"","props":{"name":"batchSize","id":"batchSize","type":"number","max":200,"min":10,"step":2,"placeholder":10}}],"episode":[{"label":"Max Steps","tooltip":"","props":{"name":"maxSteps","id":"maxSteps","type":"number","max":100,"min":5,"step":5,"placeholder":5}},{"label":"Epsilon","tooltip":"","props":{"name":"epsilon","id":"epsilon","type":"number","max":1,"min":0,"step":0.1,"placeholder":0}},{"label":"Batch Size","tooltip":"","props":{"name":"batchSize","id":"batchSize","type":"number","max":200,"min":10,"step":2,"placeholder":10}}],"train":[{"label":"Episodes","tooltip":"","props":{"name":"episodes","id":"episodes","type":"number","max":50000,"min":100,"step":100,"placeholder":100}},{"label":"Max Steps","tooltip":"","props":{"name":"maxSteps","id":"maxSteps","type":"number","max":100,"min":5,"step":5,"placeholder":5}},{"label":"Batch Size","tooltip":"","props":{"name":"batchSize","id":"batchSize","type":"number","max":200,"min":10,"step":2,"placeholder":10}},{"label":"Epsilon Max","tooltip":"","props":{"name":"epsilonMax","id":"epsilonMax","type":"number","max":1,"min":0,"step":0.1,"placeholder":0}},{"label":"Epsilon Min","tooltip":"","props":{"name":"epsilonMin","id":"epsilonMin","type":"number","max":1,"min":0,"step":0.1,"placeholder":0}}]}')},268:function(e,t,n){},270:function(e,t,n){},271:function(e,t,n){},284:function(e,t){},285:function(e,t){},293:function(e,t){},303:function(e,t){},304:function(e,t){},305:function(e,t){},313:function(e,t){},315:function(e,t,n){"use strict";n.r(t);var a=n(86),r=n.n(a),s=n(238),i=n.n(s),o=(n(268),n(197)),c=n(17),u=n(4),l=n.n(u),p=n(11),h=n(70),d=n(5),f=n(10),b=n(45),m=n(13),v=n(14),x=(n(270),n(271),n(239)),y=function e(t,n,a,r,s,i){Object(d.a)(this,e),this.action=t,this.state=n,this.reward=a,this.done=r,this.nextState=s,this.allowedActions=i},k=function(e){Object(m.a)(n,e);var t=Object(v.a)(n);function n(){return Object(d.a)(this,n),t.apply(this,arguments)}return Object(f.a)(n,[{key:"opposite",value:function(){switch(this.enumKey){case"UP":return n.DOWN;case"DOWN":return n.UP;case"LEFT":return n.RIGHT;case"RIGHT":return n.LEFT;default:console.error("Action '".concat(this.enumKey,"' doesn't have an opposite"))}}}],[{key:"fromOrdinal",value:function(e){switch(e){case 0:return n.UP;case 1:return n.DOWN;case 2:return n.LEFT;case 3:return n.RIGHT;default:console.error("Not an Action: ".concat(e))}}}]),n}(x.Enumify);k.UP=new k,k.DOWN=new k,k.LEFT=new k,k.RIGHT=new k,k._=k.closeEnum();var j=n(91),g=n(199),O=n(46),S=function(e){Object(m.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).board=Object.freeze(["S","F","F","F","F","H","F","H","F","F","F","H","H","F","F","G"]),a.state={location:0},a.prevAction=k.RIGHT,a}return Object(f.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"reset",value:function(){this.setState({location:0}),this.prevAction=k.RIGHT}},{key:"allowedActions",value:function(){var e=this.prevAction.opposite(),t=this.state.location,n=t%4,a=Math.floor(t/4),r=[];return n>0&&e!==k.LEFT&&r.push(k.LEFT),n<3&&e!==k.RIGHT&&r.push(k.RIGHT),a>0&&e!==k.UP&&r.push(k.UP),a<3&&e!==k.DOWN&&r.push(k.DOWN),r}},{key:"step",value:function(){var e=Object(p.a)(l.a.mark((function e(t){var n,a,r,s,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=this.stateAsTensor(),(a=this.allowedActions()).includes(t)){e.next=4;break}return e.abrupt("return",new y(t,n,-1,!0,n,a));case 4:r=this.state.location,s=r%4,i=Math.floor(r/4),e.t0=t,e.next=e.t0===k.UP?10:e.t0===k.DOWN?12:e.t0===k.LEFT?14:e.t0===k.RIGHT?16:18;break;case 10:return i--,e.abrupt("break",19);case 12:return i++,e.abrupt("break",19);case 14:return s--,e.abrupt("break",19);case 16:return s++,e.abrupt("break",19);case 18:return e.abrupt("break",19);case 19:return e.next=21,this.setState({location:4*i+s});case 21:return this.prevAction=t,e.abrupt("return",new y(t,n,this.reward(),this.done(),this.stateAsTensor(),a));case 23:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"reward",value:function(){var e=this.state.location;switch(this.board[e]){case"G":return 1;case"H":return-1;case"F":case"S":default:return 0}}},{key:"done",value:function(){var e=this.state.location,t=this.board[e];return"G"===t||"H"===t}},{key:"stateAsTensor",value:function(){var e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];return e[this.state.location]=1,j.c([e])}},{key:"render",value:function(){var e=[];for(var t in this.board){var n=this.board[t],a=g.classes[n]+" grid-item",r=g.titles[n],s=void 0;s=t==this.state.location?"\uc6c3":n,e.push(Object(O.jsx)("div",{className:a,title:r,children:s},t)),(parseInt(t)+1)%4===0&&e.push(Object(O.jsx)("br",{},t+"-br"))}return Object(O.jsx)("div",{id:"frozen-lake-grid",children:e})}}]),n}(r.a.Component),M=n(19),w=function(){function e(t,n){Object(d.a)(this,e),this.bufferSize=t,this.gamma=n,this.reset()}return Object(f.a)(e,[{key:"reset",value:function(){this.mainModel=j.b(),this.mainModel.add(j.a.dense({units:4,inputShape:16,activation:"relu"})),this.mainModel.compile({loss:"meanSquaredError",optimizer:"adam"}),this.targetModel=j.b(),this.targetModel.add(j.a.dense({units:4,inputShape:16,activation:"relu"})),this.updateTargetModel(),this.replayBuffer=[]}},{key:"step",value:function(){var e=Object(p.a)(l.a.mark((function e(t,n){var a,r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.stateAsTensor(),e.next=3,this.epsilonGreedy(a,t.allowedActions(),n);case 3:return r=e.sent,e.next=6,t.step(r);case 6:return s=e.sent,this.storeTransition(s),e.abrupt("return",s);case 9:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"updateTargetModel",value:function(){for(var e in this.mainModel.layers){var t=this.mainModel.layers[e].getWeights();this.targetModel.layers[e].setWeights(t)}}},{key:"storeTransition",value:function(e){this.replayBuffer.unshift(e),this.replayBuffer.length===this.bufferSize+1&&this.replayBuffer.pop()}},{key:"epsilonGreedy",value:function(){var e=Object(p.a)(l.a.mark((function e(t,n,a){var r,s,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(Math.random()<a)){e.next=3;break}return r=Math.floor(Math.random()*n.length),e.abrupt("return",n[r]);case 3:return s=this.mainModel.predict(t),e.next=6,s.argMax(-1).dataSync();case 6:return i=e.sent,e.abrupt("return",k.fromOrdinal(i[0]));case 8:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"trainModel",value:function(){var e=Object(p.a)(l.a.mark((function e(t){var n,a,r,s,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.replayBuffer.length<t)){e.next=2;break}return e.abrupt("return");case 2:n=Object(c.a)(this.miniBatch(t)),e.prev=3,n.s();case 5:if((a=n.n()).done){e.next=15;break}return r=a.value,s=r.reward,r.done||(s+=this.gamma*this.targetValue(r.nextState)),(i=this.mainModel.predict(r.state).arraySync())[0][r.action.enumOrdinal]=s,e.next=13,this.mainModel.fit(r.state,j.c(i),{epochs:1,batchSize:1,shuffle:!1});case 13:e.next=5;break;case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(3),n.e(e.t0);case 20:return e.prev=20,n.f(),e.finish(20);case 23:case"end":return e.stop()}}),e,this,[[3,17,20,23]])})));return function(t){return e.apply(this,arguments)}}()},{key:"miniBatch",value:function(e){if(e>=this.replayBuffer.length){var t=Object(M.a)(this.replayBuffer);return j.d.shuffle(t),t}for(var n=this.replayBuffer.length,a=new Set;a.size!=e;){var r=Math.floor(Math.random()*n);a.add(this.replayBuffer[r])}return a}},{key:"targetValue",value:function(){var e=Object(p.a)(l.a.mark((function e(t){var n,a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=this.mainModel.predict(t),a=this.targetModel.predict(t),e.next=4,n.argMax(-1).data();case 4:return r=e.sent,e.abrupt("return",a.arraySync()[0][r[0]]);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}(),T=n(262),F=n(200);function z(e){return new Promise((function(t){return setTimeout(t,e)}))}var B=function(e){Object(m.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).gameRef=r.a.createRef(),a.state={mode:"step",epsilon:.5,epsilonMax:1,epsilonMin:0,maxSteps:20,updateTarget:!1,episodes:1e3,batchSize:32,running:!1},a.handleInputChange=a.handleInputChange.bind(Object(b.a)(a)),a.handlePlayButtonPress=a.handlePlayButtonPress.bind(Object(b.a)(a)),a.handleResetButtonPress=a.handleResetButtonPress.bind(Object(b.a)(a)),a}return Object(f.a)(n,[{key:"componentDidMount",value:function(){this.game=this.gameRef.current,this.dqn=new w(F.bufferSize,F.gamma)}},{key:"handleInputChange",value:function(e){var t=e.target,n="checkbox"===t.type?t.checked:t.value,a=t.name;this.setState(Object(h.a)({},a,n))}},{key:"handlePlayButtonPress",value:function(){var e=Object(p.a)(l.a.mark((function e(){var t,n,a,r,s,i,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.state.epsilon,n=this.state.updateTarget,a=this.state.maxSteps,r=this.state.episodes,s=this.state.batchSize,i=this.state.epsilonMax,o=this.state.epsilonMin,e.next=9,this.setState({running:!0});case 9:e.t0=this.state.mode,e.next="step"===e.t0?12:"episode"===e.t0?15:"train"===e.t0?18:22;break;case 12:return e.next=14,this.singleStep(t,n,s);case 14:return e.abrupt("break",23);case 15:return e.next=17,this.singleEpisode(a,t,s);case 17:return e.abrupt("break",23);case 18:return e.next=20,this.fullyTrain(r,a,s,i,o);case 20:return this.dqn.updateTargetModel(),e.abrupt("break",23);case 22:return e.abrupt("break",23);case 23:return e.next=25,this.setState({running:!1});case 25:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"fullyTrain",value:function(){var e=Object(p.a)(l.a.mark((function e(t,n,a,r,s){var i,o,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=(r-s)/t,o=r,c=0;case 3:if(!(c<t&&this.state.running)){e.next=10;break}return e.next=6,this.singleEpisode(n,o,a);case 6:o>s&&(o=(r-s)*Math.exp(-i*c)+s);case 7:c++,e.next=3;break;case 10:case"end":return e.stop()}}),e,this)})));return function(t,n,a,r,s){return e.apply(this,arguments)}}()},{key:"singleEpisode",value:function(){var e=Object(p.a)(l.a.mark((function e(t,n,a){var r,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=0;case 1:if(!(r<t&&this.state.running)){e.next=13;break}return e.next=4,this.dqn.step(this.game,n);case 4:return s=e.sent,e.next=7,z(1e3);case 7:if(this.forceUpdate(),!s.done){e.next=10;break}return e.abrupt("break",13);case 10:r++,e.next=1;break;case 13:return this.game.reset(),e.next=16,this.dqn.trainModel(a);case 16:this.dqn.updateTargetModel();case 17:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"singleStep",value:function(){var e=Object(p.a)(l.a.mark((function e(t,n,a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.dqn.step(this.game,t);case 2:if(!e.sent.done){e.next=7;break}return this.game.reset(),e.next=7,this.dqn.trainModel(a);case 7:n&&this.dqn.updateTargetModel();case 8:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"handleResetButtonPress",value:function(){this.game.reset(),this.dqn.reset()}},{key:"createControlsForMode",value:function(){var e,t=[],n=Object(c.a)(T[this.state.mode]);try{for(n.s();!(e=n.n()).done;){var a=e.value,r=a.props,s=a.label,i=a.tooltip;t.push(this.createLabel(s,r.name,i)),t.push(this.createInput(r))}}catch(o){n.e(o)}finally{n.f()}return Object(O.jsx)("div",{id:"mode-controls",children:t})}},{key:"createLabel",value:function(e,t,n){return Object(O.jsx)("label",{className:"control",htmlFor:t,title:n,id:t+"-label",children:e+":"},t+"-label")}},{key:"createInput",value:function(e){var t=e.name,n=this.handleInputChange,a=this.state[t],s=t+"-input",i=Object(o.a)(Object(o.a)({},e),{},{className:"control labeled",onChange:n,value:a,key:s});return r.a.createElement("input",i)}},{key:"render",value:function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{id:"controls-container",children:Object(O.jsxs)("div",{id:"controls-box",children:[Object(O.jsxs)("div",{id:"static-controls",children:[Object(O.jsxs)("select",{className:"control",id:"mode-select",name:"mode",title:"Mode select",onChange:this.handleInputChange,defaultValue:"step",children:[Object(O.jsx)("option",{value:"step",children:"Single Step"}),Object(O.jsx)("option",{value:"episode",children:"Single Episode"}),Object(O.jsx)("option",{value:"train",children:"Full Training"})]}),Object(O.jsx)("button",{className:"control",id:"play-button",title:"Run",disabled:this.state.running,onClick:this.handlePlayButtonPress,children:"\u25b6"}),Object(O.jsx)("button",{className:"control",id:"reset-button",title:"Reset",disabled:this.state.running,onClick:this.handleResetButtonPress,children:"\u21ba"})]}),this.createControlsForMode()]})}),Object(O.jsx)("div",{id:"game-container",children:Object(O.jsx)(S,{ref:this.gameRef})})]})}}]),n}(r.a.Component);i.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(B,{})}),document.getElementById("root"))}},[[315,1,2]]]);
//# sourceMappingURL=main.28278934.chunk.js.map