import * as d3 from 'd3'

class Row {
    constructor(sequence, mapped_sequence, font_widths, nucleotides_numbers) {
        this.sequence = sequence;
        this.mapped_sequence = mapped_sequence;
        this.font_widths = font_widths;
        this.nucleotides_numbers = nucleotides_numbers;
    }
}

function Rows(font_size, font_family) {
    function choose(choices) {
        var index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }

    let whole_sequence = "";
    let whole_mapped_sequence = "";
    for (let i = 0; i <20000; i++) {
        whole_sequence += choose(["A", "T", "C", "G"]);
    }
    for (let i = 0; i <200; i++) {
        for (let j = 0; j < 70; j++) {
            whole_mapped_sequence += choose(["-"]);
        }
        for (let j = 0; j < 30; j++) {
            whole_mapped_sequence += choose(["A", "T", "C", "G"]);
        }
    }
    let width_page = document.body.clientWidth - 20;
    
    d3.selectAll("svg > *").remove();

    let sequence = [];
    let mapped_sequence = [];
    let font_widths = [];
    let nucleotides_numbers = [];
    let font_width = getTextWidth(font_size, font_family);
    
    let Rows = [];
    let current_width = 0;

    let nucleotide = "";
    let nucleotide_mapped = "";
    let skip = false;

    for (let i = 0; i < whole_sequence.length; i++) {
        if (current_width + font_width > width_page - 40) {
            current_width = 0;
            Rows.push(new Row(
                sequence, 
                mapped_sequence, 
                font_widths, 
                nucleotides_numbers
            ));
            sequence = [];
            mapped_sequence = [];
            font_widths = [];
            nucleotides_numbers = [];
        }

        nucleotide = whole_sequence[i];

        if (whole_mapped_sequence[i] === "-") {
            if (!skip) {
                nucleotide = ".......";
                nucleotide_mapped = ".......";
                let font_width_skip = getTextWidth(font_size, font_family, nucleotide_mapped) + 2;
                current_width += font_width_skip;

                font_widths.push(font_width_skip);
                nucleotides_numbers.push(1);
                sequence.push(nucleotide);
                mapped_sequence.push(nucleotide_mapped);
            }
            skip = true;
            continue;
        }
        else if (whole_mapped_sequence[i] != nucleotide) {
            nucleotide_mapped = whole_mapped_sequence[i];
            skip = false;
        }
        else {
            nucleotide_mapped = "-";
            skip = false;
        }

        current_width += font_width;
        font_widths.push(font_width);
        nucleotides_numbers.push(i + 1);
        sequence.push(nucleotide);
        mapped_sequence.push(nucleotide_mapped);
    }
    Rows.push(new Row(
        sequence,
        mapped_sequence,
        font_widths,
        nucleotides_numbers
    ));

    return Rows;
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

export default Rows;