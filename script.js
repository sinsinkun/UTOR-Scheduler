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
$(document).on('click', newSelection );

let currentDiv = '';
function newSelection(event) {
    // if you click on a new div
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
        if ($('#'+id).val() === '') {
            console.log('removing data for ' + id);
            delete taskData[id];
        }
        else {
            console.log('saving data for ' + id);
            taskData[id] = $('#'+id).val();
        }
        localStorage.taskData = JSON.stringify(taskData);
    }
}

// modify background-color of all blocks to match day
let currentHr = parseInt(moment().format('HH')); //24 hr format
let percentOfHr = Math.round((parseInt(moment().format('mm'))/60)*100); //0 to 100

for (let i=6; i<21; i++) {
    if ($('#row-'+i).length) {
        // before current hour
        if (i < currentHr) $('#row-'+i).css('background-color','rgb(250, 190, 190)');
        // current hour
        if (i === currentHr) $('#row-'+i).css('background',`linear-gradient(180deg, rgb(250, 190, 190) ${percentOfHr-15}%, rgb(190, 250, 190) ${percentOfHr}%)`);
        // after current hour
        if (i > currentHr) $('#row-'+i).css('background-color','rgb(190, 250, 190)');
    }
}
