const list = document.querySelector('.list-group');
const usersModal = document.querySelector('.modal');


const addUsers = document.querySelector('.modal-footer');
addUsers.addEventListener('click', (e) => {
    e.preventDefault();

    const list_ = Array.from(list.children);    

    if(e.toElement.innerText.includes('Select')){        
        list_.forEach(entry => {
            entry.children[0].checked = true;            
        });
    }
    else{
        list_.forEach(entry => {
            entry.children[0].checked = false;
        });
    }    
});

const playSpeed = document.querySelector('.play-speed');
playSpeed.addEventListener('click', (e) => {

    const re = /([0-9]+)/;
    var speed = playSpeed.innerText.split(re);    
    var speedInc = parseInt(speed[1]) + 1;

    if(speedInc === 10){
        speedInc = 1;
    }
    playSpeed.innerHTML = `<i class="fas fa-tachometer-alt fa-2x align-middle mx-2" aria-hidden="true"></i>${speedInc}x`        
});

const playPause = document.querySelector('.play-pause');
playPause.addEventListener('click', (e) => {

    if(playPause.innerHTML.includes('fa-play')){ 
        playPause.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
    }
    else {
        playPause.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    }
});

class DataPoint {
    constructor(wind,heading, speed, roll, pitch) {
        this.wind = wind;
        this.heading = heading;
        this.speed = speed;
        this.roll = roll;
        this.pitch = pitch;
        this.vmg = 0.1;
    }
}

// Table maipulation
class Sailor {
    constructor(name, sailNumber, icon) {
        this.id = Symbol(name);
        this.name = name;
        this.sailNumber = sailNumber;
        this.icon = icon;
        this.selected = true;
        this.coordinates = [];
    }
    addPoint(point) {
        this.coordinates.push(point);
    }
}

var allSailors = [];

// allSailors.forEach(sailor => {
//     sailor.addPoint(new DataPoint(300, 400, 4 ,6 , 8));
// });


function resizeBottomPanel() {
    const navbarHeight = document.querySelector('.navbar').clientHeight;
    const topPanelHeight = document.querySelector('.top_panel').clientHeight;
    const splitterHeight = document.querySelector('.splitter_panel .hsplitter').clientHeight;
    const bottomPanel = document.querySelector('.bottom_panel');
            
    bottomPanel.style.height = window.innerHeight - topPanelHeight - navbarHeight - splitterHeight - 10;    
}

function updateTable(sailors) {
    const table = document.querySelector('table');
    
    var rows  = table.rows.length;
    while(rows > 1){        
        table.deleteRow(-1);
        rows--;
    }    

    sailors.forEach(sailor => {
        if(!sailor.checked) {
            return;
        }

        var row = table.insertRow(-1);
        var name = row.insertCell(0);
        var wind = row.insertCell(1);
        var heading = row.insertCell(2);
        var speed = row.insertCell(3);
        var vmg = row.insertCell(4);
        var pitch = row.insertCell(5);
        var roll = row.insertCell(6);

        name.innerHTML = sailor.name;
        // wind.innerHTML = sailor.coordinates[0].wind;
        // heading.innerHTML = sailor.coordinates[0].heading;
        // speed.innerHTML = sailor.coordinates[0].speed;
        // vmg.innerHTML = sailor.coordinates[0].vmg;
        // pitch.innerHTML = sailor.coordinates[0].pitch;
        // roll.innerHTML = sailor.coordinates[0].roll;
    });

    resizeBottomPanel();
}

// ---- modal
function updateSailorListModal(sailors) {
    list.innerHTML = '';    
    if(sailors.length == 0){
        list.classList.add('justify-content-center');
        list.innerHTML = 'Please select a date from the caledar';
    }
    else {
        list.classList.remove('justify-content-center');
        sailors.forEach(sailor => {
            list.innerHTML += `<li class="list-group-item border-0 col-4">
                                   <input type="checkbox" class="mx-1">${sailor.name}
                               </li>`
        });
        console.log(list.innerHTML);
    }
}



// ---- splitter
var splitter = $('#workbench').height(1000).split({
    orientation: 'horizontal',
    limit: 200,
    position: '80%', // if there is no percentage it interpret it as pixels
    onDrag: function(event) {
        // console.log(splitter.position());        
        resizeBottomPanel();
    }
});