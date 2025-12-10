
const myContainer = document.getElementById("box");
// myContainer.style.padding="0px";

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var modalBtn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
modalBtn.addEventListener("click", function () {
    modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});



google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

table_alert();

var flag_pre=0;var flag_custom=0;
function table_alert()
{
    Swal.fire({
        icon:'info',
        title: 'Set Trained Data!',
        html: `<b style="color:#004E86">Select an option for trained data:</b><br><br>
          <input type="radio" id="option1" name="option" value="Pre-defined Table">
          <label for="option1">Predefined Table</label><br><br>
          <input type="radio" id="option2" name="option" value="Custom Table">
          <label for="option2">Custom Table (create your own dataset)</label><br>
         
        `,
        customClass: {
            container: "swal-container",
            popup: "swal-popup",
            title: "swal-title",
            content: "swal-content",
            confirmButton: "swal-button", // Add this line for the confirm button
            cancelButton: "swal-button" // Add this line for the cancel button
        },
        target: myContainer,
        didOpen: () => {
            const container = document.querySelector(".swal-container");
            const containerWidth = myContainer.offsetWidth;
            const containerHeight = myContainer.offsetHeight;
    
            // Change font size based on container size
            if (containerWidth >= 1000 && containerHeight >= 672) {
                container.style.fontSize = "24px";
            } else {
                container.style.fontSize = "16px";
            }
    
            // Adjust dimensions and position of the Swal container
            container.style.position = "absolute";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.top = "0";
            container.style.left = "0";
            container.style.padding = "0";
    
        },
    howCloseButton: false, // Disable the close button
    allowOutsideClick: false, // Prevent closing by clicking outside the modal
    allowEscapeKey: false,
        confirmButtonText: 'Submit',
        preConfirm: () => {
          const selectedOption = document.querySelector('input[name="option"]:checked');
          if (!selectedOption) {
            Swal.showValidationMessage('Please select an option');
          } else {
            return selectedOption.value;
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
            if(result.value=='Pre-defined Table')
            {
                flag_pre=1;
                document.getElementById('predefined-data-table').style.display='block';
                document.getElementById('data-table').style.display='none';

                document.getElementById('X').disabled=true;
                document.getElementById('Y').disabled=true;
                document.getElementById('Species').disabled=true;

                drawChart2();
                updateTableForCompute();
                disableAddButton();
               document.getElementById('resets').disabled=false;
                enableNextButtonData();
            }
         
          else if(result.value=='Custom Table')
          {
          flag_custom=1;
          }
          
        }
      });
}

function alerts(icon,message,title)
{
  Swal.fire({
    icon: icon,
    html: message,
    title: title,
    customClass: {
        container: "swal-container",
        popup: "swal-popup",
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-button", // Add this line for the confirm button
        cancelButton: "swal-button" // Add this line for the cancel button
    },
    target: myContainer,
    didOpen: () => {
        const container = document.querySelector(".swal-container");
        const containerWidth = myContainer.offsetWidth;
        const containerHeight = myContainer.offsetHeight;

        // Change font size based on container size
        if (containerWidth >= 1000 && containerHeight >= 672) {
            container.style.fontSize = "24px";
        } else {
            container.style.fontSize = "16px";
        }

        // Adjust dimensions and position of the Swal container
        container.style.position = "absolute";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.top = "0";
        container.style.left = "0";
        container.style.padding = "0";

    },
    showCloseButton: false, // Disable the close button
    allowOutsideClick: false, // Prevent closing by clicking outside the modal
    allowEscapeKey: false,
  });
}

var data = [["X", "Y"]];
var deleteButtons = [];


var a=0;var b=0;var c=0;
function addDataPoint() {
    var xValue = parseFloat(document.getElementById("X").value);
    var yValue = parseFloat(document.getElementById("Y").value);
    var zValue = document.getElementById("Species").value;

    var xStyle = document.getElementById("X");
    var yStyle = document.getElementById("Y");
    var zStyle = document.getElementById("Species");

    // Check if the values already exist in the data array
    var isDuplicate = data.some(function (entry) {
        return (
            entry[0] === Number(xValue).toFixed(1) &&
            entry[1] === Number(yValue).toFixed(1) 
        );
    });

    if (xValue == '+' || xValue == '-' || xValue == '*' || xValue == '/' || yValue == '+' || yValue == '-' || yValue == '*' || yValue == '/') {
        alerts('error','Please enter valid value.','Invalid Values!');
        
        return;
    }

    if (isNaN(xValue) && isNaN(yValue) && zValue=="NULL") {
        alerts('error','First fill all the values and then click on <b style="color:#004E86">ADD</b> button.','Missing Values!');
        xStyle.style.border="2px solid red";
        yStyle.style.border="2px solid red";
        zStyle.style.border="2px solid red";
         return;
    }
    if (isNaN(xValue) && isNaN(yValue)) {
        alerts('error','Please enter values for Sepal Length and Width.','Missing Values!');
        xStyle.style.border="2px solid red";
        yStyle.style.border="2px solid red";
        return;
    }
    if (isNaN(xValue)) {
        alerts('error','Please input a value for Sepal Length (between 5-7.5).','Missing Value!');
        xStyle.style.border="2px solid red";
        return;
    }
    if (isNaN(yValue)) {
        alerts('error','Please input a value for Sepal Width (between 2-4).','Missing Value!');
        yStyle.style.border="2px solid red";
        return;
    }
    if (zValue==="NULL") {
        alerts('error','Please select a value for Species.','Missing Value!');
        zStyle.style.border="2px solid red";
        return;
    }
    if ((xValue > 7.5 || xValue < 5) && (yValue > 4|| yValue < 2)) {
        alerts('error','Sepal Length should be between 5 and 7.5.<br>Sepal Width should be between 2 and 4.','Value out of range!');   
        xStyle.style.border="2px solid red";
        yStyle.style.border="2px solid red";
        return;
    }

    if (xValue > 7.5 || xValue < 5) {
        alerts('error','Sepal Length should be between 5 and 7.5.','Value out of range!');   
        xStyle.style.border="2px solid red";
        return;
    }
    if ( yValue > 4|| yValue < 2) {
        alerts('error','Sepal Width should be between 2 and 4.','Value out of range!');
        yStyle.style.border="2px solid red";
        return;
    }
    if (!isDuplicate) {
        data.push([
            Number(xValue).toFixed(1),
            Number(yValue).toFixed(1),
            zValue,
        ]);
    
        if(zValue==='Setosa')
        {
          a++;
        }
        if(zValue==='Virginica')
        {
        b++;
        }
        if(zValue==='Verscicolor')
        {
          c++;
        }
    } else {
        alerts('error','The same sepal length & width have been used for different species.<br>Try using different values.','Duplicate Value!');
        return;
    }

    drawChart();
    updateTable();
    updateTableForCompute();

    var resbutton=document.getElementById('resets')
    if(resbutton.disabled==true)
    {
      resbutton.disabled=false;
    }

    document.getElementById("X").value = "";
    document.getElementById("Y").value = "";
    document.getElementById("Species").value = "NULL";

    xStyle.style.border="";
    yStyle.style.border="";
    zStyle.style.border="";

    if (data.length >= 13) {
        console.log(a,b,c);
        if(a==12 || b==12 ||c==12)
        {
            disableAddButton();
            alerts('warning','When sample records share a category, the new data will automatically adopt that category.<br> Please <b style="color:#004E86">RESET</b> the table and try another sample.','All records belongs to same Species!!!');
            disableDeleteButton();
        }
        else if((a==11 || b==11 ||c==11) && (a==1 || b==1 ||c==1) && (a==0 || b==0 ||c==0)) 
        {
          
            Swal.fire({
                title: "It appears that 11 records belong to the same species!!!",
                text: "When more sample records share a category, the new data has a higher chance of being assigned to that category.",
                icon: "warning",
                confirmButtonText: "OK",
                customClass: {
                    container: "swal-container",
                    popup: "swal-popup",
                    title: "swal-title",
                    content: "swal-content",
                },
                target: myContainer,
                didOpen: () => {
                    const container = document.querySelector(".swal-container");
                    const containerWidth = myContainer.offsetWidth;
                    const containerHeight = myContainer.offsetHeight;
        
                    // Change font size based on container size
                    if (containerWidth >= 1000 && containerHeight >= 672) {
                        container.style.fontSize = "24px";
                    } else {
                        container.style.fontSize = "16px";
                    }
        
                    // Adjust dimensions and position of the Swal container
                    container.style.position = "absolute";
                    container.style.width = "100%";
                    container.style.height = "100%";
                    container.style.top = "0";
                    container.style.left = "0";
                    container.style.padding = "0";
        
        
                },
                showCloseButton: false, // Disable the close button
                allowOutsideClick: false, // Prevent closing by clicking outside the modal
                allowEscapeKey: false, // Prevent closing by pressing the escape key

              }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        html: 'Do you want to RESET the table?',
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                        customClass: {
                            container: "swal-container",
                            popup: "swal-popup",
                            title: "swal-title",
                            content: "swal-content",
                        },
                        target: myContainer,
                        didOpen: () => {
                            const container = document.querySelector(".swal-container");
                            const containerWidth = myContainer.offsetWidth;
                            const containerHeight = myContainer.offsetHeight;
                
                            // Change font size based on container size
                            if (containerWidth >= 1000 && containerHeight >= 672) {
                                container.style.fontSize = "24px";
                            } else {
                                container.style.fontSize = "16px";
                            }
                
                            // Adjust dimensions and position of the Swal container
                            container.style.position = "absolute";
                            container.style.width = "100%";
                            container.style.height = "100%";
                            container.style.top = "0";
                            container.style.left = "0";
                            container.style.padding = "0";
                
                
                        },
                        showCloseButton: false, // Disable the close button
                        allowOutsideClick: false, // Prevent closing by clicking outside the modal
                        allowEscapeKey: false, // Prevent closing by pressing the escape key
                    }).then((result) => {
                        if (result.isConfirmed) {
                            disableDeleteButton();
                            disableAddButton();
                        } else {
                            disableAddButton();
                            disableDeleteButton();
                            enableNextButtonData();
                            alerts('info','Click on the <b style="color: #004E86">NEXT</b> Button.');
                          
                        }
                    });
                }
              });
              
           
           
        }
        else{
            disableAddButton();
            promptToDeleteRow();
        }
       
    }
}

