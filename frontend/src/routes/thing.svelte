<!-- LineGraph.svelte -->
<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let rides = [
      { "name": "😀", "value": 65, "label": "test" },
      { "name": "🤩", "value": 63 },
      { "name": "😘", "value": 23, "label": "worse" },
      { "name": "🤑", "value": 87 },
      { "name": "😀1", "value": 65, "label": "test" },
      { "name": "🤩1", "value": 63 },
      { "name": "😘1", "value": 23, "label": "worse" },
      { "name": "🤑1", "value": 87 }
    ];
  
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    let svg;
  
    onMount(() => {
      drawGraph();
    });
  
    function drawGraph() {
      svg = d3.select("#line-graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
  
      const x = d3.scaleBand()
        .domain(rides.map(d => d.name))
        .range([0, width])
        .padding(0.1);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max(rides, d => d.value)])
        .nice()
        .range([height, 0]);
  
      const line = d3.line()
        .x(d => x(d.name) + x.bandwidth() / 2)
        .y(d => y(d.value));
  
      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
  
      svg.append("g")
        .call(d3.axisLeft(y));
  
      svg.append("path")
        .datum(rides)
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-width", 2)
        .attr("d", line);
  
      // Add labels if available
      svg.selectAll(".label")
        .data(rides.filter(d => d.label))
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => x(d.name) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) +25) // Adjust the position above the point
        .attr("text-anchor", "middle")
        .text(d => d.label);
    }
  </script>
  
  <div id="line-graph"></div>