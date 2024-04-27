import Animated from "react-native-reanimated";
import { ListRenderItemInfo, TouchableOpacity } from "react-native";
import { Trash2Icon } from "lucide-react-native";
import { useRouter } from "expo-router";

import { Post } from "@/types";
import { useBlogStore } from "@/store/use-blog-store";

const HomeScreen = () => {
  const { blogPosts, deleteBlogPost, setCurrentBlogPost } = useBlogStore(
    (state) => state
  );
  const router = useRouter();

  const onDeleteHandler = (post: Post) => {
    deleteBlogPost(post);
  };

  const onNavigateHandler = (post: Post) => {
    setCurrentBlogPost(post);
    router.navigate("show");
  };

  return (
    <Animated.View className="flex-1">
      <Animated.FlatList
        data={blogPosts}
        keyExtractor={(post: Post) => String(post.id)}
        renderItem={({ item }: ListRenderItemInfo<Post>) => (
          <TouchableOpacity onPress={() => onNavigateHandler(item)}>
            <Animated.View className="flex-row items-center justify-between px-4 py-3 border-b-[1px] border-gray-500">
              <Animated.Text className="text-[18px]">
                {item.title} - {item.id}
              </Animated.Text>
              <TouchableOpacity onPress={() => onDeleteHandler(item)}>
                <Trash2Icon
                  size={25}
                  color={"black"}
                  className="w-[22px] h-[22px] !self-center cursor-pointer"
                />
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        )}
      />
    </Animated.View>
  );
};

export default HomeScreen;
