         AFRAME.registerComponent("forcegraph", {
         schema: {
             jsonUrl: {
                 type: "string",
                 default: ""
             },
             nodes: {
                 parse: i,
                 default: []
             },
             links: {
                 parse: i,
                 default: []
             },
             numDimensions: {
                 type: "number",
                 default: 3
             },
             dagMode: {
                 type: "string",
                 default: ""
             },
             dagLevelDistance: {
                 type: "number",
                 default: 0
             },
             dagNodeFilter: {
                 parse: r,
                 function: () => !0
             },
             onDagError: {
                 parse: r,
                 default: void 0
             },
             nodeRelSize: {
                 type: "number",
                 default: 4
             },
             nodeId: {
                 type: "string",
                 default: "id"
             },
             nodeVal: {
                 parse: a,
                 default: "val"
             },
             nodeResolution: {
                 type: "number",
                 default: 8
             },
             nodeVisibility: {
                 parse: a,
                 default: !0
             },
             nodeColor: {
                 parse: a,
                 default: "color"
             },
             nodeAutoColorBy: {
                 parse: a,
                 default: ""
             },
             nodeOpacity: {
                 type: "number",
                 default: .75
             },
             nodeThreeObject: {
                 parse: a,
                 default: null
             },
             nodeThreeObjectExtend: {
                 parse: a,
                 default: !1
             },
             linkSource: {
                 type: "string",
                 default: "source"
             },
             linkTarget: {
                 type: "string",
                 default: "target"
             },
             linkVisibility: {
                 parse: a,
                 default: !0
             },
             linkColor: {
                 parse: a,
                 default: "color"
             },
             linkAutoColorBy: {
                 parse: a,
                 default: ""
             },
             linkOpacity: {
                 type: "number",
                 default: .2
             },
             linkWidth: {
                 parse: a,
                 default: 0
             },
             linkResolution: {
                 type: "number",
                 default: 6
             },
             linkCurvature: {
                 parse: a,
                 default: 0
             },
             linkCurveRotation: {
                 parse: a,
                 default: 0
             },
             linkMaterial: {
                 parse: a,
                 default: null
             },
             linkThreeObject: {
                 parse: a,
                 default: null
             },
             linkThreeObjectExtend: {
                 parse: a,
                 default: !1
             },
             linkPositionUpdate: {
                 parse: r,
                 default: null
             },
             linkDirectionalArrowLength: {
                 parse: a,
                 default: 0
             },
             linkDirectionalArrowColor: {
                 parse: a,
                 default: null
             },
             linkDirectionalArrowRelPos: {
                 parse: a,
                 default: .5
             },
             linkDirectionalArrowResolution: {
                 type: "number",
                 default: 8
             },
             linkDirectionalParticles: {
                 parse: a,
                 default: 0
             },
             linkDirectionalParticleSpeed: {
                 parse: a,
                 default: .01
             },
             linkDirectionalParticleWidth: {
                 parse: a,
                 default: .5
             },
             linkDirectionalParticleColor: {
                 parse: a,
                 default: null
             },
             linkDirectionalParticleResolution: {
                 type: "number",
                 default: 4
             },
             onNodeHover: {
                 parse: r,
                 default: () => {}
             },
             onLinkHover: {
                 parse: r,
                 default: () => {}
             },
             onNodeClick: {
                 parse: r,
                 default: () => {}
             },
             onLinkClick: {
                 parse: r,
                 default: () => {}
             },
             forceEngine: {
                 type: "string",
                 default: "d3"
             },
             d3AlphaMin: {
                 type: "number",
                 default: 0
             },
             d3AlphaDecay: {
                 type: "number",
                 default: .0228
             },
             d3VelocityDecay: {
                 type: "number",
                 default: .4
             },
             ngraphPhysics: {
                 parse: i,
                 default: null
             },
             warmupTicks: {
                 type: "int",
                 default: 0
             },
             cooldownTicks: {
                 type: "int",
                 default: 1e18
             },
             cooldownTime: {
                 type: "int",
                 default: 15e3
             },
             onEngineTick: {
                 parse: r,
                 default: function() {}
             },
             onEngineStop: {
                 parse: r,
                 default: function() {}
             }
         },
         getGraphBbox: function() {
             return this.forceGraph || (this.forceGraph = new e),
                 this.forceGraph.getGraphBbox()
         },
         emitParticle: function() {
             this.forceGraph || (this.forceGraph = new e);
             const t = this.forceGraph,
                 n = t.emitParticle.apply(t, arguments);
             return n === t ? this : n
         },
         d3Force: function() {
             this.forceGraph || (this.forceGraph = new e);
             const t = this.forceGraph,
                 n = t.d3Force.apply(t, arguments);
             return n === t ? this : n
         },
         d3ReheatSimulation: function() {
             return this.forceGraph && this.forceGraph.d3ReheatSimulation(),
                 this
         },
         refresh: function() {
             return this.forceGraph && this.forceGraph.refresh(),
                 this
         },
         init: function() {
             const t = this.state = {};
             t.infoEl = document.createElement("a-text"),
                 t.infoEl.setAttribute("position", "0 -0.1 -1"),
                 t.infoEl.setAttribute("width", 1),
                 t.infoEl.setAttribute("align", "center"),
                 t.infoEl.setAttribute("color", "lavender");
             const n = document.querySelector("a-entity[camera], a-camera");
             n.appendChild(t.infoEl),
                 t.cameraObj = n.object3D.children.filter((function(t) {
                     return "PerspectiveCamera" === t.type
                 }))[0],
                 this.el.sceneEl.addEventListener("camera-set-active", (function(e) {
                     t.cameraObj = e.detail.cameraEl.components.camera.camera
                 })),
                 this.forceGraph || (this.forceGraph = new e),
                 this.forceGraph.onFinishUpdate((() => this.el.setObject3D("forcegraphGroup", this.forceGraph))).onLoading((() => t.infoEl.setAttribute("value", "Loading..."))).onFinishLoading((() => t.infoEl.setAttribute("value", ""))),
                 this.el.addEventListener("raycaster-intersected", (e => t.hoverDetail = e.detail)),
                 this.el.addEventListener("raycaster-intersected-cleared", (e => t.hoverDetail = e.detail)),
                 this.el.addEventListener("click", (() => t.hoverObj && this.data["on" + ("node" === t.hoverObj.__graphObjType ? "Node" : "Link") + "Click"](t.hoverObj.__data)))
         },
         remove: function() {
             this.state.infoEl.remove(),
                 this.el.removeObject3D("forcegraphGroup")
         },
         update: function(t) {
             const e = this,
                 n = this.data,
                 i = AFRAME.utils.diff(n, t);
             ["jsonUrl", "numDimensions", "dagMode", "dagLevelDistance", "dagNodeFilter", "onDagError", "nodeRelSize", "nodeId", "nodeVal", "nodeResolution", "nodeVisibility", "nodeColor", "nodeAutoColorBy", "nodeOpacity", "nodeThreeObject", "nodeThreeObjectExtend", "linkSource", "linkTarget", "linkVisibility", "linkColor", "linkAutoColorBy", "linkOpacity", "linkWidth", "linkResolution", "linkCurvature", "linkCurveRotation", "linkMaterial", "linkThreeObject", "linkThreeObjectExtend", "linkPositionUpdate", "linkDirectionalArrowLength", "linkDirectionalArrowColor", "linkDirectionalArrowRelPos", "linkDirectionalArrowResolution", "linkDirectionalParticles", "linkDirectionalParticleSpeed", "linkDirectionalParticleWidth", "linkDirectionalParticleColor", "linkDirectionalParticleResolution", "forceEngine", "d3AlphaMin", "d3AphaDecay", "d3VelocityDecay", "ngraphPhysics", "warmupTicks", "cooldownTicks", "cooldownTime", "onEngineTick", "onEngineStop"].filter((function(t) {
                     return t in i
                 })).forEach((function(t) {
                     e.forceGraph[t]("" !== n[t] ? n[t] : null)
                 })),
                 ("nodes" in i || "links" in i) && e.forceGraph.graphData({
                     nodes: n.nodes,
                     links: n.links
                 })
         },
         tick: function(t, e) {
             const n = this.state,
                 i = this.data,
                 r = n.hoverDetail ? n.hoverDetail.getIntersection ? n.hoverDetail.getIntersection(this.el) : n.hoverDetail.intersection || void 0 : void 0;
             let a = r ? r.object : void 0;
             for (; a && !a.hasOwnProperty("__graphObjType");)
                 a = a.parent;
             if (a !== n.hoverObj) {
                 const t = n.hoverObj ? n.hoverObj.__graphObjType : null,
                     e = n.hoverObj ? n.hoverObj.__data : null,
                     r = a ? a.__graphObjType : null,
                     o = a ? a.__data : null;
                 t && t !== r && i["on" + ("node" === t ? "Node" : "Link") + "Hover"](null, e),
                     r && i["on" + ("node" === r ? "Node" : "Link") + "Hover"](o, t === r ? e : null),
                     n.hoverObj = a
             }
             this.forceGraph.tickFrame()
         }
         })
         }
         )(), {}
         }
         )()
         }
         ));