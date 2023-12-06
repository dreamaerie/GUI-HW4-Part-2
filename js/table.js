var min_col;
var max_col;

var min_row;
var max_row;

var tableReal = false;

var error = "";

var tab_counter = 0;

$("#inputForm").validate();

$( function() {
    var min_col_input = $("#min_col");
    var min_col_slider = $( "<div id='min_col_slider'></div>").insertAfter(min_col_input).slider({
            min:-200,
            max:200,
            value: min_col_input.selectedIndex,
            slide: function( event, ui ) {
                min_col_input.val(ui.value);
            }
        });
        min_col_input.on("change", function() {
            min_col_slider.slider( "value", min_col_input.val());
    });

    var max_col_input = $("#max_col");
    var max_col_slider = $( "<div id='max_col_slider'></div>").insertAfter(max_col_input).slider({
            min:-200,
            max:200,
            value: max_col_input.selectedIndex,
            slide: function( event, ui ) {
                max_col_input.val(ui.value);
            }
        });
        max_col_input.on("change", function() {
            max_col_slider.slider( "value", max_col_input.val());
    });

    var min_row_input = $("#min_row");
    var min_row_slider = $( "<div id='min_row_slider'></div>").insertAfter(min_row_input).slider({
            min:-200,
            max:200,
            value: min_row_input.selectedIndex,
            slide: function( event, ui ) {
                min_row_input.val(ui.value);
            }
        });
        min_row_input.on("change", function() {
            min_row_slider.slider( "value", min_row_input.val());
    });

    var max_row_input = $("#max_row");
    var max_row_slider = $( "<div id='max_row_slider'></div>").insertAfter(max_row_input).slider({
            min:-200,
            max:200,
            value: max_row_input.selectedIndex,
            slide: function( event, ui ) {
                max_row_input.val(ui.value);
            }
        });
        max_row_input.on("change", function() {
            max_row_slider.slider( "value", min_row_input.val());
    });
    
    $("#submit").on("click", function(){
        var temp = $("#tableHolder").tabs();
        temp.tabs("refresh");
    });
} );

function validateForm() {
    if (isNaN(min_col) | isNaN(max_col) | isNaN(min_row) | isNaN(max_row)) {
        error = "input must be numbers.";
        alert(error.text());
        return false;
    } else if (min_col > max_col) {
        error = "minimum column must be less than or equal to maximum."
        return false;
    } else if (min_row > max_row) {
        error = "minimum row must be less than or equal to maximum."
        return false;
    } else if (min_col > 200 | max_col > 200 | min_row > 200 | max_row > 200) {
        error = "input cannot be above 200";
        return false;
    } else if (min_col < -200 | max_col < -200 | min_row < -200 | max_row < -200) {
        error = "input cannot be below -200";
        return false;
    }
    return true;
}

document.getElementById("submit").onclick = function() {
    min_col = Number(document.getElementById("min_col").value);
    max_col = Number(document.getElementById("max_col").value);
    
    min_row = Number(document.getElementById("min_row").value);
    max_row = Number(document.getElementById("max_row").value);
    
    

    if(!validateForm()) {
        document.getElementById("error_msg").innerHTML = error;
        error = "";
    } else {
        if (!tableReal) {
            // $("#tableHolder").tabs();
            
            var tabList = document.createElement("ul");
            tabList.setAttribute("id", "tab-list");
            document.getElementById("tableHolder").appendChild(tabList);

            tableReal = true;
        } 
        var label =  "table" + (tab_counter + 1);
        var tab = document.createElement("li");
        tab.setAttribute("id","h" + label);
        var tabContent = document.createElement("a");
        var close_button = document.createElement("span");
        close_button.setAttribute("class", 'ui-icon ui-icon-close');
        close_button.setAttribute("id", (label));
        tabContent.setAttribute("href", ("#the" + label));
        tabContent.append("Table " + (tab_counter + 1));
        tab.appendChild(tabContent);
        tab.appendChild(close_button);

        document.getElementById("tab-list").append(tab);

        var table_tab = document.createElement("div");
        table_tab.setAttribute("id", "the" + label);

        var theTable = document.createElement("table");
        theTable.setAttribute("id", label);
        tab_counter++;
        
        var temp = document.createElement("tr");

        var colOutput = document.createElement("td");
        colOutput.setAttribute("id", (label + "col_output"));
        
        var rowOutput = document.createElement("tr");
        rowOutput.setAttribute("id", (label + "row_output"));

        colOutput.appendChild(rowOutput);
        temp.appendChild(colOutput);
        theTable.appendChild(temp);
        table_tab.append(theTable);
        document.getElementById("tableHolder").appendChild(table_tab);
        
        var tableStart = document.createElement("th");
        tableStart.append(document.createTextNode("X"));
        document.getElementById(label + "col_output").append(tableStart);
        
        var x;
        
        for (x = Number(min_col); x <= Number(max_col); x++) {
            var myCol = document.createElement("th");
            myCol.setAttribute("id", label + x);
            myCol.setAttribute("class", "colHeader");
            myCol.append(document.createTextNode(x));
            document.getElementById(label + "col_output").append(myCol);
        }

        var y;
        for (y = min_row; y <= max_row; y++) {
            var myRowHead = document.createElement("tr");
            myRowHead.setAttribute("id", label + y*1000);
            var myRow = document.createElement("th");
            myRow.append(document.createTextNode(y));
            myRowHead.appendChild(myRow);
            document.getElementById(label + "col_output").append(myRowHead);
        }

        // Cells
        y = min_row;
        for (x = min_col; x <= max_col; x++) {
            for (y = min_row; y <= max_row; y++) {
                var myCell = document.createElement("td");
                if (y % 2 == 0) {
                    myCell.setAttribute("class", "dark");
                }
                myCell.append(document.createTextNode(x*y));
                document.getElementById(label + y*1000).appendChild(myCell);
            }
            
        }
    }
}