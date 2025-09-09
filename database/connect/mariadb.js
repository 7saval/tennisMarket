// MySQL 연동
// mysql2 모듈 불러오기
// const mysql = require('mysql2/promise');
const mariadb = require('mysql');

// 연결 통로 만들기
const conn = mariadb.createConnection(
    {
        host: 'localhost',
        port: 3307,
        user: 'user',
        password: '1234',
        database: 'Tennis'
    }
);
// // 연결 풀 만들기
// const pool = mysql.createPool({
//     host: 'localhost',
//     port: 3307,
//     user: 'user',
//     password: '1234',
//     database: 'Tennis',
//     connectionLimit: 5,
//     // MySQL2에서 지원하는 옵션들만 사용
//     waitForConnections: true,
//     queueLimit: 0
// });

// // 연결 테스트 함수
// async function testConnection() {
//     try {
//         console.log('Testing database connection...');
//         const connection = await pool.getConnection();
//         console.log('Database connection successful!');
//         const [rows] = await connection.query('SELECT 1 as test');
//         console.log('Test query result:', rows);
//         connection.release();
//     } catch (err) {
//         console.error('Database connection failed:', err);
//     }
// }

// // 연결 테스트 실행
// testConnection();

// 밖에서 이용 가능하도록 export
module.exports = conn;
// module.exports = pool;