function deleteRow(button) {
   
    var row = button.parentNode.parentNode;
    if(row.cells[3].innerHTML=='Setosa')
    {
      a--;
    }
    if(row.cells[3].innerHTML=='Virginica')
    {
     b--;
    }
    if(row.cells[3].innerHTML=='Verscicolor')
    {
      c--;
    }
    var index = row.rowIndex;
    data.splice(index, 1);
    deleteButtons.splice(index - 1, 1);

    drawChart();
    updateTable();
    updateTableForCompute();

    if (data.length >= 11) {
        enableAddButton();
        disableDeleteButton();
    }
    if (data.length <= 11) {
   
        disableNextButtonData();
    }
}

function promptToDeleteRow() {
    Swal.fire({
        text: "Do you want to delete any row?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: {
            container: "swal-container",
            popup: "swal-popup",
            title: "swal-title",
            content: "swal-content",
        },
        target: myContainer,
        didOpen: () => {
            const container = document.querySelector(".swal-container");
            const containerWidth = myContainer.offsetWidth;
            const containerHeight = myContainer.offsetHeight;

            // Change font size based on container size
            if (containerWidth >= 1000 && containerHeight >= 672) {
                container.style.fontSize = "24px";
            } else {
                container.style.fontSize = "16px";
            }

            // Adjust dimensions and position of the Swal container
            container.style.position = "absolute";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.top = "0";
            container.style.left = "0";
            container.style.padding = "0";


        },
        showCloseButton: false, // Disable the close button
        allowOutsideClick: false, // Prevent closing by clicking outside the modal
        allowEscapeKey: false, // Prevent closing by pressing the escape key
    }).then((result) => {
        if (result.isConfirmed) {
            enableNextButtonData();
            enableDeleteButtons();
        } else {
            disableAddButton();
            disableDeleteButton();
            enableNextButtonData();
            alerts('info','Click on the <b style="color: #004E86">NEXT</b> Button.');
          
        }
    });

}

