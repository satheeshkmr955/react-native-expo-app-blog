import Animated from "react-native-reanimated";
import { Link, Stack } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <Animated.View className="flex-[1] items-center justify-center p-[20px]">
        <Animated.Text className="text-[20px] font-bold">
          This screen doesn't exist.
        </Animated.Text>

        <Link href="/" className="mt-[15px] py-[15px]">
          <Animated.Text className="text-[14px] !text-[#2e78b7]">
            Go to home screen!
          </Animated.Text>
        </Link>
      </Animated.View>
    </>
  );
}
