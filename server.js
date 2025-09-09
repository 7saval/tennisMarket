// node.js의 모듈 중 http 사용하도록 기능들 불러오는 함수 require
let http = require('http');
// url 가져오기
let url = require('url');
// const { route } = require('./router');

function start(route, handle){
    // 클라이언트와 소통 함수
    // node.js가 알아서 요청과 응답 넣어줌
    function onRequest(request, response){
        // 요청받은 url의 문자열을 해석(파싱)해서 pathname 찾기
        // pathname은 포트넘버 뒤 경로를 말함
        // url.parse는 URL 문자열을 속성별로 분해하는 구버전 메서드
        // 최신 버전에서는 new URL() 방식을 쓰는 게 더 안정적이고 표준적임
        let pathname = url.parse(request.url).pathname;
        // 쿼리 데이터 가져오기
        let queryData = url.parse(request.url, true).query;
        
        // route에게 pathname, handle, response, productId 전달
        route(pathname, handle, response, queryData.productId);

        
    }

    // 서버 생성
    // 클라이언트와 소통한 내용의 함수를 바탕으로 서버 만들기
    // listen(클라이언트 주파수: 포트번호)
    // localhost:8888
    // 미구동 상태. 구동 시 명령어 node server.js
    http.createServer(onRequest).listen(8888);
}

// 페이지 외에서도 start 함수 사용하도록 export
exports.start = start;