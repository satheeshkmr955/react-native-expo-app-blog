import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

import { useBlogStore } from "@/store/use-blog-store";
import { useRouter } from "expo-router";

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

  const onEditHandler = () => {
    const newPost = editBlogPost(post.id, { title, content });

    setCurrentBlogPost(newPost);

    router.navigate("show");
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
      <TouchableOpacity onPress={onEditHandler}>
        <Animated.Text className="p-2 text-center font-semibold text-xl mt-4 rounded-md bg-blue-500 !text-white mb-4">
          Save
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default EditScreen;
