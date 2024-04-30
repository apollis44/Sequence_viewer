
import * as d3 from 'd3'

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

let sequence = "";
let mapped_sequence = "";
for (let i = 0; i <10000; i++) {
    sequence += choose(["A", "T", "C", "G"]);
}
for (let i = 0; i <10; i++) {
    for (let j = 0; j < 975; j++) {
        mapped_sequence += choose(["-"]);
    }
    for (let j = 0; j < 25; j++) {
        mapped_sequence += choose(["A", "T", "C", "G"]);
    }
}
let width_page = document.body.clientWidth - 20;
let font_family = "Arial";
let font_size = 12;

function createSVG(zoom_level) {

    // clear the svg
    d3.selectAll("svg > *").remove();

    font_size = zoom_level;
    let font_width = getTextWidth(font_size, font_family);

    let y = font_size + 10;
    
    let height = 0;

    let svg = d3.select("svg")
        .attr("width", width_page)
        .style("background-color", "white");
    
    let current_nucleotide = 0;
    while (current_nucleotide < sequence.length) {
        current_nucleotide = createLine(sequence, mapped_sequence, font_width, y, svg, current_nucleotide, sequence.length);

        y += 5.5 * font_size;
        height += 5.5 * font_size;
    }
    svg.attr("height", height + 10);

    return svg.node;
}

function createLine(sequence, sequence_mapped, font_width, y, svg, current_nucleotide, total_nucleotides) {

    let x = font_width;
    let nucleotide = "";
    let nucleotide_mapped = "";
    let color_mapped = "";
    let skip = false;

    while (x + font_width < width_page && current_nucleotide < total_nucleotides) {
        nucleotide = sequence[current_nucleotide];

        if (sequence_mapped[current_nucleotide] === "-") {
            if (!skip) {
                nucleotide = ".......";
                nucleotide_mapped = ".......";
                let font_width_skip = getTextWidth(font_size, font_family, nucleotide_mapped) + 2;
                color_mapped = "black";

                svg.append("text")
                    .attr("x", x + font_width_skip/2 - font_width/2)
                    .attr("y", y)
                    .attr("font-size", font_size + "px")
                    .attr("text-anchor", "middle")
                    .attr("font-family", font_family)
                    .style("font-weight", "bold")
                    .text(nucleotide);

                svg.append("text")
                    .attr("x", x + font_width_skip/2 - font_width/2)
                    .attr("y", y + 1 * font_size)
                    .attr("font-size", font_size + "px")
                    .attr("fill", color_mapped)
                    .attr("text-anchor", "middle")
                    .attr("font-family", font_family)
                    .style("font-weight", "bold")
                    .text(nucleotide_mapped);
                
                x += font_width_skip;
            }
            current_nucleotide++;
            skip = true;
            continue;
        }
        else if (sequence_mapped[current_nucleotide] != nucleotide) {
            color_mapped = "red";
            nucleotide_mapped = sequence_mapped[current_nucleotide];
            skip = false;
        }
        else {
            color_mapped = "black";
            nucleotide_mapped = "-";
            skip = false;
        }

        svg.append("text")
            .attr("x", x)
            .attr("y", y)
            .attr("font-size", font_size + "px")
            .attr("text-anchor", "middle")
            .attr("font-family", font_family)
            .text(nucleotide);

        svg.append("text")
            .attr("x", x)
            .attr("y", y + 1 * font_size)
            .attr("font-size", font_size + "px")
            .attr("fill", color_mapped)
            .attr("text-anchor", "middle")
            .attr("font-family", font_family)
            .text(nucleotide_mapped);

        if ((current_nucleotide + 1) % 5 === 0) {
            svg.append("line")
            .attr("x1", x)
            .attr("y1", y + 1.5 * font_size)
            .attr("x2", x)
            .attr("y2", y + 2 * font_size)
            .attr("stroke", "black")
            .attr("stroke-width", 1 * font_size / 12);

            svg.append("text")
                .attr("x", x)
                .attr("y", y + 3 * font_size )
                .attr("font-size", font_size  + "px")
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .text(current_nucleotide + 1);

        }
        x += font_width;
        current_nucleotide++;
    }
    svg.append("line")
        .attr("x1", font_width/2)
        .attr("y1", y + 1.5*font_size)
        .attr("x2", x - font_width)
        .attr("y2", y + 1.5*font_size)
        .attr("stroke", "black")
        .attr("stroke-width", 1 * font_size / 12);

    return current_nucleotide;
}

function getTextWidth(font_size, font_family, text = "G") {  
     
    let inputText = text; 
    let font = font_size + "px " + font_family; 
    
    let canvas = document.createElement("canvas"); 
    let context = canvas.getContext("2d"); 
    context.font = font; 
    let width = context.measureText(inputText).width; 
    return width;
} 

export default function SequenceViewer(zoom_level) {
    createSVG(zoom_level);
}
  