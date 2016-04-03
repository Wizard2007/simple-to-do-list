<?php    
    require ("config.php");

    function CheckAuth(& $user_id){
        $user_id = 1;
        return true;
    }
    function CheckParams($Aparam_name,$Aparam_array, $Aresponse_array, & $Aparam_value){ 
        if(array_key_exists($Aparam_name, $_GET)){
            $Aparam_value = $_GET[$Aparam_name];
            if($Aparam_value === null){
                $Aresponse_array["result"] = 0;
                $Aresponse_array["description"] = "param $Aparam_name is null.";
                echo json_encode($Aresponse_array);         
                exit(0);
            }
        }
        else{
            $Aresponse_array["result"] = 0;
            $Aresponse_array["description"] = "param $Aparam_name not exists.";
            echo json_encode($Aresponse_array);         
            exit(0);
        }        
    }
    function ConnectToDB(){            
        $connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD) or die('Could not connect to MySQL server.');
        mysqli_select_db($connection, DB_DATABASE);       
        return $connection;
    }
    function CloseDB($connection){
        mysqli_close($connection);
    }
    function _quote_str($connection, $Astr){
        return "\"".mysqli_real_escape_string( $connection, $Astr)."\"";    
    }
    function _quote($connection, $Astr){
        return mysqli_real_escape_string( $connection, $Astr);    
    }
    function UpdateTask($Adescription_, $Aded_line_date, $Ais_done, $Aid, & $Adescription){
        try{            
            $connection = ConnectToDB();
            if($connection === false){
                $Adescription = "error: could not connect. " . mysqli_connect_error();
                return false;
            }             
            $sql = "UPDATE `tbl_Tasks` SET `DESCRIPTION`= "
                ._quote_str($connection, $Adescription_)." ,`DED_LINE_DATE`= "._quote_str($connection, $Aded_line_date).",`IS_DONE`= "._quote($connection, $Ais_done)." WHERE `ID`= ".$Aid;            
            if(mysqli_query($connection, $sql)){                           
                $Adescription = "update task";
            }
            else{
                $Adescription = "error: while update task ".mysqli_error($connection);
            } 
            return true;
        }
        catch (Exception $e){
            $Adescription = "error: ".$e->getMessage();
            return false;
        }
        finally {
            CloseDB($connection);
        }        
    }  
    function DeleteTask($Aid, & $Adescription){
        try{
            
            $connection = ConnectToDB();
            if($connection === false){
                $Adescription = "error: could not connect. " . mysqli_connect_error();
                return false;
            }             
            $sql = "DELETE FROM `tbl_Tasks` WHERE `ID` = "._quote($connection,$Aid);
            if(mysqli_query($connection,  $sql)){                
                $Adescription = "delete task ";                
            }  
            else{
                $Adescription = "error: while delete task ".mysqli_error($connection);
            }
            
            return true;
            
        }
        catch (Exception $e){

            $Adescription = "error: ".$e->getMessage();
            return false;
        }
        finally {
            CloseDB($connection);
        }
        return true;
    }   
    function AddTaskToProject($Adescription_, $Aproject_id, $Aded_line_date, $Ais_done, & $Aid, & $Adescription){
        try{            
            $connection = ConnectToDB();
            if($connection === false){
                $Adescription = "error: could not connect. " . mysqli_connect_error();
                return false;
            }             
            $sql = "INSERT INTO `tbl_Tasks`( `DESCRIPTION`, `PROJECT_ID`, `DED_LINE_DATE`, `IS_DONE`) VALUES("
                .""._quote_str($connection, $Adescription_)
                .","._quote($connection,$Aproject_id)
                .","._quote_str($connection, $Aded_line_date)
                .","._quote($connection,$Ais_done)
                .")";
            if(mysqli_query($connection, $sql)){                
                $Aid = mysqli_insert_id($connection);                
                $Adescription = "added new task ".$Aid;
            }
            else{
                $Adescription = "error: while add new task ".mysqli_error($connection);
            } 
            return true;
        }
        catch (Exception $e){
            $Adescription = "error: ".$e->getMessage();
            return false;
        }
        finally {
            CloseDB($connection);
        }        
    }    
    function DeleteProject($Aid, & $Adescription){
        try{
            
            $connection = ConnectToDB();
            if($connection === false){
                $Adescription = "error: could not connect. " . mysqli_connect_error();
                return false;
            }
             
            $sql = "DELETE FROM `tbl_Tasks` WHERE `PROJECT_ID` = "._quote($connection,$Aid).";"
                ." DELETE FROM `tbl_Projects` WHERE `ID` = "._quote($connection,$Aid);
            if(mysqli_multi_query($connection,  $sql)){                
                $Adescription = "delete project ";                
            }  
            else{
                $Adescription = "error: while delete project ".mysqli_error($connection);
            }
            
            return true;
            
        }
        catch (Exception $e){

            $Adescription = "error: ".$e->getMessage();
            return false;
        }
        finally {
            CloseDB($connection);
        }
        return true;
    } 
    function UpdateProject($Aid, $Aname, & $Adescription){
        try{            
            $connection = ConnectToDB();
            if($connection === false){
                $Adescription = "error: could not connect. " . mysqli_connect_error();
                return false;
            }             
            $sql = "UPDATE `tbl_Projects` SET `NAME` = "._quote_str($connection, $Aname)." WHERE `ID`= "._quote($connection,$Aid);
            if(mysqli_query($connection,  $sql)){                
                $Adescription = "update project ";                
            }  
            else{
                $Adescription = "error: while update project ".mysqli_error($connection);
            }            
            return true;            
        }
        catch (Exception $e){
            $Adescription = "error: ".$e->getMessage();
            return false;
        }
        finally {
            CloseDB($connection);
        }
        return true;
    } 

    function AddProject( $Aname, $AUser_id, & $Aid, & $Adescription){
        try{            
            $connection = ConnectToDB();
            if($connection === false){
                $Adescription = "error: could not connect. " . mysqli_connect_error();
                return false;
            }             
            $sql = "INSERT INTO `tbl_Projects`(`NAME`, `USER_ID`) VALUES ("._quote_str($connection, $Aname).","._quote($connection,$AUser_id).")";
            if(mysqli_query($connection, $sql)){
                $Aid = mysqli_insert_id($connection);
                $Adescription = "added new project ".$Aid;
            }
            else{
                $Adescription = "error: while add project ".mysqli_error($connection);
            } 
            return true;
        }
        catch (Exception $e){
            $Adescription = "error: ".$e->getMessage();
            return false;
        }
        finally {
            CloseDB($connection);
        }
    }
    function GetAllProjectAndTask(& $Adescription){
        try{            
            $connection = ConnectToDB();
            if($connection === false){
                $Adescription = "error: could not connect. " . mysqli_connect_error();
                return false;
            }             
            $sql = "SELECT `ID`, `NAME`, `USER_ID` FROM `tbl_Projects`";
            $result_json_array = array();
            if($result = mysqli_query($connection, $sql)){
                while(($row=mysqli_fetch_assoc($result)) != false)
                {
                    
                    $sql_task = "SELECT * FROM `tbl_Tasks` WHERE `PROJECT_ID` = ".$row["ID"];
                    $task_array = array();
                    if($result_task = mysqli_query($connection, $sql_task)){
                        
                        while(($row_task=mysqli_fetch_assoc($result_task)) != false)
                        {
                            $task_array[]= array("ID" => $row_task["ID"],"DESCRIPTION"=> $row_task["DESCRIPTION"], "PROJECT_ID" => $row_task["PROJECT_ID"], "DED_LINE_DATE" => $row_task["DED_LINE_DATE"], "IS_DONE" => $row_task["IS_DONE"]);  
                        }                        
                    }
                    $result_json_array[] = array("ID" => $row["ID"], "NAME" => $row["NAME"] , "Tasks" => $task_array);
                    
                    mysqli_free_result($result_task);
                } 
                
                $Adescription = json_encode($result_json_array);
                mysqli_free_result($result);
            }
            else{
                $Adescription = "error: while add project ".mysqli_error($connection);
            } 
            return true;
        }
        catch (Exception $e){
            $Adescription = "error: ".$e->getMessage();
            return false;
        }
        finally {
            CloseDB($connection);
        }        
    }
?>