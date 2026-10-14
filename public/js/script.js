
const canvasMovie = document.getElementById('wheel-movie');
const canvasSeries = document.getElementById('wheel-series');


const colors = [
    { fill: '#e63946', text: '#fff' },
    { fill: '#0000ff', text: '#fff' },
    { fill: '#008000', text: '#fff' },
    { fill: '#ffff00', text: '#000' },
    { fill: '#ffb6c1', text: '#000' }
];

const movies = [
    { title: "Pirates of the Caribbean", parts: 5, next: 1 },
    { title: "Shrek 4" },
    { title: "Bee Movie" },
    { title: "Nosferatu",  },
    { title: "Call me by your name" },
    { title: "WERWULF" },
    { title: "The Accountant" },
    { title: "Castle in the Sky" },
    { title: "Grave of the Fireflies" },
    { title: "My Neighbor Totoro" },
    { title: "The Untouchables" },
    { title: "Princess Mononoke" },
    { title: "Spirited Away" },
    { title: "Howl's Moving Castle" },
    { title: "Ponyo" },
    { title: "No Country for Old Men" },
    { title: "The Boy and the Heron" },
    { title: "The Wind Rises" },
    { title: "The Rocky horror picture show" },
    { title: "Napolion Dynamite" },

];


const series = [
    { title: "Dune serien" },
    { title: "Parterapi" },
    { title: "X on the beach sweaden" },
    { title: "JOJO" },
    { title: "Psycho-Pass" },
    { title: "GOT" },
    { title: "Hotel Hell" },
    { title: "Kitchen Nightmares" },
    { title: "Vinland saga" },
    { title: "Jujutsu Kaisen" },
    { title: "Apthacary Diaries"},
    { title: "My Hero Acadmia" },
    { title: "Saiki K" },
    { title: "Naked Attraction" },
    
];




// spin stufff
let rotationMovie = 0;
let rotationSeries = 0;

const spinMovieBtn = document.getElementById('spin-movie');
const spinSeriesBtn = document.getElementById('spin-series');

function setupWheel(canvas, button, items) {

    let rotation = 0;

    drawWheel(canvas,items);

    button.addEventListener('click', () => {
        button.disabled = true;
        rotation += 360 * 4 + Math.random()*360;
        canvas.style.transform =`rotate(${rotation}deg)`;
    });

    canvas.addEventListener('transitionend', () => {
        button.disabled = false;
        console.log('Wheel stopped');

        const sliceDeg = 360 / items.length;
        const angleAtPointer = 360 - Math.abs(rotation % 360);
        const index = Math.floor(angleAtPointer / sliceDeg);

        console.log(getLabel(items[index]));
    });
}

function getLabel(object) { 
    let out = ""
    out += object.title
    
    if (object.parts != undefined) {
        out += " " + object.next
    }
    
    return out;
}

function getColor(i, count) {
    const isLast = i === count-1;
    const sameAsFirst = i % colors.length === 0;
    
    if (isLast && sameAsFirst && count > 1) {
        return colors[1];
    }    
    
    return colors[i%colors.length]
}

function drawWheel(canvas, items) {

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    const ctx = canvas.getContext('2d');
    const sliceAngle = Math.PI*2 / items.length;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < items.length; i++) {
        const color = getColor(i,items.length);
        
        const start = i * sliceAngle ;
        const end = (i + 1) * sliceAngle;

        // Slice
        ctx.fillStyle = color.fill;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, start, end);
        ctx.closePath()
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.save();
        ctx.translate(centerX,centerY);
        ctx.rotate(start + sliceAngle / 2);
        
        ctx.fillStyle = color.text;
        ctx.fillText(getLabel(items[i]),radius-10,0);
        ctx.restore();
    } 
}

setupWheel(canvasMovie, spinMovieBtn, movies)
setupWheel(canvasSeries, spinSeriesBtn, series)