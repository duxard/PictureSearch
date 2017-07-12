# PictureSearch

Для запуска необходимо выполнить:
1) npm install
2) открыть файл node_modules/google-images/index.js и в функцию buildQuery(query, options) добавить следующий код:

    if (options.start) {
			result.start = options.start;
		}
3) npm start
 Приложение будет доступно по адресу localhost:3400
