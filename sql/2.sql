SELECT *, (SELECT count(*) from tbl_Tasks tT where tP.ID = tT.PROJECT_ID) as TaskCount FROM `tbl_Projects` as tP order by TaskCount DESC