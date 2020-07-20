import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import PropTypes from 'prop-types';
import Head from 'next/head';
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { ChatWidgetWrap, ChatWidgetLeft, ChatWidgetRight, ChatWidgetMessageLeft, ChatWidgetMessageRight, PictureImageLarge } from '../components/styled';
import { useDebounce } from 'react-use';

import { SocketContext } from '../socket-context';
import Layout from '../components/layout';

const DynamicHeader = dynamic(() => import('../components/header'))
const DynamicFooter = dynamic(() => import('../components/Footer'))

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const Chat = (props) => {
    const socket = useContext(SocketContext);
    const { router } = props;
    const [state, setState] = useState({
        user: router.query.user,
        target: router.query.target,
        messages: []
    });
    const [debounceMessage, setDebounceMessage] = useState('');
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    const receiveMessage = () => {
        socket.emit('receive message', state.user, state.target);

        socket.on('receive message', (messages) => {
            setState({
                ...state,
                messages
            })
            setDebounceMessage('');
            executeScroll();
        });

        if (!state.user) {
            Router.push({
                pathname: '/'
            })
        }
    };

    useEffect(() => {
        receiveMessage();
        readMessages();

        return () => {
            socket.off('receive message');
        }
    }, []);

    useDebounce(
        () => {
            setDebounceMessage(debounceMessage)
        },
        500,
        [debounceMessage]
    );

    const readMessages = () => {
        socket.emit('read message', state.user, state.target);
    };

    const sendMessages = () => {
        socket.emit('send message', state.user, state.target, debounceMessage, false)
        receiveMessage();
    };

    const renderChatMessages = useCallback(() => {
        const { user, messages } = state;

        return (
            <ChatWidgetWrap>
                {messages.map((value, index) => {
                    if (user === value.user) {
                        return (
                            <ChatWidgetRight key={index}>
                                {value.picture
                                    ?
                                    <PictureImageLarge src={value.picture} />
                                    :
                                    <ChatWidgetMessageRight>{value.message}</ChatWidgetMessageRight>
                                }
                            </ChatWidgetRight>
                        )
                    } else {
                        return (
                            <ChatWidgetLeft key={index}>
                                {value.picture
                                    ?
                                    <PictureImageLarge src={value.picture} />
                                    :
                                    <ChatWidgetMessageLeft>{value.message}</ChatWidgetMessageLeft>
                                }
                            </ChatWidgetLeft>
                        )
                    }

                })}
            </ChatWidgetWrap>
        )
    }, [state.messages]);

    return (
        <Layout>
            <Head>
                <title>{state.target}과 채팅</title>
                <link rel='icon' href='/favicon.ico' />
                <meta name="description" content="React Socket.io Chatting application" />
                <meta name="keywords" content="react,socket.io,chatting,javascript" />
            </Head>
            <DynamicHeader user={state.user} target={state.target} />
            {state.messages.length ? renderChatMessages() : ''}
            <DynamicFooter debounceMessage={debounceMessage} setDebounceMessage={setDebounceMessage} sendMessages={sendMessages} />
            <div ref={myRef} style={{ visibility: 'hidden' }}></div>
        </Layout>
    )
};

export default withRouter(Chat);

Chat.propTypes = {
    router: PropTypes.object,
};



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import Fab from '@material-ui/core/Fab';
// import SendIcon from '@material-ui/icons/Send';

// const useStyles = makeStyles({
//     borderRight500: {
//         borderRight: '1px solid #e0e0e0'
//     },
//     borderAll: {
//         border: '1px solid #e0e0e0'
//     },
//     messageArea: {
//         height: '70vh',
//         overflowY: 'auto'
//     }
// });

// const Chat = () => {
//     const classes = useStyles();

//     return (
//         <div >
//             <Grid container className={classes.borderAll}>
//                 <Grid item xs={3}>
//                     <List className={classes.messageArea}>
//                         <ListItem key="1">
//                             <Grid container>
//                                 <Grid item xs={12}>
//                                     <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <ListItemText align="right" secondary="09:30"></ListItemText>
//                                 </Grid>
//                             </Grid>
//                         </ListItem>
//                         <ListItem key="2">
//                             <Grid container>
//                                 <Grid item xs={12}>
//                                     <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <ListItemText align="left" secondary="09:31"></ListItemText>
//                                 </Grid>
//                             </Grid>
//                         </ListItem>
//                         <ListItem key="3">
//                             <Grid container>
//                                 <Grid item xs={12}>
//                                     <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <ListItemText align="right" secondary="10:30"></ListItemText>
//                                 </Grid>
//                             </Grid>
//                         </ListItem>
//                     </List>
//                     <Divider />
//                     <Grid container style={{ padding: '20px' }}>
//                         <Grid item xs={11}>
//                             <TextField id="outlined-basic-email" label="Type Something" fullWidth />
//                         </Grid>
//                         <Grid xs={1} align="right">
//                             <Fab color="primary" aria-label="add"><SendIcon /></Fab>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </div>
//     );
// }

// export default Chat;