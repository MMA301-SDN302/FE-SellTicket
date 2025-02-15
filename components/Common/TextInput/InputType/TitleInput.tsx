import { Text } from "react-native";

type TitleInputProps = {
    title: string;
}

const TitleInput = ({
    title: textTitle,
}: TitleInputProps) => {
    return (
        <Text
            style={{
                color: "gray",
                paddingBottom: 3,
                paddingTop: textTitle ? 3 : 0,
            }}
        >
            {textTitle}
        </Text>
    )
}

export default TitleInput;