import Animated from "react-native-reanimated";
import { useEffect } from "react";
import { ListRenderItemInfo, Pressable } from "react-native";
import { Trash2Icon } from "lucide-react-native";
import { useRouter } from "expo-router";

import type { Post } from "@prisma/client";
import { useBlogStore } from "@/store/use-blog-store";
import { axiosFetcher } from "@/lib/fetcher";

const HomeScreen = () => {
  const { blogPosts, deleteBlogPost, setCurrentBlogPost, getBlogPost } =
    useBlogStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    getApi();
  }, []);

  const onDeleteHandler = async (post: Post) => {
    try {
      const response = await axiosFetcher({
        url: `/blogpost/${post.id}`,
        method: "DELETE",
      });
      const data: { post: Post } = await response.data;
      deleteBlogPost(data.post);
    } catch (error) {
      console.error(error);
    }
  };

  const onNavigateHandler = (post: Post) => {
    setCurrentBlogPost(post);
    router.navigate("show");
  };

  const getApi = async () => {
    try {
      const response = await axiosFetcher("/blogposts");
      const data = await response.data;
      getBlogPost(data.posts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Animated.View className="flex-1">
      <Animated.FlatList
        data={blogPosts}
        keyExtractor={(post: Post) => String(post.id)}
        renderItem={({ item }: ListRenderItemInfo<Post>) => (
          <Pressable onPress={() => onNavigateHandler(item)}>
            <Animated.View className="flex-row items-center justify-between px-4 py-3 border-b-[1px] border-gray-500">
              <Animated.Text className="text-[18px]">
                {item.title} - {item.id}
              </Animated.Text>
              <Pressable onPress={() => onDeleteHandler(item)}>
                <Trash2Icon
                  size={25}
                  color={"black"}
                  className="w-[22px] h-[22px] !self-center cursor-pointer"
                />
              </Pressable>
            </Animated.View>
          </Pressable>
        )}
      />
    </Animated.View>
  );
};

export default HomeScreen;
