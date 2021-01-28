// Add day to top
$('#day-display').html(moment().format('MMMM Do YYYY'));

// retrieve existing scheduler data
let taskData = {day: moment().format('MMMM Do YYYY')};
let storedTaskData = localStorage.taskData ? JSON.parse(localStorage.taskData) : {};
// retrieve existing data only if same day
if (taskData.day === storedTaskData.day) {
    taskData = storedTaskData;
}
// remove existing data if it's from a different day
else if (storedTaskData.length > 0) localStorage.removeItem('taskData');

// fill in scheduler with data
Object.entries(taskData).forEach(task => {
    let [id, input] = task;
    $('#'+id).val(input);
})

// track all clicks on the document
$(document).on('mousedown', newSelection );

let currentDiv = '';
function newSelection(event) {
    event.stopPropagation();
    if (currentDiv !== event.target.id) {
        // save stuff for previous selection
        saveData(currentDiv);
        // track new selection
        currentDiv = event.target.id;
    }
}

function saveData(id) {
    // check if id being selected is not blank
    if (id !== '') {
        if ($('#'+id).val().length) taskData[id] = $('#'+id).val();
        // delete data from taskData if the entry is blank
        else delete taskData[id];
        localStorage.taskData = JSON.stringify(taskData);
    }
}

let currentHr = parseInt(moment().format('HH')); //24 hr format
let percentOfHr = Math.round((parseInt(moment().format('mm'))/60)*100); //0 to 100

// modify background-color of all blocks to match time of day
for (let i=6; i<21; i++) {
    if ($('#row-'+i).length) {
        if (i < currentHr) $('#row-'+i).css('background-color','rgb(250, 190, 190)');
        if (i === currentHr) $('#row-'+i).css('background',`linear-gradient(180deg, rgb(250, 190, 190) ${percentOfHr-10}%, rgb(190, 250, 190) ${percentOfHr+10}%)`);
        if (i > currentHr) $('#row-'+i).css('background-color','rgb(190, 250, 190)');
    }
}
