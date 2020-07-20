import React, { useState, useCallback } from "react";
import Head from 'next/head';
import Link from 'next/link'
import Layout from '../components/layout';
import { Title, SelectUserWidget, SelectList, SelectButton } from '../components/styled';



const App = () => {
  const [state, setState] = useState({
    user: ''
  });

  const selectUser = useCallback((e) => {
    setState({
      ...state,
      user: e.target.value
    })
  }, []);

  return (
    <Layout>
      <Head>
        <title>React Socket.io Chatting</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name="description" content="React Socket.io Chatting application" />
        <meta name="keywords" content="react,socket.io,chatting,javascript" />
      </Head>
      <SelectUserWidget>
        <Title>select values &#x1F64F;</Title>
        <SelectList value={state.user} onChange={(e) => { selectUser(e) }}>
          {/* <option value="">Selection</option>
          <option value="user 1">user 1</option>
          <option value="user 2">user 2</option>
          <option value="user 3">user 3</option> */}
          <option value="user 4">user 4</option>
          {/* <option value="user 5">user 5</option>
          <option value="user 6">user 6</option> */}
        </SelectList>
        <Link href={`/list?user=${state.user}`} as='/list'>
          <SelectButton disabled={!state.user}>Select</SelectButton>
        </Link>
      </SelectUserWidget>
    </Layout>
  )
}

export default App;