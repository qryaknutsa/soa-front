## /tickets

### UPDATE
- [x] использовать старую форму ~~и добавить ввод для id~~
- [x] валидация будет уже в форме
- [x] починить отправку


### Ошибки
- [x] 400
  - [x] если неверное условие фильтрации


### Тестирование

### GET
~~- [ ] добавить стрелочки перехода между страницами **OPTIONAL**~~
- [ ] проверить каждый способ фильтрации
  - [ ] refundable не работает, не работает поиск по null значениям (select * from ticket where refundable is null;) **BACKEND**
- [x] не работает сортировка и фильтрация creationDate

### POST
- [ ] проверить валидацию
  - [ ] Методы:
    - [ ] экстремальные значения
    - [ ] неверные значения
    - [ ] неверный тип параметра
    - [ ] правильное ли дефолтное значение?
  - [ ] Поля:
    - [ ] id
    - [ ] name
    - [ ] coordinates.x
    - [ ] coordinates.y
    - [ ] price
    - [ ] discount
    - [ ] refundable
    - [ ] type
    - [ ] person.height
    - [ ] person.eyeColor
    - [ ] person.hairColor
    - [ ] person.nationality
    - [ ] person.location.x
    - [ ] person.location.y
    - [ ] person.location.z
    - [ ] person.location.name


## /tickets/{id}
 


## /tickets/...


## Тестирование
~~- [ ] как то сократить текст, если не влезает **OPTIONAL**~~




## booking
### POST
- [x] позволил сохранить мероприятия в прошлом
- [x] сделать подробный вывод при нарушении валиадции в ошибке
- [x] не получается сохранить с таким "startTime" : "2024-12-20T14:32:00+03", **BACKEND**
- [ ] 