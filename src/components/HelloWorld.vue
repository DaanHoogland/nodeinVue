<template>
  <div class="hello">
    <d3-network :net-nodes="nodes" :net-links="links" :options="options" @node-click="clickHandler"/>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network'
const net = '<svg width=32 height=32 viewBox="0 0 8.4666667 8.4666667" xmlns="http://www.w3.org/2000/svg">\
               <path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0.0108047,0.00421647 0.98621415,3.1079757 0.97576083,5.7116003 1.7595846,8.3811075" id="path2647" /><path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 1.8854955,-0.00974035 2.8609049,3.0940189 2.8504516,5.6976435 3.6342754,8.3671507" id="path2647-3" /><path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 3.787298,0.00738904 4.7627074,3.1111483 4.7522541,5.7147728 5.5360779,8.3842801" id="path2647-3-6" /><path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 5.6034975,0.05170587 6.5789069,3.1554651 6.5684536,5.7590897 7.3522774,8.4285969" id="path2647-3-7" /><path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M -0.02002822,2.8466425 0.78694216,2.6098176 2.7193578,2.7667492 4.5068767,2.4936891 6.3066493,2.7040295 7.605497,2.3562147" id="path2829" /><path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0.13444496,4.8655701 0.94141536,4.6287452 2.8738309,4.7856768 4.6613498,4.5126167 6.4611224,4.7229571 7.7599701,4.3751423" id="path2829-5" /><path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0.1234646,3.9194563 0.93043498,3.6826314 2.8628507,3.839563 4.6503696,3.5665029 6.4501422,3.7768433 7.7489899,3.4290285" id="path2829-3" /><path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0.16879043,5.9484252 0.97576083,5.7116003 2.9081764,5.8685319 4.6956953,5.5954718 6.4954679,5.8058122 7.7943156,5.4579974" id="path2829-56" /><path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 0.40306911,6.9111278 1.2100395,6.6743029 3.1424551,6.8312345 4.929974,6.5581744 6.7297466,6.7685148 8.0285943,6.4207" id="path2829-2" /></svg>'
const router = '<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="m 4.5,5 a 0.5,0.5 0 1 0 0,-1 0.5,0.5 0 0 0 0,1 z M 3,4.5 a 0.5,0.5 0 1 1 -1,0 0.5,0.5 0 0 1 1,0 z" id="path3032" /><path d="M 0,4 A 2,2 0 0 1 2,2 h 12 a 2,2 0 0 1 2,2 V 5 A 2,2 0 0 1 14,7 H 8.5 v 3 a 1.5,1.5 0 0 1 1.5,1.5 h 5.5 a 0.5,0.5 0 0 1 0,1 H 10 A 1.5,1.5 0 0 1 8.5,14 h -1 A 1.5,1.5 0 0 1 6,12.5 H 0.5 a 0.5,0.5 0 0 1 0,-1 H 6 A 1.5,1.5 0 0 1 7.5,10 V 7 H 2 A 2,2 0 0 1 0,5 Z M 1,4 V 5 A 1,1 0 0 0 2,6 H 14 A 1,1 0 0 0 15,5 V 4 A 1,1 0 0 0 14,3 H 2 A 1,1 0 0 0 1,4 Z m 6,7.5 v 1 A 0.5,0.5 0 0 0 7.5,13 h 1 A 0.5,0.5 0 0 0 9,12.5 v -1 A 0.5,0.5 0 0 0 8.5,11 h -1 A 0.5,0.5 0 0 0 7,11.5 Z" id="path3034" /></svg>'
const terminal = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-terminal" viewBox="0 0 16 16"><path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9zM3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"/><path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h12z"/></svg>'
const web = '<svg width="32" height="32" viewBox="0 0 8.4666667 8.4666667" xmlns="http://www.w3.org/2000/svg">\
               <path style="fill:none;stroke:#000000;stroke-width:0.24125px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"\
                    d="M 0.70831313,0.04318139 C 7.8915921,8.2775308 7.8915921,8.2911158 7.8915921,8.2911158 l -0.034211,-0.032672 0.016675,0.02042 v 0 -0.018011 z"\
                    id="path327" />\
               <path style="fill:none;stroke:#000000;stroke-width:0.244396px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"\
                 d="M 0.66648508,8.4706247 7.8923728,0.00175173 Z"\
                 id="path522" />\
               <path style="fill:none;stroke:#000000;stroke-width:0.264583px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"\
                 d="M 0.03961723,4.269305 8.4454965,4.2415465 Z"\
                 id="path637" />\
               <ellipse style="fill:none;fill-rule:evenodd;stroke-width:0.264583;fill-opacity:1;stroke:#000000;stroke-opacity:1"\
                 id="path661"\
                 cx="4.3320909"\
                 cy="4.3453326"\
                 rx="0.93598986"\
                 ry="1.067996" />\
               <ellipse\
                 style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.264583;stroke-opacity:1" id="path1716" cx="4.3750901" cy="4.3444986" rx="1.3873277" ry="1.5951424" /><ellipse style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.264583;stroke-opacity:1"\
                 id="path1718"\
                 cx="4.3901772"\
                 cy="4.3989611"\
                 rx="1.9068974"\
                 ry="2.2405691" />\
               <ellipse style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.264583;stroke-opacity:1"\
                 id="path1720"\
                 cx="4.4873753"\
                 cy="4.3932076"\
                 rx="2.5465705"\
                 ry="2.9387021" />\
               <ellipse style="fill:none;fill-opacity:1;stroke:#000000;stroke-width:0.264583;stroke-opacity:1"\
                 id="path1722"\
                 cx="4.565578"\
                 cy="4.2711277"\
                 rx="3.4389026"\
                 ry="3.7749023"\
                 node-click="clickHandler"/>\
             </svg>'
export default {
  data () {
    return {
      nodes: [
        { id: 1, name: 'the outside', svgSym: web},
        { id: 2, name: 'VR', svgSym: router},
        { id: 3, name:'net1', svgSym: net, _color: 'orange' },
        { id: 4, name: 'vm1', svgSym: terminal, _color: 'green'},
        { id: 5, name: 'vm2', svgSym: terminal, _color: 'black' },
        { id: 6, name: 'net2', svgSym: net },
        { id: 7, name: 'vm3', svgSym: terminal },
        { id: 8, name: 'vm4', svgSym: terminal },
        { id: 9, name: 'vm5', svgSym: terminal }
      ],
      links: [
        { sid: 1, tid: 2, _color: '#aa00bb' },
        { sid: 2, tid: 3, _color: 'black' },
        { sid: 3, tid: 4, name:'custom link', _color: 'blue' },
        { sid: 3, tid: 5, _color: 'blue' },
        { sid: 2, tid: 6, _color: 'black' },
        { sid: 6, tid: 7, _color: 'red' },
        { sid: 6, tid: 8, _color: 'red' },
        { sid: 6, tid: 9, _color: 'red' }
      ],
      
      nodeSize:20,
      canvas:false

    }
  },
  computed:{
    options(){
      return{
        force: 3000,
        size:{ w:600, h:600},
        nodeSize: this.nodeSize,
        nodeLabels: true,
        linkLabels: true,
        canvas: this.canvas,
        linkWidth: 2,
        strLinks: true
      }
    }
  },
  components: {
    D3Network
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    clickHandler (event,nodeObject) {
      console.log("You clicked the node " + nodeObject + " at " + event.datetime + "!");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.link {
  color: black;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
