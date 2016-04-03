SELECT * FROM `tbl_Tasks` as tT LEFT JOIN `tbl_Projects` as tP on tT.`PROJECT_ID` = tP.ID
WHERE tP.Name LIKE BINARY  'N%'