function enableAddButton() {
    document.getElementById("add-button").disabled = false;
}

function disableAddButton() {
    document.getElementById("add-button").disabled = true;
}

function disableTestAddButton() {
    document.getElementById("test-add-button").disabled = true;
}

function enableTestAddButton() {
    document.getElementById("test-add-button").disabled = false;
}

function enableNextButtonData() {
    document.getElementById("next-button").disabled = false;
}
disableNextButtonData();
function disableNextButtonData() {
    document.getElementById("next-button").disabled = true;
}



function tabChange() {
    let NextClass = document.querySelectorAll(".tab-1-disInvert");
    let currentClass = document.querySelectorAll(".tab-1-invert");
    for (let i = 0; i < NextClass.length; i++) {
        NextClass[i].className = "tab-1-invert";
    }
    for (let i = 0; i < currentClass.length; i++) {
        currentClass[i].className = "tab-1-disInvert";
    }
    document.getElementById('tab-1').style.backgroundColor = "#004E86";
    document.getElementById('createimg').src = 'images/create.png';
    document.getElementById('calcimg').src = 'images/calculator1.png';
    document.getElementById('createimg').style.cursor = 'not-allowed';
    document.getElementById('calcimg').style.cursor = 'pointer';

}

function enableDeleteButtons() {
    deleteButtons.forEach(function (button) {
        button.disabled = false;
    });
}

function disableDeleteButton() {
    deleteButtons.forEach(function (button) {
        button.disabled = true;
    });
}


function drawChart() {
    // Convert data to the correct format
    var formattedData = new google.visualization.DataTable();
    formattedData.addColumn('number', 'X');
    formattedData.addColumn('number', 'Y');
    formattedData.addColumn({type: 'string', role: 'style'}); // for point shape
    formattedData.addColumn({type: 'string', role: 'annotation'}); // for legend
console.log(data.length)
    for (var i = 1; i < data.length; i++) {
        var xValue = Number(data[i][0]);
        var yValue = Number(data[i][1]);
        var zValue = data[i][2];
        if(zValue=='Setosa')
        {
            formattedData.addRow([xValue, yValue,'point {shape-type: star; fill-color: #FF0000}','Setosa']);
        }
        else if(zValue=='Virginica')
        {
            formattedData.addRow([xValue, yValue,'point {shape-type: triangle; fill-color: #00FF00}','Virginica']);
        }
        else if(zValue=='Verscicolor')
        {
            formattedData.addRow([xValue, yValue,'point {shape-type: square; fill-color: #0000FF}','Verscicolor']);
        }
        else if(zValue==null)
        {
            formattedData.addRow([xValue, yValue,'point {shape-type: diamond; fill-color: brown}','?']);
        }
        
    }

    var options = {
        legend: { position: "none" },
        hAxis: {
            title: "Sepal Length",
            minValue: 5,
            maxValue: 8
        },
        vAxis: {
            title: "Sepal Width",
            minValue: 2,
            maxValue: 4
        },
        chartArea: { width: "80%", height: "80%" }, // Added to adjust the chart area size
    };

    var chart = new google.visualization.ScatterChart(
        document.getElementById("chart-container")
    );

    chart.draw(formattedData, options);

    var GraphContainer = document.getElementById("chart-container");
    google.visualization.errors.removeAll(GraphContainer);


}

function drawChart2() {
    // Convert data to the correct format
    var formattedData = new google.visualization.DataTable();
    formattedData.addColumn('number', 'X');
    formattedData.addColumn('number', 'Y');
    formattedData.addColumn({type: 'string', role: 'style'}); // for point shape
    formattedData.addColumn({type: 'string', role: 'annotation'}); // for legend

    var table=document.getElementById('predefined-data-table');
    let rows = table.querySelectorAll("tr");
   
    // Iterate over the rows
    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
       
        var xValue = Number(row.cells[1].innerHTML);
        var yValue = Number(row.cells[2].innerHTML);
        var zValue = row.cells[3].innerHTML;

        data.push([
            xValue,
            yValue,
            zValue,
        ]);

        if(zValue=='Setosa')
        {
            formattedData.addRow([xValue, yValue,'point {shape-type: star; fill-color: #FF0000}','Setosa']);
        }
        else if(zValue=='Virginica')
        {
            formattedData.addRow([xValue, yValue,'point {shape-type: triangle; fill-color: #00FF00}','Virginica']);
        }
        else if(zValue=='Verscicolor')
        {
            formattedData.addRow([xValue, yValue,'point {shape-type: square; fill-color: #0000FF}','Verscicolor']);
        }
        else if(zValue==null)
        {
            formattedData.addRow([xValue, yValue,'point {shape-type: diamond; fill-color: brown}','?']);
        }
      
    }

    var options = {
        legend: { position: "none" },
        hAxis: {
            title: "Sepal Length",
            minValue: 5,
            maxValue: 8
        },
        vAxis: {
            title: "Sepal Width",
            minValue: 2,
            maxValue: 4
        },
        chartArea: { width: "80%", height: "80%" }, // Added to adjust the chart area size
    };

    var chart = new google.visualization.ScatterChart(
        document.getElementById("chart-container")
    );

    chart.draw(formattedData, options);

    var GraphContainer = document.getElementById("chart-container");
    google.visualization.errors.removeAll(GraphContainer);


}


function updateTable() {
    let table = document.getElementById("data-table");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    if (table.rows.length < 10) {
        enableAddButton();
    }

    deleteButtons = [];

    for (var i = 1; i < data.length; i++) {
        var row = table.insertRow(i);
        var sCell = row.insertCell(0);
        var xCell = row.insertCell(1);
        var yCell = row.insertCell(2);
        var zCell = row.insertCell(3);
        var deleteCell = row.insertCell(4);

        sCell.innerHTML = `${i}`;
        xCell.innerHTML = data[i][0];
        yCell.innerHTML = data[i][1];
        zCell.innerHTML = data[i][2];

        var deleteButton = document.createElement("input");
        deleteButton.type = "button";
        deleteButton.value = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            
            deleteRow(this);
           
        };

        deleteCell.appendChild(deleteButton);
        deleteButtons.push(deleteButton);
    }
}

