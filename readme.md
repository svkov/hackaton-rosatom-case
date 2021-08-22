===============================================================================
rosatom-case
===============================================================================

Решение кейса для Росатома в рамках хакатона Цифровой прорыв 2021

# Как запустить
- Должно быть установлено Microsoft Visual C++ 14.0 или выше https://visualstudio.microsoft.com/visual-cpp-build-tools/

- Создать виртуальное окружение:

    ```$ conda env create -f devenv-cpu.yaml```

- Активировать виртуальное окружение:

    ```$ conda activate rosatom-case```

- Установить зависимости JS
    ``` cd my-app ```
    ``` npm install```

# Запуск

## FastApi:

```uvicorn web.app:app```

## React:

```npm start```
