// 라우터 : 경로 정해주는 기능
function route(pathname, handle, response, productId){
    // pathname은 8888뒤에 오는 경로
    console.log('pathname : '+pathname);

    // handle 변수를 함수처럼 사용하도록 소괄호 지정. response 파라메터 전달
    // 정의되지 않은 url(/favicon.ico 등) 함수를 자동으로 불러오고 있어서 
    // handle[pathname] 이 존재할 때만 실행하도록 조건문
    // 에러일 경우 에러 페이지 띄우기
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response, productId);
    } else{
        console.log('No request handler found for ' + pathname);
        // head 적기 : 상태코드, 요청타입
        response.writeHead(404, {'Content-Type' : 'text/html'});
        // write body. body 적기
        response.write('Not Found');
        // response 종료. 전송바람
        response.end();
    }
    
}

exports.route = route;