function disableDeleteButton() {
    for (let index = 0; index < 12; index++) {
        document.getElementsByClassName("delete-button")[index].disabled = true;
    }
}


validateInputX();
function validateInputX() {
    var inputValue = document.getElementById("X").value;

    if (inputValue.includes("+") || inputValue.includes("-") || inputValue.includes("e")) {
        return false;
    }

    return true;
}
validateInputY();
function validateInputY() {
    var inputValue = document.getElementById("Y").value;

    if (inputValue.includes("+") || inputValue.includes("-") || inputValue.includes("e")) {
         return false;
    }

    return true;
}


document
    .getElementById("next-button")
    .addEventListener("click", function TestDataIsOn() {
       
        alerts('info','Enter the values and click on <b style="color:#004E86">ADD</b> button.','Enter the testing data!!')
        DisplayTestDataSection();
        NoneDataSetAll();
        DisplayTestDataButtonSection();

        let table = document.getElementById("data-table");
        let rows = table.querySelectorAll("tr");

        for (var i = 0; i < rows.length; i++) {
            var cells = rows[i].querySelectorAll("td, th");
            var lastCellIndex = cells.length - 1;

            if (lastCellIndex >= 0) {
                cells[lastCellIndex].parentNode.removeChild(cells[lastCellIndex]);
            }
        }
    });



// switching to compute section
document
    .getElementById("k-next-button")
    .addEventListener("click", function computeIsOn() {
        DisplayComputeSection();
        NoneClusterAll();
        NoneDataSetAll();
        NoneGraphSection();
        NoneTableSection();
        NonetrainingSection();
        tabChange();
        alerts('info','Click on <b style="color: #004E86">DISTANCE</b> button.','Find Euclidean distance!')
        document.getElementById('showTrainData').innerHTML='Training Data = (Sepal Length : '+ xValueTest +', Sepal Width : '+ yValueTest +')';
    });


NoneClusterAll();

NoneComputeSection();


// cluster control panel
function NoneClusterSection() {
    let NoneClusterSection = document.getElementById("cluster-control");
    NoneClusterSection.style.display = "none";
}

function DisplayClusterSection() {
    let NoneClusterSection = document.getElementById("cluster-control");
    NoneClusterSection.style.display = "block";
}

function NoneDataSection() {
    let NoneDataSection = document.getElementById("training-control");
    NoneDataSection.style.display = "none";
}

function DisplayTestDataSection() {
    let DisplayTestDataSection = document.getElementById("testing-control");
    DisplayTestDataSection.style.display = "block";
}
function NoneTestDataSection() {
    let NoneTestDataSection = document.getElementById("testing-control");
    NoneTestDataSection.style.display = "none";
}

function NoneDataButtonSection() {
    let NoneDataButtonSection = document.getElementById("data-button-container");
    NoneDataButtonSection.style.display = "none";
}
function DisplayDataButtonSection() {
    let DisplayDataButtonSection = document.getElementById("data-button-container");
    DisplayDataButtonSection.style.display = "block";
}

function NoneTestDataButtonSection() {
    let NoneTestDataButtonSection = document.getElementById("testdata-button-container");
    NoneTestDataButtonSection.style.display = "none";
}
function DisplayTestDataButtonSection() {
    let DisplayTestDataButtonSection = document.getElementById("testdata-button-container");
    DisplayTestDataButtonSection.style.display = "block";
}

function NoneClusterButtonSection() {
    let NoneClusterButtonSection = document.getElementById("cluster-button-container");
    NoneClusterButtonSection.style.display = "none";
}

function DisplayClusterButtonSection() {
    let DisplayClusterButtonSection = document.getElementById("cluster-button-container");
    DisplayClusterButtonSection.style.display = "block";
}

// table section none and display
function NoneTableSection() {
    let NoneTableSection = document.getElementById("tableId");
    NoneTableSection.style.display = "none";
}
function DisplayTableSection() {
    let DisplayTableSection = document.getElementById("tableId");
    DisplayTableSection.style.display = "block";
}
// graph section none and display
function NoneGraphSection() {
    let NoneGraphSection = document.getElementById("graphId");
    NoneGraphSection.style.display = "none";
}
function DisplayGraphSection() {
    let DisplayGraphSection = document.getElementById("graphId");
    DisplayGraphSection.style.display = "block";
}
// trainingSection section none and display
function NonetrainingSection() {
    let NonetrainingSection = document.getElementById("trainingSection");
    NonetrainingSection.style.display = "none";
}
function DisplaytrainingSection() {
    let DisplaytrainingSection = document.getElementById("trainingSection");
    DisplaytrainingSection.style.display = "block";
}


function disableKSubmitButton() {
    let disableNextButton = document.getElementById("k-submit-button");
    disableNextButton.disabled = true;
}

function enableKSubmitButton() {
    let enableclusterSubmitButton = document.getElementById("k-submit-button");
    enableclusterSubmitButton.disabled = false;
}

// ComputeSection section none and display
// NoneComputeSection();
function NoneComputeSection() {
    let NoneComputeSection = document.getElementById("ComputeSection");
    NoneComputeSection.style.display = "none";
}
function DisplayComputeSection() {
    let DisplayComputeSection = document.getElementById("ComputeSection");
    DisplayComputeSection.style.display = "block";
}

disableNextComputeButton();
function disableNextComputeButton() {
    let disableNextComputeButton = document.getElementById("next-compute-to-analysis");
    disableNextComputeButton.disabled = true;
}

function enableNextComputeButton() {
    let enableNextComputeButton = document.getElementById("next-compute-to-analysis");
    enableNextComputeButton.disabled = false;
}
NoneAnalysis();
function NoneAnalysis() {
    let NoneAnalysis = document.getElementById("analyseSection");
    NoneAnalysis.style.display = "none";
}
function DisplayAnalysis() {
    let DisplayAnalysis = document.getElementById("analyseSection");
    DisplayAnalysis.style.display = "block";
}

