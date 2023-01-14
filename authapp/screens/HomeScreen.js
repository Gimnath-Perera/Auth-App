import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { clearLocalStorage, getFromLocalStorage } from "../common/functions";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const result = await getFromLocalStorage();

    const _user = JSON.parse(JSON.stringify(result));
    setUser(_user?.currentUser);
  };

  const handleLogout = async () => {
    await clearLocalStorage();
    navigation.navigate("LoginScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Welcome </Text>
        <Text style={styles.headerText}> {user?.fullName}</Text>
      </View>
      <View>
        <Image
          source={require("../assets/house.png")}
          resizeMode="contain"
          style={styles.avatar}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    color: "#051d5f",
  },
  avatar: {
    width: 128,
    height: 128,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  headerBox: {
    display: "flex",
    flexDirection: "column",
  },
  avatarContainer: {
    display: "flex",
  },
  profilePic: { width: 70, height: 70, borderRadius: 1000 },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  button: {
    elevation: 8,
    backgroundColor: "#29b4cb",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minWidth: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 20,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: "#424242",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
  },
  grestureButton: {
    width: 62,
    height: 62,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 0.53,
    shadowRadius: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  videoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  videoHeaderBox: {
    display: "flex",
    flexDirection: "column",
  },
  videoHeaderText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  videoTxtContainer: {
    display: "flex",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  },
  videoCard: {
    backgroundColor: "rgba(230,230, 230,1)",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 6,
    shadowOpacity: 0.53,
    shadowRadius: 2,
    width: 160,
    height: 220,
  },
  cardImage: {
    width: 160,
    height: 220,
    borderRadius: 15,
  },
  cardDetail: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 5,
    textAlign: "left",
    marginTop: 7,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubTitle: {
    fontSize: 14,
  },
  cardRateTitle: {
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  cardRate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HomeScreen;
