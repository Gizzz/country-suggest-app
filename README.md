# country-suggest-app

## Установка и запуск проекта

Данный проект использует create-react-app в качестве основы.  
Для начала нужно установить зависимости проекта:
```
npm i
```
Проект запускается с помощью команды:
```
npm start
```
Запущенный проект доступен по адресу http://localhost:3000/

## Пример использования компонента CountrySuggest

Данный компонент использует паттерн Presentation/Container Components. Логика работы с сетью находится в компоненте CountrySuggest_Container, а за представление отвечает CountrySuggest.

Чтобы воспользоваться компонентом, нужно поместить на страницу CountrySuggest_Container, который в свою очередь вызовет CountrySuggest.  
Компонент CountrySuggest_Container имеет следующие свойства:
- `apiUrl:string` - ссылка для поключения к API-серверу
- `flagField: string | (response:object) => string` - имя поля в котором хранится значение ссылки на флаг страны. Если указана функция - первым агрументом передается элемент коллекции, пришедшей в ответе сервера.

Например:
```
<CountrySuggest_Container apiUrl="https://restcountries.eu/rest/v2" flagField="topLevelFlagField" />
```
Здесь значение flagField указано жетско в виде строки. Это подходит для случая если нужное поле находится среди невложенных полей объекта.
Если же нужное поле находится глубже, то путь к нему можно задать функцией:
```
<CountrySuggest_Container apiUrl="https://restcountries.eu/rest/v2" flagField={responseItem => responseItem.nestedObject.flag} />
```