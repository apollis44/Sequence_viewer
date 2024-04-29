
import * as d3 from 'd3'

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

let sequence = "";
let mapped_sequence = "";
for (let i = 0; i <1000; i++) {
    sequence += choose(["A", "T", "C", "G"]);
}
for (let i = 0; i <20; i++) {
    for (let j = 0; j < 25; j++) {
        mapped_sequence += choose(["A", "T", "C", "G"]);
    }
    for (let j = 0; j < 25; j++) {
        mapped_sequence += choose(["-"]);
    }
}
let width_page = document.body.clientWidth - 20;
let font_family = "Arial";
let font_size = 12;



function createSVG(sequence_length_on_one_line) {

    // clear the svg
    d3.selectAll("svg > *").remove();

    font_size = 12;
    let letter_width = getTextWidth(font_size, font_family);
    let width = width_page/(sequence_length_on_one_line + 2);

    if (letter_width > width) {
        font_size = Math.floor(font_size * width / letter_width);
    }

    let y = font_size + 10;
    
    let number_of_lines = Math.ceil(sequence.length / sequence_length_on_one_line);
    let height = 5.5 * font_size * number_of_lines + 10;

    let svg = d3.select("svg")
        .attr("width", width_page)
        .attr("height", height)
        .style("background-color", "white");
    
    for (let i = 0; i < number_of_lines; i++) {
        if (i === number_of_lines - 1) {
            let sequence_part = sequence.slice(i * sequence_length_on_one_line, sequence.length);
            let sequence_part_mapped = mapped_sequence.slice(i * sequence_length_on_one_line, sequence.length);
            createLine(sequence_part, sequence_part_mapped, width, y, svg, i * sequence_length_on_one_line);
            break;
        }
        let sequence_part = sequence.slice(i * sequence_length_on_one_line, (i + 1) * sequence_length_on_one_line);
        let sequence_part_mapped = mapped_sequence.slice(i * sequence_length_on_one_line, (i + 1) * sequence_length_on_one_line);
        createLine(sequence_part, sequence_part_mapped, width,  y, svg, i * sequence_length_on_one_line);
        y += 5.5 * font_size;
    }

    return svg.node;
}

function createLine(sequence, sequence_mapped, width, y, svg, counter) {

    let x = width;
    let nucleotide = "";
    let nucleotide_mapped = "";
    let color_mapped = "";

    for (let i = 0; i < sequence.length; i++) {
        nucleotide = sequence[i];

        if (sequence_mapped[i] === "-") {
            nucleotide_mapped = " ";
            color_mapped = "black";
        }
        else if (sequence_mapped[i] != nucleotide) {
            color_mapped = "red";
            nucleotide_mapped = sequence_mapped[i];
        }
        else {
            color_mapped = "black";
            nucleotide_mapped = "-";
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

        if ((i + 1 + counter) % 5 === 0) {
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
                .text(i + 1 + counter);

        }
        x += width;
    }
    svg.append("line")
        .attr("x1", width/2)
        .attr("y1", y + 1.5*font_size)
        .attr("x2", x - width)
        .attr("y2", y + 1.5*font_size)
        .attr("stroke", "black")
        .attr("stroke-width", 1 * font_size / 12);

}

function getTextWidth(font_size, font_family) {  
     
    let inputText = "G"; 
    let font = font_size + " " + font_family; 
    
    let canvas = document.createElement("canvas"); 
    let context = canvas.getContext("2d"); 
    context.font = font; 
    let width = context.measureText(inputText).width; 
    return width;
} 

export default function SequenceViewer(zoom_level) {
    let sequence_length_on_one_line = Math.ceil(1000 / zoom_level);
    createSVG(sequence_length_on_one_line);
}
  