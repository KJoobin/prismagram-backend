          # It's clone by instargram
i will use react, react-native, node, Prisma, GraphQL ...
require : npm, node ( -v10 이상 ), (git)

          ## before Do it list
-[ ] npm init
-[ ] npm install graphql-yoga
-[ ] npm install nodemon -D
-[ ] npm install bable-cli -D
-[ ] src/server.js  파일 만들기
-[ ] package.jsno 파일에 추가
      "scripts":{
        "start" : "nodemon --exec bable-node src/server.js"
      }
-[ ] nodemon.json 파일 생성 / 작성
-[ ] {
              "exit":"js graphql"
            }
-[ ] npm install @babel/{node, core, preset-env}
-[ ] localhost:4000 작동 확인
-[ ] npm install morgan ( logger 모듈; logger --> 시스템 로그에 항목을 기록 )
-[ ] npm install graphql-tools merge-graphql-schemas

      ## User Stories

- [X] Create account
- [ ] Like / Unlike a photo
- [ ] Comment on a photo
- [ ] Search by user
- [ ] Search by location
- [ ] See user profile
- [ ] Follow / Unfollow User
- [ ] See the full photo
- [ ] Edit my profile
- [ ] Log in
- [ ] Upload a photo
- [ ] Edit the photo (Delete)
- [ ] See the feed