function NoneClusterAll() {
    NoneClusterButtonSection();
    NoneClusterSection();
}
function NoneDataSetAll() {
    NoneDataButtonSection();
    NoneDataSection();
}


function limitDecimals(event) {
    var input = event.target;
    var value = input.value;

    // Check if there are more than two decimal places
    if (value.indexOf(".") !== -1 && value.split(".")[1].length > 2) {
        // Remove the extra decimal places
        input.value = parseFloat(value).toFixed(1);
    }
}

const inputElement = document.getElementById('X');
inputElement.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key === '+' || key === '-' || key.toLowerCase() === 'e') {
        event.preventDefault();
    }

});
const inputElementY = document.getElementById('Y');
inputElementY.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key === '+' || key === '-' || key.toLowerCase() === 'e') {
        event.preventDefault();
    }

});
blockKeyboard();
function blockKeyboard() {
    document.getElementsByClassName('select2-selection__rendered')[0];
   }


$(document).ready(function () {
    const maxSelections = 1;

    $('#SelectK').on('change', function (e) {
        kVal = $(this).val();
    });
    $("#SelectK").select2({
        maximumSelectionLength: maxSelections,
    });
    $("#SelectK").on("select2:select", function (e) {
        const selectedOption = e.params.data.id;


        if (centroids.length > maxSelections) {
            const removedOption = centroids.shift();
            $(this)
                .find('option[value="' + removedOption + '"]')
                .prop("selected", false);

        }
        if (kVal.length == 1) {
            alerts('info','Click on <b style="color: #004E86">SUBMIT</b> button!');
        }
    });

});

var xValueTest;var yValueTest;
function submitTestData() {
    var xInput = document.getElementById('Length');
    xValueTest = xInput.value;
    var yInput = document.getElementById('Width');
    yValueTest = yInput.value;
    var xStyle = document.getElementById("Length");
    var yStyle = document.getElementById("Width");
    
    if (xValueTest === '' && yValueTest === '' ) {
        alerts('error','Please enter a value for Sepal Length and Sepal Width.', 'Missing Values!!');
        xStyle.style.border="2px solid red";
        yStyle.style.border="2px solid red";
        return;
      }
    if (xValueTest === '') {
      alerts('error','Please enter a value for Sepal Length.', 'Missing Value!!');
      xStyle.style.border="2px solid red";
      return;
    }
    
    if (isNaN(xValueTest) || xValueTest < 5 || xValueTest > 7.5) {
      alerts('error','Sepal Length should be between 5 and 7.5.', 'Value out of range!');
      xStyle.style.border="2px solid red";
      return;
  }

  if (yValueTest ==='') {
    alerts('error','Please enter a positive value for Sepal Width.', 'Missing Value!!');
    yStyle.style.border="2px solid red";
    return;
  }
  

  if (isNaN(yValueTest) || yValueTest < 2 || yValueTest > 4) {
    alerts('error','Sepal Width should be between 2 and 4.', 'Value out of range!');
    yStyle.style.border="2px solid red";
    return;
}
    let TrainData=[];
    TrainData.push([xValueTest, yValueTest]);
    centroids = TrainData;

    console.log(centroids);
    var observationTable;
    var rows ;
    // Add value to observation table
    if(flag_custom==1)
    {
        observationTable = document.getElementById('data-table');
        rows = observationTable.rows;
    }
    else if(flag_pre==1)
    {
        observationTable = document.getElementById('predefined-data-table');
        rows = observationTable.rows;
    }
    

    for(var i = 1; i < rows.length; i++)
    {
      console.log(rows[1].cells[1].innerHTML)
         if(rows[i].cells[1].innerHTML==xValueTest && rows[i].cells[2].innerHTML==yValueTest)
         {
          alerts('warning', 'Enter a different value and click on <b style="color: #004E86">ADD</b> to proceed.','Oops..Data already exists in the table.');
          xInput.value = '';
          yInput.value = '';
          xStyle.style.border="";
          yStyle.style.border="";
          return;
         }
    }


    var newRow = observationTable.insertRow(-1);
    var serialNumber = observationTable.rows.length - 1;
    var sNoCell = newRow.insertCell(0);
    var xCell = newRow.insertCell(1);
    var yCell = newRow.insertCell(2);
    var zCell = newRow.insertCell(3);

 

    sNoCell.innerHTML = serialNumber;
    xCell.innerHTML =  xValueTest;
    yCell.innerHTML =  yValueTest;


    // Check if it's the 13th row
  
  if (serialNumber === 13) {
      zCell.innerHTML = '?';
      newRow.classList.add('highlight-yellow');
      disableTestAddButton();
      document.getElementById("testing-next-button").disabled = false;
      alerts('info', 'Please click on <b style="color: #004E86">NEXT</b> to proceed.');
      document.getElementById('resetbut').disabled=false;
    } else {
      zCell.innerHTML = '?';
    }
    
    // Add the data to the data array
    data.push([ xValueTest,yValueTest, null]);
  
    console.log(data);
    xInput.value = ''; // Clear input value after submission
    yInput.value = '';
    xStyle.style.border="";
    yStyle.style.border="";
    drawChart();
  }
  

  function resetThirteenthRow() {
    // Get the observation table
    var observationTable;
    if(flag_custom==1)
    {
        observationTable = document.getElementById('data-table');
    }
    
  else if(flag_pre==1)
  {
    observationTable = document.getElementById('predefined-data-table'); 
  }
    // Check if the 13th row exists
    if (observationTable.rows.length > 13) {
      // Remove the 13th row
      observationTable.deleteRow(13);
  
      data.pop()
      drawChart()
      // Enable the "Add" button
      enableTestAddButton();
  
      // Disable the "Next" button
      document.getElementById("testing-next-button").disabled = true;
      
      //disable reset button
      document.getElementById('resetbut').disabled=true;
    }
  }

  document
  .getElementById("testing-next-button")
  .addEventListener("click", function KSelectionIsOn() {
      
      DisplayClusterButtonSection();
      DisplayClusterSection();
      NoneTestDataButtonSection();
      NoneTestDataSection();
  });

