
rosatom-case

Решение кейса для Росатома в рамках хакатона Цифровой прорыв 2021

# Как запустить
- Должно быть установлено Microsoft Visual C++ 14.0 или выше https://visualstudio.microsoft.com/visual-cpp-build-tools/

- Скачать https://sourceforge.net/projects/cmusphinx/files/Acoustic%20and%20Language%20Models/Russian/zero_ru_cont_8k_v3.tar.gz/download

- В скачанном  файле переименовайть файлы/папку:

``` zero_ru.cd_cont_4000  ->  acoustic-model ```

``` ru.dic  ->  pronounciation-dictionary.dict ```

``` ru.lm  ->  language-model.lm.bin ```

- В файлах скачанных библиотек `speech_recognition\pocketsphinx-data\`  и `pocketsphinx\model\` создаём папку с именем `rus` и перемещаем туда ранее переименованные файлы (`acoustic-model`, `pronounciation-dictionary.dict`, `language-model.lm.bin`).

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

# Структура проекта

Использовался шаблон на cookiecutter для DataScience проектов, но в итоге большая часть папок не понадобилась.

- `my-app` - react-приложение
- `web` - fastapi приложение
- `