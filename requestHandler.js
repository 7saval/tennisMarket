// requestHandler.js
// FileSync의 약자로 만든 html 가져올 수 있다
const fs = require('fs');
const main_view = fs.readFileSync('./main.html','utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html','utf-8');

// mariadb 모듈 소환
let mariadb = require('./database/connect/mariadb');

// router가 루트를 정해주면 각 루트 페이지에서 하는 기능 설정
function main(response){
    console.log('main');

    // query 던지기
    mariadb.query("SELECT * FROM product", function(err, rows){
        console.log(rows);
    })

    // // async 함수를 별도로 만들어서 호출
    // async function executeQuery() {
    //     try {
    //         // query 던지기 (mysql2는 promise 기반, [rows]로 구조분해할당)
    //         const [rows] = await mysql.query("SELECT * FROM product");
    //         console.log(rows);
    //     } catch (err) {
    //         console.error('Database error:', err);
    //     }
    // }
    
    // // 비동기 함수 실행
    // executeQuery();

    // head 적기 : 상태코드, 요청타입
    response.writeHead(200, {'Content-Type' : 'text/html'});
    // write body. body 적기
    response.write(main_view);
    // response 종료. 전송바람
    response.end();
}

// 서버에 있는 그림도 직접 던져줘야 함
function redRacket(response){
    fs.readFile('./img/redRacket.png', function(err, data){
        // head 적기 : 상태코드, 요청타입
        response.writeHead(200, {'Content-Type' : 'text/html'});
        // write body. body 적기
        response.write(data);
        // response 종료. 전송바람
        response.end();
    })
}

function blueRacket(response){
    fs.readFile('./img/blueRacket.png', function(err, data){
        // head 적기 : 상태코드, 요청타입
        response.writeHead(200, {'Content-Type' : 'text/html'});
        // write body. body 적기
        response.write(data);
        // response 종료. 전송바람
        response.end();
    })
}

function blackRacket(response){
    fs.readFile('./img/blackRacket.png', function(err, data){
        // head 적기 : 상태코드, 요청타입
        response.writeHead(200, {'Content-Type' : 'text/html'});
        // write body. body 적기
        response.write(data);
        // response 종료. 전송바람
        response.end();
    })
}

function order(response, productId){
    // head 적기 : 상태코드, 요청타입
    response.writeHead(200, {'Content-Type' : 'text/html'});

    // 인서트 쿼리 던지기
    mariadb.query("INSERT INTO orderlist VALUES(" + productId + ", '"+ new Date().toLocaleDateString() + "');",
function(err, rows){
    console.log(rows);
})
    // write body. body 적기
    response.write('order page');
    // response 종료. 전송바람
    response.end();
}

function orderlist(response){
    // head 적기 : 상태코드, 요청타입
    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows){
        // write body. body 적기
        // orderlist_view에 <table>있음
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>"
                        + "<td>"+element.product_id+"</td>"
                        + "<td>"+element.order_date+"</td>"
                        + "</tr>");
        });
        response.write("</table>");
        // response 종료. 전송바람
        response.end();
    })
}

let handle = {}; // key:value 쌍으로 이루어진 변수(사전)
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* img directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;