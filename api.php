<?php  
/*
http://t99368a8.bget.ru/todo-list/api.php?action_type=update_project&id=1&project_name=test101
http://t99368a8.bget.ru/todo-list/api.php?action_type=delete_project&id=2
http://t99368a8.bget.ru/todo-list/api.php?action_type=add_project&project_name=testy

http://t99368a8.bget.ru/todo-list/api.php?action_type=add_task_to_project&description=test description&project_id=1&ded_line_date=01.01.2016&is_done=1
http://t99368a8.bget.ru/todo-list/api.php?action_type=delete_task&id=2
http://t99368a8.bget.ru/todo-list/api.php?action_type=update_task&id=1&description=rrr description&ded_line_date=01.01.2016&is_done=1
http://t99368a8.bget.ru/todo-list/api.php?action_type=get_all_projects_and_task
*/
    ini_set('display_errors','On');
    error_reporting(E_ALL);
    //echo "test";
    $response_array = array("result" => 0, "description" =>"");
    require ("engine.php");
    $user_id = 1;
    if (CheckAuth($user_id)){
        //echo "<br/>user checked";
    }
    function _DeleteTask(){
        $response_array = array("result" => 0, "description" =>"");
        CheckParams("id", $_GET, $response_array, $id);
        if (DeleteTask($id, $description)){
            $response_array["result"] = 1;
        }
        else {
            $response_array["result"] = 0;
        }
        $response_array["description"] = $description;
        echo json_encode($response_array);        
    }    
    function _AddProject($user_id){
        $response_array = array("result" => 0, "description" =>"", "id" => 0);
        CheckParams("project_name", $_GET, $response_array, $project_name);
        if (AddProject($project_name, $user_id, $id, $description)){
            $response_array["result"] = 1;
        }
        else {
            $response_array["result"] = 0;
        }
        $response_array["description"] = $description;
        $response_array["id"] = $id;
        echo json_encode($response_array);       
    }
    function _UpdateProject(){
        $response_array = array("result" => 0, "description" =>"");
        CheckParams("id", $_GET, $response_array, $id);           
        CheckParams("project_name", $_GET, $response_array, $project_name);
        if (UpdateProject($id, $project_name, $description)){
            $response_array["result"] = 1;
        }
        else {
            $response_array["result"] = 0;
        }                     
        $response_array["description"] = $description;
        echo json_encode($response_array);        
    }
    function _DeleteProject(){
        $response_array = array("result" => 0, "description" =>"");
        CheckParams("id", $_GET, $response_array, $id);
        if (DeleteProject($id, $description)){
            $response_array["result"] = 1;
        }
        else {
            $response_array["result"] = 0;
        }
        $response_array["description"] = $description;
        echo json_encode($response_array);        
    }
    function _AddTaskToProject(){
        $response_array = array("result" => 0, "description" =>"", "id" => 0);
        CheckParams("description", $_GET, $response_array, $description_);       
        CheckParams("project_id", $_GET, $response_array, $project_id);
        CheckParams("ded_line_date", $_GET, $response_array, $ded_line_date);   
        CheckParams("is_done", $_GET, $response_array, $is_done);        
        if (AddTaskToProject($description_, $project_id, $ded_line_date, $is_done, $id, $description)){
            $response_array["result"] = 1;
        }
        else {
            $response_array["result"] = 0;
        } 
        $response_array["description"] = $description;
        $response_array["id"] =$id;
        
        echo json_encode($response_array);        
    }
    function _UpDateTask(){
        $response_array = array("result" => 0, "description" =>"");
        CheckParams("id", $_GET, $response_array, $id);        
        CheckParams("description", $_GET, $response_array, $description_);       
        CheckParams("ded_line_date", $_GET, $response_array, $ded_line_date);   
        CheckParams("is_done", $_GET, $response_array, $is_done);       
        if (UpdateTask($description_, $ded_line_date, $is_done, $id, $description)){
            $response_array["result"] = 1;            
        }
        else {
            $response_array["result"] = 0;
        }
        $response_array["description"] = $description;
        echo json_encode($response_array);
    }
    function _GetAllProjectAndTask(){
        $response_array = array("result" => 0, "description" =>"");   
        if (GetAllProjectAndTask($description)){
            $response_array["result"] = 1;
        }
        else {
            $response_array["result"] = 0;                
        }
        $response_array["description"] = $description;
        echo json_encode($response_array);       
    }
    CheckParams("action_type", $_GET, $response_array, $action_type);
    switch ($action_type) {
        case "":
            $response_array["result"] = 0;
            $response_array["description"] = "empty action type.";
            echo json_encode($response_array);            
            break;
        case "add_project":
            _AddProject($user_id);
            break;
        case "update_project":
            _UpdateProject();
            break;
        case "delete_project":
           _DeleteProject();
            break;
        case "add_task_to_project":
            _AddTaskToProject();            
            break;
        case "update_task":
            _UpdateTask();            
            break;           
            
        case "delete_task":
            _DeleteTask();            
            break; 
        case "get_all_projects_and_task":
            _GetAllProjectAndTask();            
            break;              
            
    }
?>