let kVal;
function submitK() {
    if (kVal == null) {
        alerts("warning","First select the value for K.","Missing K!")
        return;
    }
    kVal = parseInt(kVal);

    disableKSubmitButton();

    if (kVal) {
        alerts("info",'Click on the <b style="color: #004E86">NEXT</b> button.');
        document.getElementById("k-next-button").disabled = false;
    }
    console.log(kVal);
  
}

function resetK() {

    kVal = '';
    const selectElement = document.getElementById("SelectK");
    selectElement.value = "";
    selectElement.dispatchEvent(new Event("change"));
    enableKSubmitButton();
    document.getElementById("k-next-button").disabled = true;
}


// --------------------------------------------------------------------------------------------------------------
let centroids = [];


function checkDuplicateValue(arr, value) {
    return arr.includes(value);
}

function checkAndRemoveDuplicateValue(arr, value) {
    const uniqueSet = new Set(arr); // Create a Set from the array to remove duplicates
    const isDuplicate = uniqueSet.has(value); // Check if the value already exists in the Set

    if (isDuplicate) {
        // uniqueSet.delete(value); // Remove the value from the Set
        console.log("Duplicate removed");
        // return;
    } else {
        uniqueSet.add(value); // Add the value to the Set
        console.log("Value added");
    }

    const uniqueArray = Array.from(uniqueSet); // Convert the Set back to an array
    return uniqueArray;
}


HighLightingHeadingOfTable();
function HighLightingHeadingOfTable() {
    // Get the table element
    let table = document.getElementById("data-table");

    // Get all the rows in the table body
    let rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    // Iterate over the rows
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        if (i === 0) {
            console.log("Selected row:", row);
            row.style.backgroundColor = "#d8e9f0";
        }
    }
}

HighLightingHeadingOfTable_ForCompute();
function HighLightingHeadingOfTable_ForCompute() {
    // Get the table element
    let table = document.getElementById("data-table-compute");

    // Get all the rows in the table body
    let rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    // Iterate over the rows
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        if (i === 0) {
            console.log("Selected row:", row);
            row.style.backgroundColor = "#d8e9f0";
        }
    }
}
HighLightingHeadingOfTable_ForAnalysis();
function HighLightingHeadingOfTable_ForAnalysis() {
    // Get the table element
    let table = document.getElementById("data-table-analysis");

    // Get all the rows in the table body
    let rows = table.getElementsByTagName("thead")[0].getElementsByTagName("tr");

    // Iterate over the rows
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];

        if (i === 0) {
            console.log("Selected row:", row);
            row.style.backgroundColor = "#d8e9f0";
        }
    }
}

var dataAnalysis=[];

// compute functions
function updateTableForCompute() {
    var table = document.getElementById("data-table-compute");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    if (table.rows.length < 10) {
        enableAddButton();
    }

    deleteButtons = [];

    for (var i = 1; i < data.length; i++) {
        var row = table.insertRow(i);
        var sCell = row.insertCell(0);
        var xCell = row.insertCell(1);
        var yCell = row.insertCell(2);
        var zCell = row.insertCell(3);

        sCell.innerHTML = `${i}`;
        xCell.innerHTML = data[i][0];
        yCell.innerHTML = data[i][1];
        zCell.innerHTML = data[i][2];
console.log(xCell.innerHTML)
    }
}


// Distance button
function enableD_computeButton() {
    document.getElementById("D_compute").disabled = false;
}
function DisableD_computeButton() {
    document.getElementById("D_compute").disabled = true;
}


function euclideanDistance(pointA, pointB) {
    let sum = 0;
    for (let i = 0; i < pointA.length; i++) {
        sum += Math.pow(pointA[i] - pointB[i], 2);
    }
    return Math.sqrt(sum);
}

function roundToTwoDecimalPlaces(number) {
    return Math.round(number * 100) / 100;
}

var ddd=[];

function fillCValues(centroidIndex) {
    const dataTableCompute = document.getElementById("data-table-compute");
    const dataRows = dataTableCompute.querySelectorAll("tbody tr");
    
    Array.from(dataRows)
        .slice(1)
        .forEach((row, index) => {
            const x = parseFloat(row.cells[1].textContent);
            const y = parseFloat(row.cells[2].textContent);
            const distance = euclideanDistance([x, y], centroids[centroidIndex]);
             ddd.push(distance);
            const cellIndex = 4 + centroidIndex;
            const targetCell = row.cells[cellIndex];

            if (targetCell) {
                targetCell.textContent = roundToTwoDecimalPlaces(distance);
            } else {
                const newCell = row.insertCell(cellIndex);
                newCell.textContent = roundToTwoDecimalPlaces(distance);
            }
        });
      
}


function enableHighLightD1() {
    console.log('check')
    const dataTableCompute = document.getElementById("data-table-compute");
    const dataRows = dataTableCompute.querySelectorAll("tbody tr");

    Array.from(dataRows)
        .slice(1)
        .forEach((row, index) => {
            row.cells[4].style.border = "2px solid #004E86";
        });
}
function disableHighLightD1() {
    const dataTableCompute = document.getElementById("data-table-compute");
    const dataRows = dataTableCompute.querySelectorAll("tbody tr");

    Array.from(dataRows)
        .slice(1)
        .forEach((row, index) => {
            if (row.cells[4]) {
                row.cells[4].style.border = "";
            }
        });
}

function enableHighLightRank() {
    const dataTableCompute = document.getElementById("data-table-compute");
    const dataRows = dataTableCompute.querySelectorAll("tbody tr");

    Array.from(dataRows)
        .slice(1)
        .forEach((row, index) => {
            row.cells[5].style.border = "2px solid #004E86";
        });
}

function disableHighLightRank() {
    const dataTableCompute = document.getElementById("data-table-compute");
    const dataRows = dataTableCompute.querySelectorAll("tbody tr");

    Array.from(dataRows)
        .slice(1)
        .forEach((row, index) => {
            if (row.cells[5]) {
                row.cells[5].style.border = "";
            }
        });
}

