All API perform in api.php . For execute function you need generate url with specific params. Params description below.

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


Task API

Add task to project

Params:
action_type=add_task_to_project
description= - task descripition
project_id= - project id
ded_line_date= - dedline darte
is_done=1

example url:
/api.php?action_type=add_task_to_project&description=test description&project_id=1&ded_line_date=01.01.2016&is_done=1


example url:
t/api.php?action_type=update_task&id=1&description=rrr description&ded_line_date=01.01.2016&is_done=1

example url:
/api.php?action_type=delete_task&id=2

