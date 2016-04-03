
--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `tbl_Projects`
--
ALTER TABLE `tbl_Projects`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `tbl_Tasks`
--
ALTER TABLE `tbl_Tasks`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tbl_Projects`
--
ALTER TABLE `tbl_Projects`
  MODIFY `ID` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT для таблицы `tbl_Tasks`
--
ALTER TABLE `tbl_Tasks`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;