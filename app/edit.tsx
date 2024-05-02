import { useState } from "react";
import { Pressable, TextInput } from "react-native";
import Animated from "react-native-reanimated";
import { useRouter } from "expo-router";

import { Post } from "@prisma/client";
import { useBlogStore } from "@/store/use-blog-store";
import { axiosFetcher } from "@/lib/fetcher";

const EditScreen = () => {
  const {
    editBlogPost,
    setCurrentBlogPost,
    currentBlogPost: post,
  } = useBlogStore((state) => state);

  if (!post) {
    return null;
  }

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const router = useRouter();

  const onEditHandler = async () => {
    try {
      const response = await axiosFetcher({
        url: `/blogpost/${post.id}`,
        method: "PATCH",
        data: { title, content },
      });
      const data: { post: Post } = await response.data;
      const newPost = editBlogPost(post.id, data.post);

      setCurrentBlogPost(newPost);

      router.navigate("show");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Animated.View className="mx-4 mt-2 flex-1">
      <Animated.Text className="mb-2 text-[20px]">Edit Title:</Animated.Text>
      <TextInput
        className="text-[18px] border-[1px] rounded-md border-black mb-2 px-4 py-2"
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Edit title"
      />
      <Animated.Text className="mb-2 text-[20px]">Edit Content:</Animated.Text>
      <TextInput
        className="text-[18px] border-[1px] rounded-md border-black mb-2 px-4 py-2"
        value={content}
        onChangeText={(text) => setContent(text)}
        placeholder="Edit some content"
      />
      <Pressable onPress={onEditHandler}>
        <Animated.Text className="p-2 text-center font-semibold text-xl mt-4 rounded-md bg-blue-500 !text-white mb-4">
          Save
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default EditScreen;
