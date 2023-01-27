import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import socket from './socket';

const App = () => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [input, setInput] = useState('');

  useEffect(()=>{
    socket.connect()
    socket.on("connect", ()=> {
      setIsConnected(true)
    })
    socket.on("disconnect", ()=> {
      setIsConnected(false)
    })  
  });

  const sendText = (msg: string) => {
    if(msg.length > 0){
      socket.emit('emittext', msg);
    }
    setInput('');
  }

  return (
    <View style={{flex:1}}>
       <View style={{backgroundColor: 'blue', height: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white'}}>{isConnected ? "connected" : "disconnected"}</Text>
       </View>
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end', marginBottom: 10}}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
            <TextInput style={{flex: 1, borderWidth: 2, borderRadius: 9, marginHorizontal: 10}} onChangeText={setInput} value={input}  placeholder='escreva algo' />
          <View style={{alignItems:'center', height: 50}}>
            <Button title='enviar'  onPress={ () => sendText(input)}/>
          </View>
        </View>
    </View>
    </View>
  );
};

export default App;
