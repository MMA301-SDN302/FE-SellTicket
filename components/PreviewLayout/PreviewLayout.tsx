import { View, TouchableOpacity, Text } from "react-native";
import { type PropsWithChildren } from "react";
import { styles } from "./PreviewLayoutStyle";
import TextInputCommon from "../Common/TextInput/TextInputCommon";
type PreviewLayoutProps = PropsWithChildren<{
  label?: string;
  values?: string[];
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
  searchText?: string;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
}>;

export const PreviewLayout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
  searchText,
  setSearchText,
}: PreviewLayoutProps) => (
  <View style={{ padding: 10, flex: 1 }}>
    {label && <Text style={styles.label}>{label}</Text>}
    {searchText !== undefined && (
      <TextInputCommon
        type={"search"}
        value={searchText}
        setValue={setSearchText}
        showError={false}
      />
    )}
    <View style={styles.row}>
      {values &&
        values.map(
          (value) =>
            setSelectedValue && (
              <TouchableOpacity
                key={value}
                onPress={() => setSelectedValue(value)}
                style={[
                  styles.button,
                  selectedValue === value && styles.selected,
                ]}
              >
                <Text
                  style={[
                    styles.buttonLabel,
                    selectedValue === value && styles.selectedLabel,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            )
        )}
    </View>
    <View style={[styles.container]}>{children}</View>
  </View>
);