//compute-distance
document.getElementById("D_compute").addEventListener("click", function () {
 
    fillCValues(0);
    DisableD_computeButton();
    disableHighLightD1();
    enableHighLightD1();
    document.getElementById("rank").disabled = false;
    display();

});

function display()
{
    console.log(ddd);
    document.getElementById("calculation").style.display="block";
    const calculationContainer = document.getElementById("calculation");
    const dataTableCompute = document.getElementById("data-table-compute");
    const dataRows = dataTableCompute.querySelectorAll("tbody tr");
    var d =[];
    d[0]=ddd[0]
    const calculationString = d.map((distance) => {
        const x = parseFloat(dataRows[1].cells[1].textContent);
        const y = parseFloat(dataRows[1].cells[2].textContent);
        const dataX = xValueTest;
        const dataY = yValueTest;
        console.log(x,y,dataX,dataY);
        return `d = √((${x} - ${dataX})² + (${y} - ${dataY})²) = ${distance.toFixed(2)}`;
    }).join("<br>");
    
    calculationContainer.innerHTML = `<b style="color:#004E86">Example:</b><br/> ${calculationString}<br>`;
}

var distances=[];
var sort_distances=[];

//compute-rank-button
function rank()
{
    document.getElementById("calculation").style.display="none";
    document.getElementById('formula_header').innerHTML='RANK';
    document.getElementById('showTrainData').innerHTML='The "rank" of a neighbor refers to its position or order in the sorted list of distances from the query sample.'
    disableHighLightD1();
    document.getElementById("rank").disabled = true;
    const dataTableCompute = document.getElementById("data-table-compute");
    const dataRows = dataTableCompute.querySelectorAll("tbody tr");
    Array.from(dataRows)
    .slice(1)
    .forEach((row, index) => {
       var d= parseFloat(row.cells[4].textContent);
       distances.push(d);
    });
    
    sort_distances=distances;
    sort_distances.sort(function(a, b){return a - b});

    console.log(dataRows)
   var x=1;
   for(var i=0;i<12;i++)
   {
    for(var j=1;j<13;j++)
    {
        const rCell = dataRows[j].cells[5];
       
        if(sort_distances[i]==dataRows[j].cells[4].textContent)
        {
            if (rCell) {
                console.log('reset alradyyyyyy')
             // rCell.textContent = x;
            } else {
                console.log('reset else part')
                const newCell = dataRows[j].insertCell(5);
                newCell.textContent = x;
            }
        }
    }
    if(sort_distances[i]!=sort_distances[i-1])
    {
        x++;
    }
   }
    
    enableHighLightRank();
    enableNextComputeButton();

    Array.from(dataRows)
        .slice(1)
        .forEach((row, index) => {
            a=row.cells[1].textContent;
            b=row.cells[2].textContent;
            c=row.cells[3].textContent;
            d=row.cells[4].textContent;
            e=row.cells[5].textContent;
           dataAnalysis.push([a,b,c,d,e]);
        });
}


//compute-reset-button
function resetComputeSectionForButton() {
   
    const dataTableCompute = document.getElementById("data-table-compute");
    const dataRows = dataTableCompute.querySelectorAll("tbody tr");

   // var row = document.getElementById("compute-tr");

   Array.from(dataRows).slice(1).forEach((row) => {
        
            const distanceCell = row.cells[4];
            const rank = row.cells[5];
            if (distanceCell && rank) {
                row.deleteCell(5);
               
            
        }
    });

    Array.from(dataRows).slice(1).forEach((row) => {
        
        const distanceCell = row.cells[4];
        if (distanceCell) {
            row.deleteCell(4);
           // distanceCell.innerHTML = "";
           // rank.innerHTML = "";
        
    }
});
    enableD_computeButton();
    document.getElementById("rank").disabled = true;
    disableHighLightD1();
    disableHighLightRank();
    disableNextComputeButton();
   
    distances = [];
    dataAnalysis=[];
    ddd=[];

    alerts('info','Click on <b style="color: #004E86">DISTANCE</b> button.','Find Euclidean distance!');
    document.getElementById("calculation").style.display="none";
    document.getElementById('formula_header').innerHTML='DISTANCE';
    document.getElementById('showTrainData').innerHTML='Training Data = (Sepal Length : '+ xValueTest +', Sepal Width : '+ yValueTest +')';
}


document.getElementById("next-compute-to-analysis").addEventListener("click", function () {
    DisplayAnalysis();
    tabChangeIntoAnalysis();
    NoneClusterAll();
    NoneComputeSection();
    centroids = removeFirstElement(centroids)
    createTable(dataAnalysis)
    NoneDataSetAll();
    NoneTableSection();
    NoneGraphSection();
    NonetrainingSection();
    document.getElementById('head').innerHTML='These are the '+ kVal +' neighbors with the smallest calculated distances and closest points to the testing data point.'
});


function tabChangeIntoAnalysis() {

    let NextClass = document.querySelectorAll(".tab-2-disInvert");
    let currentClass = document.querySelectorAll(".tab-1-invert");
    for (let i = 0; i < NextClass.length; i++) {
        NextClass[i].className = "tab-2-invert";
    }
    for (let i = 0; i < currentClass.length; i++) {
        currentClass[i].className = "tab-1-disInvert";
    }
    document.getElementById('tab-1').style.backgroundColor = "#004E86";
    document.getElementById('anaimg').src = 'images/ANALYSIS1.png';
    document.getElementById('anaimg').style.cursor = 'pointer';
    document.getElementById('calcimg').src = 'images/calculator.png';
    document.getElementById('calcimg').style.cursor = 'not-allowed';

    
}



