// docker pull nameImage

// برای اجرای ردیس در داخل محیط لوکال امون هم فقط کافی هستش در ابونوتو که در داخل ویندوز
// اومدیم و نصب کردیم دستور زیر را اجرا کنیم

// 6379 پورتی هستش که ردیس در داخل سیسیتم ام ما میاد و اجرا می شود

//  docker run  -d -p   6363:6379  --name redis_local  redis
//  docker  exec -it redis_local  sh 
//  redis-cli
