# AIRWAYS

## Описание проекта

Проект про покупку билетов на самолёт, где каждый пользователь может зайти и купить себе билет, для себя и для кого-то ещё. А также, админ. панели, где менеджер может управлять всем что находиться в базе данных.

## Основное изучить и сделать

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
