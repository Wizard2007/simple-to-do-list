function GetTaskValues(ATask, AID){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd="0"+dd
    } 

    if(mm<10) {
        mm="0"+mm
    } 

    today_str = yyyy+"-"+mm+"-"+dd;     
    ATask["ID"] = AID;
    console.log($(".task-state-input[data-id-task="+AID+"]"));
    if($(".task-state-input[data-id-task="+AID+"]").attr("checked")=="true"){
        ATask["IS_DONE"]=1;
    }
    else {
        ATask["IS_DONE"]=0;
    }
    
    ATask["DESCRIPTION"]= $(".task-description-edit[data-id-task="+AID+"]").val();
    //ATask["PROJECT_ID"]=$($(".task-inner[data-id-task="+AID+"]").parent).attr("data-id-project");
    //
    ATask["DED_LINE_DATE"] = today_str;
    
    
    return true;
}
function UpdateTask(ATask){
    console.log("update task");
    console.log(ATask);
    $.get("/simple-to-do-list/api.php?action_type=update_task&id="+ATask["ID"]+"&description="+ATask["DESCRIPTION"]+" &ded_line_date="+ATask["DED_LINE_DATE"]+"&is_done="+ATask["IS_DONE"],function (data){
        console.log(data);
    });    
    return true;
}
function GetProjectsValues(AProject , AID){
    AProject["ID"] = AID;
    AProject["NAME"] = $(".project-title-edit[data-id-project="+AID+"]").val();
    return true;
}
function UpdateProject(AProject){
    console.log("update project");
    console.log(AProject);
    $.get("/simple-to-do-list/api.php?action_type=update_project&id="+AProject["ID"]+"&project_name="+AProject["NAME"],function (data){
        console.log(data);
    });    
    return true;
}
function DeleteProject(AID){
    console.log("delte project");
    console.log(AID);
    $.get("/simple-to-do-list/api.php?action_type=delete_project&id="+AID,function (data){
        console.log(data);
    });    
    return true;
}

