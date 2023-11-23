import React, { useState, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({ navigation }) => {
//----------------------------------------------------------------------
  const [notes, setNotes] = useState('');
  const [cartValue, setCartValue] = useState([]);
//----------------------------------------------------------------------
  useEffect(() => {
    const loadCartValue = async () => {
      try {
        const savedCartValue = await AsyncStorage.getItem('cartValue');
        if (savedCartValue) {
          setCartValue(JSON.parse(savedCartValue));
        }
      } catch (error) {
        console.error('Error loading cartValue:', error);
      }
    };

    loadCartValue();
  }, []); 
  //----------------------------------------------------------------------

  const handleAddToCart = async () => {
    try {
      const updatedCart = [...cartValue, notes];
      await AsyncStorage.setItem('cartValue', JSON.stringify(updatedCart));
      setCartValue(updatedCart);
      setNotes('');
    } catch (error) {
      console.error('Error saving cartValue:', error);
    }
  };
  //----------------------------------------------------------------------
  const handleDeleteItem = async (index) => {
    try {
      const updatedCart = [...cartValue];
      updatedCart.splice(index, 1);
      await AsyncStorage.setItem('cartValue', JSON.stringify(updatedCart));
      setCartValue(updatedCart);
    } catch (error) {
      console.error('Error saving cartValue:', error);
    }
  };
  //----------------------------------------------------------------------

  return (
    <SafeAreaView style={styles.homePageContainer}>

      <View style={styles.toDoListContainer}>
        <Text style={styles.toDoListText}>To Do List</Text>
        <Image style={{ width: 50, height: 50, resizeMode: 'center',}} 
               source={require('../assets/todolist.png')} />
      </View>


      <View style={styles.topContainer}>
        <TextInput
          style={styles.textInputContainer}
          placeholder='Notes...'
          placeholderTextColor={'gray'}
          onChangeText={setNotes}
          value={notes}
        />
        <Pressable
          style={({ pressed }) => [{ transform: [{ translateY: pressed ? 3 : 0 }] }, styles.buttonContainer]}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>

      <View style={styles.downContainer}>
        <FlatList
          data={cartValue}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={styles.flatListContainer}>
                <Text style={styles.flatText}>{item}</Text>

                <Pressable style={({ pressed }) => [{ transform: [{ translateY: pressed ? 3 : 0 }] }, styles.deleteButtonContainer]}
                           onPress={() => handleDeleteItem(index)}>
                  <AntDesign name="delete" size={24} color="#B31312" />
                </Pressable>

              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC5C5',
  },
  topContainer: {
    flex: 2,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
  },
  textInputContainer: {
    borderWidth: 2,
    borderColor: 'gray',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 8,
    marginVertical: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonContainer: {
    borderWidth: 2,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 5,
    backgroundColor: '#EF9595',
    borderColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: 'gray',
  },
  addToCartText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: '#5B2E35',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
  downContainer: {
    flex: 9,
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
  },
  flatListContainer: {
    flexDirection: 'row',
    width:"95%",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:"#F1EAFF",
    borderColor: 'white',
    padding: 10,
    marginVertical: 5,
  },
  flatText: {
    fontSize: 20,
    width:'80%',
    fontWeight: 'bold',
    color: 'gray',
    textShadowColor: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
  deleteButtonContainer: {
    marginLeft:5,
  },
  toDoListContainer: {
    flexDirection:"row",
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    marginVertical:10,
    paddingVertical:5,
  },
  toDoListText: {
    fontSize:40,
    fontWeight:"bold",
    color:"#FEFCAF",
    fontStyle:"italic",
    textShadowColor: 'orange',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  
  }






});
