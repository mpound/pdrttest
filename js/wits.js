
var counter = 0;
var selectedLines = [];

var makeNewRow = function(lineid) {
    var linetr='<tr id="'+lineid+'">'
    var newRow = $(linetr);
    var cols = "";
    console.log("adding row "+lineid);
    cols += '<td><label class="form-control" name="name' + counter + '"</label>'+lineid+'</td>';
    
    cols += '<td><input type="number" class="form-control" name="intensity"' + counter + '"/></td>';
    cols += '<td><select><option value="jy">Jy</option><option value="mjy">mJy</option></select></td>';
    cols += '<td><input type="number" class="form-control" name="error"' + counter + '"/></td>';
    cols += '<td><select><option value="jy">Jy</option><option value="mjy">mJy</option><option value="percent">%</option></select></td>';

    var cola = '<td ><input type="button" class="btn btn-md btn-danger" value="Delete" onclick="deleteRow(\''+lineid+'\')"></td>';
    cols += cola;
    console.log(cola);
   
    newRow.append(cols);
    // add leading $() to turn retruned DOM object into jquery object
    $(document.getElementById("dataTable")).append(newRow);

    //$("table").append(newRow);

    selectedLines.push(lineid);
    counter++;
}

var setDraggable = function (lineid,color,draggable) {
    var dragid = lineid+".drag";     
    console.log("setting draggable "+dragid+" " + color + " "+draggable);
    console.log("document is "+document);
    var mydrag = document.getElementById(dragid);
    console.log("mydrag is "+mydrag);
    mydrag.style.backgroundColor = color;
    mydrag.draggable=draggable;
}

var deleteRow = function(lineid) {
  console.log("trying to delete row "+lineid);
  document.getElementById(lineid).remove();
  var idx = selectedLines.indexOf(lineid);
  selectedLines.splice(idx,1);
  counter -= 1;
  setDraggable(lineid,"white",true);
}

var deleteTable = function() {
  console.log("trying to delete table");
  // Must avoid concurrent modification
  // of selectedLines (via call to deleteRow)
  // so make a copy for iterating over.
  var slcopy = selectedLines.slice();
  var sl = slcopy.length;
  for (i = 0; i < sl; i++) {
      deleteRow(slcopy[i]);
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log("data is " + data);
  var foo  = document.getElementById(data);
  var lineid = foo.textContent;
  setDraggable(lineid,"yellow",false);
  makeNewRow(lineid);
}


