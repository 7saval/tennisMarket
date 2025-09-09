// index.js 역할
// 모듈 소환하고 서버 기동

// 서버 모듈화
let server = require('./server');
// 라우터 모듈화
let router = require('./router');
// requestHandler 모듈 소환
let requestHandler = require('./requestHandler');
// mariadb 모듈 소환
let mariadb = require('./database/connect/mariadb');

// mariadb 연결
mariadb.connect();
// mariadb는 풀을 사용하므로 별도 연결 필요 없음
console.log('MariaDB pool created');

// 서버가 원할 때만 실행되도록
// route를 서버에 전달
// handle 함수도 서버에 전달
server.start(router.route, requestHandler.handle);