import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect , useState} from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native'
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from '../assets'
import MenuContainer from '../components/MenuContainer'
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer';
import {getPlacesData} from '../api/index'

const Discover = () => {
  const navigation = useNavigation()

  const [type, setType] = useState("restaurants")
  const [isLoading, setIsLoading] = useState(false)
  const [mainData, setMainData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(()=>{
    setIsLoading(true)
    getPlacesData().then(data => {
      setMainData(data)
      setInterval(()=>{
        setIsLoading(false)
      }, 2000)
    })
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
          <Text className="text-[#527283] text-[36px]">the beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
          source={Avatar}
          className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
        <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesDetailsQuery={{fields: "geometry"}}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // console.log(data, details);
          console.log(details?.geometry?.viewport)
        }}
        query={{
          key: API_KEY,
          language: 'en',
        }}
      />
      </View>

      {/* Menu Container */}
      {
      isLoading ? 
      <View>
        <ActivityIndicator size="large" color="#00ff00" />
      </View> : 
      <ScrollView>
      <View className="flex-row items-center justify-between px-8 mt-8">
        <MenuContainer
          key={"hotel"}
          title="Hotels"
          imageSrc={Hotels}
          type={type}
          setType={setType}
        />
        <MenuContainer
          key={"attractions"}
          title="Attractions"
          imageSrc={Attractions}
          type={type}
          setType={setType}
        />
        <MenuContainer
          key={"restaurants"}
          title="Restaurants"
          imageSrc={Restaurants}
          type={type}
          setType={setType}
        />
      </View>

      <View>
        <View className="flex-row items-center justify-between px-4 mt-8">
          <Text className="text-[#2C7379] text-[28px] font-bold">Top Tips</Text>
          <TouchableOpacity className="flex-row items-center justify-center space-x-1">
            <Text className="text-[#A0C4C7] text-[20px] font-bold">Explore</Text>
            <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
          </TouchableOpacity>
        </View>
        
        <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
          {/* <ItemCardContainer key={"101"} imageSrc={"https://cdn.pixabay.com/photo/2023/02/03/15/27/bird-7765384_960_720.jpg"} 
          title="Something" 
          location="Doha"
          />
          <ItemCardContainer key={"102"} imageSrc={"https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg"} 
          title="Sample" 
          location="Qatar"
          /> */}
          {
          mainData?.length > 0 ?
          <>
            <ItemCardContainer key={"101"} imageSrc={"https://cdn.pixabay.com/photo/2023/02/03/15/27/bird-7765384_960_720.jpg"} 
            title="Something" 
            location="Doha"
            />
            <ItemCardContainer key={"102"} imageSrc={"https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_960_720.jpg"} 
            title="Sample" 
            location="Qatar"
            />
          </>
          :
          <>
            <View className="w-full h-[400px] items-center space-y-8 justify-center">
              <Image 
                source={NotFound}
                className="w-32 h-32 object-cover"
              />
              <Text className="text-2xl text-[#428288] font-semibold">
                Opps...No Data Found
              </Text>
            </View>
          </>
          }
        </View>
      </View>
      </ScrollView>
      }
    </SafeAreaView>
  )
}

export default Discover