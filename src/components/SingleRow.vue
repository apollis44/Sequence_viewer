<template>
  <svg :id="'svg_' + virtualRow.index" width="100%" height="100%"></svg>
</template>

<script>
import * as d3 from 'd3';

export default {
    props: ['virtualRow', 'row', 'font_size', 'font_family'],
    mounted() {
        this.modifySvg();
    },
    methods: {
        modifySvg() {
            const svg = d3.select('#svg_' + this.virtualRow.index);

            let sequence = this.row.sequence;
            let mapped_sequence = this.row.mapped_sequence;
            let font_widths = this.row.font_widths;
            let nucleotides_numbers = this.row.nucleotides_numbers;

            let x = 20 + font_widths[0]/2;

            let nucleotide = "";
            let nucleotide_mapped = "";
            let color_mapped = "";
            let current_font_width = font_widths[0];

            for (let i = 0; i < sequence.length; i++){
                nucleotide = sequence[i];
                nucleotide_mapped = mapped_sequence[i];

                if (mapped_sequence[i] === "-" || mapped_sequence[i] === ".......") {
                    color_mapped = "black";
                }
                else {
                    color_mapped = "red";
                }
                svg.append("text")
                   .attr("x", x - current_font_width/2 + font_widths[i]/2)
                   .attr("y", this.font_size)
                   .attr("font-size", this.font_size + "px")
                   .attr("text-anchor", "middle")
                   .attr("font-family", this.font_family)
                   .text(nucleotide);

                svg.append("text")
                   .attr("x", x - current_font_width/2 + font_widths[i]/2)
                   .attr("y", 2 * this.font_size)
                   .attr("font-size", this.font_size + "px")
                   .attr("fill", color_mapped)
                   .attr("text-anchor", "middle")
                   .attr("font-family", this.font_family)
                   .text(nucleotide_mapped);

                if ((nucleotides_numbers[i]) % 5 === 0) {
                    svg.append("line")
                       .attr("x1", x)
                       .attr("y1", 2.5 * this.font_size)
                       .attr("x2", x)
                       .attr("y2", 3 * this.font_size)
                       .attr("stroke", "black")
                       .attr("stroke-width", 1 * this.font_size / 12);

                    svg.append("text")
                       .attr("x", x)
                       .attr("y", 3.5 * this.font_size )
                       .attr("font-size", this.font_size/1.7  + "px")
                       .attr("fill", "black")
                       .attr("text-anchor", "middle")
                       .text(nucleotides_numbers[i]);
                }
                x = x - current_font_width/2 + font_widths[i]/2 + font_widths[i];
                current_font_width = font_widths[i];
            }
            svg.append("line")
                .attr("x1", 20)
                .attr("y1", 2.5*this.font_size)
                .attr("x2", x - font_widths[sequence.length - 1])
                .attr("y2", 2.5*this.font_size)
                .attr("stroke", "black")
                .attr("stroke-width", this.font_size / 12);
        },
    },
};
</script>