import * as d3Core from 'd3';
import * as d3Force from 'd3-force-3d';
import { default as extend } from 'lodash/assign';
let d3 = {};
extend(d3, d3Core, d3Force);

/* global AFRAME */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * 3d Force-Directed graph component for A-Frame.
 */
AFRAME.registerComponent('forcegraph', {
    schema: {
        jsonUrl: {type: 'string', default: ''},
        nodeRelSize: {type: 'number', default: 4}, // volume per val unit
        lineOpacity: {type: 'number', default: 0.2},
        valField: {type: 'string', default: 'val'},
        nameField: {type: 'string', default: 'name'},
        colorBy: {type: 'string', default: 'name'},
        warmUpTicks: {type: 'int', default: 0}, // how many times to tick the force engine at init before starting to render
        coolDownTicks: {type: 'int', default: Infinity},
        coolDownTime: {type: 'int', default: 15000} // ms
    },

    init() {
        this.forceLayout = d3.forceSimulation()
            .numDimensions(3)
            .force('link', d3.forceLink().id(d => d.id))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter())
            .stop();

        this.nodes = [];
        this.links = [];
    },

    update(oldData) {
        const that = this,
            elData = this.data,
            diff = AFRAME.utils.diff(this.data, oldData);

        if ('jsonUrl' in diff) {
            // (Re-)load data
            d3.json(this.data.jsonUrl, json => {
                // Color brewer paired set
                const colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'];

                // add color
                json.nodes.filter(node => !node.color).forEach(node => {
                    node.color = parseInt(colors[node[elData.colorBy] % colors.length].slice(1), 16);
                });

                // add links id
                json.links.forEach(link => {
                    link.id = [link.source,link.target].join(' > ');
                });

                that.nodes = json.nodes;
                that.links = json.links;

                that.update(elData);  // Force re-update
            });
        }

        // Add children entities
        const d3El = d3.select(this.el);
        let nodes = d3El.selectAll('a-sphere.node')
            .data(this.nodes, d => d.id);

        nodes.exit().remove();

        nodes = nodes.merge(
            nodes.enter()
                .append('a-sphere')
                .classed('node', true)
                .attr('segments-width', 8)	// Lower geometry resolution to improve perf
                .attr('segments-height', 8)
                .attr('radius', d => Math.cbrt(d[this.data.valField] || 1) * this.data.nodeRelSize)
                .attr('color', d => '#' + (d.color || 0xffffaa).toString(16))
                .attr('opacity', 0.75)
                .on('mouseenter', d => {
                    console.log('in', d);
                    //this.data.tooltipElem.attr('value', this.data.nameAccessor(d) || '');
                })
                .on('mouseleave', () => {
                    console.log('out', d);
                    //this.data.tooltipElem.attr('value', '');
                })
        );

        let links = d3El.selectAll('a-entity.link')
            .data(this.links, d => d.id);

        links.exit().remove();

        links = links.merge(
            links.enter()
                .append('a-entity')
                .classed('link', true)
                .attr('line', `color: #f0f0f0; opacity: ${this.data.lineOpacity}`)
        );

        // Feed data to force-directed layout
        this.forceLayout
            .stop()
            .alpha(1)// re-heat the simulation
            .nodes(this.nodes)
            .force('link').links(this.links);

        for (let i=0; i<this.data.warmUpTicks; i++) { this.forceLayout.tick(); } // Initial ticks before starting to render

        let cntTicks = 0;
        const startTickTime = new Date();
        this.forceLayout.on("tick", layoutTick).restart();

        //

        function layoutTick() {
            if (cntTicks++ > that.data.coolDownTicks || (new Date()) - startTickTime > that.data.coolDownTime) {
                that.forceLayout.stop(); // Stop ticking graph
            }

            // Update nodes position
            nodes.attr('position', d => `${d.x} ${d.y || 0} ${d.z || 0}`);

            //Update links position
            links.attr('line', d => `start: ${d.source.x} ${d.source.y || 0} ${d.source.z || 0};  end: ${d.target.x} ${d.target.y || 0} ${d.target.z || 0}`);
        }
    }
});
