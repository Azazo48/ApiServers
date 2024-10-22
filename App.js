import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const MinecraftServerStatus = () => {
  const [serverData, setServerData] = useState(null);
  const [serverIP, setServerIP] = useState("");

  const checkServerStatus = async () => {
    const response = await axios.get(`https://mcapi.us/server/status?ip=${serverIP}`);
    setServerData(response.data);
  };

  return (
    <View style={styles.container}>
      <Text>MC Server Estatus</Text>
      <TextInput
        style={styles.input}
        placeholder="IP del servidor"
        value={serverIP}
        onChangeText={setServerIP}
      />
      <Button title="Ver Info" onPress={checkServerStatus} />
      
      <View>
        {serverData && (
          <>
            <Text>Jugadores: {serverData.players.now}/{serverData.players.max}</Text>
            <Text>MOTD: {serverData.motd}</Text>
            <Text>Version: {serverData.server.name}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    width: '25%',
    paddingHorizontal: 10,
  },
});

export default MinecraftServerStatus;