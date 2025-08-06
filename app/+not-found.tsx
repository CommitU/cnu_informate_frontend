import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "페이지를 찾을 수 없습니다" }} />
      <View style={styles.container}>
        <Text style={styles.title}>이 페이지는 존재하지 않습니다.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>홈 화면으로 돌아가기</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: "#1976D2",
    fontWeight: "600",
  },
});
