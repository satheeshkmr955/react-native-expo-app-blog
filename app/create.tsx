import { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

import { useBlogStore } from "@/store/use-blog-store";
import { useRouter } from "expo-router";

const CreateScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const { addBlogPost, setCurrentBlogPost } = useBlogStore((state) => state);

  const onAddHandler = () => {
    const newPost = addBlogPost({ title, content });

    setCurrentBlogPost(newPost);

    router.navigate("(home)");
  };

  return (
    <Animated.View className="mx-4 mt-2 flex-1">
      <Animated.Text className="mb-2 text-[20px]">Enter Title: </Animated.Text>
      <TextInput
        className="text-[18px] border-[1px] rounded-md border-black mb-2 px-4 py-2"
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Enter title"
      />
      <Animated.Text className="mb-2 text-[20px]">
        Enter Content:{" "}
      </Animated.Text>
      <TextInput
        className="text-[18px] border-[1px] rounded-md border-black mb-2 px-4 py-2"
        value={content}
        onChangeText={(text) => setContent(text)}
        placeholder="Enter some content"
      />
      <TouchableOpacity onPress={onAddHandler}>
        <Animated.Text className="p-2 text-center font-semibold text-xl mt-4 rounded-md bg-blue-500 !text-white mb-4">
          Add Blog Post
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CreateScreen;
