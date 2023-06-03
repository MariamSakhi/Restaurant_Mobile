import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const SecondScreen = ({ route }) => {
    const { selectedCity, selectedZone } = route.params;

  const [restaurants, setRestaurants] = useState([]);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [series, setSeries] = useState([]);
  const [specialites, setSpecialites] = useState([]);


  useEffect(() => {
    
    fetch('https://9e20-105-158-235-213.eu.ngrok.io/api/serie/all')
      .then(response => response.json())
      .then(data => setSeries(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    fetch('https://9e20-105-158-235-213.eu.ngrok.io/api/sepecialite/all')
      .then(response => response.json())
      .then(data => setSpecialites(data))
      .catch(error => console.log(error));
  }, []);
  useEffect(() => {
    if (selectedSerie === null && selectedSpeciality === null && selectedCity && selectedZone) {
      const apiUrl = `https://9e20-105-158-235-213.eu.ngrok.io/api/villes/${selectedCity}/zones/${selectedZone}/restaurants`;
      axios.get(apiUrl)
        .then(response => {
          setRestaurants(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (selectedCity && selectedZone && selectedSpeciality && selectedSerie === null) {
      const apiUrl = `https://9e20-105-158-235-213.eu.ngrok.io/api/villes/${selectedCity}/zones/${selectedZone}/restaurants/specialite=${selectedSpeciality}`;
      axios.get(apiUrl)
        .then(response => {
          setRestaurants(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (selectedCity && selectedZone && selectedSerie && selectedSpeciality === null) {
      const apiUrl = `https://9e20-105-158-235-213.eu.ngrok.io/api/villes/${selectedCity}/zones/${selectedZone}/restaurants/serie=${selectedSerie}`;
      axios.get(apiUrl)
        .then(response => {
          setRestaurants(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else if (selectedCity && selectedZone && selectedSpeciality && selectedSerie) {
      const apiUrl = `https://9e20-105-158-235-213.eu.ngrok.io/api/villes/${selectedCity}/zones/${selectedZone}/restaurants/specialite=${selectedSpeciality}/serie=${selectedSerie}`;
      axios.get(apiUrl)
        .then(response => {
          setRestaurants(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setRestaurants([]);
    }
  }, [selectedCity, selectedZone, selectedSpeciality, selectedSerie]);

  console.log(restaurants)
  const handleSerieChange = (serie) => {
    setSelectedSerie(serie);
  };

  const handleSpecialityChange = (speciality) => {
    setSelectedSpeciality(speciality);
  };



  function RestaurantList( restaurant ) {
    const navigation = useNavigation();
  
    const handleLocatePress = () => {
        navigation.navigate('MapScreen', {
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        });
      };
      
      return (
        <View style={styles.container2} key={restaurant.id}>
          <View style={styles.item} >
            <Image style={styles.image} source={require('../assets/862730.jpg')} />
            <View style={styles.details}>
              <Text style={styles.name}>{restaurant.nom}</Text>
              <Text style={styles.address}>{restaurant.adresse}</Text>
              <Text style={styles.description}>{restaurant.description}</Text>
              <Text style={styles.hours}>{restaurant.hourOpened} - {restaurant.hourClosed}</Text>
              <View style={styles.container3}>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleLocatePress}>
                  <Text style={styles.button}>Map</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
      }      
  return (
    <View style={styles.container}>
      
        <Text style={styles.logo}>Restaurant</Text>
<View style={styles.pickerContainer}>
        <Text style={styles.label}>choisissez une Serie</Text>
        <Picker
          selectedValue={selectedSerie}
          onValueChange={(itemValue) => handleSerieChange(itemValue)}
        >
          <Picker.Item label="None" value={null} />
          {series.map((serie) => (
            <Picker.Item key={serie.id} label={serie.nom} value={serie.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>choisissez une Specialite</Text>
        <Picker
          selectedValue={selectedSpeciality}
          onValueChange={(itemValue) => handleSpecialityChange(itemValue)}
        >
          <Picker.Item label="None" value={null} />
          {specialites.map((specialite) => (
            <Picker.Item key={specialite.id} label={specialite.nom} value={specialite.id} />
          ))}
        </Picker>
      </View>   

  <ScrollView> 

      
       <View>
       {restaurants.map((restaurant) => (
       RestaurantList(restaurant)
       ))}
    </View>
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0286FF',
  },
  pickerContainer: {
    width: '80%',
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
    color: '#19f5aa',
  },
    container2: {      
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    item: {
      width: '90%',
      margin: '1%',
      backgroundColor: '#fff',
      borderRadius: 8,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: 150,
    },
    details: {
      padding: 10,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    address: {
      fontSize: 14,
      marginBottom: 5,
    },
    description: {
      fontSize: 12,
      marginBottom: 5,
    },
    hours: {
      fontSize: 12,
      fontWeight: 'bold',
    },
      container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: '#19f5aa',
    padding: 10,
    borderRadius: 5,
      },
  
});

export default SecondScreen;