function drawChartAnalysis() {
    var numPoints = kVal; // Number of data points
    
    // Create data table
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number', 'X');
    dataTable.addColumn('number', 'Y');
    dataTable.addColumn({ type: 'string', role: 'style' });
    dataTable.addColumn({type: 'string', role: 'annotation'}); // for legend

    // Add data points and cluster values to the data table
    for (var i = 0; i < numPoints+1; i++) {
        
        console.log('enter');
        var x = plotdataAnalysis[i][0];
        var y = plotdataAnalysis[i][1];        
        var Species = plotdataAnalysis[i][2];
        if(Species=='Setosa')
        {
            dataTable.addRow([x, y,'point {shape-type: star; fill-color: #FF0000}','Setosa']);
        }
        else if(Species=='Virginica')
        {
            dataTable.addRow([x, y,'point {shape-type: triangle; fill-color: #00FF00}','Virginica']);
        }
        else if(Species=='Verscicolor')
        {
            dataTable.addRow([x, y,'point {shape-type: square; fill-color: #0000FF}','Verscicolor']);
        }
        else if(Species=='?')
        {

            if(final_result=='Setosa')
            {
                dataTable.addRow([x, y,'point {shape-type: star; fill-color: #FF0000}',final_result]);
            }
            else if(final_result=='Virginica')
            {
                dataTable.addRow([x, y,'point {shape-type: triangle; fill-color: #00FF00}',final_result]);
            }
            else if(final_result=='Verscicolor')
            {
                dataTable.addRow([x, y,'point {shape-type: square; fill-color: #0000FF}',final_result]);
            }
            
        }
    }


    // Set chart options

    var options = {
        legend: { position: "none" },
        hAxis: {
            title: "Sepal Length",
            minValue: 4.5,
        },
        vAxis: {
            title: "Sepal Width",
            minValue: 2,
        },
        pointSize:10,
        chartArea: { width: "80%", height: "80%" }, // Added to adjust the chart area size
    };

    // Create scatter plot chart
    var chart = new google.visualization.ScatterChart(document.getElementById('graph'));
    chart.draw(dataTable, options);

}


function analysisContainer() {
    google.charts.load('current', { packages: ['corechart', 'table'] });
    google.charts.setOnLoadCallback(drawChartAnalysis);

}

function printPage() {
    window.print();
}

var plotdataAnalysis=[];
var final_result;

function createTable(dataAnalysis) {
    var tableHTML = '';
    console.log(dataAnalysis.length)
    var rows=0;
    for(var i=1;i<=kVal && rows<kVal;i++)
    {
        for (var j = 0; j < dataAnalysis.length; j++) {
            var row = dataAnalysis[j];
            if(row[4]==i)
            {
                tableHTML += '<tr>';
                tableHTML += '<td>' + (rows+1) + '</td>';
                tableHTML += '<td>' + row[0] + '</td>';
                tableHTML += '<td>' + row[1] + '</td>';
                tableHTML += '<td>' + row[2] + '</td>';
                tableHTML += '</tr>';
                plotdataAnalysis.push([Number(row[0]),Number(row[1]),row[2]])
                rows++;
                if(rows==kVal)
                {
                    tableHTML += '<tr>';
                tableHTML += '<td>' + (rows+1) + '</td>';
                tableHTML += '<td>' + Number(xValueTest) + '</td>';
                tableHTML += '<td>' + Number(yValueTest) + '</td>';
                tableHTML += '<td>' + '?' + '</td>';
                tableHTML += '</tr>';
                    console.log(typeof(xValueTest),yValueTest)
                    plotdataAnalysis.push([Number(xValueTest),Number(yValueTest),'?'])
                    break;
                }
            }
            else{
                console.log('notttt')
            }
    
        }
       
    }
    var tableBody = document.querySelector('#data-table-analysis tbody');
    tableBody.innerHTML = tableHTML;
}

function removeFirstElement(arr) {
    return [...arr.slice(1)];
}

document.getElementById("plot-analysis").addEventListener("click", function () {

    analysisContainer();
    document.getElementById("print").disabled = false;
    document.getElementById("plot-analysis").disabled = true;

    

    var a=0,b=0,c=0; var res;
    for(var i=0;i<plotdataAnalysis.length;i++)
    {
        var Species = plotdataAnalysis[i][2];
        if(Species=='Virginica')
        {
          a++;
        }
        else if(Species=='Verscicolor')
        {
           b++;
        }
        else if(Species=='Setosa'){
          c++;
        }
    }
    if(a==b && b==c)
    {
      alerts('info','Testing data point can lie in any category because all the data belongs to different species.','Tie!!!');
      document.getElementById('result').innerHTML='Data point '+Number(xValueTest)+', '+Number(yValueTest)+ ' can belong to any species category since every neighbor belongs to a different species.'
      return;
    }
else if((a==b && b!=c && a>c) || (b==c && a!=b && b>a) || (a==c && b!=c && a>b))
{
    alerts('info','Testing data point can lie in any category','Tie!!!');
    if(a==b)
    {
        document.getElementById('result').innerHTML='Data point '+Number(xValueTest)+', '+Number(yValueTest)+ ' can belong to either the Virginica or Versicolor species, as both categories have the same majority.'
    }
    else if(b==c)
    {
        document.getElementById('result').innerHTML='Data point '+Number(xValueTest)+', '+Number(yValueTest)+ ' can belong to either the Versicolor or Setosa species, as both categories have the same majority.'
    }
    else if(a==c)
    {
        document.getElementById('result').innerHTML='Data point '+Number(xValueTest)+', '+Number(yValueTest)+ ' can belong to either the Virginica or Setosa species, as both categories have the same majority.'
    }
   
    return;
}

    else if(a==Math.max(a,b,c))
    {
        res='Virginica'
    }
    else if(b==Math.max(a,b,c))
    {
        res='Verscicolor'
    }
    else if(c==Math.max(a,b,c))
    {
        res='Setosa'
    }
  alerts('success',`As per the data, test data point belong to <b style="color:#004E86">${res}</b> species.`,'Testing data point is assigned to the category that are in majority.')
    document.getElementById('result').innerHTML='Data point '+Number(xValueTest)+', '+Number(yValueTest)+ ' belongs to ' +res+' species.'
 
final_result=res;
});


if (performance.navigation.type === 1) {
    // Page was reloaded, redirect to index.html
    window.location.href = 'index.html';
}
