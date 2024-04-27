import { Animated } from "react-native";

import { useBlogStore } from "@/store/use-blog-store";

const ShowScreen = () => {
  const { currentBlogPost: post } = useBlogStore((state) => state);

  if (!post) {
    return null;
  }

  return (
    <Animated.View className="flex-1">
      <Animated.Text>{post.title}</Animated.Text>
      <Animated.Text>{post.content}</Animated.Text>
    </Animated.View>
  );
};

export default ShowScreen;