function OnProjectAdd(){
    console.log("add project");
    //add project in to DB
    $.get("/simple-to-do-list/api.php?action_type=add_project&project_name=",function (data){
        console.log(data);
        var jsonObj = JSON.parse(data);
        var id = jsonObj["id"];
        AddProjectOnPage({ID:id, NAME:"", Tasks:[]});
        ProjectEdit(id);
    });
}
function ProjectDelete(AID){
    console.log($(".project-inner[data-id-project="+AID+"]"));
    if (DeleteProject(AID)){
        $(".project-inner[data-id-project="+AID+"]").css({display: "none"});
    }
    
    // delete project from DB
    //$("body").remove(".project-inner[data-id-project="+id+"]");
    //$("body").remove("*");
    return true;
}
function OnProjectDelete(){
    console.log("delete project");
    var el_current = event.currentTarget;
    var id=$(el_current).attr("data-id-project");
    ProjectDelete(id);
}
function ProjectEdit(AID){    
    console.log($(".project-title[data-id-project="+AID+"]"));
    $(".project-title[data-id-project="+AID+"] div").css({display: "none"});
    $(".project-title-edit[data-id-project="+AID+"]").css({display: "block"});
    $(".project-title-edit[data-id-project="+AID+"]").focus();
    return true;    

}
function OnProjectEdit(){
    console.log("edit project");
    var el_current = event.currentTarget;
    console.log(el_current);
    var id=$(el_current).attr("data-id-project");
    ProjectEdit(id);
}
function OnProjectEditEnd(){
    console.log("edit project end");    
    var el_current = event.currentTarget;
    console.log($(el_current).val());
    var id=$(el_current).attr("data-id-project");
    var project = {};
    GetProjectsValues(project, id);
    if (UpdateProject(project))
    {
        console.log($(".project-title[data-id-project="+id+"]"));
        $(".project-title[data-id-project="+id+"] div").css({display: "block"}).text($(el_current).val());
        $(el_current).css({display: "none"});
    }
}
function OnMoveUpTask(){
    console.log("task move up");    
}
function TaskEdit(AID){
    console.log($(".task-description[data-id-task="+AID+"]"));
    $(".task-description[data-id-task="+AID+"] div").css({display: "none"});
    $(".task-description-edit[data-id-task="+AID+"]").css({display: "block"});
    //$(".task-description-edit[data-id-task="+AID+"]").focus();
    $(".task-state-input[data-id-task="+AID+"]").removeAttr("disabled");
    return true;    
}
function OnTaskEdit(){
    console.log("edit task");
    var el_current = event.currentTarget;
    var id = $(el_current).attr("data-id-task");
    TaskEdit(id);
}
function OnTaskEditEnd(){
    // UpDate Task in DB
    var el_current = event.currentTarget;
    var id=$(el_current).attr("data-id-task");
    ATask={};
    GetTaskValues(ATask, id);
    if (UpdateTask(ATask))
    {
        console.log($(".task-description[data-id-task="+id+"]"));
        $(".task-description[data-id-task="+id+"] div").css({display: "block"});
        $(".task-description[data-id-task="+id+"] div").text($(".task-description-edit[data-id-task="+id+"]").val());
        $(".task-description-edit[data-id-task="+id+"]").css({display: "none"});
        $(".task-state-input[data-id-task="+id+"]").attr("disabled","disabled");
    }
}
function DeleteTask(AID){
    console.log("delte task");
    console.log(AID);
    $.get("/simple-to-do-list/api.php?action_type=delete_task&id="+AID,function (data){
        console.log(data);
    });       
    return true;
}
function OnDeleteTask(){
    console.log("delete task");
    var el_current = event.currentTarget;
    var id=$(el_current).attr("data-id-task");
    if(DeleteTask(id)){
        $(".task-inner[data-id-task="+id+"]").css({display: "none"}); 
    }
}
function OnTaskAdd(){
    console.log("add task");
    var el_current = event.currentTarget;
    var id=$(el_current).attr("data-id-project");
    var el_new_task_description = $(".new-task-description[data-id-project="+id+"]");
    if (TaskAdd(id, el_new_task_description.val())){
        el_new_task_description.val("");
    }
}
function TaskAdd(AProject_ID, ADescription){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd="0"+dd
    } 

    if(mm<10) {
        mm="0"+mm
    } 

    today_str = yyyy+"-"+mm+"-"+dd;     
    //add task in to DB
    $.get("/simple-to-do-list/api.php?action_type=add_task_to_project&description="+ADescription+"&project_id="+AProject_ID+"&ded_line_date="+today_str+"&is_done=0",function (data){
        console.log(data);
        var jsonObj = JSON.parse(data);
        var id = jsonObj["id"];
        var wrapper = $(".task-list-wrapper[data-id-project="+AProject_ID+"]");
        AddTaskOnPage({"ID": id, "IS_DONE": 0, "DESCRIPTION": ADescription}, wrapper);
        //TaskEdit(id);
    });
    return true;
}
function AddTaskOnPage(ATask, AWrapper){
    console.log("add task in cicle");
    var el_task_inner = $("<div>").addClass("task-inner");
    el_task_inner.attr("data-id-task", ATask["ID"]);
    AWrapper.append(el_task_inner);
    
    var el_task_state = $("<div>").addClass("task-state");         
    el_task_state.attr("data-id-task", ATask["ID"]);  
    el_task_inner.append(el_task_state);
    
        var el_task_state_input = $("<input>").addClass("task-state-input");
        el_task_state_input.attr("type","checkbox");
        el_task_state_input.attr("disabled","disabled");

        if (ATask["IS_DONE"]== "1"){
            el_task_state_input.attr("checked","true");    
        }
        else {
            el_task_state_input.removeAttr("checked");
        }
        el_task_state_input.on("blur",OnTaskEditEnd);
        el_task_state_input.attr("data-id-task", ATask["ID"]);
        el_task_state.append(el_task_state_input);
    
        var el_task_description = $("<div>").addClass("task-description");
        //$(el_task_description).text(ATask["DESCRIPTION"]);
    
        el_task_description.attr("data-id-task", ATask["ID"]);
        el_task_inner.append(el_task_description);
    
        var el_task_description_div = $("<div>");
        $(el_task_description_div).text(ATask["DESCRIPTION"]);
        $(el_task_description).append(el_task_description_div);
        
        var el_task_description_edit = $("<input>").addClass("task-description-edit");
        $(el_task_description_edit).attr("type","text");
        $(el_task_description_edit).attr("data-id-task", ATask["ID"]);
        $(el_task_description_edit).on("blur",OnTaskEditEnd);
        $(el_task_description_edit).val(ATask["DESCRIPTION"]);
        $(el_task_description).append(el_task_description_edit);
    
        var el_task_edit_tool_bar = $("<div>").addClass("task-edit-tool-bar clearfix");
        
    
            var el_task_move_up =$("<div>").addClass("task-manipulation task-move-up");
            el_task_move_up.attr("data-id-task", ATask["ID"]);
            el_task_move_up.on("click", OnMoveUpTask);
            el_task_edit_tool_bar.append(el_task_move_up);

            var el_task_edit =$("<div>").addClass("task-manipulation task-edit");
            el_task_edit.attr("data-id-task", ATask["ID"]);
            el_task_edit.on("click", OnTaskEdit);
            el_task_edit.on("blur",OnTaskEdit);
            el_task_edit_tool_bar.append(el_task_edit);

            var el_task_delete =$("<div>").addClass("task-manipulation task-delete");
            el_task_delete.attr("data-id-task", ATask["ID"]);
            el_task_delete.on("click", OnDeleteTask);
            el_task_edit_tool_bar.append(el_task_delete);
    el_task_edit_tool_bar.attr("data-id-task", ATask["ID"]);
    el_task_inner.append(el_task_edit_tool_bar);
}
function AddProjectOnPage(AProject){
    var el_project_inner = $("<div>").addClass("project-inner");
    el_project_inner.addClass("project-inner");
    el_project_inner.attr("data-id-project", AProject["ID"]);
    $(".main-wrapper").append(el_project_inner);
    
    var el_project_title_wrapper = $("<div>").addClass("project-title-wrapper clearfix");
    el_project_title_wrapper.attr("data-id-project", AProject["ID"]);
    el_project_inner.append(el_project_title_wrapper);
    
        var el_icon_top = $("<img>").addClass("icon-top");

        $(el_icon_top).attr("src", "img/icon-top.png");
        $(el_icon_top).attr("alt", "project img");    
        el_icon_top.attr("data-id-project", AProject["ID"]);
        el_project_title_wrapper.append(el_icon_top);

        var el_project_title = $("<div>").addClass("project-title");
        //$(el_project_title).text(AProject["NAME"]);
        el_project_title.attr("data-id-project", AProject["ID"]);
        el_project_title_wrapper.append(el_project_title);
    
        var el_project_title_div = $("<div>");
        $(el_project_title_div).text(AProject["NAME"]);
        el_project_title.append(el_project_title_div);
    
        var el_project_title_edit = $("<input>").addClass("project-title-edit");
        el_project_title_edit.attr("type","text");
        $(el_project_title_edit).val(AProject["NAME"]);
        $(el_project_title_edit).attr("data-id-project", AProject["ID"]);
        $(el_project_title_edit).on("blur", OnProjectEditEnd);
        
        el_project_title.append(el_project_title_edit);
    
        var el_delete_top = $("<img>").addClass("delete-top");
        el_delete_top.attr("src", "img/delete-top.png");
        el_delete_top.attr("alt", "delete project");
        $(el_delete_top).on("click", OnProjectDelete);
        el_delete_top.attr("data-id-project", AProject["ID"]);
        el_project_title_wrapper.append(el_delete_top);

        var el_edit_top = $("<img>").addClass("edit-top");
        el_edit_top.attr("src", "img/edit-top.png");
        el_edit_top.attr("alt", "edit project");
        $(el_edit_top).on("click", OnProjectEdit);
        el_edit_top.attr("data-id-project", AProject["ID"]);
        el_project_title_wrapper.append(el_edit_top);
    
    var el_add_task_wrapper = $("<div>").addClass("add-task-wrapper clearfix");
    el_add_task_wrapper.attr("data-id-project", AProject["ID"]);
    el_project_inner.append(el_add_task_wrapper);
    
        var el_plus_task = $("<img>").addClass("plus-task");
        el_plus_task.attr("src","img/plus.png");
        el_plus_task.attr("alt","add task");
        el_plus_task.attr("data-id-project", AProject["ID"]);
        el_plus_task.on("click", OnTaskAdd);
        el_add_task_wrapper.append(el_plus_task);

        var el_new_task_description = $("<input>").addClass("new-task-description")
        el_new_task_description.attr("type","text");
        el_new_task_description.attr("placeholder","Start typing here to create task ...");
        el_new_task_description.attr("data-id-project", AProject["ID"]);
        el_add_task_wrapper.append(el_new_task_description);

        var el_add_task = $("<button>").addClass("add-task");
        $(el_add_task).text("Add Task");
        $(el_add_task).on("click", OnTaskAdd);
        el_add_task.attr("data-id-project", AProject["ID"]);
        el_add_task_wrapper.append(el_add_task);
    
    var el_task_list_wrapper = $("<div>").addClass("task-list-wrapper");
    el_task_list_wrapper.attr("data-id-project", AProject["ID"]);
    el_project_inner.append(el_task_list_wrapper);
    //--- тут цикл надо передавать wrapper  в новой функции добавлять задачу 
    AProject["Tasks"].forEach(
        function(item, i, arr){
            AddTaskOnPage(item, el_task_list_wrapper);
        }
    );  
}
function FillDataList(){
    
    $.get("/simple-to-do-list/api.php?action_type=get_all_projects_and_task",          function (data){
            console.log(data);
            var jsonObj = JSON.parse(data);
            var jsonObj = JSON.parse(jsonObj["description"]);
            console.log(jsonObj);
        jsonObj.forEach(function(item, i, arr) {
            console.log(i);
            console.log(item);
            AddProjectOnPage(item);
            console.log("-----------");
            console.log("ID="+item["ID"]);
            console.log("NAME="+item["NAME"]);
            item["Tasks"].forEach(function(item, i, arr) {
                    console.log("DED_LINE_DATE="+item["DED_LINE_DATE"]);
                    console.log("DESCRIPTION="+item["DESCRIPTION"]);
                    console.log("ID="+item["ID"]);
                    console.log("IS_DONE="+item["IS_DONE"]);
                    console.log("PROJECT_ID="+item["PROJECT_ID"]);
                })
        });
       }
    );
}

$(document).ready(function(){
    FillDataList();    
    /*
    $(".delete-top").on("click", OnProjectDelete);
    $(".edit-top").on("click", OnProjectEdit);
    $(".task-move-up").on("click", OnMoveUpTask);
    $(".add-task").on("click", OnTaskAdd);
    $(".task-edit").on("click", OnTaskEdit);
    $(".task-delete").on("click", OnDeleteTask);
    
    $(".project-title-edit").on("blur", OnProjectEditEnd);
    */
    $(".add-project").on("click", OnProjectAdd);
})