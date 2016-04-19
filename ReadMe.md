All API perform in api.php . For execute function you need generate url with specific params. Params description below.

All request return json file in same format

{"result":x,"description":"s"}

Where x - is the result of operation 0 - error , 1 - all done, and s - is the dwscription of x;

Project API


Add project: 

params:
action_type=add_project
project_name= - project name
example url:
/api.php?action_type=add_project&project_name=testy


Update project

params:
action_type=update_project
project_name= - new project name
example url:
/api.php?action_type=update_project&id=1&project_name=test101

Delete project

params:
action_type=delete_project
id= - project id
example url:
/api.php?action_type=delete_project&id=2

Note, what project will be deleted with all it's tasks.

Get all projects with tasks
params:
action_type=get_all_projects_and_task
example url:
/api.php?action_type=get_all_projects_and_task

Note, what in this case if the result of operation is 1 then in description will be json string with request data. Example of result see in \json-example\GetAllProjectAndTask.json

Task API

Add task to project

Params:
action_type=add_task_to_project
description= - task descripition
project_id= - project id
ded_line_date= - dedline darte date
is_done= - task state 0 - no done 1 - is done

example url:
/api.php?action_type=add_task_to_project&description=test description&project_id=1&ded_line_date=01.01.2016&is_done=1

Update Task 

Params:
action_type=update_task
description= - task descripition
ded_line_date= - dedline darte date

example url:
/api.php?action_type=update_task&id=1&description=rrr description&ded_line_date=01.01.2016&is_done=1

Delete Task

Params:
action_type=delete_task
id= - task id 


example url:
/api.php?action_type=delete_task&id=2

