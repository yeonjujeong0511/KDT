// mysql 가져오기
const mysql = require("mysql")
// db 정보 저장된 js 연결
const conn = require("./myCON.js")
// path 가져오기
const path = require("path")
// express 가져오기
const express = require("express")
// express 호출해서 app에 담아주기
const app = express();
// const cors = require("cors")
// const fs = require("fs");
// 포트번호 세팅
app.set('port', process.env.PORT || 8000);
// 디비와의 연결
const db = mysql.createConnection(conn);
// 익스프레스 바디파서 사용
app.use(express.json())
app.use(express.urlencoded({extended : true}))
// realcount는 seq다음 번호를 만들어서 다음 게시글에 번호중첩이 되지 않고 실행되게끔 한다.
let realCount = 0;
// current는 삭제할때 일치하게끔 사용한다.
let current = 0;
// 배열을 담는 result
let result = "";
// 이건 의미없지만 고치면 무너질거 같아서 내비둔다.
let count = 0;
// 처음 접속 사이트, 게시판 DB에 있는 목록들을 전부 가져와 화면에 출력한다.
app.get("/", (req, res)=>{
  db.query("select * from mainBoard4", (err, results)=>{
    if(err){
      console.error(err)
    }
    realCount = (results[results.length - 1].seq +1)
    current++
    count = results.length === undefined ? 0 : results.length;
    result =  results.reverse().map((item, index)=>{
      
      return `<div style="display : flex; justify-content: flex-start; align-items: center; gap: 20px;">
      <a href="board${item.seq}" style="color: black; text-decoration: none;">
      <h3>게시물번호 : ${("0000" + item.seq).slice(-5)}</h3>
      <h1 style=" color : cadetblue; ">제목 : ${item.head}</h1>
      <div style="color: #333;">태그 : ${item.tag}</div>
      <div style="">내용 : ${item.main.slice(0, 20)}...</div>
      </a></div><hr>`
    })
    let result2 = ""
    result.forEach((item)=>{
      result2 += item
    })
// 보내준다. 데이터를 담은 html
      res.send(`<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      
      <body>
      <form action="/search" method="get" style="display : flex; justify-content: center; align-items: center; gap: 20px;">
        <input type="text" name="head" placeholder="제목 검색" style="width : 800px; height : 50px; font-size: 24px;"></input><button style="width : 50px; height : 56px;">검색</a></button>
      </form>
        <h1><a href="/create" style="color: pink; text-decoration: none; ">글 생성</a></h1>
        ${result2 === undefined ? "글 준비중...." : result2}
      </body>
      
      </html>`)
  })
})
// 게시물 상세보기 연결 id로 어떤 게시글을 클릭했는지 구분하고 그 주소로 연결 시켜 준다.
app.get("/board:id", (req, res)=>{
  db.query("select * from mainBoard4", (err, results)=>{
    if(err){
      console.error(err)
    }
    current = req.params.id;
    let result2 = "";
      results.forEach((item, index)=>{
        result2 = `<div style="display : flex; justify-content: center; align-items: center; gap: 20px; flex-direction: column;">
        <h3>게시물번호 : ${("0000" + item.seq).slice(-5)}</h3>
        <h1 style=" color : cadetblue; width: 700px; height : 20px">제목 : ${item.head}</h1>
        <div style="color: #333; width: 700px; height : 20px">태그 : ${item.tag}</div>
        <div style="width: 700px; height : 500px">내용 : ${item.main}</div>
        </div>`    
        
        if(req.params.id == item.seq){
        res.send(`
        <body>
        <h1><a href="/" style="color: black; text-decoration: none; ">홈으로</a></h1>
          ${result2}
        <h1><a href="/delete" style="color: black; text-decoration: none; ">삭제하기</a></h1>
        </body>
        `)
      }
    })     
  })
})
// 게시글 생성 페이지. mainBoard에 있는 form을 통해서 데이터를 입력받으면 post에서 처리한다.
app.get("/create", (req,res)=>{
  res.sendFile(path.join(__dirname, "mainBoard.html"))
})
// 게시글 처리 과정 req로 받아서 디비에 저장을 한다. 
app.post("/create", (req, res)=>{

  const local = {
    body: req.body,
    headText:body.headText,
    mainTag:body.mainTag,
    mainText:body.mainText
  }


  let body = req.body
  let headText = body.headText;
  let mainTag = body.mainTag;
  let mainText = body.mainText
  let query = db.query(`insert into mainBoard4(seq, head, tag, main) values("${(realCount)}", "${headText}", "${mainTag}", "${mainText}" );`,  (err)=>{
    if(err){
      console.error(err)
    }
  })
  
  res.redirect("/")
})
// 게시글 삭제 과정. current 변수를 이용해 게시판 번호를 찾아 db에서 처리 해준다.
app.get('/delete', (req, res)=>{
  let sql = `delete from mainBoard4 where seq=${current};`
  db.query(sql, (err, result)=>{
    if(err){
      console.error(err)
    }
    res.redirect("/")
  })
})
// 검색 구현
// 결과를 req.query.head로 받아온 것과 item.head 즉, 제목부분의 첫 단어나 완전일치했을 경우 출력해준다.
app.get("/search", (req, res)=>{
  db.query("select * from mainBoard4", (err, results)=>{
    if(err){
      console.error(err)
    }
    let searchResult;
      searchResult =  results.reverse().map((item, index)=>{
        for(let i=0; item.head.split(" ").length; i++){
        if(item.head.split(" ")[i] === req.query.head){
          // isWHO = true
          return `<div style="display : flex; justify-content: flex-start; align-items: center; gap: 20px;">
          <a href="board${item.seq}" style="color: black; text-decoration: none;">
          <h3>게시물번호 : ${("0000" + item.seq).slice(-5)}</h3>
          <h1 style=" color : cadetblue; ">제목 : ${item.head}</h1>
          <div style="color: #333;">태그 : ${item.tag}</div>
          <div style="">내용 : ${item.main.slice(0, 20)}...</div>
          </a></div><hr>`
        }
        else if(item.head === req.query.head){
          return `<div style="display : flex; justify-content: flex-start; align-items: center; gap: 20px;">
            <a href="board${item.seq}" style="color: black; text-decoration: none;">
            <h3>게시물번호 : ${("0000" + item.seq).slice(-5)}</h3>
            <h1 style=" color : cadetblue; ">제목 : ${item.head}</h1>
            <div style="color: #333;">태그 : ${item.tag}</div>
            <div style="">내용 : ${item.main.slice(0, 20)}...</div>
            
            </a></div><hr>`
        }
        else{
          return ""
        }
      }
      })
    // 검색기능을 구현했지만 본문 검색을 구현하지 못했다.
    // 제목의 첫글자와 제목 내용이 완전일치하면 그 값을 반환해서 출력해주었다.
    let searchResult2 = ""
    searchResult.forEach((item)=>{
        searchResult2 += item
        serrchReaultAddedItems 

    })
    res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    
    <body>
    <form action="/search" method="get" style="display : flex; justify-content: center; align-items: center; gap: 20px;">
        <input type="text" name="head" style="width : 800px; height : 50px; font-size: 24px"></input><button style="width : 50px; height : 56px">검색</a></button>
      </form>
      <h1><a href="/" style="color: pink; text-decoration: none; ">홈으로</a></h1>
      ${searchResult2 === "" ? "<h1>검색 결과가 없네요!</h1>" : searchResult2}
    </body>
    
    </html>`)
    searchResult = []
    searchResult2 = ""
  })
})
// db바닐라 형태로 화면에 출력 이제는 안쓰임
app.get('/users', (req, res)=>{
  let sql = "select * from mainBoard4;"
  db.query(sql, (err, result)=>{
    if(err){
      console.error(err)
    }
    res.send(result);
  })
})
// 임시로 쓰는 주석들
// app.get('/delete2', (req, res)=>{
//   let sql = `delete from mainBoard4 where head="제발";`
//   db.query(sql, (err, result)=>{
//     if(err){
//       console.error(err)
//     }
//     res.redirect("/")
//   })
// })
// app.get('/addd', (req, res)=>{
//   let sql = "desc mainBoard4;"
//   db.query(sql, (err, result)=>{
//     if(err){
//       console.error(err)
//     }
//     res.send(result);
//   })
// })
// app.get('/add', (req, res)=>{
//   let sql = `CREATE TABLE mainBoard4(seq INT, head VARCHAR(40), tag VARCHAR(40), main VARCHAR(400) );`
//   db.query(sql, (err, result)=>{
//     if(err){
//       console.error(err)
//     }
//     res.send(result);
//   })
// })
// 서버를 연다.
app.listen(app.get("port"), ()=>{
  console.log('Express and MySql http://localhost:' + app.get("port"))
})