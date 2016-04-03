
-- --------------------------------------------------------

--
-- Структура таблицы `tbl_Projects`
--
-- Создание: Апр 02 2016 г., 17:12
--

DROP TABLE IF EXISTS `tbl_Projects`;
CREATE TABLE `tbl_Projects` (
  `ID` int(16) NOT NULL,
  `NAME` varchar(32) DEFAULT NULL,
  `USER_ID` int(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
