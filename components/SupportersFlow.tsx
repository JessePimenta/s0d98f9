"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Supporter {
  id: number;
  username: string;
  avatar: string;
  artistsSupported: string[];
  following: number[];
  musicTaste: string[];
  purchasesInCommon: number;
}

const SAMPLE_SUPPORTERS: Supporter[] = [
  {
    id: 1,
    username: '@musiclover',
    avatar: 'https://i.imgur.com/w6j5yFr.png',
    artistsSupported: ['Lechuga Zafiro', 'Artist B'],
    following: [2, 3],
    musicTaste: ['electronic', 'experimental'],
    purchasesInCommon: 4
  },
  {
    id: 2,
    username: '@beatmaker',
    avatar: 'https://i.imgur.com/X3Zfhwh.png',
    artistsSupported: ['Lechuga Zafiro', 'Artist C'],
    following: [1, 4],
    musicTaste: ['electronic', 'techno'],
    purchasesInCommon: 3
  },
  {
    id: 3,
    username: '@vinylhead',
    avatar: 'https://i.imgur.com/VfQ8HKz.png',
    artistsSupported: ['Artist B', 'Artist C'],
    following: [1],
    musicTaste: ['experimental', 'ambient'],
    purchasesInCommon: 2
  },
  {
    id: 4,
    username: '@synthwave',
    avatar: 'https://i.imgur.com/w6j5yFr.png',
    artistsSupported: ['Lechuga Zafiro'],
    following: [2, 5],
    musicTaste: ['electronic'],
    purchasesInCommon: 5
  },
  {
    id: 5,
    username: '@basshead',
    avatar: 'https://i.imgur.com/X3Zfhwh.png',
    artistsSupported: ['Artist B', 'Artist C'],
    following: [4, 6],
    musicTaste: ['bass', 'electronic'],
    purchasesInCommon: 1
  }
];

export function SupportersFlow() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400; // Reduced width
    const height = 200; // Reduced height
    const nodeRadius = 20; // Slightly smaller nodes

    // Clear existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "transparent");

    // Create links data
    const links = SAMPLE_SUPPORTERS.flatMap(supporter =>
      supporter.following
        .filter(followingId => SAMPLE_SUPPORTERS.some(s => s.id === followingId))
        .map(followingId => ({
          source: supporter.id,
          target: followingId
        }))
    );

    // Create force simulation
    const simulation = d3.forceSimulation(SAMPLE_SUPPORTERS)
      .force("link", d3.forceLink(links)
        .id((d: any) => d.id)
        .distance(80)) // Reduced distance
      .force("charge", d3.forceManyBody().strength(-150)) // Reduced strength
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(nodeRadius + 5));

    // Create curved links
    const link = svg.append("g")
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", "rgba(255, 255, 255, 0.2)")
      .attr("stroke-width", 1)
      .attr("fill", "none");

    // Create node groups
    const nodeGroup = svg.append("g")
      .selectAll("g")
      .data(SAMPLE_SUPPORTERS)
      .join("g")
      .style("cursor", "pointer");

    // Add circular background for avatars
    nodeGroup.append("circle")
      .attr("r", nodeRadius)
      .attr("fill", "rgba(255, 255, 255, 0.1)")
      .attr("stroke", "rgba(255, 255, 255, 0.2)")
      .attr("stroke-width", 1);

    // Add clipPath for circular avatars
    const defs = svg.append("defs");
    
    nodeGroup.each(function(d) {
      const clipId = `clip-${d.id}`;
      defs.append("clipPath")
        .attr("id", clipId)
        .append("circle")
        .attr("r", nodeRadius - 2)
        .attr("cx", 0)
        .attr("cy", 0);
    });

    // Add avatar images
    nodeGroup.append("image")
      .attr("xlink:href", d => d.avatar)
      .attr("x", -nodeRadius)
      .attr("y", -nodeRadius)
      .attr("width", nodeRadius * 2)
      .attr("height", nodeRadius * 2)
      .attr("clip-path", d => `url(#clip-${d.id})`)
      .style("opacity", 0.9);

    // Add hover effects and tooltip
    nodeGroup.on("mouseover", function(event, d: Supporter) {
      if (!tooltipRef.current) return;
      
      const tooltip = tooltipRef.current;
      
      tooltip.innerHTML = `
        <div class="text-sm">
          <p class="font-medium">${d.username}</p>
          <p class="text-xs text-zinc-400">${d.purchasesInCommon} purchases in common</p>
        </div>
      `;
      
      tooltip.style.display = "block";
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;

      // Highlight connected nodes and links
      const connectedNodes = d.following;
      nodeGroup.style("opacity", n => connectedNodes.includes(n.id) || n.id === d.id ? 1 : 0.3);
      link.style("opacity", l => l.source.id === d.id || l.target.id === d.id ? 1 : 0.1);
    })
    .on("mouseout", function() {
      if (!tooltipRef.current) return;
      
      tooltipRef.current.style.display = "none";
      
      // Reset highlights
      nodeGroup.style("opacity", 1);
      link.style("opacity", 1);
    });

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link.attr("d", (d: any) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * 2;
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });

      nodeGroup.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white/10 ring-1 ring-white/20" />
          <span>Supporter</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-[1px] bg-white/20" />
          <span>Connection</span>
        </div>
      </div>
      
      <div className="relative w-full">
        <svg ref={svgRef} />
        <div
          ref={tooltipRef}
          className="fixed hidden bg-zinc-900/90 backdrop-blur-md rounded-lg px-3 py-2 pointer-events-none z-50"
        />
      </div>
    </div>
  );
}