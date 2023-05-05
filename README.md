# AIRWAYS



## Описание проекта

Реализация приложения, позволяющего пользователю купить авиабилеты. Также в приложении реализованы роли обычного пользователя и админа. Пользователь может покупать билеты, админ - редактировать базу данных.

## Основное изучить и сделать

0. Обязательно ознакомиться с [инструкцией, как начать работать на проекте](https://gitlab.com/levotarayan98/airways/-/wikis/%D0%9A%D0%B0%D0%BA-%D0%BD%D0%B0%D1%87%D0%B8%D0%BD%D0%B0%D1%82%D1%8C-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D0%BD%D0%B0-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B5), обязательно следовать инструкциям в ней, а также ознакомиться и со всем разделом Wiki. ~~За пропуск статьи - бан~~
1. Изучить SSH
2. Клонировать проект
3. Изучить архитектуру проекта
4. Изучить технологии
    * Vite.js
    * Vitest
    * Chakra-ui
    * Husky
    * Typescript
    * Prettier
    * Eslint
    * React-Query
    * Axios
    * Tailwindcss

## Требование к запуску проекта

* Зайти в терминал от администратора в PowerShell и прописать

```bash
    wsl --install
```

* Поставить себе вторую версию WSL 2

```bash
    wsl --set-default-version 2
```

* Скачать и установить себе *Windows Terminal Preview* из Microsoft Store
* Поставить себе в настройках *Windows Terminal Preview*>*Профиль по умолчанию* выбрать **Ubuntu**
* Установить [yarn](https://yarnpkg.com/)

```node
    npm i -g yarn
```

* В зависимости от OS нужно будет установить [Docker](https://www.docker.com/)

[Windows10 Home](https://learn.microsoft.com/ru-ru/windows/wsl/install/)

[Windows10 Pro](https://docs.docker.com/desktop/install/windows-install/)

[Windows11](https://docs.docker.com/desktop/install/windows-install/)

[Apple](https://www.docker.com/)

[Linux](https://www.docker.com/)

Запуск проекта зависит от запуска бэкенд проекта, поэтому нужно будет попросить у меня доступ, чтобы ментор бэкенда добавил вас в команду проекта

## Запуск проекта фронта

Установить все зависимости

```property
    yarn
```

Запустить проект фронта

```property
    yarn dev
```

## Запуск проекта бэка

Для запуска необходимо зайти в корень бэка проекта, для запуска необходима вот эта команда

```docker
    docker compose up
```
