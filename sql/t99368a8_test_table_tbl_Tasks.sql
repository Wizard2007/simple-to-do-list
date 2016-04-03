
-- --------------------------------------------------------

--
-- Структура таблицы `tbl_Tasks`
--
-- Создание: Апр 02 2016 г., 17:12
--

DROP TABLE IF EXISTS `tbl_Tasks`;
CREATE TABLE `tbl_Tasks` (
  `ID` int(11) NOT NULL,
  `DESCRIPTION` varchar(64) NOT NULL,
  `PROJECT_ID` int(11) NOT NULL,
  `DED_LINE_DATE` date NOT NULL,
  `IS_DONE` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
