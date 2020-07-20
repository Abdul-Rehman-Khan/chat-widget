const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = 3001;
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

let data = [
  {
    id: 'user 1',
    contents:[
      {
        name:'user 2',
        picture: '/assets/images/1.jpg',
        endedAt:1570454329003,
        messages:[
          {
            user:'user 2',
            message:'hi?',
            isRead:true
          },
          {
            user:'user 1',
            message:'what',
            isRead:true
          },
          {
            user:'user 2',
            message:'no',
            isRead:false
          },
          {
            user:'user 2',
            message:'please',
            isRead:false
          }
        ]
      },
      {
        name: 'there',
        picture: '/assets/images/3.jpg',
        endedAt:1570551864061,
        messages:[
          {
            user:'no :"D',
            message:'회장님',
            isRead:true
          },
          {
            user:'user 1',
            message:'are you fine',
            isRead:true
          },
          {
            user:'user 6',
            message:'no i am ok',
            isRead:false
          }
        ]
      },
      {
        name: 'user 3',
        picture: '/assets/images/4.jpg',
        endedAt:1570887765818,
        messages:[
          {
            user:'user 1',
            message:'ok',
            isRead:true
          },
          {
            user:'user 3',
            message:'bye',
            isRead:true
          },
          {
            user:'user 3',
            message:'okok',
            isRead:false
          }
        ]
      },
      {
        name: 'user 4',
        picture: '/assets/images/6.jpg',
        endedAt:1570531864061,
        messages:[
          {
            user:'user 1',
            message:'bye',
            isRead:true
          },
          {
            user:'user 4',
            message:'yes',
            isRead:true
          },
          {
            user:'user 1',
            message:'no',
            isRead:true
          }
        ]
      },
      {
        name: 'user 5',
        picture: '/assets/images/5.jpg',
        endedAt:1570532864061,
        messages:[
          {
            user:'user 1',
            message:'user 5',
            isRead:true
          },
          {
            user:'user 5',
            message:'yes',
            isRead:true
          },
          {
            user:'user 1',
            message:'are you fine ?',
            isRead:true
          }
        ]
      },
      {
        name: 'user 6',
        picture: '/assets/images/7.jpg',
        endedAt:1570232864061,
        messages:[
          {
            user:'user 6',
            message:'please get out',
            isRead:true
          },
          {
            user:'user 1',
            message:'ok i am going',
            isRead:true
          },
          {
            user:'user 6',
            message:'shutup.',
            isRead:true
          },
          {
            user:'user 1',
            message:'you are mad :D',
            isRead:true
          },
        ]
      }
    ],
  },
  {
    id: 'user 2',
    contents:[
      {
        name:'user 1',
        picture: '/assets/images/8.jpg',
        endedAt:1570454329003,
        messages:[
          {
            user:'user 2',
            message:'message',
            isRead:true
          },
          {
            user:'user 1',
            message:'messgae 2',
            isRead:true
          },
          {
            user:'user 2',
            message:'message 3',
            isRead:true
          },
          {
            user:'user 2',
            message:'message 4',
            isRead:true
          }
        ]
      }
    ]
  },
  {
    id: 'user 6',
    contents:[
      {
        name:'user 1',
        picture: '/assets/images/8.jpg',
        endedAt:1570551864061,
        messages:[
          {
            user:'user 6',
            message:'no message',
            isRead:true
          },
          {
            user:'user 1',
            message:'yes',
            isRead:true
          },
          {
            user:'user 6',
            message:'bye',
            isRead:true
          }
        ]
      }
    ]
  },
  {
    id: 'user 3',
    contents:[
      {
        name:'user 1',
        picture: '/assets/images/8.jpg',
        endedAt:1570887765818,
        messages:[
          {
            user:'user 1',
            message:'okok',
            isRead:true
          },
          {
            user:'user 3',
            message:'yes',
            isRead:true
          },
          {
            user:'user 3',
            message:'no medicine',
            isRead:true
          }
        ]
      }
    ]
  },
  {
    id: 'user 4',
    contents:[
      {
        name:'user 1',
        picture: '/assets/images/8.jpg',
        endedAt:1570531864061,
        messages:[
          {
            user:'user 1',
            message:'bye',
            isRead:true
          },
          {
            user:'user 4',
            message:'yes',
            isRead:true
          },
          {
            user:'user 1',
            message:'no',
            isRead:true
          }
        ]
      }
    ]
  },
  {
    id: 'user 5',
    contents:[
      {
        name:'user 1',
        picture: '/assets/images/8.jpg',
        endedAt:1570532864061,
        messages:[
          {
            user:'user 1',
            message:'user 5',
            isRead:true
          },
          {
            user:'user 5',
            message:'yes',
            isRead:true
          },
          {
            user:'user 1',
            message:'are you fine ?',
            isRead:true
          }
        ]
      }
    ]
  },
  {
    id: 'user 6',
    contents:[
      {
        name:'user 1',
        picture: '/assets/images/8.jpg',
        endedAt:1570232864061,
        messages:[
          {
            user:'user 6',
            message:'please get out',
            isRead:true
          },
          {
            user:'user 1',
            message:'ok i am going',
            isRead:true
          },
          {
            user:'user 6',
            message:'shutup.',
            isRead:true
          },
          {
            user:'user 1',
            message:'you are mad :D',
            isRead:true
          },
        ]
      }
    ]
  }
];

io.on('connection', socket => {
  // console.log('connected!');

  socket.on('send message', (user, target, msg, isPicture) => {
    const copyData = [...data];
    const newDate = + new Date();

    copyData.forEach(v => {
      if(v.id === user){
        v.contents.forEach(key => {
          if(key.name === target){
            key.endedAt = newDate;
            key.messages.push({
              user: user,
              message: isPicture === true ? '' : msg,
              picture: isPicture === true ? msg : '',
              isRead: true
            })
          }
        });
      } else if (v.id === target) {
        v.contents.forEach(key => {
          if(key.name === user){
            key.endedAt = newDate;
            key.messages.push({
              user: user,
              message: isPicture === true ? '' : msg,
              picture: isPicture === true ? msg : '',
              isRead: false
            })
          }
        });
      }
    })

    const targetData = copyData.filter(v => v.id === user)[0];
    const targetMessages = targetData ? targetData.contents.filter(value => value.name === target)[0].messages : [];
    io.sockets.emit('receive message', targetMessages);

    const reduceTargetData = copyData.filter(v => v.id === target)[0];
    socket.broadcast.emit('receive data', reduceTargetData);
  })

  socket.on('receive data', (user) => {
    const newData = data.filter(v => v.id === user)[0];
    io.sockets.to(socket.id).emit('receive data', newData);
  });

  socket.on('receive message', (user, target) => {
    const targetData = data.filter(v => v.id === user)[0];
    const targetMessages = targetData ? targetData.contents.filter(value => value.name === target)[0].messages : [];
    io.sockets.emit('receive message', targetMessages);
  });

  socket.on('read message', (user, target) => {
    const copyData = [...data];
    const userIdx = copyData.findIndex(v => v.id === user);
    if(userIdx !== -1){
      const mappingData = copyData[userIdx].contents.map(key => {
        if(key.name === target){
          key.messages.forEach(value => {
            if(value.user === target) value.isRead = true;
          }) 
        }
        return key
      });
      copyData[userIdx].contents = mappingData;
    }

    const newData = copyData.filter(v => v.id === user)[0];
    io.sockets.to(socket.id).emit('receive data', newData);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected!')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))