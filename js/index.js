function OnProjectAdd(){
    console.log("add project");
}

function OnProjectDelete(){
    console.log("delete project");    
}
function OnProjectEdit(){
    console.log("edit project");    
}
function OnMoveUpTask(){
    console.log("task move up");    
}
function OnTaskEdit(){
    console.log("edit task");    
}
function OnDeleteTask(){
    console.log("delete task");
}
function AddProjectOnPage(AProject){
    var el = $("<div>").addClass("project-inner");
    el.addClass("project-inner");
    $(".main-wrapper").append(el);
}
function FillDataList(){
    AddProjectOnPage();
    $.get("/simple-to-do-list/api.php?action_type=get_all_projects_and_task",          function (data){
            console.log(data);
            var jsonObj = JSON.parse(data);
            var jsonObj = JSON.parse(jsonObj["description"]);
            console.log(jsonObj);
        jsonObj.forEach(function(item, i, arr) {
            console.log(i);
            console.log(item);
            console.log("-----------");
            console.log("ID="+item["ID"]);
            console.log("NAME="+item["NAME"]);
            item["Tasks"].forEach(function(item, i, arr) {
                    console.log("DED_LINE_DATE="+item["DED_LINE_DATE"]);                    console.log("DESCRIPTION="+item["DESCRIPTION"]);                    console.log("ID="+item["ID"]);
                    console.log("IS_DONE="+item["IS_DONE"]);
                    console.log("PROJECT_ID="+item["PROJECT_ID"]);
                })
        });
       }
    );
}

$(document).ready(function(){
    FillDataList();
    $(".add-task").on("click", OnProjectAdd);
    $(".delete-top").on("click", OnProjectDelete);
    $(".edit-top").on("click", OnProjectEdit);    
    $(".task-move-up").on("click", OnMoveUpTask);
    $(".task-edit").on("click", OnTaskEdit);
    $(".task-delete").on("click", OnDeleteTask);
})